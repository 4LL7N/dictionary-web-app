import { Context } from "./Context";

function FontMenu() {
    const context = Context()
  return (
    <>
      <div className={` flex flex-col justify-between w-[183px] h-[152px] rounded-[16px] p-[24px] ${context?.theme?"bg-[#FFF] shadow-[0_5px_30px_0px_#00000019] ":"bg-[#1F1F1F] shadow-[0_5px_30px_0_#A445ED] "} ${context?.fontMenu?"":"hidden"} absolute top-[65px] md:top-[100px] left-[70px] md:left-[870px]  `}>
        <option style={context?.font == "Sans Serif"?{fontFamily:"inter"}:context?.font == "Serif"?{fontFamily:"lora"}:{fontFamily:"inconsolata"}} className={` text-[14px] ${context?.theme?"text-[#2D2D2D]":"text-[#FFF]"} font-bold `} onClick={() => {context?.setFont("Sans serif"),context?.setFontMenu(false)}} >
          Sans serif
        </option>
        <option style={context?.font == "Sans Serif"?{fontFamily:"inter"}:context?.font == "Serif"?{fontFamily:"lora"}:{fontFamily:"inconsolata"}} className={` text-[14px] ${context?.theme?"text-[#2D2D2D]":"text-[#FFF]"} font-bold `} onClick={() => {context?.setFont("Serif"),context?.setFontMenu(false)}} >
          Serif
        </option>
        <option style={context?.font == "Sans Serif"?{fontFamily:"inter"}:context?.font == "Serif"?{fontFamily:"lora"}:{fontFamily:"inconsolata"}} className={` text-[14px] ${context?.theme?"text-[#2D2D2D]":"text-[#FFF]"} font-bold `} onClick={() => {context?.setFont("Mono"),context?.setFontMenu(false)}} >
          Mono
        </option>
      </div>
    </>
  );
}

export default FontMenu