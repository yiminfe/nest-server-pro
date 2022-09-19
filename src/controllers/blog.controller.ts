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
import { BlogService } from '@/services/blog.service'
import { CreateBlogDto } from '@/dtos/blog/create-blog.dto'
import { UpdateBlogDto } from '@/dtos/blog/update-blog.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import createBlogSchema from '@/schemas/blog/create-blog.schema'
import { AjvValidationPipe } from '@/common/pipes/ajv-validation.pipe'
import updateBlogSchema from '@/schemas/blog/update-blog.schema'
import { IdValidationPipe } from '@/common/pipes/id-validation.pipe'
import { ListBlogDto } from '@/dtos/blog/list-blog.dto'
import listBlogSchema from '@/schemas/blog/list-blog.schema'
import { Roles } from '@/common/decorators/roles.decorator'
import { Role } from '@/constants/role.constants'

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // 自动生成的代码

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create blog' })
  create(
    @Body(new AjvValidationPipe(createBlogSchema)) createBlogDto: CreateBlogDto
  ) {
    return this.blogService.create(createBlogDto)
  }

  @Get()
  @ApiOperation({ summary: 'Find all blog' })
  @Roles(Role.Admin)
  findAll() {
    return this.blogService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one blog' })
  findOne(@Param('id', IdValidationPipe) id: number) {
    return this.blogService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one blog' })
  update(
    @Param('id', IdValidationPipe) id: number,
    @Body(new AjvValidationPipe(updateBlogSchema)) updateBlogDto: UpdateBlogDto
  ) {
    return this.blogService.update(id, updateBlogDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove one blog' })
  remove(@Param('id', IdValidationPipe) id: number) {
    return this.blogService.remove(id)
  }

  @Post('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find list blog' })
  findList(
    @Body(new AjvValidationPipe(listBlogSchema)) listBlogDto: ListBlogDto
  ) {
    return this.blogService.findList(listBlogDto)
  }

  // 补充其它业务代码
  @Post('list/home')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find list blog home' })
  findListHome(
    @Body(new AjvValidationPipe(listBlogSchema)) listBlogDto: ListBlogDto
  ) {
    return this.blogService.findList(listBlogDto)
  }
}
