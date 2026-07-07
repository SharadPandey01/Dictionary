import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import { useAuth } from "./AuthContext";


export default function Home() {
    const [word, setWord] = useState('');
    const navigate = useNavigate();
    const { axiosInstance } = useAuth();

    let homecardstyle = 'HomeCard border border-white rounded-xl bg-blue-950 hover:bg-green-800 text-white flex flex-col items-center justify-center flex-1 min-h-[100px] md:min-h-[175px] transition-transform duration-300 hover:scale-110';

    const getMeaning = async () => {
        const trimmedWord = word.trim();

        if (!trimmedWord){
            toast.error("Please enter a word to search!",{
                position: 'bottom-right',
                autoClose:3000
            });
            return;
        }

        try {
            const response = await axiosInstance.get(`/define/${trimmedWord}`);
            navigate('/WordDetail', { state: { wordData: response.data } });
        } catch (error) {
            toast.error('Word Not Found',{
                position:'bottom-left'
            });
        }
    };


    return(
        <>
        <div className="h-full w-full flex flex-col items-center justify-center gap-3 bg-[#010409]">
            
            <div className="HomeSearchSection flex  w-[75%] h-fit border border-gray-500 bg-white rounded-lg overflow-hidden">
                <input className='h-full w-full bg-white text-black text-lg rounded-lg outline-none pl-1' type="text" name="HomeSearchWord" value={word} onChange={(e) => {setWord(e.target.value)}} onKeyDown={(e) => { if (e.key === "Enter") getMeaning(); }} placeholder=" Search any word... " />

                <button onClick={getMeaning} id="HomeSearchBtn" className="h-full bg-white p-2 border-0 rounded-lg">
                    <img src='https://img.icons8.com/?size=100&id=12773&format=png&color=000000' alt="search" className="h-8"/>
                </button>

            </div>
            <div className="HomeCardsection flex flex-col md:flex-row justify-evenly w-[75%] gap-10">

                <Link to='/WordOfTheDay' className={homecardstyle}>
                    <p className="text-[1.35em] font-bold font-sans ">Word Of The Day</p>
                    <p className="text-[0.75em]">learn a new word today !</p>
                </Link>

                <Link to='/MyWords' className={homecardstyle}>
                    <p className="text-[1.35em] font-bold font-sans ">My Words</p>
                    <p className="text-[0.75em]">Revisit your personal words!</p>
                </Link>

            </div>
        </div>
        <ToastContainer/>
        </>
    )
}