import React from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './topbar.css';
import Logo from '../images/logo.png';

export default function TopBar(){
    return(
        <div>
            <div className="topbar ps-5">
                <span className="logotext"><img className="logoimage pe-5" alt="Logo der Webseite" src={Logo}/>Zum Höchstpreis erworben</span>
            </div>
            <div className="pb-5"></div>
        </div>
    );
};