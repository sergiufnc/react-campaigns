import React from 'react';

import logo from './logo.svg';
import style from './Header.scss';

const Header = () => (
    <header className="header">
        <a href="/">
            <span>Ad Campaigns</span>
            <img alt="Ad Campaigns" src={logo} />
        </a>
    </header>
);

export default Header;
