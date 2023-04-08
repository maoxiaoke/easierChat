import { useState, useEffect, useRef } from 'react';
import ChatRecord from '../ChatRecord';
import Intro from '../Intro';
import { fetcher } from '../../helpers/fetcher';
import { formatClaudePrompt } from '../../helpers/cluade.helpers';
import dynamic from 'next/dynamic';
import { builtinPrompts } from '../../data/prompts';
import { useAssistantRole } from '../../contexts/assistant';

import { useLocalStorage } from 'react-use';

const FunctionalZone = dynamic(() => import('../FunctionalZone'), { ssr: false });

const Chat = () => {
  const { value } = useAssistantRole();
  const chatWrapperRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>('');
  const [waiting, setWaiting] = useState<boolean>(false);
  const assistantRole = builtinPrompts.find((p) => p.id === value) ?? builtinPrompts[0];

  const [chats, setChats] = useLocalStorage<ChatMessage[]>('ec-records');

  useEffect(() => {
    if (chats?.length && chatWrapperRef.current) {
      console.log('aaaa', chatWrapperRef.current.scrollTop, chatWrapperRef.current.scrollHeight)
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }
  }, [chats]);

  const sendChat = async () => {
    if (!text.trim() || waiting) {
      return;
    }

    const _chats: ChatMessage[] = [
      ...(chats ?? []),
      {
        role: 'user',
        text,
        date: Date.now(),
        conversationId: assistantRole?.id,
      }
    ];

    setChats(_chats);

    const claudePrompt = formatClaudePrompt(_chats, assistantRole)

    setText('');
    setWaiting(true);

    const gptResponse = await fetcher('/api/sendChat', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        text: claudePrompt,
        id: '1',
      })
    });

    setWaiting(false);
    setChats([ ..._chats, { ...gptResponse, conversationId: assistantRole?.id } ]);
  }

  return (
    <div>
      {/* Header */}
      <div
        className="top-0 fixed min-w-full bg-white shadow-lg flex justify-center items-center p-2 z-50"
      >
        <div className="text-center">
          <p className="font-bold">新聊天</p>
          <p className="text-gray-400 text-xs">开启一个新聊天</p>
        </div>
      </div>

      <div ref={chatWrapperRef} className="overflow-scroll max-h-screen">
        <div className="max-w-2xl mx-auto mt-9">
          <Intro />

          <div className="mb-32">
            { chats && <ChatRecord chats={chats} />}

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

          <div className="w-full flex">
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
              disabled={waiting}
            > → 发送</button>
          </div>

          <p className="mt-2 text-gray-400 text-xs text-center">easierChat.com - 一个更方便、易用的 chatGPT 客户端</p>
        </div>
      </div>
    </div>
  )
}

export default Chat;