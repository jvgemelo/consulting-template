'use client'
import { Box, Divider, Heading, Select, SimpleGrid } from '@chakra-ui/react';
import StackedBarChart from '@/components/StackedBarChart'
import {  Suspense } from 'react';
import { RevenueChartSkeleton } from '@/components/Skeletons';
import { DatePickerWithRange } from '@/components/Datepicker';
import SimpleAreaChart from '@/components/SimpleAreaChart';
import StackedAreaChart from '@/components/StackedAreaChart';
import StackedBarChartStatus from '@/components/StackedBarChartStatus';
export default function Clasificadora() {
  return (
    <Box p={8} ml="250px" w="100% - 250px" >
      <Heading>Gráficas de estadísticas</Heading>
      <Divider className='m-4' />
      <Select placeholder='Seleccione una zona'>
        <option value='option1'>Giro</option>
        <option value='option2'>Clasificadora</option>
        <option value='option3'>Productividad</option>
      </Select>
      <Divider className='m-4' />
      <DatePickerWithRange />
      <Divider className='m-4' />

      {/* <h1 className='text-2xl m-2'>Detections</h1> */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>      {/* Suspense envuelve a un componente que utiliza funciones
       asincronas que dependen de recuros que tardan en cargasrse*/ }
      <Suspense fallback={<RevenueChartSkeleton/>}>
       <StackedBarChart/>
        </Suspense>
        <StackedAreaChart/>
        <SimpleAreaChart/>
        <StackedBarChartStatus/>
      </SimpleGrid>
    </Box>
  );
}