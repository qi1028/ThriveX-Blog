"use client"

import { useRouter } from "next/navigation"
import { Pagination } from "@nextui-org/react"

interface Props {
    total: number,
    page: number,
    size?: number,
    path?: string,
    className?: string
}

export default ({ total, page, path, className }: Props) => {
    const router = useRouter()

    const onChange = (page: number) => {
        router.push(path ? `${path}&page=${page}` : `?page=${page}`)
    }

    return (
        <div className={className}>
            <Pagination
                showControls
                total={total}
                page={+page}
                onChange={onChange}
                classNames={{ item: "shadow-none bg-transparent dark:hover:!bg-black-b transition-colors", prev: "dark:bg-black-b transition-colors", next: "dark:bg-black-b transition-colors" }}
            />
        </div>
    )
}