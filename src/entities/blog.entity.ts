import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '博客id' })
  id: number

  @Column('varchar', { name: 'title', comment: '博客标题', length: 100 })
  title: string

  @Column('datetime', { name: 'createdAt', comment: '创建时间' })
  createdAt: Date

  @Column('datetime', { name: 'updatedAt', comment: '更新呢时间' })
  updatedAt: Date

  @Column('text', { name: 'content', comment: '博客内容' })
  content: string

  // @OneToMany(() => AtRelation, atRelation => atRelation.blog)
  // atRelations: AtRelation[]

  @ManyToOne(() => User, user => user.blogs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User

  @Column('int', {
    name: 'userId',
    comment: '用户id'
  })
  userId: number

  @ManyToMany(() => User, user => user.atBlogs)
  @JoinTable({
    name: 'atRelation',
    joinColumn: {
      name: 'blogId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    }
  })
  atUsers: User[]
}
