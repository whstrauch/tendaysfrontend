import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';

const Nav = ({rules}) => {
    const {pathname} = useLocation();



    const navClass = classNames({
        'nav-bar': true,
        'in-game': pathname.startsWith("/play")
    })

    return (
        <div className={navClass}>
            <div style={{width: '45px'}}></div>
            <h1 className='title'>TEN DAYS IN AFRICA</h1>
            <Menu color={pathname.startsWith("/play") ? "white" : "black"} rules={rules}/>
        </div>
    );
};

export default Nav;