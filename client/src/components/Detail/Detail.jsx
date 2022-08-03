import React from "react";
import {Link , useParams } from "react-router-dom";
import {useDispatch , useSelector} from "react-redux";
import {getDetail} from "../../actions/index";
import { useEffect } from "react";
import styles from "./Detail.module.css"

export default function Detail(){

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getDetail(id));
    }, [dispatch , id])

    const myVideogame = useSelector((state) => state.detail)

    console.log(myVideogame)

    return (
        <div className={styles.container} key={myVideogame.id}>
                        <Link to='/home'>
                <button className={styles.button}>Go back</button>
            </Link>
            {
                myVideogame?
                <div className={styles.detail}>
                    <img className={styles.img} src= {myVideogame.img? myVideogame.img : myVideogame.image} alt="File not found"/>
                    <div className={styles.detcontainer}>
                        <h1 className={styles.h1}>{myVideogame.name}</h1>
                        <p className={styles.description}>{myVideogame.description}</p>

                        <div>
                            <h5 className={styles.h5} >Genres:</h5>
                            <p className={styles.p}>{!myVideogame.createdInDb? myVideogame.genres + ' ' : myVideogame.genres.map(e => e.name + (' '))}</p>
                        </div>
                        <div>
                            <h5 className={styles.h5}>Rating:</h5>
                            <p className={styles.p}>{myVideogame.rating}</p>
                        </div>
                        <div>
                            <h5 className={styles.h5}>Release Date:</h5>
                            <p className={styles.p}>{myVideogame.released}</p>
                        </div>
                        <div>
                            <h5 className={styles.h5}>Platforms: </h5>
                            <p className={styles.p}>{myVideogame.platforms + ' '}</p>
                        </div>
                    </div>
                </div> : <p className={styles.loading}>Loading...</p>
            } 
        </div>
    )
}