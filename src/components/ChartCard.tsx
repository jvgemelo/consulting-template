import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

interface ChartCard {
  title: string,
  description: string,
  children: any

}
const ChartCard = ({ title, description, children }: ChartCard) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      p={6}
      m={6}
      height={"90%"} width={"90%"}
    //   background={"white"}
    >
      {title && (
        <Heading as="h3" size="lg" mb={4}>
          {title}
        </Heading>
      )}
      {description && (
        <Text fontSize="md" color="gray.500" mb={4}>
          {description}
        </Text>
      )}
      <Box height={"90%"} width={"90%"} >
        {children}
      </Box>
    </Box>
  );
};

export default ChartCard;
