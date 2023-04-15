import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Avatar from '@radix-ui/react-avatar';
import cls from 'classnames';

import { useModelSetting } from '../../contexts/modelSetting';

const models = [
  { name: 'claude-instant-v1', desc: '低延迟，减少等待时间' },
  { name: 'claude-v1.2', desc: 'v1 的升级版本，中文支持更好，但延迟比较高' },
  { name: 'claude-v1.3', desc: '内测版本，但可低调使用' },
]

const CluadeSetting = ({ open, setOpen }: { open: boolean; setOpen: (o : boolean) => void }) => {
  const { value, setValue } = useModelSetting();

  const modelName = value?.model ?? 'claude-instant-v1';

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Content className="DialogContent w-full sm:max-w-[90vw] sm:w-fit">
          <Dialog.Title className="DialogTitle">Claude 配置</Dialog.Title>
          <Dialog.Description className="DialogDescription text-xs">模型</Dialog.Description>

          <ul className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {
              models.map((m, index) => (
                <li
                  key={index}
                  onClick={() => setValue(val => ({ ...val as any, model: m.name }))}
                  className={cls('cursor-pointer relative rounded-lg border bg-white dark:bg-zinc-800 p-4 shadow-sm focus:outline-none w-full text-sm', m.name === modelName ? 'border-blue-600': 'border-gray-300')}  >
                  <div className="flex items-center">
                    <Avatar.Root className="AvatarRoot flex-shrink-0 w-5 h-5">
                      <Avatar.Image
                        className="AvatarImage"
                        src='/claude_icon.webp'
                        alt="portrait"
                      />
                    </Avatar.Root>
                    <span className="inline-block ml-2">{m.name}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">{ m.desc }</div>
                </li>
              ))
            }
          </ul>

          <Dialog.Description className="DialogDescription text-xs">
            温度: <span className="text-black">{value?.temperature ?? '0.7'}</span>
          </Dialog.Description>


          {/* <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div> */}
          <Dialog.Close onClick={() => setOpen(false)}>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
)};

export default CluadeSetting;
