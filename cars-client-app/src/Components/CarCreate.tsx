import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Car, FuelType, BodyType, getFuelTypeName, getBodyTypeName,  getFuelTypeNumber, getBodyTypeNumber} from '../Models/Car'; 
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import '../Styles/CarCreateStyle.css'

const token = localStorage.getItem('token');
export default function CarCreate() {
    const [formData, setFormData] = useState({
      brand: '',
      model: '',
      doorsNumber: 0,
      luggageCapacity: 0,
      engineCapacity: 0,
      fuelType: '', // Domyślnie pusty, więc nic nie będzie wybrane
      productionDate: '',
      carFuelConsumption: 0,
      bodyType: '', // Domyślnie pusty, więc nic nie będzie wybrane
    });
  
    const [errors, setErrors] = useState<any>({}); // Stan do przechowywania błędów walidacji
  
    const validate = () => {
      const newErrors: any = {};
  
      // Walidacja dla każdego pola
      if (!formData.brand) newErrors.brand = "Brand is required";
      if (!formData.model) newErrors.model = "Model is required";
      if (formData.doorsNumber < 2 || formData.doorsNumber > 10) newErrors.doorsNumber = "Doors number must be between 2 and 10";
      if (formData.luggageCapacity <= 0) newErrors.luggageCapacity = "Luggage capacity must be greater than 0";
      if (formData.engineCapacity <= 0) newErrors.engineCapacity = "Engine capacity must be greater than 0";
      if (!formData.fuelType) newErrors.fuelType = "Fuel type is required";
      if (!formData.productionDate) newErrors.productionDate = "Production date is required";
      if (formData.carFuelConsumption <= 0) newErrors.carFuelConsumption = "Fuel consumption must be greater than 0";
      if (!formData.bodyType) newErrors.bodyType = "Body type is required";
  
      return newErrors;
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      
      // Sprawdzanie i usuwanie błędów na bieżąco przy edytowaniu danych
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: '',
        });
      }
  
      setFormData({
        ...formData,
        [name]: ['doorsNumber', 'engineCapacity', 'luggageCapacity', 'carFuelConsumption'].includes(name)
          ? Number(value) // Konwersja na liczbę dla tych pól
          : ['fuelType', 'bodyType'].includes(name)
          ? value // Enumy jako stringi
          : value,
      });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      const validationErrors = validate();
  
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors); // Ustawienie błędów w stanie
        return; // Zatrzymaj wysyłanie formularza, jeśli są błędy
      }
  
      const newCar: Car = {
        id: uuidv4(), // Generowanie unikalnego id
        brand: formData.brand,
        model: formData.model,
        doorsNumber: formData.doorsNumber,
        luggageCapacity: formData.luggageCapacity,
        engineCapacity: formData.luggageCapacity,
        fuelType: formData.fuelType as FuelType,
        productionDate: new Date(formData.productionDate).toISOString().split('T')[0],
        carFuelConsumption: formData.carFuelConsumption,
        bodyType: formData.bodyType as BodyType,
      };
  
      console.log('Updated Car:', newCar);
  
      axios
        .post(`https://localhost:7178/api/Cars`, {
          ...newCar,
          fuelType: getFuelTypeNumber(newCar.fuelType),
          bodyType: getBodyTypeNumber(newCar.bodyType)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`  // Dodajemy token do nagłówka zapytania
          }
        }
        )
        .then(response => {
          console.log('Car added successfully:', response.data);
          setFormData({
            brand: '',
            model: '',
            doorsNumber: 0,
            luggageCapacity: 0,
            engineCapacity: 0,
            fuelType: '', // Resetowanie po dodaniu auta
            productionDate: '',
            carFuelConsumption: 0,
            bodyType: '', // Resetowanie po dodaniu auta
          });
        })
        .catch(err => {
          console.error('Error adding car:', err);
          console.log('Token:', token);

        });
    };
  
    return (
      <form onSubmit={handleSubmit} className="car-form-create">
        <div>
          <label>Marka:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
          {errors.brand && <div className="error-message">{errors.brand}</div>}
        </div>
  
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
          {errors.model && <div className="error-message">{errors.model}</div>}
        </div>
  
        <div>
          <label>Liczba drzwi:</label>
          <input
            type="number"
            name="doorsNumber"
            value={formData.doorsNumber}
            onChange={handleChange}
          />
          {errors.doorsNumber && <div className="error-message">{errors.doorsNumber}</div>}
        </div>
  
        <div>
          <label>Pojemność bagażnika (litry):</label>
          <input
            type="number"
            name="luggageCapacity"
            value={formData.luggageCapacity}
            onChange={handleChange}
          />
          {errors.luggageCapacity && <div className="error-message">{errors.luggageCapacity}</div>}
        </div>
  
        <div>
          <label>Pojemność silnika (cc):</label>
          <input
            type="number"
            name="engineCapacity"
            value={formData.engineCapacity}
            onChange={handleChange}
          />
          {errors.engineCapacity && <div className="error-message">{errors.engineCapacity}</div>}
        </div>
  
        <div>
          <label>Rodzaj paliwa:</label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
          >
            <option value="">Wybierz...</option> {/* Domyślna opcja "Wybierz..." */}
            {Object.values(FuelType).map(fuel => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
          {errors.fuelType && <div className="error-message">{errors.fuelType}</div>}
        </div>
  
        <div>
          <label>Data produkcji:</label>
          <input
            type="date"
            name="productionDate"
            value={formData.productionDate}
            onChange={handleChange}
          />
          {errors.productionDate && <div className="error-message">{errors.productionDate}</div>}
        </div>
  
        <div>
          <label>Zużycie paliwa (L/100km):</label>
          <input
            type="number"
            name="carFuelConsumption"
            value={formData.carFuelConsumption}
            onChange={handleChange}
          />
          {errors.carFuelConsumption && <div className="error-message">{errors.carFuelConsumption}</div>}
        </div>
  
        <div>
          <label>Typ nadwozia:</label>
          <select
            name="bodyType"
            value={formData.bodyType}
            onChange={handleChange}
          >
            <option value="">Wybierz...</option> {/* Domyślna opcja "Wybierz..." */}
            {Object.values(BodyType).map(body => (
              <option key={body} value={body}>
                {body}
              </option>
            ))}
          </select>
          {errors.bodyType && <div className="error-message">{errors.bodyType}</div>}
        </div>
  
        <button type="submit">Zapisz</button>
      </form>
    );
  }