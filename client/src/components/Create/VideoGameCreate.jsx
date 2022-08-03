import React from "react";
import { useState , useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import { postVideogame , getGenres  } from "../../actions";
import styles from './VideoGameCreate.module.css'

function validate (input){
    let errors = {}

    if(!input.name){
        errors.name = 'Name required'
    }

    if(input.image.length !== 0 &&  !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.image)){
        errors.image = 'invalid URL'
    }

    if(!input.description) {
        errors.description = 'Description required'
    } else if(input.description.length > 100 ){
        errors.description = 'Description is too long (Max = 100 ), please enter a shoter description'
    }

    if(!input.released){
        errors.released = 'Release date required'
    }
    
    if(!input.rating){
        errors.rating = 'Rating required'
    } else if(input.rating > 5 || input.rating < 0){
        errors.rating = 'Rating score must be between 0 and 5'
    }

    return errors 
}

export default function VideogameCreate(){
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const genres = useSelector((state) => state.genres)

    const allGames = useSelector((state) => state.videogames)

    const [input , setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        image: "",
        genre: [],

    })

    const [errors , setErrors ] = useState({})

    useEffect(()=> {
        dispatch(getGenres())
    }, [dispatch]);

    const plats = [
    "PC",
    "PS5",
    "PS4",
    "PS3",
    "PS2",
    "PS1",
    "Xbox Series",
    "Xbox One",
    "Xbox 360",
    "Xbox",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "GameCube",
    "Game Boy",
    "SNES",
    "NES",
    "Commodore",
    "Atari",
    "Genesis",
    "SEGA",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
    ];
   

    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: [e.target.value]
          })
        )      
        console.log(input)
        console.log(errors)
    }

    function handleSelect(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                genre: [...input.genre, e.target.value]
            })
        } else if(!e.target.checked){
            setInput({
                ...input,
                genre: input.genre.filter((g)=> g !== e.target.value)
            })
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(plat => plat !== e)
        })
    }
 
    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        console.log(errors)
        let noRepeate = allGames.filter(g => g.name === input.name)
        if(noRepeate.length !== 0){
            alert('There is already a videogame with that name, please enter another name')
        } else {
            let error = Object.keys(validate(input))
            if(error.length !== 0 || !input.genre.length || !input.platforms.length){
                alert('Please fill all the fields correctly')
                return
            } else {
                dispatch(postVideogame(input))
                setInput({
                    name: "",
                    description: "",
                    released: "",
                    rating: "",
                    platforms: [],
                    image: "",
                    genre: [], 
                })
                alert("Videogame Added")
            }
        }
        navigate('/home')
        
        
    }

    return(
        <div className={styles.container}>
            <div>
            <Link to= '/home'><button className={styles.home}>Go back</button></Link>
            <h1 className={styles.h1}>Enter New Videogame</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type= "text"
                    required
                    value= {input.name}
                    name= "name"
                    onChange={(e)=> handleChange(e)}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>


                <div>
                    <label>Description:</label>
                    <input
                    type= "text"
                    required
                    value= {input.description}
                    name= "description"
                    onChange={(e)=> handleChange(e)}
                    />
                    {errors.description && (
                        <p>{errors.description}</p>
                    )}
                </div>


                <div>
                    <label>Release Date:</label>
                    <input
                    type= "date"
                    required
                    value= {input.released}
                    name= "released"
                    onChange={(e)=> handleChange(e)}
                    />
                    {errors.released && (
                        <p>{errors.released}</p>
                    )}
                </div>


                <div>
                    <label>Rating:</label>
                    <input
                    type= "number"
                    required
                    value= {input.rating}
                    name= "rating"
                    onChange={(e)=> handleChange(e)}
                    />
                    {errors.rating && (
                        <p>{errors.rating}</p>
                    )}
                </div>


                <div>
                    <label>Genres:</label>         
                        {genres.map((g)=> (
                            <label><input
                            type="checkbox"
                            name={g.name}
                            value={g.name}
                            onChange={(e)=> handleCheck(e)}
                            />{g.name}</label>
                        ))}

                </div>


                <div>
                    <label>Image:</label>
                    <input
                    type= "text"
                    value={input.image}
                    name= "image"
                    onChange={(e)=> handleChange(e)}
                    />
                </div>

                <div>
                    <label>Platforms:</label>
                    <select onChange={(e)=>handleSelect(e)}>
                        <option value="" hidden >Platforms</option>
                        {plats.map((p)=> (
                            <option value={p}>{p}</option>
                        ))}
                    </select>
                    {input.platforms.map(p =>
                        <div>
                            <p>{p}</p>
                            <button onClick={()=> handleDelete(p)}>x</button> 
                        </div>
                    )}
                </div>

                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}