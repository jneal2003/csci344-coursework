import React from "react";
import "./Card.css";

export default function Card({ name, image_url, description }) {
  return (
    <section className="card">
        <h2>{name}</h2>
        <img src={image_url} alt="{name}"/>
        <p>{description}</p>
    </section>
  );
}