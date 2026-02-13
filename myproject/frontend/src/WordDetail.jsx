import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function WordDetail() {
    const location = useLocation();
    const wordData = location.state?.wordData;

    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!wordData) {
        return (
            <div className="text-white text-center mt-10">
                No word data found. Please search again.
            </div>
        );
    }

    // Extract first meaning + first definition safely
    const firstMeaning = wordData.meanings?.[0];
    const firstDefinition = firstMeaning?.definitions?.[0];

    const SaveNewWord = async () => {
        try {
            setLoading(true);

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
                throw new Error(data.message || "Error saving word");
            }

            setSaved(true);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex justify-center bg-[#010409] text-white">
            <div className="contentBox w-[95%] h-fit flex flex-col gap-8 justify-center border border-white p-5">
                
                {/* Word Title */}
                <div className="WordTitle font-bold text-[2em] p-5 text-center border-2 border-[#70291e]">
                    {wordData.word?.toUpperCase()}
                </div>

                {/* Word Details */}
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
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={SaveNewWord}
                    disabled={saved || loading}
                    className={`h-fit w-fit p-3 rounded-lg self-center transition-all ${
                        saved
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {saved
                        ? "Saved"
                        : loading
                        ? "Saving..."
                        : "Add to My Words"}
                </button>
            </div>
        </div>
    );
}
