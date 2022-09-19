import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '角色id'
  })
  id: number

  @Column('varchar', {
    name: 'name',
    comment: '角色英文名称',
    length: 50
  })
  name: string

  @Column('varchar', {
    name: 'roleName',
    comment: '角中文名称',
    length: 50
  })
  roleName: string

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

  @ManyToMany(() => User, user => user.roles)
  users: User[]
}
