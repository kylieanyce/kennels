import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../locations/LocationProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import { AnimalCard } from "./Animal"
import "./Animal.css"

//grabs data from fetch call and sends to be rendered----------------------------
export const AnimalList = () => {
    // useContext sets the object of a var and a function and fills them
    // with whatever data is being passed from AnimalContext
    const { animals, getAnimals } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    // useEffect actually calls the fetch function getAnimals,
    // changing the state of animals by filling it with data
    useEffect(() => {
        console.log("AnimalList: useEffect - getAnimals")
        getLocations()
            .then(getCustomers)
            .then(getAnimals)
            console.log(animals, locations, customers)
    }, [])

    //maps through animals array of data from API
    return (
        <div className="animals">
            {console.log("AnimalList: Render", animals)}
            {
                animals.map(animalObj => {
                    const owner = customers.find(c => c.id === animalObj.customerId)
                    const clinic = locations.find(l => l.id === animalObj.locationId)
                    //uses AnimalCard to convert each animal object to HTML
                    //the id is set to key so that each time it iterates through, a new
                    //distinct obj is returned. animal is the props attribute
                    //which is set to animalObj. AnimalCard takes in a props
                    //parameter so that's where it goes.
                    return <AnimalCard key={animalObj.id}
                        location={clinic}
                        customer={owner}
                        animal={animalObj} />
                })
            }
        </div>
    )
}