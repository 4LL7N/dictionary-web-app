import {  useState } from "react"
import { Mycontext } from "./Components/Context"
import Head from "./Components/Head"
import Page from "./Components/Page"

function App() {

  const [font, setFont] = useState<string>("Sans Serif")
  const [fontMenu, setFontMenu] = useState(false)


  return (
    <>
      <Mycontext.Provider value={{
        font,
        setFont,
        fontMenu,
        setFontMenu
      }} >
      <div className={` w-[100vw] px-[24px] pt-[24px] bg-[#FFF] `} >
          <Head/>
          <Page/>
      </div>
      </Mycontext.Provider>
    </>
  )
}

export default App
