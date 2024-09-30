// components/SideNav.js
'use client';
import { Box, Flex, Button, Input, Menu, MenuButton, MenuList, MenuItem, Stack, RadioGroup, Radio, Text, Checkbox, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, FormErrorMessage, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import SliderMarkExample from './ui/SliderMark';
import { useToast } from '@chakra-ui/react'
const SideNav = () => {
  const data2 = {
    lateral: {
      connection: "genicam",
      serial_number: "FBJ23050072",
      ip: null,
      cfg: null,
      timeout: 2,
      hdr: {
        on: false,
        mode: "Debevec",
        gamma: 2.5,
        exposure_times: [7500, 15000, 30000],
      },
      path_simulated: "/imgs/lateral",
    }
  }

  //Todos los datos de las cámaras en el cfg
  const [camerasData, setCamerasData] = useState(data2)
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('1');
  const [camerasConnected, setCamerasConnected] = useState()
  const [showConnectedCameras, setShowConnectedCameras] = useState(false)
  const [deviceList, setDeviceList] = useState()
  const [refreshDeviceList, setRefreshDeviceList] = useState(false)
  // Primer campo del form
  const [inputView, setInputView] = useState("");
  // Aquí se guarda el segundo campo del form
  const [connectionType, setConnectionType] = useState("Tipos de conexión")
  // Serial number introducido
  const [serialNumber, setSerialNumber] = useState("");
  // Menu para serial number
  const [serialNumberMenu, setSerialNumberMenu] = useState("Número de serie")
  // Set IP input
  const [ip, setIp] = useState(null)
  // Set CFG Settings
  const [cfgSettings, setCfgSettings] = useState(null)
  // HDR ON/OFF
  const [hdrOn, setHdrOn] = useState(false)
  // HDR Mode
  const [hdrMode, setHdrMode] = useState("HDR Mode")
  // Slider value
  const [sliderValue, setSliderValue] = useState(2.5)
  console.log("Slider value", sliderValue)
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  const [postData, setPostData] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const serialNumbers = Object.keys(camerasData).map(key => camerasData[key].serial_number);
  const toast = useToast();

  const handleButtonClick = () => {
    const data = {
      // [inputView === ""? "DefaultValue" : inputView]: {
      name: inputView === "" ? "DefaultValue" : inputView,
      connection: connectionType,
      serial_number: selectedValue === "1" ? serialNumberMenu : serialNumber,
      ip: ip,
      cfg: cfgSettings,
      timeout: 2,
      hdr: {
        on: hdrOn,
        mode: hdrMode,
        gamma: sliderValue,
        exposure_times: [7500, 15000, 30000],
      }
      // path_simulated:"/imgs/hola",

    }
    setPostData(data);
    setIsSubmitting(true)
    console.log('Datos creados:', data);
  }
  const handleShowCameras = () => {
    setShowConnectedCameras(!showConnectedCameras)
    console.log("Estado boton", showConnectedCameras)
  }
  const handleRefreshDeviceList = () => {
    setRefreshDeviceList(!refreshDeviceList)
    console.log("Estado refreshdevicelist", refreshDeviceList)
  }
  const handleChangeConnectinType = (value: any) => {
    setConnectionType(value);
    console.log("Connection type", connectionType)
  }

  const handleChangeHdrMode = (value: any) => {
    setHdrMode(value);
    console.log("HDR Mode", hdrMode)
  }
  const handleChangeSerialNumberMenu = (value: any) => {
    setSerialNumberMenu(value);
  }
  const handleInputViewChange = (event) => {
    setInputView(event.target.value);
    console.log("Input view", inputView)
  }

  const handleInputIP = (event) => {
    setIp(event.target.value === "" ? null : event.target.value);
    console.log("Ip", ip)
  }
  const handleCfgSettings = (event) => {
    setCfgSettings(event.target.value === "" ? null : event.target.value);
    console.log("cfgSettings", cfgSettings)
  }
  const handleSerialNumberChange = (event) => {
    setSerialNumber(event.target.value);
    console.log("SerialNumber", serialNumber)
  }

  const handleHDROn = (event) => {
    setHdrOn(event.target.checked);
    console.log("hdrOn", hdrOn)
  }

  interface CameraCfg {
    fps_camera: number;
    is_alive: boolean;
    status: string;
    imageUrl: string;
    cameraName: string
  }

  const connectedCameras = async () => {
    try {
      const response = await fetch('http://localhost:7666/cameras_connected', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setCamerasConnected(result)
      setDeviceList(result)
      console.log("Recuperando cámaras", result);
    } catch (err) {
      console.error("Error al recuperar cámaras:", err);
    } finally {

    }
  }

  // Función para actualizar cámaras y luego obtener cámaras conectadas
  const updateCameras = async () => {
    setLoading(true)
    try {
      // Llamada al endpoint de actualización
      const updateResponse = await fetch('http://localhost:7666/refresh_device_list', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!updateResponse.ok) {
        throw new Error(`Error: ${updateResponse.status}`);
      }

      console.log("Connected cameras", updateResponse)
      // connectedCameras();
    } catch (err) {
      console.error("Error al actualizar cámaras:", err);
      toast({
        title: 'Error al actualizar la lista',
        description: 'Ha habido un error al actualizar la lista..',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } finally {
      setLoading(false)
      toast({
        title: 'Lista de cámaras en red actualizada.',
        description: 'La lista de las cámaras que se encuentran en la red ha sido actualizada.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      })
    }
  };

  // Peticion pillar datos de todas las camaras
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:7666/cameras', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setCamerasData(result)
        console.log("CamerasData", result)
      } catch (err) {
        const error = err as Error;
        console.log("Error segunda peti", error)
      }

    };
    fetchData()
  }, [deviceList])

  // Peticion crear nueva camara
  useEffect(() => {
    if (isSubmitting && postData) {
      const postDataToServer = async () => {
        try {
          const response = await fetch('http://localhost:7666/cameras', {
            method: 'POST',
            headers: {
              'Accept': 'application/json'
            },
            body: JSON.stringify(postData),
          });
          console.log("PostData", postData)
          if (!response.ok) {
            throw new Error('Error en la solicitud POST');
          }

          const result = await response.json();
          console.log('Respuesta del servidor:', result);
          toast({
            title: 'Cámara creada con éxito.',
            description: 'La creación de la cámara fue añadida con éxito al cfg',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top'
          })
        } catch (error) {
          toast({
            title: 'Error al enviar los datos.',
            description: 'Por favor verifica los parámetros y vuelve a intentarlo.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top'
          });
          console.error('Error:', error);
        } finally {
          setIsSubmitting(false);
        }
      };

      postDataToServer();
    }
  }, [isSubmitting, postData]);
  return (
    <Flex
      direction="column"
      bg="white"
      w="250px"
      h="100vh"
      p={6}
      boxShadow="md"
    >
      <h1 className='font-mono font-black text-3xl flex justify-center items-start'>Ajustes PyCam</h1>

      {/* PRIMERA CAJITA */}
      <Box
        className='w-full rounded-3xl border-2 flex flex-col justify-start items-center'
        p={4}
        flexShrink={0}
        h="20%"
        overflowY="auto"
      >
        <Button colorScheme='teal' variant='outline' m={"4px"} onClick={connectedCameras}>
          Mostrar cámaras en red
        </Button>
        <Box
          maxWidth="100%" // Ajusta el ancho máximo al 100% del contenedor padre
          maxHeight="100px"
          overflowY="auto"
          textAlign="center" // Centra el texto
          // wordBreak="break-word" // Fuerza el ajuste del texto en la caja
        >
          Cámaras conectadas: <br />
          {camerasConnected && camerasConnected.length > 0 ? (
            <ul>
              {camerasConnected.map((camera, index) => (
                <li key={index}>{camera}</li>
              ))}
            </ul>
          ) : (
            "No hay cámaras conectadas."
          )}        </Box>
        {loading ? (
          <Spinner size="md" />
        ) : (
          <Button colorScheme='teal' variant='outline' m={"4px"} onClickCapture={updateCameras}>
            Actualizar lista
          </Button>
        )}
      </Box>


      {/* SEGUNDA CAJITA */}
      <Box
        className="w-full rounded-3xl border-2 flex flex-col justify-start items-center mt-3"
        p={6}
        boxShadow="md"
        bg="white"
        flexGrow={1}
        overflowY="auto"
      >
        <h2 className="text-xl font-serif font-bold mb-4">Crear nueva cámara</h2>

        {/* Nombre de la vista */}
        <Box w="full" mb={4}>
          <Text mb={2}>Nombre de la vista:</Text>
          <Input value={inputView} focusBorderColor='lime' onChange={handleInputViewChange} placeholder="Escribe aquí..." />
        </Box>

        {/* Tipo de conexión */}
        <Box w="full" mb={4}>
          {/* <Text mb={2}>Tipo de conexión:</Text> */}
          <Menu >
            <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />} >
              {connectionType}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleChangeConnectinType("genicam")}>Genicam</MenuItem>
              <MenuItem onClick={() => handleChangeConnectinType("simulated")}>Simulated</MenuItem>
              <MenuItem onClick={() => handleChangeConnectinType("rtsp")}>Rtsp</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        {/* Número de serie */}
        <Box w="full" mb={4}>
          <Text mb={2}>Número de serie:</Text>
          <RadioGroup onChange={setSelectedValue} value={selectedValue}>
            <Stack gap={5} direction="row" mb={"9px"}>
              <Radio colorScheme="red" value="1" >
                Elegir
              </Radio>
              <Radio colorScheme="green" value="2">
                Introducir
              </Radio>
            </Stack>
          </RadioGroup>
          {selectedValue === "1" && (
            <Menu>
              <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
                {serialNumberMenu}
              </MenuButton>
              <MenuList>
                {serialNumbers.map((serial, index) => (
                  <MenuItem onClick={() => handleChangeSerialNumberMenu(serial)} key={index}>{serial}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
          {selectedValue === "2" && (
            <Box mt={4}>
              <Input focusBorderColor='lime' value={serialNumber} onChange={handleSerialNumberChange} placeholder="Escribe aquí..." />
            </Box>
          )}
        </Box>

        {/* Dirección IP */}
        <Box w="full" mb={4}>
          <Text mb={2}>Dirección IP (opcional):</Text>
          <Input focusBorderColor='lime' value={ip ?? ''} onChange={handleInputIP} placeholder="Escribe aquí..." />
        </Box>

        <Box w="full" mb={4}>
          <Text mb={2}>CFG_Settings (opcional):</Text>
          <Input focusBorderColor='lime' value={cfgSettings ?? ''} onChange={handleCfgSettings} placeholder="Escribe aquí..." />
        </Box>

        {/* HDR On */}
        <Box w="full" mb={4}>
          <Checkbox isChecked={hdrOn} onChange={handleHDROn}>HDR On</Checkbox>
        </Box>

        {/* Tipo de conexión HDR Mode */}
        <Box w="full" mb={4}>
          {/* <Text mb={2}>HDR Mode:</Text> */}
          <Menu>
            <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
              {hdrMode}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleChangeHdrMode("Debevec")}>Debevec</MenuItem>
              <MenuItem onClick={() => handleChangeHdrMode("Robertson")}>Robertson</MenuItem>
              <MenuItem onClick={() => handleChangeHdrMode("Martens")}>Martens</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Box w="full" mb={4}>
          <Text mb={2}>HDR Gamma</Text>
          <Box p={4} pt={6}>
            <Slider
              aria-label='slider-ex-6'
              min={0}
              max={5}
              step={0.01}
              value={sliderValue}
              onChange={(val) => setSliderValue(val)}
            >
              {/* <SliderMark value={0} {...labelStyles}>
            0.00
          </SliderMark> */}
              <SliderMark value={1.25} {...labelStyles}>
                1.25
              </SliderMark>
              <SliderMark value={2.5} {...labelStyles}>
                2.50
              </SliderMark>
              <SliderMark value={3.75} {...labelStyles}>
                3.75
              </SliderMark>
              {/* <SliderMark value={5} {...labelStyles}>
            5.00
          </SliderMark> */}
              <SliderMark
                value={sliderValue}
                textAlign='center'
                bg='blue.500'
                color='white'
                mt='-10'
                ml='-5'
                w='12'
              >
                {sliderValue.toFixed(2)}  {/* Mostrar el valor con dos decimales */}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Box>

        {/* <Box w="full" mb={4}>
          <Text mb={2}>⏲️ HDR Exposure Times (comma separated):</Text>
          <Input placeholder="Escribe aquí..." />
        </Box> */}

        <Button colorScheme="teal" variant="solid" mt={4} onClick={handleButtonClick}>
          Crear
        </Button>
      </Box>
    </Flex>

  );
};

export default SideNav;
