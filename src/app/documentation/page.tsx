import { Box, Divider, Heading } from '@chakra-ui/react';

export default function DocumentationPage() {
  return (
    <Box p={8}>
      <Heading>Documentation</Heading>
      <Divider className='m-4'/>
      <p>This is the documentation page.</p>
    </Box>
  );
}