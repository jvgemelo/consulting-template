import { Box, Divider, Heading } from '@chakra-ui/react';

export default function SettingsPage() {
  return (
    <Box p={8}>
      <Heading>Settings</Heading>
      <Divider className='m-4'/>
      <p>This is the settings page.</p>
    </Box>
  );
}