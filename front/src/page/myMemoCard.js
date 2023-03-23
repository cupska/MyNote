import { useLocation, useNavigate } from "react-router-dom"



export function MyMemoCard () {
    const location = useLocation()
    const {title, description, time} = location.state
    const navigate = useNavigate()

    const deleteCard = () => {
        fetch("http://localhost:3009/mymemos", {
            method: "DELETE",
            credentials: "include",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            "title" : title,
            "description" : description,
            "time" : time,
            })
        })
        .then(res => console.log(res))
        .then(
            setTimeout(() => {
                navigate("/myMemo")
            }, 500)
            )
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
            }}>Destroy</button>

        </div>
    )
}