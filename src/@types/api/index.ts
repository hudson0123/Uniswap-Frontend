export * from './request/auth'
export * from './request/createPost'
export * from './response/auth'

export interface PaginatedResponse<T> {
    count: number,
    next: string | null,
    previous: string | null,
    results: T[],
}