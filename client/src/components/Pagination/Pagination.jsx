import React from "react";

export default function Pagination ({gamesPerPage , allVideogames , pagination}){
    const pageNumbers = []

    for (let i = 0 ; i < Math.ceil(allVideogames/gamesPerPage) ; i++){
            pageNumbers.push(i + 1 )
    }

    return(
        <nav>
            <ul>
                {pageNumbers && 
                pageNumbers.map(n =>(
                    <button onClick={()=> pagination(n)}>{n}</button>
                ))}
            </ul>
        </nav>
    )
}