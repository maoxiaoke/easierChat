import { memo } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { useThrottle } from 'ahooks';
import cls from 'classnames';

export interface ChatRecordProps {
  chats: ChatMessage[];
}

export const AvatarComponent = ({ role }: { role: ChatMessage['role'] }) => (
  <Avatar.Root className="AvatarRoot flex-shrink-0">
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

const ChatRecords = ({ chats = [] } : ChatRecordProps) => {
  return (
    <div>
      { chats.map((chat) => (
        <ChatRecord key={chat.id ?? chat.date} chat={chat} />
      ))}
    </div>
  )
}

const ChatRecord = ({ chat }: { chat: ChatMessage }) => {
  const text  = useThrottle(chat.text, { wait: 500 })
  return (
    <div
      className="flex items-start px-2 relative response-block scroll-mt-32 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900 pb-2 pt-2 pr-2 group min-h-[52px]"
    >
      <AvatarMemo role={chat.role} />
      <div className={cls("ml-3 text-sm whitespace-pre-line focus:outline", chat.role === 'user' && 'bg-blue-500 text-white px-4 py-2 rounded-lg')}>
        { text }
      </div>
    </div>
  )

}


export default ChatRecords;