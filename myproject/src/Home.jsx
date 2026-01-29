import { Link } from "react-router-dom";
import RandomWord from './RandomWord'

export default function Home()
{
    let searchicon = 'https://img.icons8.com/?size=100&id=12773&format=png&color=000000';

    let homecardstyle = 'HomeCard border border-white rounded-xl bg-blue-950 text-white flex flex-col items-center justify-center flex-1 min-h-[100px] md:min-h-[175px] transition-transform duration-300 hover:scale-110';

    return(
        <>
        <div className="h-full w-full flex flex-col items-center justify-center gap-3 bg-[#010409]">
            <div className="HomeSearchSection flex  w-[75%] h-fit border border-gray-500">
                <input className='h-full w-full bg-white text-black text-lg' type="text" name="HomeSearch" placeholder=" Search any word... " />
                <button id="HomeSearchBtn" className="h-full"><img src={searchicon} /></button>
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