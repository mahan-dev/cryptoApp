import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header'>
            <p className='ml-auto  mr-auto' >
                coinzi
            </p>
            <div className='cursor-pointer'>
                <p> <Link to="/favorite_coin">favorite</Link> </p>
            </div>
        </header>
    );
};

export default Header;