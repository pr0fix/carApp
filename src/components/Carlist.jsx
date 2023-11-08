import React, { useEffect, useState } from "react";
import Cargrid from "./CarGrid";


export default function Carlist() {


    const [cars, setCars] = useState([]);


    useEffect(() => getCars(), []);



    const REST_URL = 'https://carrestapi.herokuapp.com/cars';
    const getCars = () => {
        fetch(REST_URL)
            .then(res => res.json())
            .then(resData => {
                setCars(resData._embedded.cars)
            })
            .catch(err => console.error(err))
    }
    return (
        <>
            <h1>Carlist</h1>
            <Cargrid
                cars={cars}
                getCars={getCars}
                restURL={REST_URL}
            />
            
        </>
    )
}