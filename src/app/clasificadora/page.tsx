
import { Box, Divider, Heading, Select } from '@chakra-ui/react';
import StackedBarChart from '@/components/StackedBarChart'
import TwoLevelPieChart from '@/components/TwoLevelPieChart';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/components/Skeletons';

export default function Clasificadora() {
  return (
    <Box p={8} ml="250px" w="100% - 250px" overflowY="auto">
      <Heading>Statistics</Heading>
      <Divider className='m-4' />
      <Select placeholder='Select option'>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>
      <Divider className='m-4' />
      <h1 className='text-2xl m-2'>Detections</h1>
      <div className='flex flex-row'>
      {/* Suspense envuelve a un componente que utiliza funciones
       asincronas que dependen de recuros que tardan en cargasrse*/ }
      <Suspense fallback={<RevenueChartSkeleton/>}>
       <StackedBarChart/>
        </Suspense>
      <TwoLevelPieChart/>
      </div>
    </Box>
  );
}