import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { Public } from '@/common/decorators/public.decorator'
import { FileSizeValidationPipe } from '@/common/pipes/file-size-validation.pipe'
import { FileService } from '@/services/file.service'

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @Public()
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(
    @UploadedFiles(FileSizeValidationPipe) files: Array<Express.Multer.File>
  ) {
    return this.fileService.uploadFile(files)
  }
}
