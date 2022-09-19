import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = '__isPublic__'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
