import React from "react";
import "./Carousel.css";
import { useState } from 'react';

export default function Carousel({ photos }) {
    const [index, setIndex] = useState(0);

    function next(){
        if (index == photos.length - 1) {
            setIndex(0)
        }
        else {
            setIndex(index + 1)
        }    
    }

    function previous(){
        if (index == 0) {
            setIndex(9)
        }
        else {
            setIndex(index - 1)
        }
    }


    return (
        <div className="carousel">
            {/* display the first image in the gallery array below */}
            {/* also display a "Photo X of Y" message below the image */}
            <img
                src= {photos[index]}
                alt="pic 1" 
            />
            <p>showing photo {index + 1} of {photos.length}</p>
            <button onClick = {previous} >Previous</button>
            <button onClick = {next} >Next</button>
        </div>
    );
}
