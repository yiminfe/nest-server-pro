import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity('userRelation')
export class UserRelation {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '用户关系id' })
  id: number

  @Column('datetime', { name: 'createdAt', comment: '创建时间' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', comment: '更新呢时间' })
  updatedAt: Date

  @ManyToOne(() => User, user => user.userRelations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User

  @ManyToOne(() => User, user => user.userRelations2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'followId', referencedColumnName: 'id' }])
  follow: User

  // @RelationId((userRelation: UserRelation) => userRelation.user)
  // userId: number

  // @RelationId((userRelation: UserRelation) => userRelation.follow)
  // followId: number

  @Column('int', {
    name: 'userId',
    comment: '用户id'
  })
  userId: number

  @Column('int', {
    name: 'followId',
    comment: '关注的用户id'
  })
  followId: number
}
