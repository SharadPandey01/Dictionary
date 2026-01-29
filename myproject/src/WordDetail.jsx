import { useState } from "react";

export default function WordDetail(){
    const [newword,SaveWord] = useState('');
    let currentword ='Sharad Pandey'; 

    const SaveNewWord =()=>{

        SaveWord(currentword);

        console.log('New word added to MY WORDS:',currentword);
    }

    

    return(
        <>
        <div className="min-h-screen w-full flex justify-center">
            <div className=" contentBox bg-[#010409] w-[95%]  h-fit md:h-auto flex flex-col gap-8 justify-center border border-white">
                {/* title of the word being searched */}
                <div className="WordTitle font-bold text-[2em] text-nowrap p-5 text-center border-2 border-[#70291e]">{currentword}</div>
                {/* This box contains all details fetched for the word */}
                <div className="WordDetailsSection bg-[#0d1117] flex flex-col p-5">

                    {/* The below cards will be for each part of speech in API for the word */}
                    <div className="wordDeailCards flex flex-col gap-4">
                        {/* part of speech entry */}
                        <div className="POS flex flex-row gap-1">
                            <p id="POS-title" className="text-gray-400 font-bold">Part of speech :</p>
                            <p id="POS-entry">Lorem ipsum </p>
                        </div>
                        {/* definition entry */}
                        <div className="Definition flex flex-row gap-1">
                            <p id="Def-title" className="text-gray-400 font-bold">Definition :</p>
                            <p id="Def-entry">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quidem.</p>
                        </div>
                        {/* Example entry */}
                        <div className="Example flex flex-row gap-1">
                            <p id="Ex-title" className="text-gray-400 font-bold">Example :</p>
                            <p id="Ex-entry">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        {/* Synnonyms entry */}
                        <div className="Synonyms flex flex-row gap-2">
                            <p id="Syn-title" className="text-gray-400 font-bold">Synonyms :</p>
                            <p id="Syn-entry">Lorem ipsum dolor sit amet.</p>
                        </div>
                        {/* Antonynms entry */}
                        <div className="Antonyms flex flex-row gap-1">
                            <p id="Ant-title" className="text-gray-400 font-bold">Antonyms :</p>
                            <p id="Ant-entry">Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>

                </div>
                <button onClick={()=>SaveNewWord()} type="submit" id="WordSaveButton" className="h-fit w-fit ">Add to My Words</button>
                
            </div>
        </div>
        </>
    );
}