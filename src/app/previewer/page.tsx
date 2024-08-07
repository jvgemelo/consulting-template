import CameraCard from '@/components/ui/CameraGrid'
import {
  Box, Divider, Heading, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

export default function PreviewerPage() {
  return (
    <Box p={8}>
      <Heading>Previewer</Heading>
      <Divider className='m-4' />
      <Menu>
        <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
          Filters
        </MenuButton>
        <MenuList>
          <MenuItem>Camera one</MenuItem>
          <MenuItem>Camera two</MenuItem>
          <MenuItem>Camera three</MenuItem>
          <MenuItem>Camera four</MenuItem>
          <MenuItem>Camera five</MenuItem>
        </MenuList>
      </Menu>
      <Divider className='m-4' />
      <CameraCard/>
    </Box>
  );
}