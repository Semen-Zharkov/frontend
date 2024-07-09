import React from 'react';
import Header from '../components/main/header/Header.jsx';
import Leaderboard from '../components/leaderboard/Leaderboard.jsx';


const LeaderboardDatapkPage = (props) => {
    return (

        <div>
            {console.log(props, '1')}
            <Header />
            <Leaderboard data={props.data}/>
        </div>
    );
}

export default LeaderboardDatapkPage;