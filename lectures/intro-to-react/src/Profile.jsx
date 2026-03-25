import React from "react";

export default function Profile( {name, picture}) {
    return (
        <section className="profile">
            Profile Goes here!
            <h3>{name}</h3>
            <img src={picture} alt="hm" />
        </section>
    );
}