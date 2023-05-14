import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ChatRecords, { AvatarComponent } from "../ChatRecord";
import Intro from "../Intro";
import { fetcher } from "../../helpers/fetcher";
import { formatClaudePrompt } from "../../helpers/cluade.helpers";
import dynamic from "next/dynamic";
import { builtinPrompts } from "../../data/prompts";
import { useAssistantRole } from "../../contexts/assistant";
import { useModelSetting } from "../../contexts/modelSetting";
import { v4 as uuidv4 } from "uuid";
import Lottie from "../Lottie";
import dot from "../../lottie/dot.json";
import setting from "../../lottie/setting.json";
import settingDark from "../../lottie/setting-dark.json";
import cls from "classnames";
import { useKBar } from "kbar";
import FastOperations from "../FastOperations";

import { useIsSupportCapture } from "../../hooks/useIsSupportCapture";

import { useLocalStorage } from "react-use";
import ThemeChanger from "../ThemeChanger";
import { useTheme } from "next-themes";

import type { FileInfo } from "../FastOperations";

const FunctionalZone = dynamic(() => import("../FunctionalZone"), {
  ssr: false,
});

const Chat = () => {
  const { query } = useKBar();
  const { value } = useAssistantRole();
  const { value: modelSetting } = useModelSetting();
  const [err, setErr] = useState("");
  const chatWrapperRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [fastZoneVisible, setFastZoneVisible] = useState<boolean>(false);
  const [file, setFile] = useState<FileInfo | null>(null);

  const assistantRole =
    builtinPrompts.find((p) => p.id === value) ?? builtinPrompts[0];

  const isMobile = useIsSupportCapture();

  const [chats, setChats] = useLocalStorage<ChatMessage[]>("ec-records");
  const { theme } = useTheme();

  useEffect(() => {
    if (chats?.length && chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop =
        chatWrapperRef.current.scrollHeight + 20;
    }
  }, [chats]);

  const sendChat = async () => {
    if (!text.trim() || waiting) {
      return;
    }

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "40px";
    }

    const _chats: ChatMessage[] = [
      ...(chats ?? []),
      {
        role: "user",
        id: uuidv4(),
        text,
        date: Date.now(),
        conversationId: assistantRole?.id,
      },
    ];

    setChats(_chats);

    const claudePrompt = formatClaudePrompt(
      _chats,
      assistantRole,
      file?.content
    );

    setText("");
    setWaiting(true);
    setErr("");

    try {
      const gptResponse = await fetcher("/api/sendChat", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          text: claudePrompt,
          id: "1",
          model: modelSetting?.model,
          hasFile: !!file,
          temperature: modelSetting?.temperature,
          maxTokens: modelSetting?.maxTokens,
        }),
      });

      // const response = await fetch("/api/sse", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     text: claudePrompt,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error(response.statusText);
      // }

      // const data = response.body;
      // if (!data) {
      //   return;
      // }

      // const reader = data.getReader();
      // const decoder = new TextDecoder();

      // let done = false;
      // let chunkValue = '';
      // const chatId = uuidv4();
      // const chatDate = Date.now();

      // while (!done) {
      //   const { value, done: doneReading } = await reader.read();
      //   done = doneReading;
      //   if (!done) {
      //     const _chunkValue = decoder.decode(value);

      //     // FIXME: 这里有点奇怪，数据不是按序返回的
      //     if (!chunkValue.includes(_chunkValue)) {
      //       chunkValue = _chunkValue;
      //       console.log('chunkValue', chunkValue);
      //       setChats([ ..._chats, {
      //         id: chatId,
      //         date: chatDate,
      //         role: 'assistant',
      //         text: chunkValue,
      //         conversationId: assistantRole?.id
      //       } ]);
      //     }

      //   }

      //   // setChats([ ..._chats, { ...gptResponse, conversationId: assistantRole?.id } ]);
      // }

      if (gptResponse?.error) {
        throw new Error(gptResponse.error);
      }

      setChats([
        ..._chats,
        { ...gptResponse, conversationId: assistantRole?.id },
      ]);
    } catch (e) {
      if (e instanceof Error) {
        setErr(e.message);
      }
      setErr("我的服务器好像遇到点问题，你可以稍后再试试。");
    } finally {
      setWaiting(false);
    }
  };
  return (
    <div className="h-screen overflow-y-auto" ref={chatWrapperRef}>
      {/* Header */}
      <div className="top-0 fixed min-w-full bg-white dark:bg-neutral-900 shadow-lg flex justify-center items-center p-2 z-50 select-none">
        <div className="text-center">
          <p className="font-bold">新聊天</p>
          <p className="text-gray-400 text-xs dark:text-gray-400">
            开启一个新聊天
          </p>
        </div>
        <div className={cls("fixed top-2", isMobile ? "left-3" : "right-3")}>
          <ThemeChanger />
        </div>
        {isMobile && (
          <div className="absolute right-3" onClick={query.toggle}>
            {/* key for refresh Lottie cache */}
            <Lottie
              key={theme}
              data={theme === "dark" ? settingDark : setting}
              autoPlay
              loop
              iconStyle={{ width: "32px" }}
            />
          </div>
        )}
      </div>

      <div className="mt-20 mb-40">
        <div className="max-w-2xl mx-auto">
          <Intro />

          <div>
            {chats && <ChatRecords chats={chats} />}

            {/* 这里要替换掉 */}
            {waiting && (
              <div className="flex items-center px-2 relative response-block scroll-mt-32 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900 pb-2 pt-2 pr-2 group min-h-[52px] cursor-pointer">
                <AvatarComponent role="assistant" />
                <div className="ml-3 text-sm focus:outline flex items-center">
                  <span className="inline-block mr-1">我假装在思考中</span>{" "}
                  <Lottie
                    data={dot}
                    autoPlay
                    loop
                    iconStyle={{ width: "32px" }}
                  />
                  <div></div>
                </div>
              </div>
            )}

            {err && (
              <div className="flex items-center px-2 relative response-block scroll-mt-32 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900 pb-2 pt-2 pr-2 group min-h-[52px] cursor-pointer">
                <AvatarComponent role="assistant" />
                <p className="ml-3 text-sm focus:outline">{err}</p>
              </div>
            )}

            {assistantRole ? (
              <div className="px-4 mt-8 mb-2 flex flex-col justify-center items-center">
                <p className="text-sm text-gray-500 px-4 py-1 rounded-ful dark:invert">
                  当前正在跟{" "}
                  <span className="font-bold text-black">
                    {assistantRole.title}

                    {!!file && (
                      <span className="text-black inline-block font-normal text-xs">
                        ({file.name})
                      </span>
                    )}
                  </span>{" "}
                  聊天
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <Link href="/" className="text-blue-600">
                    模型
                  </Link>
                  ：{modelSetting?.model ?? "claude-instant-v1"}
                  <Link href="/" className="text-blue-600 inline-block ml-1">
                    温度
                  </Link>
                  ：{modelSetting?.temperature ?? 0.7}
                  <Link href="/" className="text-blue-600 inline-block ml-1">
                    生成长度
                  </Link>
                  ：{modelSetting?.maxTokens ?? 400}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed min-w-full bottom-0 py-4 bg-white z-50 dark:bg-neutral-900">
        <div className="flex flex-col mx-auto max-w-2xl justify-center items-center">
          <div className="w-full flex px-4 items-center">
            <div className="w-full relative">
              <textarea
                ref={textAreaRef}
                onInput={(e) => {
                  if (textAreaRef.current) {
                    textAreaRef.current.style.height = "40px";

                    textAreaRef.current.style.height =
                      textAreaRef?.current?.scrollHeight + 2 + "px";
                  }
                }}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.nativeEvent.isComposing) return;

                  setFastZoneVisible(false);

                  if (e.key === "/" && !e.shiftKey && !text) {
                    setFastZoneVisible(true);
                  }

                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendChat();
                  }
                }}
                id="chat-input-textbox"
                placeholder={
                  isMobile
                    ? "/ 上传文件，输入聊天内容..."
                    : "/ 上传文件, enter 发送, shift + enter 换行, 输入聊天内容..."
                }
                className={cls(
                  "relative block border-gray-300 border border-solid focus:border-blue-600 w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6 min-h-[36px] max-h-[196px] resize-none dark:bg-zinc-600 dark:text-white dark:ring-gray-500 dark:focus:ring-blue-500 py-1.5 px-3",
                  !isMobile && "pl-[54px]"
                )}
                style={{ height: "40px" }}
              ></textarea>

              <FastOperations
                visible={fastZoneVisible}
                onClose={() => setFastZoneVisible(false)}
                onFileUpload={(fileInfo) => setFile(fileInfo)}
              >
                <div className="absolute top-0 invisible">Hidden Item</div>
              </FastOperations>

              {!isMobile && (
                <span className="absolute min-h-[30px] md:min-h-0 min-w-[36px] bottom-1/2 left-1.5 translate-y-1/2 flex items-center space-x-1 space-x-reverse text-xs py-0 rounded border border-gray-300 dark:border-gray-400 dark:text-white text-black px-2 hover:border-blue-600 hover:dark:border-blue-500">
                  <kbd
                    role="button"
                    className="border-none text-center text-sm text-gray-500"
                    onClick={query.toggle}
                  >
                    <span className="text-base">⌘</span>
                    <span className="inline-box ml-1">K</span>
                  </kbd>
                </span>
              )}
            </div>

            <button
              type="button"
              className="inline-flex ml-2 items-center px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-default transition-colors whitespace-nowrap space-x-1 h-[40px]"
              onClick={sendChat}
              disabled={!!waiting}
            >
              <span>→ 发送</span>
            </button>
          </div>

          <div className="mt-2 text-gray-400 text-xs text-center px-4">
            <span className="inline-block mx-2 text-gray-500">
              easierChat.com - 一个更方便、易用的 chatBot 客户端
            </span>
            <Link href="/">FAQs</Link> |{" "}
            <Link href="https://twitter.com/xiaokedada">@那吒</Link> |{" "}
            <Link href="mailto: maoxiaoke@outlook.com">提交反馈</Link> |{" "}
            <Link href="https://nazha-image-store.oss-cn-shanghai.aliyuncs.com/others/easierChat.dmg">
              macOS 客户端
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
