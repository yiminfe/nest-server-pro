import { Role } from '@/constants/role.constants'
import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = '__roles__'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
