'use client'
import CameraCard from '@/components/CameraGrid'
import {
  Box, Divider, Heading, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';


export default function PreviewerPage() {
  const [data, setData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://0.0.0.0:3000/get_image?camera_name=cam1&processed=true&font_size=1&show_confidence=true&show_id=true&show_speed=true&show_position=true&show_estela=true&show_keypoints=true&show_contours=true&show_only_segmentation=false',
          {
            method: 'GET',
            headers: {
              'Accept': 'image/jpeg', 
            },
            // mode: 'no-cors'
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const blob = await response.blob(); // Obtén los datos binarios como un Blob
        const url = URL.createObjectURL(blob); // Crea un URL para usar en el src de la imagen
        setImageUrl(url);

        
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Errorrr: {error}</div>;
  return (
    <Box p={8}>
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
      <Box w={700}>
      {imageUrl && (
        <Image src={imageUrl} alt="Fetched Image" height={200} width={500} layout="responsive" />
      )}
      </Box>
      {/* Aquí podrías renderizar la imagen o los datos devueltos por el endpoint */}
    </div>

    </Box>
  );
}