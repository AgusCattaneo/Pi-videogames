import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'


export default function LandingPage(){
    return(
        <div className={styles.container}>
        <div className={styles.bg}>
            <h1 className={styles.title}>Videogames App</h1>
            <Link to = '/home'>
                <button className={styles.btn}>Press start</button>    
            </Link>
        </div>
        </div>
    )
}