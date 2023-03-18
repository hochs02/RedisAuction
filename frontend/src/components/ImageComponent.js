import React from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Vase from '../images/mingvase.jpg';
import './image.css';

export default function ImageComponent(){
    return(
        <div>
            <img alt="Bildmaterial des Auktions-Objekts" className="image" src={Vase}/>
        </div>
    );
};