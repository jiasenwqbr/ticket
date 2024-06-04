"use client";
import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import {
  avatar,
  Chip,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { FileUp, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { Topic } from "@prisma/client";
import TicketTopic from "./components/TicketTopic";
export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [content, setContent] = useState("");
  const [currentOption, setCurrentOption] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const { userId } = useAuth();
  const avatar = useUser().user?.imageUrl;

  useEffect(() => {
    const fetchData = async () => {
      console.log("qqqqqqqqqqq:", process.env.API_ADDRESS);
      console.log("qqqqqqqqqqq:", `${process.env.API_ADDRESS}`);

      const result = await fetch("api/topic", {
        cache: "no-cache",
        method: "GET",
      });
      const data = await result.json();
      console.log("🚀 ~ fetchData ~ data:", data);

      setTopics(data.topics as Topic[]);
    };
    fetchData();
  }, []);

  return (
    <div>
      <header className="w-full h-14">
        <div className="fixed top-4 right-8 flex justify-items-stretch items-center">
          <Button color="success" endContent={<Send />} onPress={onOpen}>
            发布
          </Button>
          <Spacer x={4} />
          <ThemeSwitcher />
          <Spacer x={4} />
          <UserButton />
        </div>
      </header>
      <div className="flex items-center justify-center m-4">
        <main className="flex flex-col items-center justify-center w-full boder-x-2 sm:w-full md:w-9/12 lg:w-6/12">
          <Divider className="my-4"></Divider>
          {topics &&
            topics.map((topic) => {
              return <TicketTopic {...topic} key={topic.id}></TicketTopic>;
            })}
        </main>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                发布话题
              </ModalHeader>
              <ModalBody>
                <Textarea
                  label="内容"
                  placeholder="写一篇话题吧！"
                  variant="underlined"
                  labelPlacement="outside"
                  value={content}
                  onValueChange={setContent}
                ></Textarea>
                <Spacer x={2} />
                <CldUploadButton
                  uploadPreset="ckoqjogd"
                  onSuccess={(result) => {
                    // @ts-ignore
                    setImages([...images, result.info.url]);
                  }}
                >
                  <button className="bg-secondary-400 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-lg">
                    <div className="flex">
                      <FileUp />
                      <span>上传图片</span>
                    </div>
                  </button>
                </CldUploadButton>
                <Spacer x={2} />
                <div className="flex gap-2">
                  <Input
                    label={"输入选项"}
                    variant={"faded"}
                    value={currentOption}
                    onValueChange={setCurrentOption}
                  />
                  <Spacer y={2} />
                  <Button
                    color="success"
                    onClick={() => {
                      setOptions([...options, currentOption]);
                      setCurrentOption("");
                    }}
                  >
                    添加
                  </Button>
                </div>
                <Spacer x={2}></Spacer>
                <div className="flex gap-2">
                  {options.map((item, index) => {
                    return (
                      <Chip
                        key={index}
                        variant="flat"
                        onClose={(e) => {
                          setOptions(options.filter((i) => i != item));
                        }}
                      >
                        {item}
                      </Chip>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={async () => {
                    const result = await fetch(
                      process.env.API_ADDRESS + "/topic",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          userId: userId,
                          avatar: avatar,
                          content: content,
                          images: images,
                          options: options,
                        }),
                      }
                    );
                    const data = (await result.json()) as Topic;
                    setTopics([...topics, data]);
                    setContent("");
                    setOptions([]);
                    setCurrentOption("");
                    setImages([]);
                  }}
                >
                  确定
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
