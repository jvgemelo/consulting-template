
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from './ChartCard';
import { useMazo } from '@/context/giro-context';
import { timeStamp } from 'console';

const data2 = [
  { timeStamp: 'Jan', persona0: 5, persona1: 6, persona2: 3, persona3: 2, persona4: 1, persona5: 3, persona6: 2, persona7: 2 },
  { timeStamp: 'Feb', persona0: 4, persona1: 4, persona2: 5, persona3: 2, persona4: 3, persona5: 2, persona6: 3, persona7: 1 },
  { timeStamp: 'March', persona0: 6, persona1: 3, persona2: 2, persona3: 4, persona4: 3, persona5: 1, persona6: 3, persona7: 2 },
  { timeStamp: 'April', persona0: 3, persona1: 4, persona2: 3, persona3: 3, persona4: 2, persona5: 4, persona6: 3, persona7: 2 },
  { timeStamp: 'May', persona0: 4, persona1: 3, persona2: 4, persona3: 2, persona4: 3, persona5: 2, persona6: 3, persona7: 3 },
  { timeStamp: 'June', persona0: 2, persona1: 4, persona2: 3, persona3: 4, persona4: 3, persona5: 3, persona6: 2, persona7: 3 },
  { timeStamp: 'July', persona0: 3, persona1: 3, persona2: 3, persona3: 3, persona4: 3, persona5: 3, persona6: 3, persona7: 3 },
];

const StackedAreaChart = () => {
  const { personas } = useMazo();
  return (
    <ChartCard title="Personas en área de máquina giro" description="Detecciones de personas a lo largo del tiempo en el área de la máquina giro.">
      <ResponsiveContainer width="100%" height={480}>
        <AreaChart
          data={personas}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeStamp" />
          <YAxis  />
          <Tooltip />
          <Legend />
          {/* <Area type="monotone" dataKey="timeStamp" stackId="1" stroke="#8884d8" fill="#8884d8" /> */}
          <Area type="monotone" dataKey="0personas" stackId="1" stroke="orange" fill="orange" />
          <Area type="monotone" dataKey="1personas" stackId="1" stroke="red" fill="red" />
          <Area type="monotone" dataKey="2personas" stackId="1" stroke="blue" fill="blue" />
          <Area type="monotone" dataKey="3personas" stackId="1" stroke="purple" fill="purple" />
          <Area type="monotone" dataKey="4personas" stackId="1" stroke="yellow" fill="yellow" />
          <Area type="monotone" dataKey="5personas" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="6personas" stackId="1" stroke="pink" fill="pink" />
          <Area type="monotone" dataKey="7personas" stackId="1" stroke="#8884d8" fill="#8884d8" />

        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default StackedAreaChart;
