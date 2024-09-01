import CameraCard from '@/components/ui/CameraGrid'
import {
  Box, Divider, Heading, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Center,
  Text
} from '@chakra-ui/react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

export default function PreviewerPage() {
  return (
    <Box p={8}>
      <Heading>Bienvenido a Pycam</Heading>
      <Divider className='m-4' />
      <Menu>
        <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
          Cámaras disponibles
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
      <CameraCard />
      <Box
        className="h-full w-full rounded-3xl border-2 flex flex-row justify-start items-center mt-3 space-x-4"
        p={6}
        boxShadow="md"
        bg="white"
        overflowY="auto"
      >
        <Button colorScheme="teal" variant="solid">
          Inicializar cámaras
        </Button>
        <Button colorScheme="teal" variant="solid">
          Detener cámaras
        </Button>
        <Button colorScheme="teal" variant="solid">
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
          <Button colorScheme="teal" variant="solid" ml={"6px"}>
            Iniciar
          </Button>
        </Box>

        <Center height="50px">
          <Divider orientation="vertical" />
        </Center>

        <Button colorScheme="teal" variant="solid">
          Captura de imágenes
        </Button>
        <Center height="50px">
          <Divider orientation="vertical" />
        </Center>
      </Box>

    </Box>
  );
}