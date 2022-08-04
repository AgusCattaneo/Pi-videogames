import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesName } from "../../actions";
import styles from "./SearchBar.module.css"

export default function SearchBar ({setCurrentPage}){
    const dispatch = useDispatch()
    const [name , setName] = useState('')

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
    } 

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getVideogamesName(name)) 
        setName("")
        setCurrentPage(1)
    }

    return (
        <div className={styles.search}>
            <input
            type = 'text'
            className={styles.searchBar}
            placeholder="Search Videogame ..."
            onChange={(e)=> handleInputChange(e)}
            />
            <button className={styles.searchBtn} type="submit" onClick={(e)=> handleSubmit(e)}>Search</button>
        </div>
    )
}