export default function Home() {
  let date = new Date()
  const boardText = 'text-white lg:text-xl'
  return (
    <div className="flex flex-col h-full  w-full p-4 lg:p-8 bg-green-900 rounded-lg shadow-lg border-8 border-brown-100">
      <div className="w-full flex justify-between items-center">
        <div className={`${boardText} relative`}>
          떠드는 사람
          <div className="absolute w-fit translate-y-2 translate-x-2 rotate-10">
            짱구 II
          </div>
          <div className="absolute w-fit translate-y-8 translate-x-4 rotate-4">
            맹구 IIIII
          </div>
        </div>
        <div className={boardText}>{date.toLocaleDateString()}</div>
      </div>
      <div className="w-full h-full flex-1 flex gap-4 py-8 sm:p-8 sm:gap-8 justify-center items-center content-center flex-wrap overflow-y-auto">
        <span className="text-4xl text-white">찾으시는 페이지가 없어요</span>
      </div>
      <div className={`w-fit rotate-20 ${boardText}`}>바부 똥구</div>
    </div>
  )
}
