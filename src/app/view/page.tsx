import { Box, Divider, Heading } from '@chakra-ui/react';

export default function ViewPage() {
  return (
    <Box p={8}>
      <Heading>View</Heading>
      <Divider className='m-4'/>
      <p>This is the view page.</p>
    </Box>
  );
}