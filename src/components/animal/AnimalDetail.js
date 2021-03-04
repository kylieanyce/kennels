import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from "react-router-dom"

// displays info for each animal when it is selected
export const AnimalDetail = () => {
    // destructure animal context and capture corresponding functions
    const { getAnimalById, releaseAnimal } = useContext(AnimalContext)
    // destructure useState and create animal/setAnimal for this component
    const [animal, setAnimal] = useState({})
    // useParams captures the id from the URL and sets to animalId
    const { animalId } = useParams();
    // useHistory captures array of click history and sets to var
    const history = useHistory();
    // useEffect invokes getAnimalById with the ID from useParams
    // then takes the response and changes state with setAnimal
    useEffect(() => {
        getAnimalById(animalId)
            .then((response) => {
                setAnimal(response)
            })
    }, [])
    // deletes and animal and reroutes user back to animal list
    const handleRelease = () => {
        releaseAnimal(animal.id)
            .then(() => {
                // push /animals link to most recent history instance
                history.push("/animals")
            })
    }
    // render for each specific animal after clicked on details link
    return (
        <section className="animal">
            <h3 className="animal__name">{animal.name}</h3>
            <div className="animal__breed">{animal.breed}</div>
            {/* location is the embeded array on the animal object. Use ? for embedded items*/}
            <div className="animal__location">Location: {animal.location?.name}</div>
            <div className="animal__owner">Customer: {animal.customer?.name}</div>
            {/* the button has an event handler that calls the handleRelease (delete) function */}
            <button onClick={handleRelease}>Release Animal</button>
        </section>
    )
}