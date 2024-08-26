'use client'
import CameraCard from '@/components/CameraGrid'
import { DatePickerWithRange } from '@/components/Datepicker';
import { PreviewerSkeleton } from '@/components/Skeletons';
import StackedBarChart from '@/components/StackedBarChart';
import {
  Box, Divider, Heading, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Text
} from '@chakra-ui/react';
import { ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

export default function Giro() {
  const [cameras, setCameras] = useState({})
  const [cameraData, setCameraData] = useState({})
  const [cameraImg, setCameraImg] = useState<CameraData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [errorCameras, setErrorCameras] = useState<string | null>(null)
  const [fetchCompleted, setFetchCompleted] = useState(false)
  //(Hook de chakra para gestión de visibilidad de componentes: modales, menus, tooltips (abierto, cerrado...))
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [cameraInfo, setselectedCameraInfo] = useState<CameraData | null>(null);
  const [inferencer, setInferencer] = useState({})
  const currentDate = new Date();

const options = {
    weekday: "long",  
    year: "numeric",
    month: "long",    
    day: "numeric"   
};
interface CameraData {
  fps_camera: number;
  is_alive: boolean;
  status: Status;
  imageUrl: string;
  cameraName: string
}
interface Status {
  last_time_online: string,
  name: string,
  status_conection: boolean,
  url: string,
  is_alive: boolean
}
  const formattedDate = new Intl.DateTimeFormat('es-ES').format(currentDate);
  const handleImageClick = (fps_camera: number, is_alive: boolean , status: Status, cameraName: string, imageUrl: string) => {
    const cameraInfo = {
      fps_camera,
      is_alive,
      status,
      cameraName,
      imageUrl
    };
    console.log("Camera info ->", cameraInfo)
    setselectedCameraInfo(cameraInfo)
    setSelectedImage(imageUrl);
    onOpen();
  };
  // Peticion al endpoint check_status de la API de yolo para saber el número de cámaras que hay y datos.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://172.24.126.175:3000/check_status', {
          // const response = await fetch('http://0.0.0.0:3000/check_status', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        console.log("Recuperando camaras", result)
        setInferencer(result.inferencer)
        setCameras(result.cameras);  // Actualiza el estado de cámaras
        setCameraData(result)
      } catch (err) {
        const error = err as Error;
        setErrorCameras(error.message);
      }
    };

    fetchData();
  }, []);

  //NUEVA PETECION PARA JUNTAR Cada camara con su imagen
  useEffect(() => {
    const fetchDataForCameras = async () => {
      try {
        const newCameraData = [];
        for (const [cameraName, cameraData] of Object.entries(cameras)as [string, CameraData][]) {
          const response = await fetch(`http://172.24.126.175:3000/get_image?camera_name=${cameraName}&processed=true&font_size=1&show_confidence=true&show_id=true&show_speed=true&show_position=true&show_estela=true&show_keypoints=true&show_contours=true&show_only_segmentation=false`, {
            // const response = await fetch(`http://0.0.0.0:3000/get_image?camera_name=${cameraName}&processed=true&font_size=1&show_confidence=true&show_id=true&show_speed=true&show_position=true&show_estela=true&show_keypoints=true&show_contours=true&show_only_segmentation=false`, {

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

          // Combina el objeto original con la nueva URL de la imagen
          newCameraData.push({ ...cameraData, cameraName, imageUrl });
        }
        // newCameraData ES UN ARRAY
        console.log("New camera data", newCameraData[0])
        // Actualiza el estado de cameraImg de una vez, con todos los resultados
        setCameraImg(newCameraData)
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      }
    };

    // Configura un intervalo para realizar la petición periódicamente
    const intervalId = setInterval(() => {
      if (Object.keys(cameras).length > 0) {
        fetchDataForCameras();
        setFetchCompleted(true); // Marca que el fetch se ha completado para evitar re-ejecuciones fuera del intervalo
      }
    }, 5000); // Cambia el tiempo según tus necesidades (5000ms = 5 segundos)

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [cameras, fetchCompleted]);



  if (errorCameras) return <div>Error: {errorCameras}</div>;
  if (error) return <div>Error: {error}</div>;
  if (cameraImg.length === 0) return <div>Loading...</div>;

  return (
    <>

      <Box p={8} ml="250px" w="100% - 250px" >
        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        <Heading>Visor</Heading>
        <Text fontSize={"25px"}>  {formattedDate} </Text>
        </Box>
        {/* <Divider className='m-4' borderColor={"darkgray"}/> */}
        {/* <Text color={'gray'}>Visualiza en tiempo real las imágenes capturadas por las cámaras, facilitando el monitoreo continuo y eficiente desde la interfaz centralizada.</Text> */}
        <Divider className='m-4' borderColor={"darkgray"}/>
        <Box display={"flex"} flexDirection={"column"} gap={"10px"} >
        <Box alignItems={"center"}  >
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Seleccione zona
            </MenuButton>
            <MenuList>
              <MenuItem>Giro</MenuItem>
              <MenuItem>Clasificadora</MenuItem>
              <MenuItem>Producción</MenuItem>
            </MenuList>
          </Menu>
         
          
        </Box>
        
        <Card  w={"auto"} h={"70px"} rounded={"2"}>
            <CardBody>
              <Text>Visualiza en tiempo real las imágenes capturadas por las cámaras, facilitando el monitoreo continuo y eficiente desde la interfaz centralizada.</Text>
            </CardBody>
          </Card>
          </Box>
        {/* <CameraCard/> */}

        <div>
          <Box p={8} w="100%" h={700} overflowY="auto">
            {fetchCompleted ?
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>

                {cameraImg.map(({ fps_camera, is_alive, status, cameraName, imageUrl }) => (
                  <Box key={cameraName} background={"white"} borderWidth="1px" borderRadius="lg" borderColor={"darkgray"} overflow="hidden" p={4} onClick={() => handleImageClick(fps_camera, is_alive, status, cameraName, imageUrl)} cursor="pointer" transition="transform 0.3s ease" _hover={{ transform: 'scale(0.95)' }}>
                    <Image src={imageUrl} alt={`Image from ${cameraName}`} height={300} width={500} layout="responsive" objectFit='cover' />
                  </Box>))

                }
              </SimpleGrid>
              :
              <PreviewerSkeleton />}

          </Box>
        </div>
        <Divider className='m-4' borderColor={"darkgray"}/>
        {/* <Heading>Gráficas</Heading>
        <DatePickerWithRange />
        <Divider className='m-4' />

        <StackedBarChart /> */}

      </Box>

      {/* Aquí empieza el Modal. */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg="blackAlpha.600" // Fondo sombreado con transparencia
        />
        <ModalContent
          w="90vw"
          h="90vh"
          maxW="90vw"
          maxH="90vh"
        >
          <ModalCloseButton />
          <ModalBody
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.50"
            p={6}
            borderRadius="md"
            boxShadow="lg"
            background={"lightgrey"}
          >
            {selectedImage && (
              <Box
                flex="0 0 70%"
                maxWidth="70%"
                maxHeight="80vh"
                overflow="hidden"
                borderRadius="3xl"
                boxShadow="md"
                border="1px solid"
                borderColor="gray.200"
                p={"5"}
                background={"white"}
                width={"100%"}
                height={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}


              >
                <Image
                  src={selectedImage}
                  alt="Selected Image"
                  layout="responsive"
                  width={1200}
                  height={800}
                  objectFit="contain"
                />
              </Box>
            )}
            {cameraInfo ? (
              <Box
                flex="1"
                ml={6}
                width={"100%"}
                height={"100%"}
                // maxWidth="28%"
                bg="white"
                p={4}
                borderRadius="3xl"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.200"
                overflowY="auto"
                maxHeight="80vh"
              >
                <Box ml={"20px"}>
                  <Text fontWeight="bold" fontSize="4xl" mt={"20px"} >
                    Camera Information
                  </Text>
                  <Text mb={4} color={"gray"}> Información concreta de la cámara.</Text>
                  <Divider borderColor={"darkgray"}></Divider>
                  <Text fontSize="2xl">
                    <strong>Nombre:</strong> <br />{cameraInfo?.cameraName}
                  </Text>
                  <Text fontSize="2xl">
                    <strong>Fps cámara:</strong><br />{cameraInfo?.fps_camera}
                  </Text>
                  <Text fontSize="2xl">
                    <strong>Is alive:</strong>{" "}
                    <Text as="span" color={cameraInfo?.status?.is_alive ? "green.500" : "red.500"}>
                      <br /> {cameraInfo?.status?.is_alive ? "True" : "False"}
                    </Text>
                  </Text>
                  <Text fontSize="2xl">
                    <strong>Url:</strong><br /> {cameraInfo?.status?.url}
                  </Text>
                  <Text fontSize="2xl">
                    <strong>Estado de conexión:</strong>{" "}
                    <Text as="span" color={cameraInfo?.status?.status_conection ? "green.500" : "red.500"}>
                      <br />{cameraInfo?.status?.status_conection ? "Conectado" : "Desconectado"}
                    </Text>
                  </Text>
                  <Text fontSize="2xl">
                    <strong>Última vez en funcionamiento:</strong> <br />{cameraInfo?.status?.last_time_online}
                  </Text>
                </Box>
              </Box>
            ) : (
              <Box
                flex="1"
                ml={6}
                maxWidth="28%"
                textAlign="center"
                p={6}
                bg="gray.100"
                borderRadius="md"
                boxShadow="sm"
              >
                <Text fontSize="lg" fontWeight="bold">
                  Loading...
                </Text>
              </Box>
            )}
          </ModalBody>



        </ModalContent>
      </Modal>
    </>
  );
}