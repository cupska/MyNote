


export function About(props){
    
    return(
        <div className=" flex flex-col justify-center h-full">
            <div className=" h-full p-5 overflow-y-auto scrollbar-thin scrollbar-rounded-*  scrollbar-thumb-rose-500 scrollbar-track-gray-100">
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

    )
}