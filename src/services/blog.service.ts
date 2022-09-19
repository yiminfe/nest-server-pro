import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Like, Repository } from 'typeorm'
import { Blog } from '@/entities/blog.entity'
import { CreateBlogDto } from '@/dtos/blog/create-blog.dto'
import { UpdateBlogDto } from '@/dtos/blog/update-blog.dto'
import { UserService } from './user.service'
import { ListBlogDto } from '../dtos/blog/list-blog.dto'
import { handleTimeSelect } from '@/utils/date.util'
import { User } from '@/entities/user.entity'
import { Page } from '@/constants/global.constants'
import { isEmpty } from '@/utils/data.util'

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly userService: UserService,
    private dataSource: DataSource
  ) {}

  async primaryIdCheck(id: number) {
    const checkBlog = await this.blogRepository.findOneBy({ id })
    if (checkBlog == null) {
      throw new BadRequestException(`id 为 ${id} 的 blog 数据不存在`)
    }
    return checkBlog
  }

  async atUserIdsCheck(blog: Blog, userId: number, atUserIds?: number[]) {
    const user = await this.userService.findOne(userId, {
      followUsers: true
    })
    const { followUsers } = user
    if (atUserIds && atUserIds.length > 0) {
      if (followUsers.length === 0) {
        throw new BadRequestException(
          '你没有关注任何用户，atUserIds参数应该为空'
        )
      }
      const atUsers: User[] = []
      for (const userId of atUserIds) {
        const result = followUsers.some(user => {
          const userResult = user.id === userId
          if (userResult) {
            atUsers.push(user)
          }
          return userResult
        })
        if (!result) {
          throw new BadRequestException(`你没有关注id为:${userId}的用户`)
        }
      }
      blog.atUsers = atUsers
    } else {
      blog.atUsers = []
    }
    Reflect.deleteProperty(user, 'followUsers')
    blog.user = user
  }

  async create(createBlogDto: CreateBlogDto) {
    const blog = new Blog()
    const { userId, atUserIds } = createBlogDto
    await this.atUserIdsCheck(blog, userId, atUserIds)
    blog.content = createBlogDto.content
    blog.title = createBlogDto.title
    blog.createdAt = new Date()
    blog.updatedAt = new Date()
    return this.blogRepository.save(blog)
  }

  findAll() {
    return this.blogRepository.find({
      relations: {
        user: true,
        atUsers: true
      },
      order: {
        createdAt: 'DESC'
      }
    })
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
      relations: {
        user: true,
        atUsers: true
      },
      where: {
        id
      }
    })
    if (blog == null) {
      throw new BadRequestException(`id 为 ${id} 的 blog 数据不存在`)
    }
    return blog
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.primaryIdCheck(id)
    const { userId, atUserIds } = updateBlogDto
    userId && (await this.atUserIdsCheck(blog, userId, atUserIds))
    if (updateBlogDto.content && updateBlogDto.content !== blog.content) {
      blog.content = updateBlogDto.content
    }
    if (updateBlogDto.title && updateBlogDto.title !== blog.title) {
      blog.title = updateBlogDto.title
    }
    blog.updatedAt = new Date()
    return this.blogRepository.save(blog)
  }

  async remove(id: number) {
    await this.primaryIdCheck(id)
    const deleteResult = await this.blogRepository.delete(id)
    return deleteResult.affected === 1
  }

  async findList(listBlogDto: ListBlogDto) {
    const { pageSize = Page.PAGESIZE, pageIndex, blog } = listBlogDto
    const where: any = {}
    if (blog && !isEmpty(blog)) {
      blog.title && (where.title = Like(`%${blog.title}%`))
      blog.content && (where.content = Like(`%${blog.content}%`))
      if (blog.startTime) {
        where.createdAt = handleTimeSelect(blog.startTime, blog.endTime)
      }

      if (blog.user && !isEmpty(blog.user)) {
        const { user } = blog
        const userWhere: any = {}
        user.id && (userWhere.id = user.id)
        user.name && (userWhere.name = Like(`%${user.name}%`))
        user.realName && (userWhere.realName = Like(`%${user.realName}%`))
        where.user = userWhere
      }

      if (blog.userRelation && !isEmpty(blog.userRelation)) {
        const userWhere: any = where.user || {}
        const { userRelation } = blog
        const { userId } = userRelation
        userWhere.userRelations2 = {
          userId
        }
        where.user = userWhere
      }
    }
    const skip = pageIndex - 1
    const pageResult = await this.blogRepository.findAndCount({
      relations: {
        atUsers: true,
        user: true
      },
      where,
      order: {
        createdAt: 'DESC'
      },
      skip: pageSize * skip,
      take: pageSize,
      cache: 1000 * 2
    })
    return {
      list: pageResult[0],
      count: pageResult[1],
      pageIndex: pageIndex,
      pageSize
    }
  }

  // 自定义业务代码
  // async findListHome(homeBlogDto: HomeBlogDto) {
  //   const pageIndex = homeBlogDto.pageIndex - 1
  //   const { pageSize = Page.PAGESIZE, userId } = homeBlogDto
  //   const pageResult = await this.blogRepository
  //     .createQueryBuilder('blog')
  //     .innerJoinAndMapOne('blog.user', User, 'user', 'blog.userId = user.id')
  //     .leftJoin(
  //       UserRelation,
  //       'userRelation',
  //       'userRelation.followId = blog.userId'
  //     )
  //     .where('userRelation.userId = :userId', { userId })
  //     .orWhere('blog.userId = :userId', { userId })
  //     .orderBy('blog.createdAt', 'DESC')
  //     .skip(pageIndex)
  //     .take(pageSize)
  //     .getManyAndCount()
  //   return {
  //     list: pageResult[0],
  //     count: pageResult[1],
  //     pageIndex,
  //     pageSize
  //   }
  // }
}
