'use client'
import { Box, Divider, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/client';

export default function DocumentationPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('personas')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log("Dataa", data)
        setData(data);
      }
    };
    
    fetchData();
  }, []);
  return (
    <Box p={8}>
      <Heading>Documentation</Heading>
      <Divider className='m-4'/>
      <p>This is the documentation page.</p>
      {data ? (
        <ul>
          {data.map((item) => (
            <div key={item.id}>{item.nombre}</div>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
}