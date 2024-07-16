import { Link } from 'react-router-dom';
import './promo.css'

const Header = () =>{
    return (
        <section class="main-container">
            <Link className='link-leaderboard' to={`leaderboard/DATAPK_VERSION_2_1`}>Рейтинг по документации DATAPK_VERSION_2_1</Link>
<<<<<<< HEAD
            <Link className='link-leaderboard' to={`leaderboard/DATAPK_ITM_VERSION_1_7`}>Рейтинг по документации DATAPK_ITM_VERSION_1_7</Link>
=======
            <Link className='link-leaderboard' to={`leaderboard/new_datapk800`}>Рейтинг по документации new_datapk800</Link>
>>>>>>> 5c20dd4a1a1f374e451c307c83d9e1b8ad234dec
        </section>
    );
}

export default Header;