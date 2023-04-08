import Image from 'next/image';
import Link from 'next/link';
import Lottie from '../Lottie';
import KeySetting from '../KeySetting';
import tick from '../../lottie/tick.json';
import info from '../../lottie/info.json'
import { useOpenaiKey } from '../../contexts/openaiKey';

const Intro = () => {
  const { value: openaiKey } = useOpenaiKey();

  const descs = [
    '提供国内用户网路直连',
    '账号免登',
    '自定义 Prompt 存储',
    '海量社区 Prompt',
    '几乎免费',
    '更多功能开发中...'
  ]
  return (
    <>
      <div className="p6 sm:p-10 flex items-center justify-center flex-col">
        <div className="flex">
          <Image src="/favicon.ico" alt="logo" width={48} height={48} className="rounded-lg w-12 h-12" />
          <div className="ml-3 font-semibold text-4xl sm:text-5xl text-black dark:text-white ">
            Easier
          <span className="text-blue-500">Chat</span>
        </div>
        </div>

        <div className="text-center font-light text-base sm:text-xl my-4 sm:my-6 text-black dark:text-white">
        一个更方便、易用的 chatGPT 客户端
        </div>

        <div className="my-4 grid sm:grid-cols-2 gap-y-2 gap-x-6">
          {
            descs.map((desc, idx) => (
              <Lottie data={tick} key={idx} iconStyle={{ height: '20px', width: '20px' }} className="flex items-center">
                <div className="ml-1">{desc}</div>
              </Lottie>
            ))
          }
        </div>
      </div>

      {/* {
          !openaiKey ? (
            <div className="flex items-center justify-center mb-10 flex-col">
              <div className="text-gray-600">开始之前，easierChat 需要知道你的 OpenAI 秘钥</div>
              <div className="mt-1 text-xs text-gray-400">秘钥存在你本地浏览器中，不必担心被泄露出去</div>
              <KeySetting>
                  <button className="mt-4 inline-flex items-center justify-center rounded-full px-4 py-3 shadow-md bg-blue-600 text-white hover:bg-blue-500 transition-all active:bg-blue-600 group font-semibold text-sm disabled:bg-gray-400 space-x-2">
                    <Lottie data={info} iconStyle={{ height: '20px' }} className="flex">
                      <span className="ml-2">输入你 OpenAI 秘钥</span>
                    </Lottie>
                  </button>
              </KeySetting>

              <Link href="" className="mt-2 inline-block text-blue-500 text-xs hover:underline">→ 前往 OpenAI 网站获取你的 API 秘钥</Link>
            </div>

          ) : null
        } */}
    </>
  )
}

export default Intro;
