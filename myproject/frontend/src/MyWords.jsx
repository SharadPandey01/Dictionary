import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "./AuthContext";

export default function MyWords() {

  const [words, setWords] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedWord, setExpandedWord] = useState(null);
  const { axiosInstance } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wordsRes, collectionsRes] = await Promise.all([
          axiosInstance.get("/mywords"),
          axiosInstance.get("/collections")
        ]);
        setWords(wordsRes.data);
        setCollections(collectionsRes.data);
      } catch (err) {
        setError(err.response?.data?.error || err.response?.data?.message || "Failed to fetch words");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const removeWord = async (id) => {
    if (!window.confirm("Are you sure you want to remove this word?")) return;
    try {
      await axiosInstance.delete(`/mywords/${id}`);
      setWords((prev) => prev.filter((word) => word._id !== id));
      if (expandedWord === id) setExpandedWord(null);
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || "Delete failed");
    }
  };

  const assignToCollection = async (wordId, collectionId) => {
    try {
      if (collectionId === "") {
        const word = words.find((w) => w._id === wordId);
        if (word?.collectionId) {
          await axiosInstance.delete(`/collections/${word.collectionId}/words/${wordId}`);
        }
        setWords((prev) =>
          prev.map((w) => w._id === wordId ? { ...w, collectionId: null } : w)
        );
      } else {
        const res = await axiosInstance.post(`/collections/${collectionId}/words/${wordId}`);
        setWords((prev) =>
          prev.map((w) => w._id === wordId ? { ...w, collectionId: res.data.collectionId } : w)
        );
      }
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || "Failed to update collection");
    } finally {
      setOpenDropdown(null);
    }
  };

  const getCollectionName = (collectionId) => {
    const col = collections.find((c) => c._id === collectionId);
    return col ? col.name : null;
  };

  const toggleExpand = (id) => {
    setExpandedWord((prev) => (prev === id ? null : id));
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

        <div className="flex justify-end">
          <Link
            to="/quiz"
            className="border border-gray-500 px-4 py-2 text-white hover:text-green-400 text-sm md:text-base"
          >
            Start Review
          </Link>
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
                  className="flex flex-col border-b border-gray-700 py-3 gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      onClick={() => toggleExpand(item._id)}
                      className="text-xl md:text-3xl hover:text-blue-400 transition-all flex items-center gap-2 flex-wrap cursor-pointer"
                    >
                      {index + 1}. {item.word}
                      {item.collectionId && getCollectionName(item.collectionId) && (
                        <span className="text-[0.55em] bg-[#0d1117] border border-gray-600 text-gray-400 px-2 py-0 rounded-2xl">
                          {getCollectionName(item.collectionId)}
                        </span>
                      )}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item._id ? null : item._id)}
                          className="text-gray-400 hover:text-white transition-all text-sm md:text-base"
                        >
                          + Collection
                        </button>
                        {openDropdown === item._id && (
                          <div className="absolute right-0 top-full mt-1 bg-[#0d1117] border border-gray-600 z-10 min-w-[150px]">
                            <button
                              onClick={() => assignToCollection(item._id, "")}
                              className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#232730] transition-all"
                            >
                              None
                            </button>
                            {collections.map((col) => (
                              <button
                                key={col._id}
                                onClick={() => assignToCollection(item._id, col._id)}
                                className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-[#232730] transition-all"
                              >
                                {col.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => removeWord(item._id)}
                        className="text-red-400 hover:text-red-600 transition-all text-xl md:text-3xl"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {expandedWord === item._id && (
                    <div className="flex flex-col gap-3 pl-4 pt-2">
                      <p className="text-gray-400 text-sm">
                        Next review:{" "}
                        <span className="text-white">
                          {item.nextReviewDate
                            ? new Date(item.nextReviewDate).toLocaleDateString()
                            : "Not scheduled"}
                        </span>
                      </p>
                      <p className="text-gray-400 text-sm">Retention History</p>
                      {item.reviewHistory && item.reviewHistory.length > 0 ? (
                        <div style={{ width: "100%", height: 180 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={item.reviewHistory.map((r) => ({
                                date: new Date(r.date).toLocaleDateString(),
                                score: r.score
                              }))}
                              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                              <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fill: "#9ca3af", fontSize: 11 }} />
                              <Tooltip
                                contentStyle={{ backgroundColor: "#0d1117", border: "1px solid #374151", color: "#fff" }}
                              />
                              <Line type="monotone" dataKey="score" stroke="#3b82f6" dot={true} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">Not reviewed yet.</p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
