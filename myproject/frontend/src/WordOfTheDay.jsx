import { useEffect, useState } from "react";

export default function WordOfTheDay() {

    const [wordData, setWordData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchWordOfTheDay();
    }, []);

    const fetchWordOfTheDay = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/word-of-the-day"
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "No word available");
            }

            setWordData(data.data || data); 
            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const SaveNewWord = async () => {
        if (!wordData) return;

        try {
            const response = await fetch(
                "http://localhost:5000/api/mywords",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        word: wordData.word,
                        data: wordData,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setSaved(true);

        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#010409] text-white">
                Loading word of the day...
            </div>
        );
    }

    if (!wordData) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#010409] text-white">
                No word available. Save some words first.
            </div>
        );
    }

    const firstMeaning = wordData.meanings?.[0];
    const firstDefinition = firstMeaning?.definitions?.[0];

    return (
        <div className="min-h-screen w-full flex justify-center bg-[#010409] text-white">
            <div className="contentBox w-[95%] h-fit flex flex-col gap-8 justify-center border border-white p-5">

                <div className="WordTitle font-bold text-[2em] p-5 text-center border-2 border-[#70291e]">
                    {wordData.word?.toUpperCase()}
                </div>

                <div className="WordDetailsSection bg-[#0d1117] flex flex-col p-5">
                    <div className="wordDetailCards flex flex-col gap-4">

                        <div className="POS flex flex-row gap-1">
                            <p className="text-gray-400 font-bold">
                                Part of speech :
                            </p>
                            <p>{firstMeaning?.partOfSpeech || "N/A"}</p>
                        </div>

                        <div className="Definition flex flex-row gap-1">
                            <p className="text-gray-400 font-bold">
                                Definition :
                            </p>
                            <p>{firstDefinition?.definition || "N/A"}</p>
                        </div>

                        <div className="Example flex flex-row gap-1">
                            <p className="text-gray-400 font-bold">
                                Example :
                            </p>
                            <p>
                                {firstDefinition?.example ||
                                    "No example available"}
                            </p>
                        </div>

                        <div className="Synonyms flex flex-row gap-2">
                            <p className="text-gray-400 font-bold">
                                Synonyms :
                            </p>
                            <p>
                                {firstDefinition?.synonyms?.length
                                    ? firstDefinition.synonyms.join(", ")
                                    : "None"}
                            </p>
                        </div>

                        <div className="Antonyms flex flex-row gap-2">
                            <p className="text-gray-400 font-bold">
                                Antonyms :
                            </p>
                            <p>
                                {firstDefinition?.antonyms?.length
                                    ? firstDefinition.antonyms.join(", ")
                                    : "None"}
                            </p>
                        </div>

                    </div>
                </div>

                <button
                    onClick={SaveNewWord}
                    disabled={saved}
                    className={`h-fit w-fit p-3 rounded-lg self-center transition-all ${
                        saved
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {saved ? "Saved" : "Add to My Words"}
                </button>

            </div>
        </div>
    );
}
