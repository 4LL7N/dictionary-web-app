import {  useState } from "react"
import { Mycontext } from "./Components/Context"
import Head from "./Components/Head"
import Page from "./Components/Page"
import FontMenu from "./Components/FontMenu"

function App() {

  const [font, setFont] = useState<string>("Sans Serif")
  const [fontMenu, setFontMenu] = useState<boolean>(false)
  const [theme, setTheme] = useState<boolean>(true)
 console.log(theme)
  return (
    <>
      <Mycontext.Provider value={{
        font,
        setFont,
        fontMenu,
        setFontMenu,
        theme,
        setTheme
      }} >
      <div className={` w-[100vw] min-h-[100vh] px-[24px] pt-[24px]  pb-[80px] ${theme?"bg-[#FFF]":"bg-[#050505]"} `} >
          <Head/>
          <Page/>
          <FontMenu/>
      </div>
      </Mycontext.Provider>
    </>
  )
}

export default App
