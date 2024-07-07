import { useRequastLeaderboardMe } from "./requestLeaderboardMe"
export default function Leaderboard(){
    const {userData} = useRequastLeaderboardMe();
    return (
        <div>
            <span>Рейтинг</span>
            <div>
                {userData}
            </div>
        </div>
    )
}