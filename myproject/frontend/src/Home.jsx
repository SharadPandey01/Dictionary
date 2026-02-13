import { Link, useNavigate } from "react-router-dom"; 
import { useState } from "react";

export default function Home() {
    const [word, setWord] = useState('');
    const navigate = useNavigate(); 

    let searchicon = 'https://img.icons8.com/?size=100&id=12773&format=png&color=000000';
    let homecardstyle = 'HomeCard border border-white rounded-xl bg-blue-950 text-white flex flex-col items-center justify-center flex-1 min-h-[100px] md:min-h-[175px] transition-transform duration-300 hover:scale-110';

    const getMeaning = async () => {
        const trimmedWord = word.trim();
    
        if (!trimmedWord) return;
    
        try {
            const response = await fetch(
                `http://localhost:5000/api/define/${trimmedWord}`
            );
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Word not found");
            }
    
            navigate('/WordDetail', { state: { wordData: data } });
    
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Word not found!");
        }
    };
    

    return(
        <>
        <div className="h-full w-full flex flex-col items-center justify-center gap-3 bg-[#010409]">
            <div className="HomeSearchSection flex  w-[75%] h-fit border border-gray-500  focus-within:border-black focus-within:ring-3 focus-within:ring-white">
                <input className='h-full w-full bg-white text-black text-lg' type="text" name="HomeSearchWord" value={word} onChange={(e) => {setWord(e.target.value)}} placeholder=" Search any word... " />

                <button onClick={getMeaning} id="HomeSearchBtn" className="h-full bg-white p-2">
                    <img src={searchicon} alt="search" className="h-8"/>
                </button>

            </div>
            <div className="HomeCardsection flex flex-col md:flex-row justify-evenly w-[75%] gap-10">

                {/* cards div */}

                <Link to='/WordOfTheDay' className={homecardstyle}>
                    <p className="text-[1.35em] font-bold font-sans ">Word Of The Day</p>
                    <p className="text-[0.75em]">learn a new word today !</p>
                </Link>

                <Link to='/MyWords' className={homecardstyle}>
                    <p className="text-[1.35em] font-bold font-sans ">My Words</p>
                    <p className="text-[0.75em]">Revisit your personal words!</p>
                </Link>

                <Link to='/RandomWord' className={homecardstyle}>
                    <p className="text-[1.35em] font-bold font-sans ">Random Word</p>
                    <p className="text-[0.75em]">Learn a random word!</p>
                </Link>

            </div>
        </div>
        </>
    )
}