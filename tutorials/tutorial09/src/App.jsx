import React from "react";
import Card from "./components/Card"
import AntdCard from "./components/AntCard";
import AntdCaousel from "./components/AntdCarousel";
import AntdCalender from "./components/AntdCalender"
import { Image } from "antd";


export default function App() {

    return (
        <>
            <header>
                <h1>My First App</h1>
            </header>
            <main>
                <p>Hello React!</p>
            </main>
            <Card
                name="Dog"
                image_url="https://picsum.photos/id/237/400/300"
                description="A dog named dog."
            />
            <Card
                name="Spongebob"
                image_url="https://i.scdn.co/image/ab6761610000e5eb877d4c061d08c040974224be"
                description="A sponge named bob."
            />
            <Card
                name="Marky Z"
                image_url="https://i.pinimg.com/736x/36/f6/2e/36f62e49f8920ed6b105426fa073669a.jpg"
                description="A man named mark."
            />
            <Image
                width={400}
                alt="basic"
                src="https://photos.zillowstatic.com/fp/6acaef4ff6dd21bd6ec75d18c37751bf-h_l.jpg"
            />
            <AntdCard
                name="Marky Z"
                image_url="https://i.pinimg.com/736x/36/f6/2e/36f62e49f8920ed6b105426fa073669a.jpg"
                description="A man named mark."
            />
            <AntdCaousel
            
            />
            <AntdCalender
                
            />
        </>
    );
}