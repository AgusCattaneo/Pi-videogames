import React from "react";
import {Link , useParams } from "react-router-dom";
import {useDispatch , useSelector} from "react-redux";
import {getDetail} from "../../actions/index";
import { useEffect } from "react";

export default function Detail(){

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getDetail(id));
    }, [dispatch , id])

    const myVideogame = useSelector((state) => state.detail)

    console.log(myVideogame)

    return (
        <div key={myVideogame.id}>
            {
                myVideogame?
                <div>
                    <img src= {myVideogame.img? myVideogame.img : myVideogame.image} alt="File not found" width="300px" height="300px" />
                    <div>
                        <h1>{myVideogame.name}</h1>
                        <p>{myVideogame.description}</p>
                        <h4>Genres: {!myVideogame.createdInDb? myVideogame.genres + ' ' : myVideogame.genres.map(e => e.name + (' '))}</h4>
                        <p>Rating: {myVideogame.rating}</p>
                        <p>Release Date: {myVideogame.released} </p>
                        <p>Platforms: {myVideogame.platforms + ' '}</p>
                    </div>
                </div> : <p>Loading...</p>
            } 
            <Link to='/home'>
                <button>Go back</button>
            </Link>
        </div>
    )
}