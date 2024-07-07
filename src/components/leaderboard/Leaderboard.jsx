import React, { useEffect, useState } from 'react';
import { useRequastLeaderboard } from "./requestLeaderboard"
import axios from 'axios';
import './leaderboard.css'

const Leaderboard = () => {
  const {userData} = useRequastLeaderboard();


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
          {userData.map((item, index) => (
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