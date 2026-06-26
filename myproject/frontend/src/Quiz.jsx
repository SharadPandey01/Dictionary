import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Quiz() {
  const { axiosInstance } = useAuth();
  const [dueWords, setDueWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextReviewDate, setNextReviewDate] = useState(null);

  useEffect(() => {
    const fetchDue = async () => {
      try {
        const res = await axiosInstance.get("/quiz/due");
        setDueWords(res.data);
        if (res.data.length === 0) {
          const allRes = await axiosInstance.get("/mywords");
          const upcoming = allRes.data
            .filter((w) => w.nextReviewDate)
            .sort((a, b) => new Date(a.nextReviewDate) - new Date(b.nextReviewDate));
          if (upcoming.length > 0) {
            setNextReviewDate(new Date(upcoming[0].nextReviewDate));
          }
        }
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchDue();
  }, []);

  const handleScore = async (score) => {
    const word = dueWords[currentIndex];
    try {
      await axiosInstance.post(`/quiz/review/${word._id}`, { score });
    } catch {
    }
    const next = currentIndex + 1;
    if (next >= dueWords.length) {
      setDone(true);
    } else {
      setCurrentIndex(next);
      setShowAnswer(false);
    }
    setReviewedCount((c) => c + 1);
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

  if (dueWords.length === 0) {
    return (
      <div className="min-h-screen flex justify-center bg-[#010409] text-white pt-10">
        <div className="w-[95%] md:w-[60%] flex flex-col gap-6 border border-white p-5">
          <div className="text-[2em] md:text-5xl font-bold font-serif text-center">Quiz</div>
          <p className="text-gray-400 text-center">No words are due for review right now.</p>
          {nextReviewDate && (
            <p className="text-gray-400 text-center">
              Next review scheduled:{" "}
              <span className="text-white">
                {nextReviewDate.toLocaleDateString()} at {nextReviewDate.toLocaleTimeString()}
              </span>
            </p>
          )}
          <div className="flex justify-center">
            <Link to="/MyWords" className="text-blue-400 hover:text-blue-300">
              Back to My Words
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen flex justify-center bg-[#010409] text-white pt-10">
        <div className="w-[95%] md:w-[60%] flex flex-col gap-6 border border-white p-5">
          <div className="text-[2em] md:text-5xl font-bold font-serif text-center">Quiz</div>
          <p className="text-center text-lg">
            Session complete! You reviewed <span className="text-green-400">{reviewedCount}</span> word{reviewedCount !== 1 ? "s" : ""}.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/MyWords" className="text-blue-400 hover:text-blue-300">
              Back to My Words
            </Link>
            <Link to="/dashboard" className="text-blue-400 hover:text-blue-300">
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const current = dueWords[currentIndex];
  const definition =
    current.data?.meanings?.[0]?.definitions?.[0]?.definition || "No definition available.";
  const partOfSpeech = current.data?.meanings?.[0]?.partOfSpeech || "";

  return (
    <div className="min-h-screen flex justify-center bg-[#010409] text-white pt-10">
      <div className="w-[95%] md:w-[60%] flex flex-col gap-6 border border-white p-5">
        <div className="text-[2em] md:text-5xl font-bold font-serif text-center">Quiz</div>

        <p className="text-gray-400 text-sm text-center">
          {currentIndex + 1} / {dueWords.length}
        </p>

        <div className="border border-gray-600 p-6 flex flex-col gap-4">
          <p className="text-3xl md:text-4xl font-serif font-bold text-center">{current.word}</p>

          {!showAnswer ? (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAnswer(true)}
                className="border border-gray-500 px-6 py-2 text-white hover:text-green-400"
              >
                Show Answer
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {partOfSpeech && (
                <p className="text-gray-400 text-sm italic">{partOfSpeech}</p>
              )}
              <p className="text-white">{definition}</p>

              <p className="text-gray-400 text-sm mt-4">How well did you remember?</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleScore(0)}
                  className="border border-red-400 px-4 py-2 text-red-400 hover:text-white"
                >
                  Forgot (0)
                </button>
                <button
                  onClick={() => handleScore(2)}
                  className="border border-yellow-400 px-4 py-2 text-yellow-400 hover:text-white"
                >
                  Hard (2)
                </button>
                <button
                  onClick={() => handleScore(4)}
                  className="border border-blue-400 px-4 py-2 text-blue-400 hover:text-white"
                >
                  Good (4)
                </button>
                <button
                  onClick={() => handleScore(5)}
                  className="border border-green-400 px-4 py-2 text-green-400 hover:text-white"
                >
                  Easy (5)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
