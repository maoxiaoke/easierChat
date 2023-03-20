import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import Lottie from '../Lottie';

const KeySetting = () => {
  const [key, setKey] = useState('');
  const [value, setValue, remove] = useLocalStorage<string>('ec-openai-key');

  console.log('value', value, key)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="bg-gray-600 text-white group flex items-center justify-between rounded-md px-2 py-1 text-xs font-medium w-full hover:bg-gray-500 transition-all">
          <Lottie />
          {value ? `「***${value.slice(-4)}」` : '未设置'}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">输入你的 OpenAI API 秘钥</Dialog.Title>
          <Link href="" className="mt-2 inline-block text-blue-500 text-xs hover:underline">→ Get your API key from OpenAI dashboard.</Link>
          <Dialog.Description className="DialogDescription">
            秘钥会本地存储，不用担心泄露
          </Dialog.Description>
          {
            value
              ? (
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700 text-right flex items-center justify-between">
                  <span>{'*'.repeat(value?.length - 4) + value?.slice(-4)}</span>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => {
                      remove();
                      setKey('');
                    }}
                  >换一个</button></div>
              )
              : (
                <fieldset className="Fieldset">
                  <input
                    value={key}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700"
                    id="key"
                    onChange={e => {
                      setKey(e.target.value)
                    }}
                    placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                </fieldset>
              )
          }


          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button
                onClick={() => {
                  if (!key.startsWith('sk')) {
                    console.error('似乎不是一个正确的 OPAI Key')
                  }
                  setValue(key)
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-1 disabled:bg-gray-400">
                保存
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default KeySetting;
