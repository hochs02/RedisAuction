import React from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Iphone from '../images/iphone_quer.jpg';
import './image.css';

export default function ImageComponent(){
    return(
        <div>
            <img alt="Bildmaterial des Auktions-Objekts" className="image" src={Iphone}/>
        </div>
    );
};