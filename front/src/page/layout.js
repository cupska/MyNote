import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AccountLogo } from "../assets/account logo";
import { ListLogo } from "../assets/listLogo";
import { MemoLogo } from "../assets/memoLogo";


export function Layout() {
    const [btnAnimation, setBtnAnimation] = useState("")
    const [isBtn1Pressed, setIsBtn1Pressed] = useState(true)
    const [isBtn2Pressed, setIsBtn2Pressed] = useState(false)
    const [isBtn3Pressed, setIsBtn3Pressed] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        window.addEventListener("load", () => {
            navigate("/myList")
        })
    }, [navigate])
    return(
        <div className=" flex flex-col justify-start w-screen h-screen md:h-[37rem] md:w-[27rem] md:shadow-lg md:hover:shadow-2xl md:shadow-slate-600 md:hover:shadow-slate-600 duration-500  md:rounded-lg md:overflow-hidden  bg-slate-100">
            <header className="  flex justify-center items-center h-[10%]  bg-gradient-to-bl from-rose-500  to-purple-700 shadow-[-0rem_-0.7rem_1.5rem_0.1rem]">
                <span className=" font-extrabold text-2xl text-white font-sans">MyNote</span>
            </header>
            <div className=" w-full h-[75%]">
                <Outlet/>
            </div>
            <nav className=" w-full h-[15%] mt-auto relative flex justify-between items-center rounded-lg overflow-hidden shadow-[-0rem_0.7rem_1.5rem_0.1rem] ">
                <Link className=" flex flex-col items-center flex-1 py-4  text-center" to="myList" onClick={()=> {
                    setBtnAnimation("translate-x")
                    setIsBtn1Pressed(true)
                    setIsBtn2Pressed(false)
                    setIsBtn3Pressed(false)
                }}>
                    <div className={` ${isBtn1Pressed ? "" : " translate-y-2" } duration-500`}>
                        <ListLogo fill={isBtn1Pressed ? "#e11d48" : "black"}/>
                    </div>
                    <span className={` text-rose-600 ${isBtn1Pressed ? "duration-500" : "-translate-y-3 opacity-0 duration-500"}`}>MyList</span>
                </Link>
                <Link className=" flex flex-col items-center flex-1 py-4  text-center" to="myMemo" onClick={()=> {
                    setBtnAnimation("translate-x-[100%]")
                    setIsBtn1Pressed(false)
                    setIsBtn2Pressed(true)
                    setIsBtn3Pressed(false)
                }}>
                    <div className={` ${isBtn2Pressed ? "" : " translate-y-2" } duration-500`}>
                        <MemoLogo fill={isBtn2Pressed ? "#e11d48" : "black"}/>
                    </div>
                    <span className={` text-rose-600 ${isBtn2Pressed ? "duration-500" : "-translate-y-3 opacity-0 duration-500"}`}>MyMemo</span>
                </Link>
                <Link className=" flex flex-col items-center flex-1 py-4  text-center" to="about" onClick={()=> {
                    setBtnAnimation("translate-x-[200%]")
                    setIsBtn1Pressed(false)
                    setIsBtn2Pressed(false)
                    setIsBtn3Pressed(true)
                }}>
                    <div className={` ${isBtn3Pressed ? "" : " translate-y-2" } duration-500`}>
                        <AccountLogo fill={isBtn3Pressed ? "#e11d48" : "black"}/>
                    </div>
                    <span className={`${isBtn3Pressed ? "duration-500" : "-translate-y-3 opacity-0 duration-500"} text-rose-600`}>About</span>
                </Link>
  
                <div className={` absolute top-0 left-0 h-1 w-1/3 bg-rose-600 ${btnAnimation} duration-500 ease-in-out`}></div>
            </nav>
            
        </div>
    )
}