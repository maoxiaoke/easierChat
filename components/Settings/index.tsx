import dynamic from 'next/dynamic';

const KeySetting = dynamic(
  () => import('../KeySetting'),
  { ssr: false }
)

const Settings = () => {
  return (
    <div className="bg-gray-700 p-3">
      <div className="mb-2 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-2">
          <div className="jsx-7078ffb922cb3c38 text-xs text-white font-semibold flex items-center justify-end">
            软件秘钥
          </div>
          <button className="bg-gray-600 text-white group flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium w-full hover:bg-gray-500 transition-all">
            ⚠️ 未经许可
          </button>
          <div className="text-xs text-white font-semibold flex items-center justify-end">OPENAI API 秘钥</div>
          <KeySetting />
        </div>
      </div>

      <div className="border-t border-gray-500 py-1"></div>
      <div className="text-xs text-gray-400 font-semibold text-center">
        <a href="">easierChat.com </a>
        © 2023
      </div>

      <div className="mt-1 text-xs text-gray-400 text-center">
        <a>FAQs</a> | <a>@xiaokedada</a>
      </div>

      <div className="mt-1 text-align flex justify-center">
        <button className="bg-gray-600 text-white group flex items-center justify-center rounded-md px-2 py-1 text-xs hover:bg-gray-500 transition-all space-x-2">
          提交反馈
        </button>
      </div>

    </div>
  )
}

export default Settings;
