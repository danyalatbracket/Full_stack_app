import { useEffect, useState } from "react";
import MCQChallege from "./MCQChallege";
import { useApi } from "../utils/api";

const ChallengeGenerator = () => {
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [quota, setQuota] = useState(null);
  const { makeRequest } = useApi();

  useEffect(() => {
    fetchQuota();
  }, []);

  const fetchQuota = async () => {
    try {
      const data = await makeRequest("quota");
      setQuota(data);
    } catch (error) {
      console.warn(error);
    }
  };

  const generateChallenge = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await makeRequest("generate-challenge", {
        method: "POST",
        body: JSON.stringify({ difficulty }),
      });

      setChallenge(data);
      fetchQuota();
      setIsLoading(false);
    } catch (error) {
      setError(error.message || "Failed to Generate Challenge");
    }
  };

  const getNextResetTime = () => {
    if (!quota?.last_reset_date) return null;
    const resetDate = new Date(quota?.last_reset_date);
    resetDate.setHours(resetDate.getHours() + 24);
    return resetDate;
  };

  return (
    <>
      <div className="challenge-container">
        <h2>Coding Challenge Generator</h2>

        <div className="quota-display">
          <p>Challenges Remaining Today: {quota?.quota_remaining || 0}</p>
          {quota?.quota_remaining === 0 && (
            <p>Next reset: {getNextResetTime()?.toLocaleString()}</p>
          )}
        </div>

        <div className="difficulty-selector">
          <label htmlFor="difficulty">Select Difficulty</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={isLoading}
          >
            <option value="easy">easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button
          onClick={generateChallenge}
          // disabled={isLoading || quota?.quota_remaining === 0}
          className="generate-button"
        >
          {isLoading ? "Generating" : "Generate Challenge"}
        </button>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {challenge && <MCQChallege challenge={challenge}></MCQChallege>}
      </div>
    </>
  );
};

export default ChallengeGenerator;
