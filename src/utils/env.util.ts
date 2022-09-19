const ENV = process.env.NODE_ENV

export const isDev = ENV === 'dev'
export const noDev = ENV !== 'dev'
export const isPrd = ENV === 'production'
export const noPrd = ENV !== 'production'
export const isTest = ENV === 'test'
export const noTest = ENV !== 'test'
