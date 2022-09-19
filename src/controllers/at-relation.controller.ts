import { Controller, Param, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IdValidationPipe } from '@/common/pipes/id-validation.pipe'
import { AtRelationService } from '@/services/at-relation.service'

@ApiTags('at-relation')
@Controller('at-relation')
export class AtRelationController {
  constructor(private readonly atRelationService: AtRelationService) {}
  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: number) {
    return this.atRelationService.remove(id)
  }
}
