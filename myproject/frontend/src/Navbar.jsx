import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import logo from '../src/assets/Print.svg';

function Navbar() {

    const Logoimg = "https://img.icons8.com/?size=100&id=XoDuG1rOCUx5&format=png&color=000000";
    const searchicon = "https://img.icons8.com/?size=100&id=12773&format=png&color=000000";

    const [word, setWord] = useState("");
    const navigate = useNavigate();
    const { accessToken, setAccessToken, setUsername, axiosInstance } = useAuth();

    const getMeaning = async () => {
        const trimmedWord = word.trim();
        if (!trimmedWord){
            toast.error("Word cannot be empty !",{
                position:'bottom-right',
                autoClose:3000,
            });
            return;
        }

        try {
            const response = await axiosInstance.get(`/define/${trimmedWord}`);
            navigate("/WordDetail", { state: { wordData: response.data } });
            setWord("");
        } catch (error) {
            toast.error('Word Not Found !');
            setWord("");
        }
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
        } catch {
        }
        setAccessToken(null);
        setUsername(null);
        navigate("/login");
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
                        src={logo}
                        alt="Home"
                        title="WORDFORGE"
                        className="logo h-full w-full"
                    />
                </div>
                <p className="text-[#a5d6a7] font-serif font-bold text-xl md:text-2xl tracking-wide">
                    WordForge
                </p>

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

                    <button onClick={getMeaning} className="h-full bg-white p-2 border-0 rounded-lg">
                        <img src={searchicon} alt="search" className="h-6 w-10" />
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

                {accessToken && (
                    <>
                        <div className="group flex flex-col">
                            <NavLink to="/MyWords" className={navLinkStyle}>
                                My Words
                            </NavLink>
                            <div className="transition-transform duration-300 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                        </div>

                        <div className="group flex flex-col">
                            <NavLink to="/collections" className={navLinkStyle}>
                                Collections
                            </NavLink>
                            <div className="transition-transform duration-300 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                        </div>

                        <div className="group flex flex-col">
                            <NavLink to="/dashboard" className={navLinkStyle}>
                                Dashboard
                            </NavLink>
                            <div className="transition-transform duration-300 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="font-serif text-[0.75em] md:text-[1.25em] text-nowrap text-white  transition-colors overflow-hidden hover:outline-0"
                        >
                            <p className="p-2 hover:bg-red-700 hover:text-white transition-colors">Logout</p>
                        </button>
                    </>
                )}

                {!accessToken && (
                    <div className="group flex flex-col">
                        <NavLink to="/login" className={navLinkStyle}>
                            Login
                        </NavLink>
                        <div className="transition-transform duration-300 h-1 w-full bg-gray-600 scale-x-0 group-hover:scale-x-100 origin-center rounded-2xl"></div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Navbar;
