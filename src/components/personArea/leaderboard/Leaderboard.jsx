import React, { useState } from "react";
import { useRequestLeaderboardMe } from "./requestLeaderboardMe";

const Leaderboard = () => {
  const { userData, isLoading } = useRequestLeaderboardMe();

  if (isLoading) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <>
      <h1>Лидерборд</h1>

      {userData.datapk_itm.length > 0 && (
        <div>
          <h3>Документация: datapk_itm</h3>
          <table>
            <thead>
              <tr>
                  <th>Место</th>
                  <th>Фамилия</th>
                  <th>Имя</th>
                  <th>Кол-во очков</th>
                  <th>Кол-во пройденных тестов</th>
              </tr>
            </thead>
            <tbody>
            {userData.datapk_itm.map((participant) => (
                <tr>
                <td>{participant.place}</td>
                <td>{participant.name}</td>
                <td>{participant.surname}</td>
                <td>{participant.points}</td>
                <td>{participant.total_tests}</td>
                </tr>
            ))}
            </tbody>
          </table>
      </div>
      )}
      
      {userData.datapk.length > 0 && (
        <div>
          <h3>Документация: datapk_itm</h3>
          <table>
            <thead>
              <tr>
                  <th>Место</th>
                  <th>Фамилия</th>
                  <th>Имя</th>
                  <th>Кол-во очков</th>
                  <th>Кол-во пройденных тестов</th>
              </tr>
              </thead>
            <tbody>
            {userData.datapk.map((participant) => (
                <tr>
                <td>{participant.place}</td>
                <td>{participant.name}</td>
                <td>{participant.surname}</td>
                <td>{participant.points}</td>
                <td>{participant.total_tests}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </>
  );
};

export default Leaderboard;
