import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import "./Animal.css"
import { useHistory, useParams } from 'react-router-dom';

// creates form to add an animal with location and customer drop down menu
// or to edit an existing animal
export const AnimalForm = () => {
    // grabs context for Animal, Location, and Customer
    const { addAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    // useState destructures into var and function, sets animal to be an object
    const [animal, setAnimal] = useState({
        name: "",
        breed: "",
        customerId: 0,
        locationId: 0
    });
    // create a state that keeps user from pressing button before data is saved 
    // deleted from API
    const [isLoading, setIsLoading] = useState(true);
    // grab animalId from url
    const { animalId } = useParams();
    // useHistory puts log of previous clicks into array names history
    const history = useHistory();

    // similar to event listener. This causes a re-render and updates the view.
    const handleControlledInputChange = (event) => {
        // creates copy of animal object with spread so it expands keys to be filled 
        // with values 
        const newAnimal = { ...animal }
        // grabs value of input from target and sets to newAnimal var
        newAnimal[event.target.id] = event.target.value
        // update state with newAnimal
        setAnimal(newAnimal)
    }

    // function that saves or adds animal
    const handleSaveAnimal = () => {
        // if animal.locationId doesn't exist, user cannot press save button
        if (parseInt(animal.locationId) === 0) {
            window.alert("Please select a location")
        } else {
            // disable the button - no extra clicks. This is when data is 
            // being sent to API
            setIsLoading(true);
            // If the URL has the animalId in it, update animal will be shown on DOM
            if (animalId) {
                updateAnimal({
                    // updateAnimal functions grabs animal data and displays so it
                    // can be altered
                    id: animal.id,
                    name: animal.name,
                    breed: animal.breed,
                    locationId: parseInt(animal.locationId),
                    customerId: parseInt(animal.customerId)
                })
                    // then redirects user to see updated animal
                    .then(() => history.push(`/animals/detail/${animal.id}`))
            } else {
                // if the URL doesn't have an animal.id, add animal will be on DOM
                addAnimal({
                    name: animal.name,
                    breed: animal.breed,
                    locationId: parseInt(animal.locationId),
                    customerId: parseInt(animal.customerId)
                })
                    // then redirects user to see updated animal list
                    .then(() => history.push("/animals"))
            }
        }
    }

    // This is how data is displayed on DOM initially
    useEffect(() => {
        // get customers and locations
        getCustomers().then(getLocations).then(() => {
            // If animalId is in the URL, getAnimalById
            if (animalId) {
                getAnimalById(animalId)
                    // take animal object data and change state
                    .then(animal => {
                        setAnimal(animal)
                        // animal is displayed and setIsLoading is false bc nothing is 
                        // being updated in API, only displayed
                        setIsLoading(false)
                    })
            } else {
                // if no animal id is in URL, set is also false bc nothing has been submitted
                setIsLoading(false)
            }
        })
    }, [])

    // renders animal form, edit button, and add button
    return (
        <form className="animalForm">
            {/* title of form depends on if there is an animalid in URL. If yes, Edit
            If no, Add. */}
            <h2 className="animalForm__title">{animalId ? "Edit Animal" : "Add Animal"}</h2>

            {/* Name input */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalName">Animal name: </label>
                    <input type="text" id="name" required autoFocus className="form-control"
                        placeholder="Animal name"
                        // event handler, when input value is changed, update API
                        onChange={handleControlledInputChange}
                        value={animal.name} />
                </div>
            </fieldset>

            {/* Breed Input */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="breed">Animal breed:</label>
                    {/* event handler, when input value is changed, update API */}
                    <input type="text" id="breed" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Animal breed" value={animal.breed} />
                </div>
            </fieldset>

            {/* Select location */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    {/* use animal.locationId bc the fetch gets animals with location expand */}
                    <select value={animal.locationId} id="locationId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a location</option>
                        {/* map thru locations array */}
                        {locations.map(l => (
                            // for each location, create an option HTML element
                            <option key={l.id} value={l.id}>
                                {/* name of location as input */}
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            {/* Select Customer */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="customer">Customer: </label>
                    {/* use animal.customerId bc the fetch gets animals with customer expand */}
                    <select value={animal.customerId} id="customerId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a customer</option>
                        {/* map thru customers array */}
                        {customers.map(c => (
                            // for each customer, create an option HTML element
                            <option key={c.id} value={c.id}>
                                {/* name of customer as input */}
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            {/* Save or Edit Button */}
            <button className="btn btn-primary"
                // disabled disables button click when isLoading is true
                disabled={isLoading}
                // event handler that saves animal to API, either add or edit depending..
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                    handleSaveAnimal()
                }}>
                {/* if there is an animal id in the URL, Save button will display. 
                If not, Add button displays */}
                {animalId ? "Save Animal" : "Add Animal"}
            </button>
        </form>
    )
}