"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, Input } from "@nextui-org/react";
import { MdEnhancedEncryption } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"
import { getArticleDataAPI } from "@/api/article";
import { toast, ToastContainer } from "react-toastify";

interface Props {
  id: number
}

export default function Encrypt({ id }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const [password, setPassword] = useState("")

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // 在组件挂载时自动打开模态框
  useEffect(() => {
    onOpen();
  }, []);

  // 验证访问密码
  const handleVerifyPassword = async () => {
    const res = await getArticleDataAPI(id, password)
    res?.code === 200 ? router.push(`${pathname}?password=${password}`) : toast.error("访问密码错误，请重新输入");
  };

  // 表单样式
  const inputWrapper = "hover:!border-primary group-data-[focus=true]:border-primary rounded-md"

  return (
    <>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        placement="top-center"
        isDismissable={false}
        hideCloseButton={true}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">🔑 该文章已加密</ModalHeader>

              <ModalBody>
                <Input
                  endContent={<MdEnhancedEncryption className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                  label="访问密码"
                  placeholder="文章受保护，请输入密码"
                  variant="bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  classNames={{ inputWrapper }}
                />
              </ModalBody>

              <ModalFooter>
                <Button color="default" onPress={() => router.push("/")}>返回</Button>
                <Button color="primary" onPress={handleVerifyPassword}>校验</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <ToastContainer />
    </>
  );
}