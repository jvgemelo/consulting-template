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


export default function Giro() {
  const [cameras, setCameras] = useState({})
  const [cameraData, setCameraData] = useState({})
  const [cameraImg, setCameraImg] = useState([])
  const [error, setError] = useState(null)
  const [errorCameras, setErrorCameras] = useState(null)
  const [fetchCompleted, setFetchCompleted] = useState(false)
  //(Hook de chakra para gestión de visibilidad de componentes: modales, menus, tooltips (abierto, cerrado...))
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState(null)
  const [cameraInfo, setselectedCameraInfo] = useState({})
  const [inferencer, setInferencer] = useState({})

  const handleImageClick = (fps_camera, is_alive, status, cameraName, imageUrl) => {
    const cameraInfo = {
      fps_camera,
      is_alive,
      status,
      cameraName,
      imageUrl
    };
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
        setErrorCameras(err.message);
      }
    };

    fetchData();
  }, []);

  //NUEVA PETECION PARA JUNTAR Cada camara con su imagen
  useEffect(() => {
    const fetchDataForCameras = async () => {
      try {
        const newCameraData = [];
        for (const [cameraName, cameraData] of Object.entries(cameras)) {
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
        console.log("New camera data", newCameraData[1])
        // Actualiza el estado de cameraImg de una vez, con todos los resultados
        setCameraImg(newCameraData);
      } catch (err) {
        setError(err.message);
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

      <Box p={8} ml="250px" w="100% - 250px" overflowY="auto">
        <Heading>Previewer</Heading>
        <Divider className='m-4' />
        <Text color={'gray'}>Visualiza en tiempo real las imágenes capturadas por las cámaras, facilitando el monitoreo continuo y eficiente desde la interfaz centralizada.</Text>
        <Divider className='m-4' />
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
        {/* <CameraCard/> */}
        <div>
          <Box p={8} w="100%" h={700} overflowY="auto">
            {fetchCompleted ?
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>

                {cameraImg.map(({ fps_camera, is_alive, status, cameraName, imageUrl }) => (
                  <Box key={cameraName} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} onClick={() => handleImageClick(fps_camera, is_alive, status, cameraName, imageUrl)} cursor="pointer" transition="transform 0.3s ease" _hover={{ transform: 'scale(0.95)' }}>
                    <Image src={imageUrl} alt={`Image from ${cameraName}`} height={300} width={500} layout="responsive" objectFit='cover' />
                  </Box>))

                }
              </SimpleGrid>
              :
              <PreviewerSkeleton />}

          </Box>
        </div>
        <Divider className='m-4' />
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
          <ModalBody display="flex" justifyContent="space-between" alignItems="center" >
            {selectedImage && (
              <Box flex="0 0 70%" maxWidth="70%" maxHeight="80vh" >
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
                ml={4} // margen a la izquierda para separar el texto de la imagen
                maxWidth="30%" // Asegura que el texto no exceda el 30% del ancho
                overflow="auto" // Permite el desplazamiento si el texto es demasiado largo
              >
                <Text fontWeight="bold">Camera Information:</Text>
                <Text><strong>Name:</strong> {cameraInfo?.cameraName}</Text>
                <Text><strong>Fps Camera:</strong> {cameraInfo?.fps_camera}</Text>
                <Text>
                  <strong>Is alive:</strong>{" "}
                  {cameraInfo?.status?.is_alive ? "True" : "False"}
                </Text>
                <Text><strong>Url:</strong> {cameraInfo?.status?.url}</Text>
                <Text>
                  <strong>Status connection:</strong>{" "}
                  {cameraInfo?.status?.status_conection ? "Connected" : "Disconnected"}
                </Text>
                <Text><strong>Last time online:</strong> {cameraInfo?.status?.last_time_online}</Text>
                {/* Info camera:
                {JSON.stringify(cameraInfo, null, 2)} */}
              </Box>
            ) : (
              <Box
                flex="1"
                ml={4}
                maxWidth="30%"
                textAlign="center" // Centra el texto de "Loading..."
                p={4} // Añade algo de padding para un mejor aspecto
              >
                Loading...
              </Box>
            )}

          </ModalBody>


        </ModalContent>
      </Modal>
    </>
  );
}