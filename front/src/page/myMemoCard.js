import { useLocation } from "react-router-dom"



export function MyMemoCard (props) {
    const data = useLocation()
    const {title, description, time} = data.state

    const deleteCard = () => {
        fetch("http://localhost:3009/mymemos", {
            method: "DELETE",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            "title" : title,
            "description" : description,
            "time" : time,
            })
        })
        .then((res)=> res.json())
        .then(res=> (console.log(res.message)))
        .catch(err => console.log(err))
    }

    return (
        <div className=" flex flex-col items-center w-full">
            <div className=" w-[90%] m-4 py-5 px-3 round rounded-lg divide-y-2 bg-slate-300">
                <div className=" mb-3">
                    <h1 className=" capitalize text-lg">{title}</h1>
                    <span className=" text-sm">{time}</span>
                </div>
                <div className=" mt-3">
                    <p className=" mt-3">{description}</p>
                </div>
            </div>
            <button className=" w-fit px-4 py-2 rounded-lg text-white bg-rose-600" onClick={() => {
                deleteCard()
                setTimeout(() => {
                    window.history.back()
                }, 1000);
            }}>Destroy</button>

        </div>
    )
}