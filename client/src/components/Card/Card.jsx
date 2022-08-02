import React from "react";

export default function GameCard({ name , image }){
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt ='not found' width="400px" heigth="250px" />
        </div>
    );
}