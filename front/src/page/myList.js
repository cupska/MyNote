import { useEffect, useState } from "react"
import { BtnAdd } from "../components/button"
import { CardList } from "../components/card"



export function MyList(props) {
    const [datas, setDatas] = useState([])
    const [isBtnAddListOn, setIsBtnAddListOn] = useState(false)

    const [doUpdate, setDoUpdate] = useState(false)
    const update = (data) => {
        setDoUpdate(data)
        setIsBtnAddListOn(false)
    }
      console.log(document.cookie);
      
    const url = "http://localhost:3009/mylists"
    useEffect(()=> {
        fetch(url, {
            credentials: "include",
          })
        .then(res => res.json())
        // .then(datas => setDatas(datas.results))
        .then(datas => setDatas(datas.results))
        .catch(error => {
            console.log(error)
        })

        setDoUpdate(false)
    },[doUpdate])

    // console.log(cookies)
    console.log(datas)
    
    const cards = (
                <>
                {datas.map((data, index)=> {
                    return (
                        <li  key={index} className=" list-none">  
                            <CardList datas={data} update={update} />
                        </li>
                    )
                })}
                </>
    )
    const buttonAddList = (
        <button onClick={() => setIsBtnAddListOn(!isBtnAddListOn)} className={`${isBtnAddListOn ? " rotate-[135deg]" : ""} ease-out duration-500`}>
            <BtnAdd/>
        </button>
    )
    const form =   
        <div className="  absolute  top-0 right-0 left-0 m-auto w-[85%]">
            {isBtnAddListOn ? <PostForm update={update}/> : null} 
        </div>

    return(
        <div className=" relative flex flex-col justify-start gap-5 py-5 w-full h-full">
            {/* <input type="text" onChange={(e)=> setSat(e.target.value)}/> */}
            <div className=" absolute h-full w-full top-0 overflow-auto   scrollbar-thin scrollbar-rounded-*  scrollbar-thumb-rose-500 scrollbar-track-gray-100  ">
                <ul className=" flex flex-col mt-5 mb-18 mb-24 gap-5">
                    {cards}
                </ul>
            </div>
                {/* Button Add Task */}
            <div className=" absolute bottom-5 right-5 ">
                {buttonAddList}
            </div>
                {/* Button Add Task END */}
            <div>
                {form}
            </div>
        </div>
    )
}


function PostForm(props) {
    const [task, setTask] = useState("")
    const [warn, setWarn] = useState("")

    const update = props.update

    const postForm = async () => {
        fetch('http://localhost:3009/mylists', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task : `${task}`,
                warn : `${warn}`,
            })
        })
        // .then(response => response.json())
        .then(data => data.json())
        .then(data => console.log(data.message))
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <form className=" flex flex-col w-full mt-2 ring-2 divide-y-2" onSubmit={(e)=> {
                e.preventDefault()
                postForm()
                update(true)
            }}  
            method="post"> 

            <textarea className=" px-2 py-2" name="task" placeholder="Write a new Task" maxLength="100" onChange={(e) => setTask(e.target.value)}  rows={4} required></textarea>
            <input name="warn" className=" w-full h-12 px-2 " onChange={(e) => setWarn(e.target.value)} type="datetime-local" placeholder="Time" required/>
            <input className=" w-full h-12 bg-rose-600 text-white "  type="submit" /> 
        </form>
    )
}