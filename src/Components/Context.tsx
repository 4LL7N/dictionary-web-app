import { createContext, useContext } from "react";


interface ContextInt{
    font:string
    setFont:(font:string) => void
    fontMenu:boolean,
    setFontMenu:(fontMenu:boolean) =>  void
}

export const Mycontext = createContext<ContextInt|null>(null)

export function Context(){
    const context = useContext(Mycontext)

    if (context === undefined) {
        throw new Error("useUserContext must be used with a MyContext");
    }

    return context
}