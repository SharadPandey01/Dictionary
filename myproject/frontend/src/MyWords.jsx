import { useEffect, useState } from "react";

export default function MyWords() {

    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWords = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/mywords"
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch words");
            }

            setWords(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWords();
    }, []);

    const removeWord = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to remove this word?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/mywords/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Delete failed");
            }

            setWords((prev) =>
                prev.filter((word) => word._id !== id)
            );

        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#010409] text-white">
                Loading saved words...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#010409] text-red-400">
                {error}
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center min-h-screen bg-[#010409] text-white">
            <div className="MyWordContentBox w-[95%] h-fit flex flex-col gap-8 border border-white p-5">

                <div className="text-[2em] md:text-5xl font-bold font-serif text-center">
                    My Words
                </div>

                <div className="flex flex-col justify-start w-full">
                    {words.length === 0 ? (
                        <p className="text-gray-400 text-center mt-4">
                            No saved words yet.
                        </p>
                    ) : (
                        <ul>
                            {words.map((item, index) => (
                                <li
                                    key={item._id}
                                    className="flex items-center justify-between text-xl md:text-3xl border-b border-gray-700 py-3 hover:text-blue-400 transition-all"
                                >
                                    <span>
                                        {index + 1}. {item.word}
                                    </span>

                                    <button
                                        onClick={() => removeWord(item._id)}
                                        className="text-red-400 hover:text-red-600 transition-all"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
}
