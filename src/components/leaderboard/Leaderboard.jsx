import React from 'react';
import { useRequastLeaderboard } from "./requestLeaderboard";
import './leaderboard.css';

function Leaderboard({ data }) {
  const { userData, isLoggedIn } = useRequastLeaderboard(data);
    console.log(data, '2')
  if (!isLoggedIn || !userData.length) {
    return <h1>Загрузка данных...</h1>;
  }

  return (
    <>
      {console.log(data)}
      <h1>Лидерборд для документации {data}</h1>
      <table>
        <thead>
          <tr>
            <th>Место</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Кол-во пройденных тестов</th>
            <th>Кол-во очков</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item) => (
            <tr key={item.id}>
              <td>{item.place}</td>
              <td>{item.surname}</td>
              <td>{item.name}</td>
              <td>{item.total_tests}</td>
              <td>{item.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Leaderboard;