export default function MyWords()
{
    const wordsarr =['Sharad','Aman','Upendra','Devesh'];

        
    return(
        <>
        <div className=" w-full flex justify-center h-full ">
            <div className="MyWordContentBox bg-[#010409] w-[95%] min-h-full h-auto flex flex-col gap-8 border border-white p-5">

                <div id="PageTitle" className="text-[2em] md:text-5xl font-bold font-serif m-x-auto text-center">My Words</div>
                <div id="MyWordsDisplayBox flex flex-col justify-start w-full">


                    <ul>
                    {wordsarr.map((item, index) => (
                        <li key={index} className="flex items-center justify-between text-xl transition-colors md:text-3xl border-b border-gray-700 py-2 hover:text-blue-400">
                        {/* Left side: Index and Name */}
                        <span>
                            {index + 1}. {item}
                        </span>

                        {/* Right side: Button */}
                        <button 
                            onClick={() => /* your remove logic here */ {}}
                            className="RemoveWordbtn text-white text-sm md:text-base px-3 py-1 rounded-md transition-all">
                            Remove
                        </button>
                        </li>
                    ))}
                    </ul>
                

                </div>

            </div>
        </div>
        </>
    )
}