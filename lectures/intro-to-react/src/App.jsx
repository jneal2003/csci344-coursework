import React from "react";
import Profile from  "./Profile.jsx";

export default function App() {
    const people = [
        {
            "name": "Anita",
            "image_url": "https://picsum.photos/id/216/100/100"
        },
        {
            "name": "Ben",
            "image_url": "https://picsum.photos/id/217/100/100"
        },
        {
            "name": "Adwaina",
            "image_url": "https://picsum.photos/id/218/100/100"
        },
        {
            "name": "Laciesha",
            "image_url": "https://picsum.photos/id/219/100/100"
        }
    ];

    return (
        <>
            <header>
                <h1>My First App</h1>
            </header>
            <main>
                <p>Hello React!</p>
                {
                    people.map((person) => {
                        return (
                            <Profile
                                name={person.name}
                                picture={person.image_url}
                            />  
                        )                  
                    })
                }
            </main>
        </>
    );
}