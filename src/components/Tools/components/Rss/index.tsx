"use client"

import { getConfigDataAPI } from "@/api/project";
import { Web } from "@/types/app/project";
import { Modal, ModalContent, ModalHeader, ModalBody, UseDisclosureProps, Snippet } from "@heroui/react"
import { useEffect, useState } from "react";

interface Props {
    disclosure: UseDisclosureProps & { onOpenChange: () => void }
}

export default ({ disclosure }: Props) => {
    const [data, setData] = useState<Web>()
    const { isOpen, onClose, onOpenChange } = disclosure;

    const getConfigData = async () => {
        const { data } = await getConfigDataAPI<Web>("web") || { data: {} as Web }
        setData(data)
    }

    useEffect(() => {
        getConfigData()
    }, [])

    return (
        <>
            <Modal
                size="lg"
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">查看订阅地址</ModalHeader>

                            <ModalBody>
                                <Snippet symbol="" className="mb-6">{data?.url + '/api/rss'}</Snippet>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}