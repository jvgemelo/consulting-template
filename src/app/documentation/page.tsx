'use client'
import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { getCameraByZoneId } from '@/actions/data';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// Crear un nuevo QueryClient
const queryClient = new QueryClient();

export default function Documentation() {
  const [loading, setLoading] = useState(true);

  const Form = () => {
    const {
      status,
      data: camera,
      error,
    } = useQuery({
      queryKey: ["getCameraByZoneId"],
      queryFn: async () => getCameraByZoneId(1)
    });

    if (status === 'pending') return <div>Loading...</div>;
    if (status === 'error') return <div>Error: {error.message}</div>;

    console.log("Dataa del useQuery", camera);

    return (
      <Box p={8} ml="250px" w="calc(100% - 250px)" overflowY="auto">
        <h1>Detalles de la Cámara</h1>
        {camera ? (
          <div>
            <p>Nombre de camara: {camera.name}</p>
            <p>Camara URL: {camera.url}</p>
          </div>
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </Box>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Form />
    </QueryClientProvider>
  );
}
