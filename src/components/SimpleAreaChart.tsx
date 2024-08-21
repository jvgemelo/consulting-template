import { useMazo } from '@/context/giro-context';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from './ChartCard';


const data = [
  { name: 'Jan', uv: 4000 },
  { name: 'Feb', uv: 3000 },
  { name: 'Mar', uv: 2000 },
  { name: 'Apr', uv: 2780 },
  { name: 'May', uv: 1890 },
  { name: 'Jun', uv: 2390 },
  { name: 'Jul', uv: 3490 },
  { name: 'Aug', uv: 2000 },
];

function SimpleAreaChart() {
  const { personas } = useMazo();
  function formatDates(array) {
    return array.map(item => {
      const formattedDate = item.timestamp.toLocaleDateString('en-GB'); 
      return {
        ...item,
        timestamp: formattedDate
      };
    });
  }
  return (
    <ChartCard title="Personas en área de máquina giro" description="Detecciones de personas a lo largo del tiempo en el área de la máquina giro.">
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart
        data={formatDates(personas)}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
    </ChartCard>

  );
}

export default SimpleAreaChart;
