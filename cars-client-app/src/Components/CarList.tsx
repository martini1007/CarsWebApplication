import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Car } from '../Models/Car';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import '../Styles/CarListStyle.css';

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<Car[]>(`https://localhost:7178/api/cars/`);
      console.log('Fetched cars:', response.data);
        setCars(response.data);
      } catch (err) {
        setError('Błąd pobierania samochodów');
      } finally {
        setLoading(false);
      }
    };
    fetchCars(); // Jeśli token jest dostępny, wykonaj zapytanie
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Czy na pewno chcesz usunąć ten samochód?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://localhost:7178/api/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`  // Dodajemy token do nagłówka zapytania
          }
      });
        setCars(cars.filter((car) => car.id !== id)); // Usunięcie auta z listy
      } catch (err) {
        setError('Błąd usuwania samochodu');
        console.error(err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='main-container'>
      <h1 className='h-object'>Lista samochodów</h1>
      <ul className='list'>
        {cars.map((car) => (
          <li key={car.id} className='list-object'>
            <h2>
              {car.brand} {car.model}
              {token && (
                <Button
                  className='button-list-delete'
                  onClick={() => handleDelete(car.id)}
                >
                  Usuń
                </Button>
              )}
            </h2>
            
            <Button as={NavLink} to={`/cars/${car.id}`}
            className='button-list'>Detale</Button>
            {token && (
              <Button as={NavLink} to={`/edit/${car.id}`} className='button-list'>
                Edytuj
              </Button>
            )}
            
          </li>
        ))}
      </ul>
    </div>
  );
}
