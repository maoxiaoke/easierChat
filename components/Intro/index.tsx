import Image from 'next/image';

const Intro = () => {
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
          <div>提供国内用户网路直连</div>
          <div>几乎免费</div>
          <div>Faster response</div>
          <div>Faster response</div>
          <div>Faster response</div>
          <div>Faster response</div>
          <div>Faster response</div>
          <div>Faster response</div>
        </div>
      </div>
    </>
  )
}

export default Intro;
