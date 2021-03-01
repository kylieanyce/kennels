import React from "react"
import "./Animal.css"

//returns HTML for each prop passed in as argument
export const AnimalCard = ({ animal, customer, location }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <h5 className="animal__name">{animal.breed}</h5>
        <h5 className="animal__name">{customer.name}</h5>
        <h5 className="animal__name">{location.name}</h5>
        <address className="location__address">{animal.location.name}</address>
    </section>
)