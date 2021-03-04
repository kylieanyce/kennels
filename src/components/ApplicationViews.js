import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"

import { AnimalProvider } from "./animal/AnimalProvider"
import { LocationProvider } from "./locations/LocationProvider"
import { CustomerProvider } from "./customers/CustomerProvider"
import { EmployeeProvider } from "./employees/EmployeeProvider"

import { AnimalList } from "./animal/AnimalList"
import { LocationList } from "./locations/LocationList"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeList } from "./employees/EmployeeList"

import { AnimalForm } from "./animal/AnimalForm"
import { EmployeeForm } from "./employees/EmployeeForm"
import { LocationForm } from "./locations/LocationForm"

import { AnimalDetail } from "./animal/AnimalDetail"
import { EmployeeDetail } from "./employees/EmployeeDetail"
import { LocationDetail } from "./locations/LocationDetail"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <LocationProvider>
                <EmployeeProvider>
                    <Route exact path="/locations">
                        <LocationList />
                    </Route>
                    <Route path="/locations/create">
                        <LocationForm />
                    </Route>
                    <Route exact path="/locations/detail/:locationId(\d+)">
                        <LocationDetail />
                    </Route>
                    <Route path="/locations/edit/:locationId(\d+)">
                        <LocationForm />
                    </Route>
                </EmployeeProvider>
            </LocationProvider>

            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                        <Route exact path="/animal">
                            <AnimalList />
                        </Route>
                        <Route path="/animal/create">
                            <AnimalForm />
                        </Route>
                        <Route exact path="/animals/detail/:animalId(\d+)">
                            <AnimalDetail />
                        </Route>
                        <Route path="/animals/edit/:animalId(\d+)">
                            <AnimalForm />
                        </Route>
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>

            <CustomerProvider>
                <Route path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>

            <EmployeeProvider>
                <LocationProvider>
                    <Route exact path="/employees">
                        <EmployeeList />
                    </Route>
                    <Route path="/employees/create">
                        <EmployeeForm />
                    </Route>
                    <Route exact path="/employees/detail/:employeeId(\d+)">
                        <EmployeeDetail />
                    </Route>
                    <Route path="/employees/edit/:employeeId(\d+)">
                        <EmployeeForm />
                    </Route>
                </LocationProvider>
            </EmployeeProvider>
        </>
    )
}
