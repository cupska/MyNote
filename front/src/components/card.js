import { useState } from "react";
import { CheckBox } from "../assets/checkBox";



export function CardList(props) {
    const { task , warn } = props.datas 
    const [isCheckClick, setIsCheckClick] = useState(false)
    const update = props.update

    const deleteCard = () => {
        fetch("http://localhost:3009/mylists", {
            method: "DELETE",
            credentials: "include",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            "task" : task,
            "warn" : warn
            })
        })
        .then((res)=> res.json())
        .then(res=> console.log(res))
        .catch(err => console.log(err))
    }

    return(
        <div className=" flex justify-start items-center w-[90%] h-20 m-auto rounded-lg p-2 overflow-hidden bg-slate-300">
            <div className=" w-[90%]">
                <h1 className="  truncate text-base capitalize">
                    {task}
                </h1>
                <p>
                    {warn.slice(0, 10)}, {warn.slice(11, 16)}
                </p>
            </div>
            <div className=" ml-auto">
                <button onClick={()=> {
                    setIsCheckClick(true)
                    deleteCard()
                    update(true)
                    }}>
                    <CheckBox fill={isCheckClick ? "none" : "none" } />
                </button>
            </div>
        </div>
    )
}

export function CardMemo(props) {
    const {title, description, time} = props.data

    return(
        <div className=" w-full max-h-56 p-2 rounded-lg overflow-hidden bg-slate-300 border">
            <div>
                <h1 className=" capitalize">{title}</h1>
            </div>
            <div className=" h-40 overflow-hidden shadow-inner">
                <p className="">
                    {description}
                </p>
            </div>
            <span className=" text-xs">
                {time}
            </span>
        </div>
    )
}