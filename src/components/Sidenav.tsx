// components/SideNav.js
'use client';
import { Box, Flex, Icon, Link, Text, VStack, Spacer } from '@chakra-ui/react';
import { FiHome, FiUser, FiSettings, FiLogOut, FiFileText, FiEye, FiBook, FiBarChart} from 'react-icons/fi';
import { FaArrowRotateRight } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Image from 'next/image';

const SideNav = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Giro', icon: FaArrowRotateRight, path: '/giro' },
    { name: 'Clasificadora', icon: FiBarChart, path: '/clasificadora' },
    { name: 'Productividad', icon: FiUser, path: '/productividad' },
    // { name: 'Documentation', icon: FiBook, path: '/documentation' },
    // { name: 'Settings', icon: FiSettings, path: '/settings' },
  ];

 
  const handleNavigation = useCallback((path: string) => {
    const pathName = (router as any).pathname; // Uso de `any` para eludir temporalmente los errores de tipo
    if (pathName !== path) {
      router.push(path);
    }
  }, [router]);

  const handleLogout = () => {
    // Implementa tu lógica de logout aquí
    router.push('/login');
  };

  return (
    <Flex
      direction="column"
      bg="white"
      w="250px"
      h="100vh"
      p={5}
      boxShadow="md"
      backgroundColor={'lightgray'}
      position="fixed"
      top="0"
    >
      <VStack spacing={4} align="stretch" flex="1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            as="button"
            onClick={() => handleNavigation(item.path)}
            _hover={{ textDecor: 'none', bg: 'gray.100' }}
            p={3}
            borderRadius="md"
            display="flex"
            alignItems="center"
          >
            <Icon as={item.icon} boxSize={6} mr={3} />
            <Text fontSize="medium">{item.name}</Text>
          </Link>
        ))}
        <Box className=' w-full h-full rounded-3xl border-2 ' display="flex" justifyContent="center" alignItems="center">
        <Box width="150px" mx="auto" >
        {/* <Image 
          src='/Siali.png' 
          alt='Siali logo' 
          height={150} 
          width={250} 
          layout="responsive" 
          objectFit="contain" 
          objectPosition="center"
        /> */}
      </Box>
        </Box>
        <Spacer />
        {/* <Box>
          <Box
            as="button"
            onClick={handleLogout}
            _hover={{ textDecor: 'none', bg: 'gray.100' }}
            p={3}
            borderRadius="md"
            display="flex"
            alignItems="center"
          >
            <Icon as={FiLogOut} boxSize={6} mr={3} />
            <Text fontSize="medium">Logout</Text>
          </Box>
        </Box> */}
        <Link
            as="button"
            onClick={() => handleNavigation("/settings")}
            _hover={{ textDecor: 'none', bg: 'gray.100' }}
            p={3}
            borderRadius="md"
            display="flex"
            alignItems="center"
          >
            <Icon as={FiSettings} boxSize={6} mr={3} />
            <Text fontSize="medium">Settings</Text>
          </Link>
          <Link
            as="button"
            onClick={() => handleNavigation("/")}
            _hover={{ textDecor: 'none', bg: 'gray.100' }}
            p={3}
            borderRadius="md"
            display="flex"
            alignItems="center"
          >
            <Icon as={FiLogOut} boxSize={6} mr={3} />
            <Text fontSize="medium">Logout</Text>
          </Link>
      </VStack>
    </Flex>
  );
};

export default SideNav;
