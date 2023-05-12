import { memo } from 'react';
import * as Avatar from '@radix-ui/react-avatar';

import cls from 'classnames';
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

export interface ChatRecordProps {
  chats: ChatMessage[];
}

export const AvatarComponent = ({ role }: { role: ChatMessage['role'] }) => (
  <Avatar.Root className="AvatarRoot flex-shrink-0 w-11 h-11">
    <Avatar.Image
      className="AvatarImage"
      src={role === 'user' ? "/profile.png" : '/chat_gpt.png'}
      alt="portrait"
    />
    <Avatar.Fallback className="AvatarFallback" delayMs={600}>
      {role === 'user' ? 'Me' : 'ChatGPT'}
    </Avatar.Fallback>
  </Avatar.Root>
);

const AvatarMemo = memo(AvatarComponent);

const ChatRecords = ({ chats = [] }: ChatRecordProps) => {
  return (
    <div>
      {chats.map((chat) => (
        <ChatRecord key={chat.id ?? chat.date} chat={chat} />
      ))}
    </div>
  )
}

export const ChatRecord = ({ chat }: { chat: ChatMessage }) => {
  // const text  = useThrottle(chat.text, { wait: 500 })
  return (
    <div
      className={cls(
        "flex cursor-pointer items-start hover:bg-[#fcfcfc] dark:hover:bg-zinc-900 px-2 relative response-block scroll-mt-32 rounded-md pb-2 pt-2 pr-2 group min-h-[52px]",
        chat.role === 'user' && 'hover:bg-gray-100'
      )}
    >
      <AvatarMemo role={chat.role} />
      <div className={cls("markdown-body ml-3 text-sm focus:outline", chat.role === 'user' && 'bg-blue-500 text-white px-4 py-2 rounded-lg')}>
        <ReactMarkdown rehypePlugins={[[rehypeHighlight, { detect: true }]]}>
          {chat.text}
        </ReactMarkdown>
      </div>
    </div>
  )

}


export default ChatRecords;