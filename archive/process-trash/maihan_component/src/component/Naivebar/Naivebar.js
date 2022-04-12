import React from 'react'
import logo from '../../image/logo.jpg'
import '../../css/Naivebar.css'
const naivebar = props =>(
    <header className='naivebar'> 
        <nav className='naivebar-n'>
        <img src={logo} className='logo' alt=''/>
            <div className='MIDIchef'>MIDIchef</div>
            <form className="search-bar" action="/search" autocomplete="off" method="get">
                <input type="text" placeholder="Search tracks, collections, and artists..."/>
            </form>
            <ul className='urlbar'>
                <li><a href='/'>Explore</a></li>
                <li><a href='/'>Create</a></li>
                <li><a href='/'>Kitchen</a></li>
                <li className='Sign'><a href='/'><strong>Sign In</strong></a></li>
            </ul>
            <div></div>
            <div></div>
        </nav>
    </header>

)
export default naivebar;