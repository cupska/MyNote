import { Logo } from "../../assets/svgviewer-react-output"



export function Auth() {    
    return(
        <div className=" h-screen flex justify-center items-center">
            <div className= " px-5 py-10 rounded-xl bg-rose-200">
                <div className="   m-auto w-28" >
                    <Logo/>
                </div>
                <div className=" flex justify-center ">
                    <div className=" relative w-fit flex flex-col items-center justify-center m-5 gap-3">
                        <span>Sign in with GOOGLE!</span>
                        <a href="http://localhost:3009/auth/google" className="auth-btn w-20 px-4 py-2 whitespace-nowrap z-10 rounded-xl font-bold text-center text-white bg-blue-600" >Sign in</a>
                    </div>
                </div>
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