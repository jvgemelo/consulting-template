import { Box, Divider, Heading, Select } from '@chakra-ui/react';
import StackedBarChart from '@/components/ui/StackedBarChart'

export default function StadisticsPage() {
  return (
    <Box p={8}>
      <Heading>Statistics</Heading>
      <Divider className='m-4' />
      <Select placeholder='Select option'>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>
      <Divider className='m-4' />
      <StackedBarChart/>
    </Box>
  );
}