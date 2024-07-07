import { useRequastLeaderboardMe } from "./requestLeaderboardMe"
export default function Leaderboard(){
    const {userData} = useRequastLeaderboardMe();
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
    )
}