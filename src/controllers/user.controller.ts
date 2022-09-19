import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  CacheInterceptor,
  UseInterceptors
} from '@nestjs/common'
import { UserService } from '@/services/user.service'
import { CreateUserDto } from '@/dtos/user/create-user.dto'
import { UpdateUserDto } from '@/dtos/user/update-user.dto'
import { ApiTags } from '@nestjs/swagger'
import { AjvValidationPipe } from '@/common/pipes/ajv-validation.pipe'
import createUserSchema from '@/schemas/user/create-user.schema'
import updateUserSchema from '@/schemas/user/update-user.schema'
import { IdValidationPipe } from '@/common/pipes/id-validation.pipe'
import { Public } from '@/common/decorators/public.decorator'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Public()
  create(
    @Body(new AjvValidationPipe(createUserSchema)) createUserDto: CreateUserDto
  ) {
    return this.userService.create(createUserDto)
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: number) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: number,
    @Body(new AjvValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: number) {
    return this.userService.remove(id)
  }

  // 补充其它业务代码
}
