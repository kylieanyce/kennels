import React, { useState, createContext } from "react"


// The context is imported and used by individual components that need data
export const LocationContext = createContext()

// This component establishes what data can be used.
export const LocationProvider = (props) => {
    //setting two empty vars to be a state var and a function
    //useState will be the value of these vars
    const [locations, setLocations] = useState([])
    //fetch call returns data to setlocations and useState changes
    //locations var to be set to the retrieved data
    const getLocations = () => {
        return fetch("http://localhost:8088/locations/?_embed=employees&_embed=animals")
            .then(res => res.json())
            .then(setLocations)
    }
    //this fetch call takes an locationObj parameter to post to the API
    //then gets locations from API
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

    const getLocationById = (id) => {
        return fetch(`http://localhost:8088/locations/${id}?_embed=employees&_embed=animals`)
            .then(res => res.json())
    }

    const updateLocation = location => {
        return fetch(`http://localhost:8088/locations/${location.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
            .then(getLocations)
    }
    /*
        You return a context provider which has the
        `locations` state, `getlocations` function,
        and the `addlocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <LocationContext.Provider value={{
            locations, getLocations, addLocation, getLocationById, updateLocation
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}