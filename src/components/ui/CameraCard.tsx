'use client'

import { Box, Button, Checkbox, Flex, Grid, Image, Menu, MenuButton, MenuItem, MenuList, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, Select } from '@chakra-ui/react';
import { routeModule } from 'next/dist/build/templates/pages';
import React, { useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7666';

const CameraCard = (route: any, selectedCamera: string) => {
    const [hdrOn, setHdrOn] = useState('Off');
    const [triggerMode, setTriggerMode] = useState('Off');
    const [expesure, setExpesure] = useState({})
    const [gain, setGain] = useState({})
    const [exposureValue, setExposureValue] = useState('');
    const [gainValue, setGainValue] = useState('');
    const handleHDRChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setHdrOn(event.target.value);
        // Add any additional logic you need when HDR changes
    };

    const handleTriggerModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTriggerMode(event.target.value);
        // Add any additional logic you need when Trigger Mode changes
    };
 
    const handleInputChangeExposure = (exposureValue: any) => setExposureValue(exposureValue);
    const handleInputChangeGain = (gainValue: any) => setGainValue(gainValue);

    const handleButtonExposure = () => {
        console.log("Exposure", typeof exposureValue);

        const data = {
            name: route.selectedCamera,
            exposure_time: exposureValue
        };
        updateCameraExposure(data);
    };

    const handleButtonGain = () => {
      console.log("Name:", route.selectedCamera)
      console.log("Gain",  gainValue);
      // const numericGainValue = Number(gainValue);

      const data = {
        name: route.selectedCamera,
        gain: gainValue
      };
      updateCameraGain(data);
    }

    const updateCameraExposure = async (data) => {
        try {
          const response = await fetch(`${API_URL}/update_camera_exposure`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }

          const result = await response.json();
          console.log("Exposición cambiada con éxito", result);
        } catch (err) {
          console.error("Error al cambiar exposición:", err);
        } 
    }
    const updateCameraGain = async (data) => {
      try {
        const response = await fetch(`${API_URL}/update_camera_gain`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Ganancia cambiada con éxito", result);
      } catch (err) {
        console.error("Error al cambiar ganancia:", err);
      } 
    }
    const addAllCamerasAsGenicam = async () => {
        try {
          const response = await fetch('http://localhost:7666/add_all_connected_cameras_as_genicam', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
            },
            body: JSON.stringify(expesure),
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          
          const result = await response.json();
          console.log("Exposicion cambiada con éxito", result);
        } catch (err) {
          console.error("Error al cambiar exposición:", err);
        } 
    }
    
    
    return (
        <Box className='flex flex-row bg-slate-200 rounded-3xl'>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="80%"
                height="60vh"
                maxWidth="100%"
                overflow="hidden"
            // backgroundColor={"slategray"}
            >
                {/* <Image
                    src={route}
                    alt="foto"
                    maxWidth="100%"
                    maxHeight="100%"
                    objectFit="contain"
                /> */}
                {route ? (
                    <img src={route.route} alt="Camera Stream" width="863" height="576" />
                ) : (
                    <img src="./no-connected-camera.jpg" alt="No Camera Available" width="863" height="576" />
                )}
                {/* <img src="./no-connected-camera.jpg" alt="No Camera Available" width="863" height="576" /> */}

                {/* <WebcamStream/> */}
            </Box> <Box
                className="w-56 rounded-3xl  flex flex-col justify-start items-center m-3"
                p={6}
                // boxShadow="md"
                bg="white"
                flexGrow={1}
                justifyContent={'space-between'}
            // overflowY="auto"
            >
                {/* <Box className="flex items-center justify-start pl-8 h-70vh w-72  rounded-tr-3xl rounded-br-3xl"> */}
                <h1 className='text-xl font-mono font-black'> Ajuste de la cámara</h1>
                <Text>Exposición</Text>
                <NumberInput value={exposureValue} onChange={handleInputChangeExposure} step={1000} min={1000} max={500000 }  >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Button onClick={handleButtonExposure} mt={4}>Actualizar exposición</Button>
                <Text>Ganancia</Text>
                <NumberInput value={gainValue} onChange={handleInputChangeGain} min={1}  max={24}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Button onClick={handleButtonGain}>Actualizar ganancia</Button>
                <Flex >
                    <Box w="full" mb={4}>
                        <Select value={hdrOn} onChange={handleHDRChange}>
                            <option value="On">HDR On</option>
                            <option value="Off">HDR Off</option>
                        </Select>
                    </Box>
                    <Box w="full" mb={4}>
                        <Select value={triggerMode} onChange={handleTriggerModeChange}>
                            <option value="On">TriggerMode On</option>
                            <option value="Off">TriggerMode Off</option>
                        </Select>
                    </Box>
                </Flex>
                {/* <Grid
                    templateColumns="repeat(3, 1fr)" // Tres columnas iguales
                    gap={4}                          // Espacio entre los elementos
                >
                    <Button fontSize={'small'}>Blancos</Button>
                    <Button fontSize={'small'}>Posición</Button>
                    <Button fontSize={'small'}>Detener cam</Button>
                    <Button fontSize={'small'}>Export cfg</Button>
                    <Button fontSize={'small'}>Eliminar cámara</Button>
                </Grid> */}
                <Text> Selecciona CFG_Settings</Text>
                <Menu>
                    <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
                        Opciones de cfg
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Opción 1</MenuItem>
                        <MenuItem>Opción 2</MenuItem>
                        <MenuItem>Opción 3</MenuItem>
                    </MenuList>
                </Menu>
                <Button>Actualizar CFG_Settings</Button>

            </Box>
        </Box>


    );
};

export default CameraCard;