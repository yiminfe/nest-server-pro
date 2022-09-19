import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { User } from '@/entities/user.entity'
import { CreateUserDto } from '@/dtos/user/create-user.dto'
import { UpdateUserDto } from '@/dtos/user/update-user.dto'
import { BusinessException } from '@/common/exceptions/business.exception'
import { UserError } from '@/constants/business-error.constants'
import { getCrypto } from '@/utils/crypto.util'
import { AuthLoginDto } from '@/dtos/auth/auth-login.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async primaryIdCheck(id: number) {
    const checkUser = await this.userRepository.findOneBy({ id })
    if (checkUser == null) {
      throw new BadRequestException(`id 为 ${id} 的 user 数据不存在`)
    }
    return checkUser
  }

  async uniqueNameCheck(name: string) {
    const checkUser = await this.userRepository.findOneBy({ name })
    if (checkUser) {
      throw new BusinessException(UserError.NAME_EXIST)
    }
    return checkUser
  }

  async login(authLoginDto: AuthLoginDto) {
    authLoginDto.password = getCrypto(authLoginDto.password)
    const user = await this.userRepository.findOne({
      relations: {
        roles: true
      },
      where: authLoginDto
    })
    if (user == null) {
      throw new BadRequestException('用户名或密码错误')
    }
    return user
  }

  async create(createUserDto: CreateUserDto) {
    await this.uniqueNameCheck(createUserDto.name)
    const user: any = {}
    user.password = getCrypto(createUserDto.password)
    user.name = createUserDto.name
    createUserDto.realName && (user.realName = createUserDto.realName)
    user.createdAt = new Date()
    user.updatedAt = new Date()
    const userResult = await this.userRepository.save(user)
    this.dataSource.queryResultCache?.remove(['user_cache'])
    Reflect.deleteProperty(userResult, 'password')
    return userResult
  }

  findAll() {
    return this.userRepository.find({
      relations: {
        blogs: true
      },
      order: {
        createdAt: 'DESC'
      },
      cache: {
        id: 'user_cache',
        milliseconds: 1000 * 60 * 10
      }
    })
  }

  async findOne(
    id: number,
    options?: {
      blogs?: boolean
      followUsers?: boolean
      byFollowUsers?: boolean
      atBlogs?: boolean
    }
  ) {
    const relations = options || {
      blogs: true,
      followUsers: true,
      byFollowUsers: true,
      atBlogs: true
    }
    const user = await this.userRepository.findOne({
      relations,
      where: {
        id
      }
    })
    if (user == null) {
      throw new BadRequestException(`id 为 ${id} 的 user 数据不存在`)
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.primaryIdCheck(id)
    if (updateUserDto.name && updateUserDto.name !== user.name) {
      await this.uniqueNameCheck(updateUserDto.name)
      user.name = updateUserDto.name
    }
    if (updateUserDto.password) {
      user.password = updateUserDto.password
    }
    if (updateUserDto.realName && updateUserDto.realName !== user.realName) {
      user.realName = updateUserDto.realName
    }
    user.updatedAt = new Date()
    const userResult = await this.userRepository.save(user)
    Reflect.deleteProperty(userResult, 'password')
    return userResult
  }

  async remove(id: number) {
    await this.primaryIdCheck(id)
    const deleteResult = await this.userRepository.delete(id)
    return deleteResult.affected === 1
  }

  // 自定义业务代码
}
