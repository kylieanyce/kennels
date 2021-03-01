import React from "react"
import "./Animal.css"

//returns HTML for each prop passed in as argument
export const AnimalCard = ({ animal, customer, location }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <p className="animal__name">Breed: {animal.breed}</p>
        <p className="customer__name">Owner: {customer.name}</p>
        <p className="location__name">Clinic: {location.name}</p>
    </section>
)