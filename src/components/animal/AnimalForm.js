import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customers/CustomerProvider"
import "./Animal.css"
import { useHistory, useParams } from 'react-router-dom';

// creates form to add an animal with location and customer drop down menu
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
    //wait for data before button is active. Look at the button to see how it's setting itself to disabled or not based on this state
    const [isLoading, setIsLoading] = useState(true);

    const { animalId } = useParams();
    // useHistory puts log of previous clicks into array names history
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newAnimal = { ...animal }
        //animal is an object with properties.
        //set the property to the new value
        newAnimal[event.target.id] = event.target.value
        //update state
        setAnimal(newAnimal)
    }

    const handleSaveAnimal = () => {
        if (parseInt(animal.locationId) === 0) {
            window.alert("Please select a location")
        } else {
            //disable the button - no extra clicks
            setIsLoading(true);
            // This is how we check for whether the form is being used for editing or creating. If the URL that got us here has an id number in it, we know we want to update an existing record of an animal
            if (animalId) {
                //PUT - update
                updateAnimal({
                    id: animal.id,
                    name: animal.name,
                    breed: animal.breed,
                    locationId: parseInt(animal.locationId),
                    customerId: parseInt(animal.customerId)
                })
                    .then(() => history.push(`/animals/detail/${animal.id}`))
            } else {
                //POST - add
                addAnimal({
                    name: animal.name,
                    breed: animal.breed,
                    locationId: parseInt(animal.locationId),
                    customerId: parseInt(animal.customerId)
                })
                    .then(() => history.push("/animals"))
            }
        }
    }

    // Get customers and locations. If animalId is in the URL, getAnimalById
    useEffect(() => {
        getCustomers().then(getLocations).then(() => {
            if (animalId) {
                getAnimalById(animalId)
                    .then(animal => {
                        setAnimal(animal)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    return (
        <form className="animalForm">
            <h2 className="animalForm__title">{animalId ? "Edit Animal" : "Add Animal"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalName">Animal name: </label>
                    <input type="text" id="name" required autoFocus className="form-control"
                        placeholder="Animal name"
                        onChange={handleControlledInputChange}
                        value={animal.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="breed">Animal breed:</label>
                    <input type="text" id="breed" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Animal breed" value={animal.breed} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select value={animal.locationId} id="locationId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="customer">Customer: </label>
                    <select value={animal.customerId} id="customerId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a customer</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                    handleSaveAnimal()
                }}>
                {animalId ? "Save Animal" : "Add Animal"}</button>
        </form>
    )
}