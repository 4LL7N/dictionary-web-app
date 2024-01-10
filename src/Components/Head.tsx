import { Context } from "./Context";

function Head() {
  const context = Context();
  return (
    <>
      <header className="w-[100%] flex justify-between mb-[24px] md:mb-[51px] ">
        <img src="/assets/images/logo.svg" alt="logo" />
        <div className=" flex justify-between items-center gap-[16px] md:gap-[26px] bg-[E9E9E9] ">
          <div
            className=" flex gap-[16px] md:gap-[18px] "
            onClick={() => context?.setFontMenu(!context.fontMenu)}
          >
            <p
              style={
                context?.font == "Sans Serif"
                  ? { fontFamily: "inter" }
                  : context?.font == "Serif"
                  ? { fontFamily: "lora" }
                  : { fontFamily: "inconsolata" }
              }
              className={` text-[14px] md:text-[18px] ${
                context?.theme ? "text-[#2D2D2D]" : "text-[#FFF]"
              } font-bold `}
            >
              {context?.font}
            </p>
            <img src="/assets/images/icon-arrow-down.svg" alt="arrow" />
          </div>
          <div className={` w-[1px] h-[100%] bg-[#E9E9E9] `} />
          <div className="flex justify-between items-center gap-[16px] md:gap-[20px] ">
            <div
              className={` flex relative  w-[40px] h-[20px] rounded-[10px] ${
                context?.theme
                  ? " duration-500 ease-in-out bg-[#757575]"
                  : " duration-500 ease-in-out bg-[#A445ED]"
              } `}
              onClick={() => {
                context?.setTheme(!context.theme);
              }}
            >
              <div
                className={` w-[14px] h-[14px] bg-white rounded-[50%] absolute top-[2.9px] ${
                  context?.theme
                    ? " duration-500 ease-in-out left-[3px]"
                    : " duration-500 ease-in-out left-[23px]"
                } `}
              />
            </div>
            <img
              src={
                context?.theme
                  ? "/assets/images/icon-moon.svg"
                  : "/assets/images/icon-night-moon.svg"
              }
              alt="moon icon"
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Head;
