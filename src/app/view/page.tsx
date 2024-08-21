import { ProfileForm } from '@/components/ProfileForm';
import { Box, Divider, FormControl, Heading, Input } from '@chakra-ui/react';

export default function Productividad() {
  return (
    <Box p={8} ml="250px" w="100% - 250px" overflowY="auto">
      <Heading>View</Heading>
      <Divider className='m-4'/>
      <p>This is the view page.</p>
      <ProfileForm/>
    </Box>
  );
}