import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(){

    let darkurl = 'https://img.icons8.com/?size=100&id=64342&format=png&color=000000';
    let lighturl = 'https://img.icons8.com/?size=100&id=15352&format=png&color=000000';
    let Logoimg = 'https://img.icons8.com/?size=100&id=XoDuG1rOCUx5&format=png&color=000000';
    let searchicon = 'https://img.icons8.com/?size=100&id=12773&format=png&color=000000';

    const [theme, setTheme] = useState('light'); // page theme
    const [word,setWord] = useState(""); // word that will be searched 

    const ToggleTheme=()=>{
        if(theme === 'light')
        {
            setTheme('dark');
        }
        else{
            setTheme('light');
        }
    }

    const SearchWord=()=>{
        console.log(word);
    }

    return(
        <>
        <div className="NavParentBox bg-[#232730] p-3 flex flex-row justify-evenly items-center gap-1 border border-gray-600">
            {/* left nav section */}
            <div className="leftnavsection flex flex-row gap-2 md:gap-10 items-center">
                <div className="logocontainer h-[1.5em] w-[1.5em] md:h-[3em] md:w-[3em] "><img src={Logoimg}  alt="Home" title='Sharads Dictionary' className="logo h-full w-full" /></div>
                <div className="searchcontainer hidden md:flex bg-white rounded-xl flex-row h-[2.5em] text-black pl-2 overflow-hidden">
                    <input id='searchbox' type="text" onInput={(event)=>setWord(event.target.value)} placeholder='Search a word...' />
                    <button className='rounded-none' onClick={SearchWord}><img src={searchicon} alt="search" className='h-full w-full' /></button>
                </div>
            </div>

            {/* right nav section  */}
            <div className="rightnavsection flex justify-evenly items-center gap-2 md:gap-4 ">

                <div className='group flex flex-col'>
                    <Link to="/" className="text-white font-serif text-[0.75em] md:text-[1.25em] text-nowrap hover:text-green-400">Home</Link>
                    <div className="underlinediv transition-transform duration-375 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                </div>
                <div className='group flex flex-col'>
                    <Link to="/WordOfTheDay" className="text-white font-serif text-[0.75em] md:text-[1.25em] text-nowrap hover:text-green-400">W.O.T.D</Link>
                    <div className="underlinediv transition-transform duration-375 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                </div>
                <div className='group flex flex-col'>
                    <Link to="/MyWords" className="text-white font-serif text-[0.75em] md:text-[1.25em] text-nowrap hover:text-green-400">My Words</Link>
                    <div className="underlinediv transition-transform duration-375 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                </div>
                <div className='group flex flex-col'>
                    <Link to="/LogOut" className="text-white font-serif text-[0.75em] md:text-[1.25em] text-nowrap hover:text-green-400">Log Out</Link>
                    <div className="underlinediv transition-transform duration-375 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                </div>
              
                <button onClick={ToggleTheme} className='h-[2em] w-[2em]  border-0'><img src={theme==='light'? darkurl : lighturl} alt="" className='themeimg h-full w-full' /></button> 

            </div>
        </div>
        </>
    )
}


export default Navbar;

