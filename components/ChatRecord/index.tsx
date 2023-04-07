import * as Avatar from '@radix-ui/react-avatar';
import cls from 'classnames';

export interface ChatRecordProps {
  chats: ChatMessage[];
}

const AvatarComponent = ({ chat }: { chat: ChatMessage }) => (
  <Avatar.Root className="AvatarRoot min-w-fit">
    <Avatar.Image
      className="AvatarImage"
      src={chat.role === 'user' ? "/profile.png" : '/chatGPT.png'}
      alt="portrait"
    />
    <Avatar.Fallback className="AvatarFallback" delayMs={600}>
      {chat.role === 'user' ? 'Me' : 'ChatGPT'}
    </Avatar.Fallback>
  </Avatar.Root>
);

const ChatRecord = ({ chats = [] } : ChatRecordProps) => {
  return (
    <div>
      { chats.map((chat) => (
        <div
          key={chat.date}
          className="flex items-center px-2 relative response-block scroll-mt-32 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-900 pb-2 pt-2 pr-2 group min-h-[52px]"
        >
          <AvatarComponent chat={chat} />
          <div className={cls("ml-3 text-sm whitespace-pre-line focus:outline", chat.role === 'user' && 'bg-blue-500 text-white px-4 py-2 rounded-lg')}>
            { chat.text }
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatRecord;