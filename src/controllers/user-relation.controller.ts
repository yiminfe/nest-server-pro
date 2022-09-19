import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { UserRelationService } from '@/services/user-relation.service'
import { CreateUserRelationDto } from '@/dtos/user-relation/create-user-relation.dto'
import { UpdateUserRelationDto } from '@/dtos/user-relation/update-user-relation.dto'
import { ApiTags } from '@nestjs/swagger'
import updateRelationSchema from '../schemas/user-relation/update-user-relation.schema'
import { AjvValidationPipe } from '@/common/pipes/ajv-validation.pipe'
import createRelationSchema from '@/schemas/user-relation/create-user-relation.schema'
import { IdValidationPipe } from '@/common/pipes/id-validation.pipe'

@ApiTags('user-relation')
@Controller('user-relation')
export class UserRelationController {
  constructor(private readonly userRelationService: UserRelationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(
    @Body(new AjvValidationPipe(createRelationSchema))
    createUserRelationDto: CreateUserRelationDto
  ) {
    return this.userRelationService.create(createUserRelationDto)
  }

  @Get()
  findAll() {
    return this.userRelationService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: number) {
    return this.userRelationService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: number,
    @Body(new AjvValidationPipe(updateRelationSchema))
    updateUserRelationDto: UpdateUserRelationDto
  ) {
    return this.userRelationService.update(id, updateUserRelationDto)
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: number) {
    return this.userRelationService.remove(id)
  }
}
