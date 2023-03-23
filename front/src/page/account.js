import { useEffect, useState } from "react"

export function About(){
    const [datas, setDatas] = useState({})
    const [isError, setIsError] = useState(false)

    const url = `http://localhost:3009/user`
    useEffect(()=> {
        fetch(url, {
            credentials: "include",
          })
        .then(res => {
            if (res.ok) {
                res.json()
                .then(res => setDatas(res.results[0]))
            } else {
                setIsError(!res.ok)
            }
        })
    },[url])

    const userData =  (
        <div className=" flex justify-between items-center">
        <div>
            <h2 className=" font-bold text-lg">Hi, {datas.name}</h2>
            <div>
                {datas.email}
            </div>
        </div>
        <div>
            <a className=" px-3 py-2 rounded-lg text-white bg-rose-500 " href="http://localhost:3009/auth/logout">Sign Out</a>
        </div>

        </div>
    )
    const guestBtn = (
        <div className=" flex justify-center items-center pt-5">
        <a className="  px-3 py-2 rounded-lg text-white bg-rose-500" href="http://localhost:3009/auth/google">Sign In with Google</a>
        </div>
    )

    // console.log("error?",isError)
    console.log("datas",datas)
    
    return(
        <div className=" flex flex-col justify-center h-full">
            <div className=" h-full p-5 flex flex-col gap-10 overflow-y-auto scrollbar-thin scrollbar-rounded-*  scrollbar-thumb-rose-500 scrollbar-track-gray-100">
                <div className=" "> 
                    <h1 className=" text-xl w-fit m-auto">Account</h1>
                    {isError? guestBtn : userData}    
                </div>
                <div>
                    <h1 className=" text-xl w-fit m-auto">About</h1>
                    <p className=" text-justify">MyNote adalah aplikasi yang dapat digunakan untuk membuat daftar tugas(MyList) dan daftar catatan(MyMemo). Aplikasi berbasis website ini mengimplementasikan <em><strong>Fullstack Development</strong></em> dalam pembuatannya. </p>
                    <div className=" w-full">
                        <h2 className=" mt-3 underline">MyList</h2>
                        <ul className=" list-disc ml-4">
                            <li>Pada sesi MyList daftar tugas dapat ditambahkan dengan klik tombol '+'.</li>
                            <li>Form MyList berisi judul tugas dan pengaturan waktu berakhirnya tugas tersebut.</li>
                            <li>Tombol submit akan mengirimkan form ke server kemudian sesi MyList akan <em>request</em> kembali data MyList dari server.</li>
                        </ul>
                        <h2 className=" mt-3 underline">MyMemo</h2>
                        <ul className=" list-disc ml-4">
                            <li>Pada sesi MyList daftar catatan dapat ditambahkan dengan klik tombol '+'.</li>
                            <li>Form MyList berisi judul catatan dan isi catatan tersebut.</li>
                            <li><em>Card</em> MyMemo berisi judul catatan, isi catatan dan waktu catatan yang dibuat otomatis sesuai waktu lokal klien.</li>
                        </ul>
                        <h2 className=" mt-3 underline">Tools :</h2>
                        <div className=" flex ml-3 gap-10">
                            <ul className=" list-disc">
                                <li>React JS</li>
                                <li>React-router-dom</li>
                                <li>Tailwind css</li>
                            </ul>
                            <ul className=" list-disc">
                                <li>Node JS</li>
                                <li>Express JS</li>
                                <li>MYSQL</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}