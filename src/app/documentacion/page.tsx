'use client'
import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { getCameraByZoneId, getCount, getZone } from '@/actions/data';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// Crear un nuevo QueryClient
const queryClient = new QueryClient();

export default function Documentation() {
  const [loading, setLoading] = useState(true);

  const CameraForm = () => {
    const {
      status,
      data: camera,
      error,
    } = useQuery({
      queryKey: ["getCamera"],
      queryFn: async () => getCameraByZoneId(1)
    });

    if (status === 'pending') return <div>Loading...</div>;
    if (status === 'error') return <div>Error: {error.message}</div>;

    console.log("Dataa del useQuery", camera);

    return (
      <Box p={8} ml="250px" w="calc(100% - 250px)" >
        <h1>Detalles de la Cámara</h1>
        {camera ? (
          <div>
            <p>Nombre de camara: {camera.name}</p>
            <p>Camara URL: {camera.url}</p>
            <p>Refresh Time: {camera.refresh_time}</p>
            <p>Backup time: {camera.backup_time}</p>
            <p>Zone id: {camera.zone_id}</p>
          </div>
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </Box>
    );
  };

  const ZoneForm = () => {
    const {
      status,
      data: zone,
      error,
    } = useQuery({
      queryKey: ["getCameraByZoneId"],
      queryFn: async () => getZone()
    });

    if (status === 'pending') return <div>Loading...</div>;
    if (status === 'error') return <div>Error: {error.message}</div>;

    return (
      <Box p={8} ml="250px" w="calc(100% - 250px)" overflowY="auto">
        <h1>Detalles de la Zona</h1>
        {zone ? (
          <div>
            <p>ID Zone:  {zone.id}</p>
            <p>Nombre de zona: {zone.name}</p>
          </div>
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </Box>
    );
  };

  const CountForm = () => {
    const {
      status,
      data: count,
      error,
    } = useQuery({
      queryKey: ["getCount"],
      queryFn: async () => getCount()
    });
    console.log("Count form", count)
    if (status === 'pending') return <div>Loading...</div>;
    if (status === 'error') return <div>Error: {error.message}</div>;

    return (
      <Box p={8} ml="250px" w="calc(100% - 250px)" overflowY="auto">
        <h1>Detalles de count</h1>
        {count ? (
          <div>
            <p>ID camera:  {count.camera_id}</p>
            <p>ID model: {count.model_id}</p>
            <p>Object: {count.object}</p>
            <p>Timestamps: {count.timestamp.toLocaleDateString()}</p>
            <p>Total: {count.total}</p>
          </div>
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </Box>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CameraForm />
      <ZoneForm/>
      <CountForm/>
    </QueryClientProvider>
  );
}
