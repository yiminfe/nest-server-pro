import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserRelation } from '@/entities/user-relation.entity'
import { CreateUserRelationDto } from '@/dtos/user-relation/create-user-relation.dto'
import { UpdateUserRelationDto } from '@/dtos/user-relation/update-user-relation.dto'
import { UserService } from './user.service'

@Injectable()
export class UserRelationService {
  constructor(
    @InjectRepository(UserRelation)
    private readonly userRelationRepository: Repository<UserRelation>,
    private readonly userService: UserService
  ) {}

  async primaryIdCheck(id: number) {
    const checkUserRelation = await this.userRelationRepository.findOneBy({
      id
    })
    if (checkUserRelation == null) {
      throw new BadRequestException(`id 为 ${id} 的 userRelation 数据不存在`)
    }
    return checkUserRelation
  }

  async create(createUserRelationDto: CreateUserRelationDto) {
    const userRelation = new UserRelation()
    userRelation.user = await this.userService.primaryIdCheck(
      createUserRelationDto.userId
    )
    userRelation.follow = await this.userService.primaryIdCheck(
      createUserRelationDto.followId
    )
    userRelation.createdAt = new Date()
    userRelation.updatedAt = new Date()
    return this.userRelationRepository.save(userRelation)
  }

  findAll() {
    return this.userRelationRepository.find({
      relations: {
        user: true,
        follow: true
      },
      order: {
        createdAt: 'DESC'
      }
    })
  }

  async findOne(id: number) {
    const userRelation = await this.userRelationRepository.find({
      relations: {
        user: true,
        follow: true
      },
      where: {
        id
      }
    })
    if (userRelation == null) {
      throw new BadRequestException(`id 为 ${id} 的 userRelation 数据不存在`)
    }
    return userRelation
  }

  async update(id: number, updateUserRelationDto: UpdateUserRelationDto) {
    const checkUserRelation = await this.primaryIdCheck(id)
    const userRelation = new UserRelation()
    if (
      updateUserRelationDto.userId &&
      updateUserRelationDto.userId !== checkUserRelation.user.id
    ) {
      userRelation.user = await this.userService.primaryIdCheck(
        updateUserRelationDto.userId
      )
    }
    if (
      updateUserRelationDto.followId &&
      updateUserRelationDto.followId !== checkUserRelation.user.id
    ) {
      userRelation.follow = await this.userService.primaryIdCheck(
        updateUserRelationDto.followId
      )
    }
    userRelation.updatedAt = new Date()
    const updateResult = await this.userRelationRepository.update(
      { id },
      userRelation
    )
    return updateResult.affected === 1
  }

  async remove(id: number) {
    await this.primaryIdCheck(id)
    const deleteResult = await this.userRelationRepository.delete(id)
    return deleteResult.affected === 1
  }
}
