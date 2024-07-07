import React from 'react';
import Header from '../components/main/header/Header';
import Leaderboard from '../components/leaderboard/Leaderboard.jsx';


const LeaderboardPage = () => {
    console.log('leaderboard')
    return (
        <div>
            <Header />
            <Leaderboard />
        </div>
    );
}

export default LeaderboardPage;