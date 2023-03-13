const Chat = () => {
  return (
    <>
      {/* Header */}
      <div className="top-0 sticky bg-white shadow-lg flex justify-center items-center p-2">
        <div className="text-center">
          <p className="font-bold">新聊天</p>
          <p className="text-gray-400 text-xs">开启一个新聊天</p>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bg-white bottom-0 w-full flex flex-col justify-center items-center">
        <div className="max-w-2xl w-full flex">
          <textarea
            id="chat-input-textbox"
            placeholder="输入聊天内容..."
            className="block p-1.5 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:py-1.5 sm:text-sm sm:leading-6 min-h-[36px] max-h-[500px] resize-none dark:bg-zinc-600 dark:text-white dark:ring-gray-500 dark:focus:ring-blue-500"
            style={{ height: '36px' }}
            ></textarea>

          <button
            type="button"
            className="inline-flex ml-2 items-center px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-default transition-colors whitespace-nowrap space-x-1"
          > → 发送</button>
        </div>

        <p className="mt-2 text-gray-400 text-xs text-center">easyChat.com - 一个更方便、易用的 chatGPT 客户端</p>
      </div>
    </>
  )
}

export default Chat;