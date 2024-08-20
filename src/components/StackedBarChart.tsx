'use client'
import { useMazo } from '@/context/giro-context';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
    {
      timestamp: 'Fecha',
      total: 4000,
    },
    {
      timestamp: 'Fecha',
      total: 3000,
    },
    {
      timestamp: 'Fecha',
      total: 2000,
    },
    {
      timestamp: 'Fecha',
      total: 3300,
    }
  ];
  

  const StackedBarChart = () => {
    const { mazos } = useMazo();
    function formatDates(array) {
      return array.map(item => {
        const formattedDate = item.timestamp.toLocaleDateString('en-GB'); 
        return {
          ...item,
          timestamp: formattedDate
        };
      });
    }
    console.log("MAZOS DESDE CHARTS -->", mazos)
    return (
      <ResponsiveContainer width="50%" height={500}>
        <BarChart data={formatDates(mazos)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" stackId="a" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  export default StackedBarChart;