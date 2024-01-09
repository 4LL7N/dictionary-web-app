import { useRef } from "react"
import { Context } from "./Context"

function Head(){
    const select =  useRef<any>(null)
    const context = Context()
    return(
        <>
        <header className="w-[100%] flex justify-between mb-[24px]" >
            <img src="/assets/images/logo.svg" alt="logo" />
            <div className=" flex justify-between items-center gap-[16px] bg-[E9E9E9] " >
              <div className="w-[98px]" >
              <select onClick={() => context?.setFontMenu(!context?.fontMenu)} ref={select} className="w-[100%]  appearance-none border-none outline-none text-[14px] text-[#2D2D2D] bg-[url(/assets/images/icon-arrow-down.svg)] bg-no-repeat bg-right bg-center bg-[length:12px_6px] " id="font" name="font" >
                <option className="text-[14px] text-[#2D2D2D] " value="Sans serif">Sans serif</option>
                <option className="text-[14px] text-[#2D2D2D] " value="Serif">Serif</option>
                <option className="text-[14px] text-[#2D2D2D] " value="Mono">Mono</option>
              </select>
              </div>
              <div className= {` w-[1px] h-[100%] bg-[E9E9E9] `} />
              <div className="flex justify-between items-center gap-[16px]  " >
                <input className="w-[40px]" type="range" defaultValue={0} min={0} max={1} />
                <img src="/assets/images/icon-moon.svg" alt="moon icon" />
              </div>
            </div>
          </header>
        </>
    )
}

export default Head