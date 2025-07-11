export interface Record {
    id?: number,
    content: string,
    images: string[],
    createTime?: string | Dayjs;
}