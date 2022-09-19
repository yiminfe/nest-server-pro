import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AtRelation } from '@/entities/at-relation.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AtRelationService {
  constructor(
    @InjectRepository(AtRelation)
    private readonly atRelationRepository: Repository<AtRelation>
  ) {}

  async remove(id: number) {
    const deleteResult = await this.atRelationRepository.delete(id)
    return deleteResult.affected === 1
  }
}
