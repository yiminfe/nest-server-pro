import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Blog } from './blog.entity'
import { Role } from './role.entity'
import { UserRelation } from './user-relation.entity'

@Index('UQ_065d4d8f3b5adb4a08841eae3c8', ['name'], { unique: true })
@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '用户id' })
  id: number

  @Column('varchar', {
    name: 'name',
    unique: true,
    comment: '用户名',
    length: 50
  })
  name: string

  @Column('varchar', {
    name: 'password',
    comment: '用户密码',
    length: 50,
    select: false
  })
  password: string

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

  @Column('varchar', {
    name: 'realName',
    nullable: true,
    comment: '真实姓名',
    length: 50
  })
  realName: string | null

  // @OneToMany(() => AtRelation, atRelation => atRelation.user)
  // atRelations: AtRelation[]

  @OneToMany(() => Blog, blog => blog.user)
  blogs: Blog[]

  @OneToMany(() => UserRelation, userRelation => userRelation.user)
  userRelations: UserRelation[]

  @OneToMany(() => UserRelation, userRelation => userRelation.follow)
  userRelations2: UserRelation[]

  @ManyToMany(() => User, user => user.followUsers)
  byFollowUsers: User[]

  @ManyToMany(() => User, user => user.byFollowUsers)
  @JoinTable({
    name: 'userRelation',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'followId',
      referencedColumnName: 'id'
    }
  })
  followUsers: User[]

  @ManyToMany(() => Blog, blog => blog.atUsers)
  atBlogs: Blog[]

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'userRoleRelation',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'roleId',
      referencedColumnName: 'id'
    }
  })
  roles: Role[]
}
