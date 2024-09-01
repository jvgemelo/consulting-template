'use client'

import { Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
const CameraGrid = () => {
    return (
        <Box className='flex flex-row bg-slate-200 rounded-3xl'>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="80%"
                height="60vh"
                maxWidth="100%"
                overflow="hidden"
                // backgroundColor={"slategray"}
            >
                <Image
                    src="/foto2.jpg"
                    alt="foto"
                    maxWidth="100%"
                    maxHeight="100%"
                    objectFit="contain"
                />
            </Box>
            <Box className="flex items-center justify-start pl-8 h-70vh w-72  rounded-tr-3xl rounded-br-3xl">
                <ul className='list-disc'>
                    <li>
                        Data one
                    </li>
                    <li>
                        Data two
                    </li>
                    <li>
                        Data three
                    </li>
                </ul>
            </Box>
        </Box>


    );
};

export default CameraGrid;