import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function CollectionDetail() {
    const { id } = useParams();
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [collectionName, setCollectionName] = useState("");
    const { axiosInstance } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const res = await axiosInstance.get(`/collections/${id}/words`);
                setWords(res.data);
            } catch (err) {
                setError(err.response?.data?.error || err.response?.data?.message || "Failed to fetch words");
            } finally {
                setLoading(false);
            }
        };

        const fetchCollectionName = async () => {
            try {
                const res = await axiosInstance.get("/collections");
                const col = res.data.find((c) => c._id === id);
                if (col) setCollectionName(col.name);
            } catch {
            }
        };

        fetchCollectionName();
        fetchWords();
    }, [id]);

    const removeFromCollection = async (wordId) => {
        try {
            await axiosInstance.delete(`/collections/${id}/words/${wordId}`);
            setWords((prev) => prev.filter((w) => w._id !== wordId));
        } catch (err) {
            alert(err.response?.data?.error || err.response?.data?.message || "Failed to remove word");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#010409] text-white">
                Loading...
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
        <div className="w-full flex justify-center min-h-screen bg-[#010409] text-white p-10">
            <div className="w-[95%] h-fit flex flex-col gap-8 border border-white p-5">

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/collections")}
                        className="text-gray-400 hover:text-white transition-all text-lg"
                    >
                        ← Back
                    </button>
                    <div className="text-[2em] md:text-5xl font-bold font-serif">
                        {collectionName || "Collection"}
                    </div>
                </div>

                <div className="flex flex-col justify-start w-full">
                    {words.length === 0 ? (
                        <p className="text-gray-400 text-center mt-4">
                            No words in this collection.
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
                                        onClick={() => removeFromCollection(item._id)}
                                        className="text-red-400 hover:text-red-600 transition-all text-base md:text-xl"
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
