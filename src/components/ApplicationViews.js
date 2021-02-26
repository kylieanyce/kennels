import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { CustomerCard } from "./customers/Customer"
import { EmployeeCard } from "./employees/Employee"
import { AnimalProvider } from "./animal/AnimalProvider"
import { LocationProvider } from "./locations/LocationProvider"
import { AnimalList } from "./animal/AnimalList"
import { LocationList } from "./locations/LocationList"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <LocationProvider>
                <Route path="/locations">
                    <LocationList />
                </Route>
            </LocationProvider>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <Route exact path="/animal">
                    <AnimalList />
                </Route>
            </AnimalProvider>

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
