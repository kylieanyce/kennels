import React, { useState, createContext } from "react"


// The context is imported and used by individual components that need data
export const AnimalContext = createContext()

// This component establishes what data can be used.
export const AnimalProvider = (props) => {
    //useState sets the var and function it returns, initially they are empty
    const [animals, setAnimals] = useState([])
    //fetch call returns data to setAnimals and useState changes
    //animals var to be set to the retrieved data
    const getAnimals = () => {
        return fetch("http://localhost:8088/animals?_expand=location")
            .then(res => res.json())
            .then(setAnimals)
    }
    //this fetch call takes an animalObj parameter to post to the API
    //then gets animals from API
    const addAnimal = animalObj => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animalObj)
        })
            .then(response => response.json())
            .then(getAnimals)
    }
    // gets specific animal with matching id parameter
    const getAnimalById = (id) => {
        return fetch(`http://localhost:8088/animals/${id}?_expand=location&_expand=customer`)
            .then(res => res.json())
    }
    // edits animal entry
    const updateAnimal = animal => {
        return fetch(`http://localhost:8088/animals/${animal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
            .then(getAnimals)
    }
    // deletes an animal with specific id parameter then getAnimals
    const releaseAnimal = animalId => {
        return fetch(`http://localhost:8088/animals/${animalId}`, {
            method: "DELETE"
        })
            .then(getAnimals)
    }
    // puts array and functions into AnimalContext as objects so they 
    // can be accessed in other components
    return (
        <AnimalContext.Provider value={{
            animals, getAnimals, addAnimal, getAnimalById, releaseAnimal, updateAnimal
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}