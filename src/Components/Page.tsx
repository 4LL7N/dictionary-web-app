import { useRef, useState } from "react";

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

function Page() {
  const [word, setWord] = useState<string>("");
  const [data, setData] = useState<WordData | undefined>();
  const phonetic = useRef<number>(0);
  const audio = useRef<any>();
  const API = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const dataInfo = await response.json();

      setData(dataInfo[0]);
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
        <div className=" w-[100%] h-[48px] px-[24px] items-center  flex justify-between text-[18px] rounded-[16px] bg-[#F4F4F4] mb-[24px] ">
          <input
            onChange={(e) => setWord(e.target.value)}
            type="text"
            placeholder="keyboard"
            className="bg-transparent outline-none text-[16px] text-[#2D2D2D] font-bold "
          />
          <img
            onClick={() => Search()}
            src="/assets/images/icon-search.svg"
            alt="search"
          />
        </div>
        {data?(<>
        <section>
          <div className=" w-[100%] flex justify-between items-center ">
            <div className="h-[100%] flex flex-col justify-between ">
              <h1 className="text-[32px] text-[#2D2D2D] font-bold ">
                {data?.word}
              </h1>
              <h2 className="text-[18px] text-[#A445ED] ">
                {data?.phonetics[phonetic.current].text}
              </h2>
            </div>
            <img
              className=" w-[48px] h-[48px] "
              onClick={() => audio.current.play()}
              src="/assets/images/icon-play.svg"
              alt="audio"
            />
            <audio ref={audio} src={data?.phonetics[phonetic.current].audio} />
          </div>
          <div>
            {data?.meanings.map((items: Meaning) => {
              console.log();
              return (
                <>
                  <div className="mt-[32px]">
                    <div className="w-[100%] flex items-center">
                      <p className="text-[18px] text-[#2D2D2D] font-bold mr-[16px]">
                        {items.partOfSpeech}
                      </p>
                      <hr className=" w-[100%] border border-solid border-[#E9E9E9] " />
                    </div>
                    <p className="text-[16px] text-[#757575] mt-[32px] ">
                      Meaning
                    </p>
                    <ul className="mt-[17px] px-[24px] list-disc text-[#8F19E8]  ">
                      {items.definitions.map((items2: Definition) => {
                        return (
                          <>
                            <li className="mt-[13px]">
                              <p className="text-[15px] text-[#2D2D2D] ">
                                {items2.definition}
                              </p>
                            </li>
                            {items2.example ? (
                              <p className="text-[15px] mt-[13px] text-[#757575] ">
                                "{items2.example}"
                              </p>
                            ) : null}
                          </>
                        );
                      })}
                    </ul>
                    {items.synonyms.length > 0 ? (
                      <div className="flex mt-[24px] gap-[20px] ">
                        <h3 className="text-[16px] text-[#757575] ">
                          Synonyms :
                        </h3>
                        <div className="flex flex-col">
                          {items.synonyms.map(
                            (items3: string, index: number) => {
                              return (
                                <>
                                  <p
                                    className={`text-[16px] text-[#A445ED] font-bold ${
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
                        <h3 className="text-[16px] text-[#757575] ">
                          Antonyms :
                        </h3>
                        <div className="flex flex-col">
                          {items.antonyms.map(
                            (items4: string, index: number) => {
                              return (
                                <>
                                  <p
                                    className={`text-[16px] text-[#A445ED] font-bold ${
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
          
          <hr className=" w-[100%] border border-solid border-[#E9E9E9] mt-[32px] mb-[24px] " />
          <div>
            <p className="text-[14px] text-[#757575] underline underline-offset-4 ">
              Source
            </p>
            <div className="flex mt-[8px] mb-[85px] ">
              <a className="flex" href={data?.sourceUrls[0]}>
                <p className="text-[14px] text-[#2D2D2D] mr-[9px] underline underline-offset-2 ">
                  {data?.sourceUrls}
                </p>
                <img src="/assets/images/icon-new-window.svg" alt="link" />
              </a>
            </div>
          </div>
        </section></>):null}
      </div>
    </>
  );
}

export default Page;
