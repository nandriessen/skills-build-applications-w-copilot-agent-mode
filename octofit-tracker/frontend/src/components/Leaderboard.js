import React, { useEffect, useState } from 'react';


function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('https://orange-carnival-gg9rggwjr56265g-8000.app.github.dev/api/leaderboard/')
      .then(response => response.json())
      .then(data => setLeaderboard(data))
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="text-primary">Leaderboard</h1>
        <a href="/activities" className="btn btn-outline-primary">View Activities</a>
      </div>
      <div className="row justify-content-center">
        {leaderboard.map(entry => (
          <div className="col-md-6 mb-3" key={entry._id}>
            <div className="card shadow">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-1">{entry.user && entry.user.username ? entry.user.username : entry.user}</h5>
                  <p className="card-text text-muted mb-0">Score: <span className="fw-bold">{entry.score}</span></p>
                </div>
                <button className="btn btn-primary btn-sm">Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
