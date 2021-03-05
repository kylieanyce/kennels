import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { AnimalContext } from "./AnimalProvider"
// import { LocationContext } from "../locations/LocationProvider"
// import { CustomerContext } from "../customers/CustomerProvider"
import { AnimalCard } from "./Animal"
import "./Animal.css"

//grabs data from fetch call and sends to be rendered
export const AnimalList = () => {
    // useContext sets the object of a var and a function and fills them
    // with whatever data is being passed from AnimalContext
    const { animals, getAnimals, searchTerms } = useContext(AnimalContext)
    // const { locations, getLocations } = useContext(LocationContext)
    // const { customers, getCustomers } = useContext(CustomerContext)

    const [filteredAnimals, setFiltered] = useState([])
    // The useHistory hook let's us tell React which route we want to visit. We will use it to tell React to render the animal form component.
    const history = useHistory()

    // USE EFFECT FOR FETCH CALL WITHOUT EXPAND OR EMBED---------------------------------------
    // useEffect actually calls the fetch function getAnimals,
    // changing the state of animals by filling it with data
    // useEffect(() => {
    //     //getAnimals last, something to do with .map???
    //     getLocations()
    //         .then(getCustomers)
    //         .then(getAnimals)
    // }, [])

    useEffect(() => {
        getAnimals()
    }, [])

    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change
    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching animals
            const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all animals
            setFiltered(animals)
        }
    }, [searchTerms, animals])

    return (
        <>
            <h1>Animals</h1>

            <button onClick={() => history.push("/animal/create")}>
                Add Animal
            </button>
            <div className="animals">
                {
                    filteredAnimals.map(animal => {
                        return <AnimalCard key={animal.id} animal={animal} />
                    })
                }
            </div>
        </>
    )
}

// RENDER FOR FETCH WITHOUT EXPAND OR EMBED---------------------------------------------------------
//
// // contains add animal button and renders animal list
// return (
//     <div className="animals">
//         {/* this button directs the user to the animal form function to add animal */}
//         <button onClick={() => { history.push("/animal/create") }}>
//             Add Animal
//         </button>
//         {
//             animals.map(animalObj => {
//                 //for each animal, find customer that has same id and animal.customerId
//                 const owner = customers.find(c => c.id === animalObj.customerId)
//                 //then find each location with same id as animal.locationID
//                 const clinic = locations.find(l => l.id === animalObj.locationId)
//                 //uses AnimalCard to convert each animal object to HTML
//                 //the id is set to key so that each time it iterates through, a new
//                 //distinct obj is returned. animal is the props attribute
//                 //which is set to animalObj. AnimalCard takes in a props
//                 //parameter so that's where it goes.
//                 return <AnimalCard key={animalObj.id}
//                     //send info as props to AnimalCard
//                     location={clinic}
//                     customer={owner}
//                     animal={animalObj} />
//             })
//         }
//     </div>
// )