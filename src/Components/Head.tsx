import { Context } from "./Context"

function Head(){
    const context = Context()
    return(
        <>
        <header className="w-[100%] flex justify-between mb-[24px]" >
            <img src="/assets/images/logo.svg" alt="logo" />
            <div className=" flex justify-between items-center gap-[16px] bg-[E9E9E9] " >
              <div className=" flex gap-[16px] " >
              {/* <select onClick={() => context?.setFontMenu(!context?.fontMenu)} ref={select} className="w-[100%]  appearance-none border-none outline-none text-[14px] text-[#2D2D2D] bg-[url(/assets/images/icon-arrow-down.svg)] bg-no-repeat bg-right bg-center bg-[length:12px_6px] " id="font" name="font" >
                <option className="text-[14px] text-[#2D2D2D] " value="Sans serif">Sans serif</option>
                <option className="text-[14px] text-[#2D2D2D] " value="Serif">Serif</option>
                <option className="text-[14px] text-[#2D2D2D] " value="Mono">Mono</option>
              </select> */}
              <p className={` text-[14px] ${context?.theme?"text-[#2D2D2D]":"text-[#FFF]"} font-bold `} >{context?.font}</p>
              <img src="/assets/images/icon-arrow-down.svg" alt="arrow" />
              </div>
              <div className= {` w-[1px] h-[100%] bg-[#E9E9E9] `} />
              <div className="flex justify-between items-center gap-[16px]  " >
                <div className={` flex relative  w-[40px] h-[20px] rounded-[10px] ${context?.theme? " duration-500 ease-in-out bg-[#757575]":" duration-500 ease-in-out bg-[#A445ED]"} `} onClick={() => {context?.setTheme(!context.theme)}} >
                  <div className={` w-[14px] h-[14px] bg-white rounded-[50%] absolute top-[2.9px] ${context?.theme?" duration-500 ease-in-out left-[3px]": " duration-500 ease-in-out left-[23px]" } `} />
                </div>
                <img src={context?.theme?"/assets/images/icon-moon.svg":"/assets/images/icon-night-moon.svg"} alt="moon icon" />
              </div>
            </div>
          </header>
        </>
    )
}

export default Head