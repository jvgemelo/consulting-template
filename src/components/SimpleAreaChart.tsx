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
  Legend,
  Label,
} from 'recharts';
import ChartCard from './ChartCard';


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
          <XAxis dataKey="timestamp" fontSize="12px">
            <Label value="Tiempo" offset={0} position="bottom" fontSize="13px" dy={-7} />
          </XAxis>
          <YAxis fontSize="12px">
            <Label
              value="Personas"
              offset={-20}
              position="insideTopLeft"
              fontSize="13px"
              angle={-90}
              dx={30}
              dy={250}
            />
          </YAxis>
          <Tooltip />
          <Legend
            align="right"
            verticalAlign="top"
            wrapperStyle={{
              left: "50%",
              transform: "translateX(-50%)",
              top: -20,
              fontSize: "13px",
            }}
          />
          <Area type="monotone" dataKey="total" stroke="#f28e2c" fill="#f28e2c" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>

  );
}

export default SimpleAreaChart;
