import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Avatar from '@radix-ui/react-avatar';
import cls from 'classnames';

import { useModelSetting } from '../../contexts/modelSetting';

const models = [
  { name: 'claude-instant-v1', desc: '低延迟，减少等待时间' },
  { name: 'claude-v1.2', desc: 'v1 的升级版本，中文支持更好，但延迟比较高' },
  { name: 'claude-v1.3', desc: '内测版本，但可低调使用' },
];

import * as Slider from '@radix-ui/react-slider';

import type { SliderProps } from '@radix-ui/react-slider';

const CustomSlider = (props: SliderProps) => (
  <form>
    <Slider.Root className="SliderRoot" { ...props }>
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange bg-blue-600" />
      </Slider.Track>
      <Slider.Thumb className="bg-blue-600 SliderThumb hover:bg-blue-600" />
    </Slider.Root>
  </form>
);

const CluadeSetting = ({ open, setOpen }: { open: boolean; setOpen: (o : boolean) => void }) => {
  const { value, setValue } = useModelSetting();

  console.log('value', value)

  const modelName = value?.model ?? 'claude-instant-v1';
  const temperature = value?.temperature ?? 0.7;
  const maxTokens = value?.maxTokens ?? 400;

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Content className="DialogContent w-full sm:max-w-[90vw] sm:w-fit min-h-[60vh] overflow-y-auto">
          <Dialog.Title className="DialogTitle">Claude 配置</Dialog.Title>
          <Dialog.Description className="DialogDescription text-xs">模型</Dialog.Description>

          <ul className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {
              models.map((m, index) => (
                <li
                  key={index}
                  onClick={() => setValue({ ...value as any, model: m.name })}
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
            温度: <span className="text-black dark:text-slate-300">{value?.temperature ?? '0.7'}</span>
          </Dialog.Description>

          <CustomSlider
            key="temperature"
            onValueChange={val => {
              const _value = val[0] / 100;

              setValue({
                ...value as any,
                temperature: _value
              });
            }}
            value={[temperature * 100]}
            max={100}
            step={1}
          />

          <Dialog.Description className="DialogDescription text-xs">
            生成长度: <span className="text-black dark:text-slate-300">{maxTokens}</span>
          </Dialog.Description>

          <CustomSlider
            key="maxTokens"
            onValueChange={val => {
              const _value = val[0];

              setValue({ ...value as any, maxTokens: _value });
            }}
            value={[maxTokens]}
            max={2000}
            min={200}
            step={10}
          />

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
