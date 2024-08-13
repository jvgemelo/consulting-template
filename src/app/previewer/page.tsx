'use client'
import CameraCard from '@/components/CameraGrid'
import {
  Box, Divider, Heading, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  SimpleGrid
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';


export default function PreviewerPage() {
  const [cameras, setCameras] = useState({});
  const [cameraData, setCameraData] = useState([]);
  const [error, setError] = useState(null);
  const [errorCameras, setErrorCameras] = useState(null);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  // Peticion al endpoint check_status para saber el número de cámaras que hay y datos.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://0.0.0.0:3000/check_status', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        console.log("Recuperando camaras", result.cameras)
        setCameras(result.cameras);  // Actualiza el estado de cámaras
      } catch (err) {
        setErrorCameras(err.message);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchDataForCameras = async () => {
      try {
        // Itera sobre las cámaras y realiza peticiones de manera secuencial
        for (const [cameraName, cameraInfo] of Object.entries(cameras)) {
          const response = await fetch(`http://0.0.0.0:3000/get_image?camera_name=${cameraName}&processed=true&font_size=1&show_confidence=true&show_id=true&show_speed=true&show_position=true&show_estela=true&show_keypoints=true&show_contours=true&show_only_segmentation=false`, {
            method: 'GET',
            headers: {
              'Accept': 'image/jpeg',
            },
          });

          if (!response.ok) {
            throw new Error(`Error fetching data for ${cameraName}: ${response.status}`);
          }

          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          const newCameraData = { cameraName, imageUrl };

          // Actualiza el estado de cameraData agregando el nuevo resultado
          setCameraData(prevData => [...prevData, newCameraData]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    // Solo ejecuta fetchDataForCameras si aún no se ha completado el fetch y hay cámaras disponibles
    if (Object.keys(cameras).length > 0 && !fetchCompleted) {
      fetchDataForCameras();
      setFetchCompleted(true); // Marca que el fetch se ha completado para evitar re-ejecuciones
    }
  }, [cameras, fetchCompleted]);  // Dependencia en 'cameras' y 'fetchCompleted'

  if (errorCameras) return <div>Error: {errorCameras}</div>;
  if (error) return <div>Error: {error}</div>;
  if (cameraData.length === 0) return <div>Loading...</div>;

  return (
    <Box p={8} >
      <Heading>Previewer</Heading>
      <Divider className='m-4' />
      <Menu>
        <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
          Filters
        </MenuButton>
        <MenuList>
          <MenuItem>Camera one</MenuItem>
          <MenuItem>Camera two</MenuItem>
          <MenuItem>Camera three</MenuItem>
          <MenuItem>Camera four</MenuItem>
          <MenuItem>Camera five</MenuItem>
        </MenuList>
      </Menu>
      <Divider className='m-4' />
      {/* <CameraCard/> */}
      <div>
      <Box p={8} w="auto" h={700} overflowY="auto">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {cameraData.map(({ cameraName, imageUrl }) => (
          <Box key={cameraName} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Image src={imageUrl} alt={`Image from ${cameraName}`} height={300} width={500} layout="responsive" />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
      {/* <h1>Status Check</h1>
      <pre>{JSON.stringify(cameras, null, 2)}</pre> */}
      {/* Aquí podrías renderizar la imagen o los datos devueltos por el endpoint */}
    </div>

    </Box>
  );
}