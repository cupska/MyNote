import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BtnAdd } from "../components/button";
import { CardMemo } from "../components/card";

export function MyMemo(props) {
    const [datas, setDatas] = useState([])
    const [isBtnAddListOn, setIsBtnAddListOn] = useState(false)
    const [doUpdate, setDoUpdate] = useState(false)


    const url = "http://localhost:3009/mymemos"
    useEffect(()=> {
        fetch(url)
        .then(res => res.json())
        .then(res => setDatas(res)) 
    }, [doUpdate])


    const update = (data) => {
        setDoUpdate(data)
        setIsBtnAddListOn(false)
    }
    const cards = (
            <>
            {datas.map((data, index) => {
                return(
                    <li key={index} className=" ">
                        <Link to="card" state={data} >
                            <CardMemo data={data} />
                        </Link>
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
        <div className=" relative h-full w-full  py-5 px-2">
            {/* container card */}
            <div className=" absolute top-0 left-0 h-full w-full  overflow-y-auto scrollbar-thin scrollbar-rounded-*  scrollbar-thumb-rose-500 scrollbar-track-gray-100" >
                <ul className="grid grid-cols-2 h-fit w-full gap-2 px-3 pt-3 pb-20">
                    {cards}
                </ul>
            </div>
            <div className=" absolute bottom-5 right-5 ">
                {buttonAddList}
            </div>
            {form}
        </div>
    )
}

function PostForm(props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [time, setTime] = useState("")
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const update = props.update
    const d = new Date()
    const day = days[d.getDay()]
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()
    const dates = `${day}, ${date} ${month} ${year}`

    useEffect(() => {
        setTime(dates)
    }, [])
 
    const waw = () => setTime(`${d.getFullYear()}`)
        // `${d.getDay()}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`)


    const postForm = () => {
        fetch('http://localhost:3009/mymemos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title : `${title}`,
                description : `${description}`,
                time : `${time}`
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    console.log(time)
    return (
        <form className=" flex flex-col w-full ring-2 mt-2 divide-y-2" onSubmit={(e)=> {
                e.preventDefault()
                postForm()
                update(true)
                waw()
            }}  
            method="post"> 
            <input className=" h-9 px-2 capitalize" placeholder="Title" name="title" onChange={e => setTitle(e.target.value)} required/>
            <textarea className=" px-2 text-clip" placeholder="Write memo" name="task" maxLength="255" onChange={(e) => setDescription(e.target.value)}  rows={4} required></textarea>
            <input className=" w-full h-12 bg-rose-600 text-white "  type="submit" /> 
        </form>
    )
}