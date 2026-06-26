import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Collections() {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newName, setNewName] = useState("");
    const [creating, setCreating] = useState(false);
    const { axiosInstance } = useAuth();
    const navigate = useNavigate();

    const fetchCollections = async () => {
        try {
            const res = await axiosInstance.get("/collections");
            setCollections(res.data);
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.message || "Failed to fetch collections");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    const createCollection = async (e) => {
        e.preventDefault();
        if (!newName.trim()) return;
        setCreating(true);
        try {
            const res = await axiosInstance.post("/collections", { name: newName.trim() });
            setCollections((prev) => [res.data, ...prev]);
            setNewName("");
        } catch (err) {
            alert(err.response?.data?.error || err.response?.data?.message || "Failed to create collection");
        } finally {
            setCreating(false);
        }
    };

    const deleteCollection = async (id) => {
        if (!window.confirm("Delete this collection? Words inside will not be deleted.")) return;
        try {
            await axiosInstance.delete(`/collections/${id}`);
            setCollections((prev) => prev.filter((c) => c._id !== id));
        } catch (err) {
            alert(err.response?.data?.error || err.response?.data?.message || "Failed to delete collection");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#010409] text-white">
                Loading collections...
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
            <div className="w-[95%] h-fit flex flex-col gap-8 border border-white p-5">

                <div className="text-[2em] md:text-5xl font-bold font-serif text-center">
                    Collections
                </div>

                <form onSubmit={createCollection} className="flex gap-2">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="New collection name..."
                        className="bg-[#0d1117] border border-gray-600 p-2 text-white outline-none flex-1"
                    />
                    <button
                        type="submit"
                        disabled={creating}
                        className="bg-blue-600 p-2 hover:bg-blue-700 transition-all"
                    >
                        {creating ? "Creating..." : "Create"}
                    </button>
                </form>

                <div className="flex flex-col justify-start w-full">
                    {collections.length === 0 ? (
                        <p className="text-gray-400 text-center mt-4">
                            No collections yet.
                        </p>
                    ) : (
                        <ul>
                            {collections.map((col) => (
                                <li
                                    key={col._id}
                                    className="flex items-center justify-between text-xl md:text-3xl border-b border-gray-700 py-3"
                                >
                                    <span
                                        onClick={() => navigate(`/collections/${col._id}`)}
                                        className="cursor-pointer hover:text-blue-400 transition-all"
                                    >
                                        {col.name}
                                    </span>
                                    <button
                                        onClick={() => deleteCollection(col._id)}
                                        className="text-red-400 hover:text-red-600 transition-all"
                                    >
                                        Delete
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
