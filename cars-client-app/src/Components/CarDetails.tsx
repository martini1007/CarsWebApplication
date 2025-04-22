import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Car, getFuelTypeName, getBodyTypeName } from '../Models/Car';
import { useParams} from 'react-router-dom';

export default function CarDetails(){
    const { id } = useParams<{ id : string }>();
    const [car, setCar] = useState<Car | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() =>{
        const fetchCarById = async() => {
            try{
                const response = await axios.get(`https://localhost:7178/api/Cars/${id}`);
                setCar(response.data);
            } catch(err){
                setError('Error fetching car');
            } finally{
                setLoading(false);
            }
        };
        fetchCarById();
    },[id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }


    return(
        <>
            <h1>Szczegóły samochodu</h1>
            {car ? (
                <div>
                    <p><strong>Marka:</strong> {car.brand}</p>
                    <p><strong>Model:</strong> {car.model}</p>
                    <p><strong>Liczba drzwi:</strong> {car.doorsNumber}</p>
                    <p><strong>Pojemność bagażnika:</strong> {car.luggageCapacity} litry/litrów</p>
                    <p><strong>Pojemność silnika:</strong> {car.engineCapacity} cc</p>
                    <p><strong>Rodzaj paliwa:</strong> {getFuelTypeName(parseInt(car.fuelType))}</p>
                    <p><strong>Data produkcji:</strong> {new Date(car.productionDate).toLocaleDateString()}</p>
                    <p><strong>Zużycie paliwa:</strong> {car.carFuelConsumption} L/100km</p>
                    <p><strong>Typ nadwozia:</strong> {getBodyTypeName(parseInt(car.bodyType))}</p>
                </div>    
            ) : (
                <p>Szczegóły nie są dostępne</p>
            )}
        </>
    );

}