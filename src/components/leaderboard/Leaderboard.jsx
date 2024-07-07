import React from 'react';
import { useRequastLeaderboard } from "./requestLeaderboard";
import './leaderboard.css';

function Leaderboard() {
  const { userData } = useRequastLeaderboard();

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item) => (
            <tr key={item.id}>
              <td>{item.place}</td>
              <td>{item.name}</td>
              <td>{item.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;