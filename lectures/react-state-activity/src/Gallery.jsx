import React from "react";

import { useState } from "react";

export default function Gallery( {galleries} ) {
    const [ current, setCurrent ] = useState(galleries[0]);

    function setNature() {
        setCurrent(galleries[0])
    }
    function setCity() {
        setCurrent(galleries[1])
    }
    function setAnimals() {
        setCurrent(galleries[1])
    }

    return (
        <div>
            <button onClick = {setNature} >{galleries[0].name}</button>
            <button onClick = {setCity} >{galleries[1].name}</button>
            <button onClick = {setAnimals} >{galleries[2].name}</button>
        </div>
    )
}