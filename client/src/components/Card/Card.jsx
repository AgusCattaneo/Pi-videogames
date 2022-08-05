import React from "react";
import styles from "./Card.module.css"

export default function GameCard({ name , image , genres , createdInDb}){
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>{name}</h3>
            <img src={image} alt ='not found' width="200px" heigth="150px" />
            <p className={styles.genres}>{!createdInDb? genres + ' ' : genres.map(e => e.name + (' '))}</p>
        </div>
    );
}