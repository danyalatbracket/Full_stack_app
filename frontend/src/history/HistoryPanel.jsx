import React, { useEffect, useState } from "react";
import MCQChallege from "../challenge/MCQChallege";

const HistoryPanel = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErro] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="loading">Loading History...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={fetchHistory}>Retry</button>
      </div>
    );
  }
  return (
    <>
      <div className="history-panel">
        <h2>History</h2>
        {history?.length === 0 ? (
          <p>No Challenge History</p>
        ) : (
          <div className="history-list">
            {history?.map((challenge) => (
              <MCQChallege
                challenge={challenge}
                key={challenge?.id}
                showExplanation={true}
              ></MCQChallege>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryPanel;
