import { Link } from 'react-router-dom';
import './promo.css'

const Header = () =>{
    return (
        <section class="main-container">
            <Link className='link-leaderboard' to={`leaderboard/DATAPK_VERSION_2_1`}>Рейтинг по документации DATAPK_VERSION_2_1</Link>
            <Link className='link-leaderboard' to={`leaderboard/new_datapk800`}>Рейтинг по документации new_datapk800</Link>
        </section>
    );
}

export default Header;