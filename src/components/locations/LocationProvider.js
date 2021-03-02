import React, { useState, createContext } from "react"


// The context is imported and used by individual components that need data
export const LocationContext = createContext()

// This component establishes what data can be used.
export const LocationProvider = (props) => {
    //setting two empty vars to be a state var and a function
    //useState will be the value of these vars
    const [locations, setLocations] = useState([])
    //fetch call returns data to setAnimals and useState changes
    //animals var to be set to the retrieved data
    const getLocations = () => {
        return fetch("http://localhost:8088/locations")
        .then(res => res.json())
        .then(setLocations)
    }
    //this fetch call takes an animalObj parameter to post to the API
    //then gets animals from API
    const addLocation = locationObj => {
        return fetch("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationObj)
        })
        .then(response => response.json())
        .then(getLocations)
    }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <LocationContext.Provider value={{
            locations, getLocations, addLocation
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}