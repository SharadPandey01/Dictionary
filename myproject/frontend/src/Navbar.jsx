import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

    const Logoimg = "https://img.icons8.com/?size=100&id=XoDuG1rOCUx5&format=png&color=000000";
    const searchicon = "https://img.icons8.com/?size=100&id=12773&format=png&color=000000";

    const [word, setWord] = useState("");
    const navigate = useNavigate();

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

            navigate("/WordDetail", { state: { wordData: data } });
            setWord("");

        } catch (error) {
            alert(error.message);
        }
    };

    const navLinkStyle = ({ isActive }) =>
        `font-serif text-[0.75em] md:text-[1.25em] text-nowrap transition-colors ${
            isActive
                ? "!text-blue-400"
                : "text-white hover:text-green-400"
        }`;

    return (
        <div className="NavParentBox bg-[#232730] p-3 flex flex-row justify-evenly items-center gap-1 border border-gray-600">

            {/* Left Section */}
            <div className="leftnavsection flex flex-row gap-2 md:gap-10 items-center">

                <div className="logocontainer h-[1.5em] w-[1.5em] md:h-[3.5em] md:w-[3.5em]">
                    <img
                        src={Logoimg}
                        alt="Home"
                        title="Sharad's Dictionary"
                        className="logo h-full w-full"
                    />
                </div>

                <div className="searchcontainer hidden md:flex bg-white rounded-xl flex-row h-[2.5em] text-black pl-2 overflow-hidden border border-transparent focus-within:border-black focus-within:ring-2 focus-within:ring-white">

                    <input
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") getMeaning();
                        }}
                        placeholder="Search a word..."
                        className="outline-none px-2"
                    />

                    <button onClick={getMeaning} className="px-2">
                        <img src={searchicon} alt="search" className="h-6 w-8" />
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="rightnavsection flex justify-evenly items-center gap-2 md:gap-4">

                <div className="group flex flex-col">
                    <NavLink to="/" end className={navLinkStyle}>
                        Home
                    </NavLink>
                    <div className="transition-transform duration-300 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                </div>

                <div className="group flex flex-col" title="Word Of the Day">
                    <NavLink to="/WordOfTheDay" className={navLinkStyle}>
                        W.O.T.D
                    </NavLink>
                    <div className="transition-transform duration-300 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                </div>

                <div className="group flex flex-col">
                    <NavLink to="/MyWords" className={navLinkStyle}>
                        My Words
                    </NavLink>
                    <div className="transition-transform duration-300 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                </div>

                <div className="group flex flex-col">
                    <NavLink to="/RandomWord" className={navLinkStyle}>
                        Random Word
                    </NavLink>
                    <div className="transition-transform duration-300 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                </div>

            </div>
        </div>
    );
}

export default Navbar;
