import { useRef, useState } from "react";
import { Context } from "./Context";

interface Phonetic {
  audio: string;
  text: string;
  sourceUrl: string;
  license: {
    name: string;
    url: string;
  };
}

interface Definition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

interface WordData {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: {
    name: string;
    url: string;
  };
  sourceUrls: string[];
}

interface ErrorMessage {
  message: string;
  resolution: string;
  title: string;
}

function Page() {
  const context = Context();
  const [word, setWord] = useState<string>("");
  const [data, setData] = useState<WordData | undefined>();
  const [notFound, setNotFound] = useState<ErrorMessage | undefined>();
  const foundPage = useRef<boolean>(false);
  const phonetic = useRef<number>(0);
  const audio = useRef<any>();
  const API = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const dataInfo = await response.json();
      console.log(dataInfo);
      if (response.ok) {
        setData(dataInfo[0]);
      } else {
        setNotFound(dataInfo);
        setData(undefined);
        foundPage.current = true;
      }
    } catch {
      console.log("error");
    }
  };
  function Search() {
    API();
  }

  console.log(data);

  if (data?.phonetics.length) {
    for (let i = 0; i < data?.phonetics.length; i++) {
      if (data?.phonetics[i].text && data?.phonetics[i].audio) {
        phonetic.current = i;
        break;
      }
    }
  }

  return (
    <>
      <div className="w-[100%]">
        <div
          className={` w-[100%] h-[48px] md:h-[64px] px-[24px] items-center  flex justify-between text-[18px] rounded-[16px] ${
            context?.theme ? "bg-[#F4F4F4]" : "bg-[#1F1F1F]"
          } mb-[24px] md:mb-[43px] `}
        >
          <input
            style={
              context?.font == "Sans Serif"
                ? { fontFamily: "inter" }
                : context?.font == "Serif"
                ? { fontFamily: "lora" }
                : { fontFamily: "inconsolata" }
            }
            onChange={(e) => setWord(e.target.value)}
            type="text"
            placeholder="keyboard"
            className={` w-[100%] bg-transparent outline-none text-[16px] md:text-[18px] lg:text-[20px] ${
              context?.theme ? "text-[#2D2D2D]" : "text-[#FFF]"
            } font-bold `}
          />
          <img
            onClick={() => Search()}
            src="/assets/images/icon-search.svg"
            alt="search"
          />
        </div>
        {data ? (
          <>
            <section>
              <div className=" w-[100%] flex justify-between items-center ">
                <div className="h-[100%] flex flex-col justify-between ">
                  <h1
                    style={
                      context?.font == "Sans Serif"
                        ? { fontFamily: "inter" }
                        : context?.font == "Serif"
                        ? { fontFamily: "lora" }
                        : { fontFamily: "inconsolata" }
                    }
                    className={`text-[32px] md:text-[64px] ${
                      context?.theme ? "text-[#2D2D2D]" : "text-[#FFF]"
                    } font-bold `}
                  >
                    {data?.word}
                  </h1>
                  <h2
                    style={
                      context?.font == "Sans Serif"
                        ? { fontFamily: "inter" }
                        : context?.font == "Serif"
                        ? { fontFamily: "lora" }
                        : { fontFamily: "inconsolata" }
                    }
                    className="text-[18px] md:text-[24px] text-[#A445ED] "
                  >
                    {data?.phonetics[phonetic.current]?.text}
                  </h2>
                </div>
                <img
                  className=" w-[48px] h-[48px] md:w-[75px] md:h-[75px] "
                  onClick={() => audio.current.play()}
                  src="/assets/images/icon-play.svg"
                  alt="audio"
                />
                <audio
                  ref={audio}
                  src={data?.phonetics[phonetic.current]?.audio}
                />
              </div>
              <div>
                {data?.meanings.map((items: Meaning) => {
                  console.log();
                  return (
                    <>
                      <div className="mt-[32px]">
                        <div className="w-[100%] flex items-center">
                          <p
                            style={
                              context?.font == "Sans Serif"
                                ? { fontFamily: "inter" }
                                : context?.font == "Serif"
                                ? { fontFamily: "lora" }
                                : { fontFamily: "inconsolata" }
                            }
                            className={`text-[18px] md:text-[24px]  ${
                              context?.theme ? "text-[#2D2D2D]" : "text-[#FFF]"
                            }  font-bold mr-[16px]`}
                          >
                            {items.partOfSpeech}
                          </p>
                          <hr
                            className={` w-[100%] border border-solid ${
                              context?.theme
                                ? "border-[#E9E9E9]"
                                : "border-[#3A3A3A]"
                            } `}
                          />
                        </div>
                        <p
                          style={
                            context?.font == "Sans Serif"
                              ? { fontFamily: "inter" }
                              : context?.font == "Serif"
                              ? { fontFamily: "lora" }
                              : { fontFamily: "inconsolata" }
                          }
                          className="text-[16px] text-[20px] text-[#757575] mt-[32px] "
                        >
                          Meaning
                        </p>
                        <ul className="mt-[17px] px-[24px] list-disc text-[#8F19E8] md:ml-[22px] ">
                          {items.definitions.map((items2: Definition) => {
                            return (
                              <>
                                <li className="mt-[13px]">
                                  <p
                                    style={
                                      context?.font == "Sans Serif"
                                        ? { fontFamily: "inter" }
                                        : context?.font == "Serif"
                                        ? { fontFamily: "lora" }
                                        : { fontFamily: "inconsolata" }
                                    }
                                    className={`text-[15px] md:text-[18px] ${
                                      context?.theme
                                        ? "text-[#2D2D2D]"
                                        : "text-[#FFF]"
                                    } `}
                                  >
                                    {items2.definition}
                                  </p>
                                </li>
                                {items2.example ? (
                                  <p
                                    style={
                                      context?.font == "Sans Serif"
                                        ? { fontFamily: "inter" }
                                        : context?.font == "Serif"
                                        ? { fontFamily: "lora" }
                                        : { fontFamily: "inconsolata" }
                                    }
                                    className="text-[15px] md:text-[18px] mt-[13px] text-[#757575] "
                                  >
                                    "{items2.example}"
                                  </p>
                                ) : null}
                              </>
                            );
                          })}
                        </ul>
                        {items.synonyms.length > 0 ? (
                          <div className="flex mt-[24px] gap-[20px] ">
                            <h3
                              style={
                                context?.font == "Sans Serif"
                                  ? { fontFamily: "inter" }
                                  : context?.font == "Serif"
                                  ? { fontFamily: "lora" }
                                  : { fontFamily: "inconsolata" }
                              }
                              className="text-[16px] md:text-[20px] text-[#757575] "
                            >
                              Synonyms :
                            </h3>
                            <div className="flex flex-col">
                              {items.synonyms.map(
                                (items3: string, index: number) => {
                                  return (
                                    <>
                                      <p
                                        style={
                                          context?.font == "Sans Serif"
                                            ? { fontFamily: "inter" }
                                            : context?.font == "Serif"
                                            ? { fontFamily: "lora" }
                                            : { fontFamily: "inconsolata" }
                                        }
                                        className={`text-[16px] md:text-[20px] text-[#A445ED] font-bold ${
                                          index == items.synonyms.length
                                            ? ""
                                            : "mb-[16px]"
                                        } `}
                                      >
                                        {items3}
                                      </p>
                                    </>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        ) : null}
                        {items.antonyms.length > 0 ? (
                          <div className="flex mt-[24px] gap-[20px]  ">
                            <h3
                              style={
                                context?.font == "Sans Serif"
                                  ? { fontFamily: "inter" }
                                  : context?.font == "Serif"
                                  ? { fontFamily: "lora" }
                                  : { fontFamily: "inconsolata" }
                              }
                              className="text-[16px] md:text-[20px] text-[#757575] "
                            >
                              Antonyms :
                            </h3>
                            <div className="flex flex-col">
                              {items.antonyms.map(
                                (items4: string, index: number) => {
                                  return (
                                    <>
                                      <p
                                        style={
                                          context?.font == "Sans Serif"
                                            ? { fontFamily: "inter" }
                                            : context?.font == "Serif"
                                            ? { fontFamily: "lora" }
                                            : { fontFamily: "inconsolata" }
                                        }
                                        className={`text-[16px] md:text-[20px] text-[#A445ED] font-bold ${
                                          index == items.antonyms.length
                                            ? ""
                                            : "mb-[16px]"
                                        } `}
                                      >
                                        {items4}
                                      </p>
                                    </>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </>
                  );
                })}
              </div>

              <hr
                className={` w-[100%] border border-solid ${
                  context?.theme ? "border-[#E9E9E9]" : "border-[#3A3A3A]"
                } mb-[24px] mt-[32px] `}
              />
              <div className="md:flex md:gap-[20px]">
                <p
                  style={
                    context?.font == "Sans Serif"
                      ? { fontFamily: "inter" }
                      : context?.font == "Serif"
                      ? { fontFamily: "lora" }
                      : { fontFamily: "inconsolata" }
                  }
                  className="text-[14px]  text-[#757575] underline underline-offset-4 "
                >
                  Source
                </p>
                <div className="flex flex-col mt-[8px] md:mt-0 ">
                  {data?.sourceUrls.map((items: string) => {
                    return (
                      <>
                        <a className={`flex mt-[5px] `} href={items}>
                          <p
                            style={
                              context?.font == "Sans Serif"
                                ? { fontFamily: "inter" }
                                : context?.font == "Serif"
                                ? { fontFamily: "lora" }
                                : { fontFamily: "inconsolata" }
                            }
                            className={`text-[14px] ${
                              context?.theme ? "text-[#2D2D2D]" : "text-[#FFF]"
                            } mr-[9px] underline underline-offset-2 `}
                          >
                            {items}
                          </p>
                          <img
                            src="/assets/images/icon-new-window.svg"
                            alt="link"
                          />
                        </a>
                      </>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        ) : foundPage.current ? (
          <section className="flex flex-col items-center w-[100%] h-[100vh]  ">
            <h1
              style={
                context?.font == "Sans Serif"
                  ? { fontFamily: "inter" }
                  : context?.font == "Serif"
                  ? { fontFamily: "lora" }
                  : { fontFamily: "inconsolata" }
              }
              className="text-[64px] mt-[70px] "
            >
              😕
            </h1>
            <h2
              style={
                context?.font == "Sans Serif"
                  ? { fontFamily: "inter" }
                  : context?.font == "Serif"
                  ? { fontFamily: "lora" }
                  : { fontFamily: "inconsolata" }
              }
              className={` text-[20px] ${
                context?.theme ? "text-[#2D2D2D]" : "text-[#FFF]"
              } font-bold mt-[44px] `}
            >
              {notFound?.title}
            </h2>
            <h3
              style={
                context?.font == "Sans Serif"
                  ? { fontFamily: "inter" }
                  : context?.font == "Serif"
                  ? { fontFamily: "lora" }
                  : { fontFamily: "inconsolata" }
              }
              className="text-[18px] text-[#757575] text-center mt-[24px] "
            >
              {notFound?.message}.{notFound?.resolution}
            </h3>
          </section>
        ) : null}
      </div>
    </>
  );
}

export default Page;
