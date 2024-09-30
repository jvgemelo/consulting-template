'use client'
import CameraCard from '@/components/ui/CameraCard'
import {
  Box, Divider, Heading, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Center,
  Text,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

export default function PreviewerPage() {
  const [initCameras, setInitCameras] = useState(false)
  const [initAllCameras, setInitAllCameras] = useState(false) 
  const [destroyCameras, setDestroyCameras] = useState(false)
  const [camerasAvaliable, setCamerasAvaliable] = useState([])
  const [ camerasAvaliableSelected, setCamerasAvaliableSelected] = useState("Selecciona una cámara")
  const [refreshCameras, setRefreshCameras] = useState(0);

  const [cameraUrl, setCameraUrl] = useState("");

  const toast = useToast();

  const initializeAllCameras = async () => {
    try {
      const response = await fetch('http://localhost:7666/cameras/add_all_connected_cameras_as_genicam', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      console.log("Cámaras inicializadas correctamente", result);
      toast({
        title: 'Cámaras inicializadas',
        description: 'Todas las cámaras conectadas han sido inicializadas correctamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      const error = err as Error;
      console.error("Error al inicializar cámaras:", error);
      toast({
        title: 'Error al inicializar cámaras',
        description: `Ocurrió un error: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleInitAllCameras = () => {
    initializeAllCameras();
  };

  const initializeCameras = async () => {
    try {
      const response = await fetch('http://localhost:7666/initialize-cameras', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      console.log("Cámaras inicializadas correctamente", result);
      toast({
        title: 'Cámaras iniciadas correctamente.',
        description: 'La inicialización de las cámaras fue exitosa.',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      setInitCameras(true);
      setRefreshCameras(prev => prev + 1); // Trigger the useEffect to fetch available cameras
    } catch (err) {
      const error = err as Error;
      console.error("Error al inicializar cámaras:", error);
      toast({
        title: 'Error al inicializar cámaras.',
        description: `Ocurrió un error: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const handleInitCameras = () => {
    initializeCameras();
  };

  const handleDestroyCameras = () => {
    setDestroyCameras(!destroyCameras)
  }

  const handleChangeCamerasAvaliable = (camera: any) => {
    setCamerasAvaliableSelected(`${camera}`)
    console.log("Type of", typeof camera)
    setCameraUrl(`http://localhost:7666/video/${camera}`)
  }
  const handleMenuOpen = () => {
    setRefreshCameras(prev => prev + 1);
  };

  const handleDeselectCamera = () => {
    setCamerasAvaliableSelected("Selecciona una cámara");
    setCameraUrl(""); // Clear the camera URL
  };

  useEffect(() => {
    const fetchAvailableCameras = async () => {
      try {
        const response = await fetch('http://localhost:7666/show-cameras-available', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        const cameraNames = result.data.map((camera: any)  => camera[0]); // Extract the first element of each subarray
        setCamerasAvaliable(cameraNames);
        console.log("Cameras available", cameraNames);
      } catch (err) {
        const error = err as Error;
        console.log("error available", error);
      }
    };
    
    // if (initCameras) {
      fetchAvailableCameras();
    // }
  }, [ refreshCameras])

  useEffect(() => {
    const fetchData = async () => {
      if(destroyCameras){
        try {
          const response = await fetch('http://localhost:7666/destroy-all-cameras', {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const result = await response.json();
          console.log("Camaras detenidas correctamente", result)
          toast({
            title: 'Cámaras detenidas correctamente.',
            description: 'La detención de las cámaras fue exitosa.',
            status: 'success',
            duration: 5000,
            isClosable: true
          })
        } catch (err) {
          const error = err as Error;
          toast({
            title: 'Error al detener cámaras.',
            description: `Ocurrió un error: ${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true
          });
        }
      }
    }
    fetchData()
  }, [destroyCameras, toast])

 

  return (
    <Box p={8}>
      <h1 className='text-5xl font-mono font-black'>Bienvenido a Pycam</h1>
      <Divider className='m-4' />
      <Menu onOpen={handleMenuOpen}>
        <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
          {camerasAvaliableSelected}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleDeselectCamera} fontWeight="bold">
            Deseleccionar cámara
          </MenuItem>
          <Divider my={2} />
          {camerasAvaliable.map((camera, index) => (
            <MenuItem 
              onClick={() => handleChangeCamerasAvaliable(camera)} 
              key={index}
            >
              {camera}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Divider className='m-4' />
      <CameraCard route={cameraUrl} selectedCamera={camerasAvaliableSelected}></CameraCard>
      {/* {cameraUrl ? (
        <img src={cameraUrl} alt="Camera Stream" width="863" height="576" />
      ) : (
        <img src="./no-connected-camera.jpg" alt="No Camera Available" width="863" height="576" />
      )} */}

      <Box
        className=" w-10/12 rounded-3xl border-2 flex flex-row justify-start items-center mt-3 space-x-4"
        p={6}
        boxShadow="md"
        bg="white"
        // overflowY="auto"
        position="fixed"
        bottom={10}
        // right={10}
      >
        <Button colorScheme="teal" variant="solid" onClick={handleInitAllCameras}>
          Añadir todas las cámaras como genicam
        </Button>
        <Center height="50px">
          <Divider orientation="vertical" />
        </Center>
        <Button colorScheme="gray" variant="solid" onClick={handleInitCameras}>
          Inicializar cámaras
        </Button>
        <Button colorScheme="gray" variant="solid" onClick={handleDestroyCameras}>
          Detener cámaras
        </Button>
        <Button colorScheme="gray" variant="solid" isDisabled>
          Reiniciar Contenedores
        </Button>

        <Center height="50px">
          <Divider orientation="vertical" />
        </Center>

        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
              Selecciona la cámara a iniciar
            </MenuButton>
            <MenuList>
              <MenuItem>Genicam</MenuItem>
              <MenuItem>Simulated</MenuItem>
              <MenuItem>Rtsp</MenuItem>
            </MenuList>
          </Menu>
          <Button colorScheme="gray" variant="solid" ml={"6px"}>
            Iniciar
          </Button>
        </Box>

        <Center height="50px">
          <Divider orientation="vertical" />
        </Center>

        <Button colorScheme="gray" variant="solid">
          Captura de imágenes
        </Button>
        <Center height="50px">
          <Divider orientation="vertical" />
        </Center>
      </Box>

    </Box>
  );
}