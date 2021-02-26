import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { LocationCard } from "./locations/Location"
import { AnimalCard } from "./animal/AnimalCard"
import { CustomerCard } from "./customers/Customer"
import { EmployeeCard } from "./employees/Employee"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <Route path="/locations">
                <LocationCard />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <Route path="/animal">
                <AnimalCard />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <Route path="/customers">
                <CustomerCard />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <Route path="/employees">
                <EmployeeCard />
            </Route>
        </>
    )
}
