import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { Logo } from "../../assets/svgviewer-react-output"



export function Auth() {
    const [authBtn, setAuthBtn] = useState("")



    return(
        <div className=" h-screen flex justify-center items-center">
            <div className= " px-5 py-10 rounded-xl bg-rose-200">
                <div className="   m-auto w-28" >
                    <Logo/>
                </div>
                <div className=" flex justify-center ">
                    <div className=" relative w-fit flex justify-center m-5">
                        <Link className=" auth-btn w-20 p-4 whitespace-nowrap z-10 " onClick={()=> setAuthBtn("")} to="signIn">Sign In</Link>
                        <Link className=" auth-btn w-20 p-4 whitespace-nowrap z-10 " onClick={()=> setAuthBtn("translate-x-full ")} to="signUp">Sign Up</Link>
                        <div id="auth-btn-indicator" className={` absolute  left-0 bottom-0 h-1 w-[50%] -z-0 ease-out  ${authBtn}  bg-amber-500 duration-300`}></div>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    )
}

export function SignIn(props) {
        return(
                <form  action="" method="">
                    <input className=" block w-64 h-9 px-4 round rounded-full mb-5" type="text" name="username" autoFocus  placeholder="Username"/>
                    <input className=" block w-64 h-9 px-4 round rounded-full mb-5" type="password" name="password"  placeholder="Password"/>
                    <input className=" block w-64 h-9 px-4 round rounded-full mb-5 bg-amber-500 text-white" type="submit" value="Sign In"/>
                </form>
        )    
}

export function SignOut(props) {
    return(
        <form   action="" method="">
            <input className=" block w-64 h-9 px-4 round rounded-full mb-5" type="text" name="fullname"  autoFocus  placeholder="Fullname"/>
            <input className=" block w-64 h-9 px-4 round rounded-full mb-5" type="text" name="username"  placeholder="Username"/>
            <input className=" block w-64 h-9 px-4 round rounded-full mb-5" type="email" name="email " placeholder="Email"/>
            <input className=" block w-64 h-9 px-4 round rounded-full mb-5" type="password" name="password"  placeholder="Password" autoComplete="off"/>
            <input className=" block w-64 h-9 px-4 round rounded-full mb-5 bg-amber-500 text-white" type="submit" value="Sign Up"/>
        </form> 
    )
}