'use client'
import { useEffect, useState } from 'react';

export default function DocumentationPage() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamar a la API para obtener los datos de las cámaras
    const fetchCameras = async () => {
      const response = await fetch('/api/cameras');
      const data = await response.json();
      setCameras(data);
      setLoading(false);
    };

    fetchCameras();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Lista de Cámaras</h1>
      <ul>
        {cameras.map((camera) => (
          <li key={camera.id}>{camera.name} - {camera.url}</li>
        ))}
      </ul>
    </div>
  );
}