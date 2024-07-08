import { useRequastLeaderboardMe } from "./requestLeaderboardMe"
export default function Leaderboard(){
    const {userData} = useRequastLeaderboardMe();
    return (
        <div>
            <h1>Leaderboard</h1>
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
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.points}</td>
                    <td>{item.total_tests}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}