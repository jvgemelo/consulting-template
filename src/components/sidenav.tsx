// components/SideNav.js
'use client';
import { Box, Flex, Button, Input, Menu, MenuButton, MenuList, MenuItem, Stack, RadioGroup, Radio, Text, Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import SliderMarkExample from './ui/SliderMark';

const SideNav = () => {
  const [selectedValue, setSelectedValue] = useState('2');
  const item = null
  return (
    <Flex
      direction="column"
      bg="white"
      w="250px"
      h="100vh"
      p={6}
      boxShadow="md"
    >
      <h1 className='font-serif font-bold text-3xl flex justify-center items-start'>Ajustes PyCam</h1>

      {/* PRIMERA CAJITA */}
      <Box
        className='w-full rounded-3xl border-2 flex flex-col justify-start items-center'
        p={4}
        flexShrink={0} 
        h="20%" 
        overflowY="auto"
      >
        <Button colorScheme='teal' variant='outline' m={"4px"}>
          Mostrar cámaras en red
        </Button>
        <Box
          maxWidth="100%" // Ajusta el ancho máximo al 100% del contenedor padre
          maxHeight="100px"
          overflowY="auto"
          textAlign="center" // Centra el texto
          wordWrap="break-word" // Fuerza el ajuste del texto en la caja
        >
          Cámaras conectadas: <br />
          {item ? "Genicam1" : "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"}
        </Box>
        <Button colorScheme='teal' variant='outline' m={"4px"}>
          Actualizar lista
        </Button>
      </Box>


      {/* SEGUNDA CAJITA */}
      <Box
        className="w-full rounded-3xl border-2 flex flex-col justify-start items-center mt-3"
        p={6}
        boxShadow="md"
        bg="white"
        flexGrow={1} // Permite que esta caja crezca para ocupar el espacio restante
        overflowY="auto" // Añade scroll si el contenido sobrepasa la altura disponible
      >
        <h2 className="text-xl font-serif font-bold mb-4">Crear nueva cámara</h2>

        {/* Nombre de la vista */}
        <Box w="full" mb={4}>
          <Text mb={2}>Nombre de la vista:</Text>
          <Input placeholder="Escribe aquí..." />
        </Box>

        {/* Tipo de conexión */}
        <Box w="full" mb={4}>
          <Text mb={2}>Tipo de conexión:</Text>
          <Menu>
            <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
              Tipos de conexión
            </MenuButton>
            <MenuList>
              <MenuItem>Genicam</MenuItem>
              <MenuItem>Simulated</MenuItem>
              <MenuItem>Rtsp</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        {/* Número de serie */}
        <Box w="full" mb={4}>
          <Text mb={2}>Número de serie:</Text>
          <RadioGroup onChange={setSelectedValue} value={selectedValue}>
            <Stack gap={5} direction="row">
              <Radio colorScheme="red" value="1">
                Elegir
              </Radio>
              <Radio colorScheme="green" value="2">
                Introducir
              </Radio>
            </Stack>
          </RadioGroup>
          {selectedValue === "1" && (
            <Box mt={4}>
              <Text>Has elegido "Elegir".</Text>
            </Box>
          )}
          {selectedValue === "2" && (
            <Box mt={4}>
              <Input placeholder="Escribe aquí..." />
            </Box>
          )}
        </Box>

        {/* Dirección IP */}
        <Box w="full" mb={4}>
          <Text mb={2}>Dirección IP (opcional):</Text>
          <Input placeholder="Escribe aquí..." />
        </Box>

        {/* CFG_Settings */}
        <Box w="full" mb={4}>
          <Text mb={2}>CFG_Settings (opcional):</Text>
          <Input placeholder="Escribe aquí..." />
        </Box>

        {/* HDR On */}
        <Box w="full" mb={4}>
          <Checkbox defaultChecked>HDR On</Checkbox>
        </Box>

        {/* Tipo de conexión HDR Mode */}
        <Box w="full" mb={4}>
          <Text mb={2}>HDR Mode:</Text>
          <Menu>
            <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
              Selecciona el modo
            </MenuButton>
            <MenuList>
              <MenuItem>Debevec</MenuItem>
              <MenuItem>Robertson</MenuItem>
              <MenuItem>Martens</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        {/* HDR Gamma */}
        <Box w="full" mb={4}>
          <Text mb={2}>HDR Gamma</Text>
          <SliderMarkExample />
        </Box>

        {/* HDR Exposure Times */}
        <Box w="full" mb={4}>
          <Text mb={2}>⏲️ HDR Exposure Times (comma separated):</Text>
          <Input placeholder="Escribe aquí..." />
        </Box>

        {/* Botón Crear */}
        <Button colorScheme="teal" variant="solid" mt={4}>
          Crear
        </Button>
      </Box>
    </Flex>

  );
};

export default SideNav;
