import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"

//grabs data from fetch call and sends to be rendered----------------------------
export const AnimalList = () => {
    // This state changes when `getAnimals()` is invoked below
    const { animals, getAnimals } = useContext(AnimalContext)
    //useContext carries fetch call data as an object

    //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("AnimalList: useEffect - getAnimals")
        //calls getAnimals which then populates animals with data from API 
        getAnimals()
        
    }, [])

    //maps through animals array of data from API
    return (
        <div className="animals">
            {console.log("AnimalList: Render", animals)}
            {
                animals.map(animal => {
                    return <AnimalCard key={animal.id} animal={animal} />
                })
            }
        </div>
    )
}