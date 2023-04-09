import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ChatRecord, { AvatarComponent } from '../ChatRecord';
import Intro from '../Intro';
import { fetcher } from '../../helpers/fetcher';
import { formatClaudePrompt } from '../../helpers/cluade.helpers';
import dynamic from 'next/dynamic';
import { builtinPrompts } from '../../data/prompts';
import { useAssistantRole } from '../../contexts/assistant';
import { v4 as uuidv4 } from 'uuid';

import { useLocalStorage } from 'react-use';

const FunctionalZone = dynamic(() => import('../FunctionalZone'), { ssr: false });

const Chat = () => {
  const { value } = useAssistantRole();
  const [err, setErr] = useState('');
  const chatWrapperRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>('');
  const [waitingText, setWaiting] = useState<string>('');
  const assistantRole = builtinPrompts.find((p) => p.id === value) ?? builtinPrompts[0];

  const [chats, setChats] = useLocalStorage<ChatMessage[]>('ec-records');

  useEffect(() => {
    if (chats?.length && chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight + 20;
    }
  }, [chats, waitingText]);

  const sendChat = async () => {
    if (!text.trim() || !!waitingText) {
      return;
    }

    const _chats: ChatMessage[] = [
      ...(chats ?? []),
      {
        role: 'user',
        id: uuidv4(),
        text,
        date: Date.now(),
        conversationId: assistantRole?.id,
      }
    ];

    setChats(_chats);

    const claudePrompt = formatClaudePrompt(_chats, assistantRole)

    setText('');
    setWaiting('');

    try {
      // const gptResponse = await fetcher('/api/sendChat', {
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   method: "POST",
      //   body: JSON.stringify({
      //     text: claudePrompt,
      //     id: '1',
      //   })
      // });

      const response = await fetch("/api/sse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: claudePrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      let chunkValue = '';
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (!done) {
          chunkValue = decoder.decode(value);
          setWaiting(chunkValue);
        } else {
          setChats([ ..._chats, {
            id: uuidv4(),
            date: Date.now(),
            role: 'assistant',
            text: chunkValue,
            conversationId: assistantRole?.id
          } ]);

          setWaiting('');
        }

        // setChats([ ..._chats, { ...gptResponse, conversationId: assistantRole?.id } ]);
      }

      // if (gptResponse?.error) {
      //   throw new Error(gptResponse.error);
      // }

      // setChats([ ..._chats, { ...gptResponse, conversationId: assistantRole?.id } ]);
    } catch (e) {
      // if (e instanceof Error) {
      //   setErr(e.message);
      // }
      setErr('我的服务器好像遇到点问题，你可以稍后再试试。')
      // setErr('Something went wrong, please try again later.')
    } finally {
      setWaiting('');
    }
  }

  return (
    <div className="h-screen overflow-y-auto" ref={chatWrapperRef}>
      {/* Header */}
      <div
        className="top-0 fixed min-w-full bg-white shadow-lg flex justify-center items-center p-2 z-50"
      >
        <div className="text-center">
          <p className="font-bold">新聊天</p>
          <p className="text-gray-400 text-xs">开启一个新聊天</p>
        </div>
      </div>

      <div className="mt-14 mb-40 sm:mb-32">
        <div className="max-w-2xl mx-auto">
          <Intro />

          <div>
            { chats && <ChatRecord chats={chats} />}

            {/* 这里要替换掉 */}
            { !!waitingText && (
                <div
                  className="flex items-start px-2 relative response-block scroll-mt-32 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900 pb-2 pt-2 pr-2 group min-h-[52px]"
                >
                  <AvatarComponent role='assistant' />
                <div className="ml-3 text-sm whitespace-pre-line focus:outline">
                  { waitingText }
                </div>
              </div>
            )}

            {
              err && <ChatRecord chats={[{
                role: 'assistant',
                text: err,
                date: Date.now(),
              }]} />
            }

            { assistantRole
              ? (<div className="px-4 flex items-center justify-center mt-8 mb-2">
                  <p className="text-sm text-gray-500 px-4 py-1 rounded-ful dark:invert">
                    当前正在跟 <span className="font-bold text-black">{assistantRole.title}</span> 聊天
                  </p>
              </div>)
              : null
            }
          </div>

        </div>
      </div>


      {/* Footer */}
      <div className="fixed min-w-full bottom-0 py-4 bg-white z-50">
        <div className="flex flex-col mx-auto max-w-2xl justify-center items-center">
          <div className="pb-2">
            <FunctionalZone />
          </div>

          <div className="w-full flex px-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendChat();
                }
              }}
              id="chat-input-textbox"
              placeholder="输入聊天内容..."
              className="block py-1.5 px-3 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6 min-h-[36px] max-h-[500px] resize-none dark:bg-zinc-600 dark:text-white dark:ring-gray-500 dark:focus:ring-blue-500"
              style={{ height: '36px' }}
              ></textarea>

            <button
              type="button"
              className="inline-flex ml-2 items-center px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-default transition-colors whitespace-nowrap space-x-1"
              onClick={sendChat}
              disabled={!!waitingText}
            > → 发送</button>
          </div>

          <p className="mt-2 text-gray-400 text-xs text-center px-4">
            <span className="inline-block mr-2 text-gray-500">easierChat.com - 一个更方便、易用的 chatBot 客户端</span>
            <Link href='/'>FAQs</Link> | <Link href="https://twitter.com/xiaokedada">@那吒</Link> | <Link href="mailto: maoxiaoke@outlook.com">提交反馈</Link> | <Link href="https://nazha-image-store.oss-cn-shanghai.aliyuncs.com/others/easierChat.dmg">macOS 客户端</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Chat;