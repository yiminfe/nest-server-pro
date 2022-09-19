import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('atRelation')
export class AtRelation {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '博客at用户关系id'
  })
  id: number

  @Column('tinyint', {
    name: 'isRead',
    comment: '是否已读',
    default: () => "'0'"
  })
  isRead: number

  @Column('datetime', {
    name: 'createdAt',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @Column('datetime', {
    name: 'updatedAt',
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date

  // @ManyToOne(() => User, user => user.atRelations, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // })
  // @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  // user: User

  // @ManyToOne(() => Blog, blog => blog.atRelations, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // })
  // @JoinColumn([{ name: 'blogId', referencedColumnName: 'id' }])
  // blog: Blog

  @Column('int', {
    name: 'userId',
    comment: '用户id'
  })
  userId: number

  @Column('int', {
    name: 'blogId',
    comment: '博客id'
  })
  blogId: number
}
