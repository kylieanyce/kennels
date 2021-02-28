import React from "react"
import "./Animal.css"

//returns HTML for each prop passed in as argument
export const AnimalCard = ({ animal }) => (
    <section className="animal">
        <h3 className="animal__name">{animal.name}</h3>
        <h5 className="animal__name">{animal.breed}</h5>
        <address className="location__address">{animal.location.name}</address>
    </section>
)