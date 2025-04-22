import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Car, FuelType, BodyType, getFuelTypeName, getBodyTypeName,  getFuelTypeNumber, getBodyTypeNumber} from '../Models/Car'; 
import axios from 'axios';
import '../Styles/CarEditStyle.css'

const token = localStorage.getItem('token');

export default function CarForm(){
    const { id } = useParams<{ id: string }>(); 
    const [car, setCar] = useState<Car | null>(null); 
    const [loading, setLoading] = useState(true);     
    const [error, setError] = useState<string | null>(null);

    const [hasFuelTypeChanged, setHasFuelTypeChanged] = useState<boolean>(false);
    const [hasBodyTypeChanged, setHasBodyTypeChanged] = useState<boolean>(false);

    useEffect(() => {
        const fetchCarById = async () => {
          try {
            const response = await axios.get(`https://localhost:7178/api/Cars/${id}`);
            setCar(response.data);
          } catch (err) {
            setError('Error fetching cars');
          } finally {
            setLoading(false);
          }
        };
    
        fetchCarById();
      }, [id]);

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (car) {
          const { name, value } = e.target;
            setCar({
                ...car,
                [name]: ['doorsNumber', 'engineCapacity', 'luggageCapacity', 'carFuelConsumption'].includes(name)
                    ? Number(value) // Konwersja na liczbę dla tych pól
                    : value,
            });
        }
      };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (car) {
            let carPayload = {
                ...car,
                fuelType: hasFuelTypeChanged ? getFuelTypeNumber(car.fuelType) : car.fuelType,
                bodyType: hasBodyTypeChanged ? getBodyTypeNumber(car.bodyType) : car.bodyType,
            };
          console.log('Updated Car:', carPayload);
          
          axios.put(`https://localhost:7178/api/Cars/${car.id}`, carPayload, {
            headers: {
              Authorization: `Bearer ${token}`  // Dodajemy token do nagłówka zapytania
            }
        })
            .then(response => {
                console.log('Car updated successfully:', response.data);
            })
            .catch(err => {
                console.error('Error updating car:', err);
            });
        }
        
      };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return car ? (
        <form onSubmit={handleSubmit} className="car-form-edit">
          <div>
            <label>Marka:</label>
            <input
              type="text"
              name="brand"
              value={car.brand}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label>Model:</label>
            <input
              type="text"
              name="model"
              value={car.model}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label>Liczba drzwi:</label>
            <input
              type="number"
              name="doorsNumber"
              value={car.doorsNumber}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label>Pojemność bagażnika (litry):</label>
            <input
              type="number"
              name="luggageCapacity"
              value={car.luggageCapacity}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label>Pojemność silnika (cc):</label>
            <input
              type="number"
              name="engineCapacity"
              value={car.engineCapacity}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label>Rodzaj paliwa:</label>
            <select
              name="fuelType"
              value={car.fuelType}
              onChange={(e) => {
                handleChange(e);
                setHasFuelTypeChanged(true);
              }}
            >
              {Object.values(FuelType).map(fuel => (
                <option key={fuel} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>
          </div>
    
          <div>
            <label>Data produkcji:</label>
            <input
              type="date"
              name="productionDate"
              value={car.productionDate.slice(0, 10)}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label>Zużycie paliwa (L/100km):</label>
            <input
              type="number"
              name="carFuelConsumption"
              value={car.carFuelConsumption}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label>Typ nadwozia:</label>
            <select
              name="bodyType"
              value={car.bodyType}
              onChange={(e) => {
                handleChange(e);
                setHasBodyTypeChanged(true);
              }}
            >
              {Object.values(BodyType).map(body => (
                <option key={body} value={body}>
                  {body}
                </option>
              ))}
            </select>
          </div>
    
          <button type="submit">Zapisz</button>
        </form>
      ) : (
        <div>No car data available</div>
      );

}