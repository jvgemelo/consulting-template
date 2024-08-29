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
const data = [
  { name: 'Jan', total: 400, series2: 240, series3: 240 },
  { name: 'Feb', total: 300, series2: 139, series3: 221 },
  { name: 'Mar', total: 200, series2: 980, series3: 229 },
  { name: 'Apr', total: 278, series2: 390, series3: 200 },
  { name: 'May', total: 189, series2: 480, series3: 218 },
  { name: 'Jun', total: 239, series2: 380, series3: 250 },
  { name: 'Jul', total: 349, series2: 430, series3: 210 },
];

function SimpleAreaChart() {
  const { personas } = useMazo();
  // function formatDates(array) {
  //   return array.map(item => {
  //     const formattedDate = item.timestamp.toLocaleDateString('en-GB');
  //     return {
  //       ...item,
  //       timestamp: formattedDate
  //     };
  //   });
  // }
  return (
    <ChartCard title="Tiempo funcionando" description="Tiempo en un rango de 24 horas en las que la máquina ha estado fun.">
      <ResponsiveContainer width="100%" height={480}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" fontSize="12px">
            <Label value="Tiempo" offset={0} position="bottom" fontSize="13px" dy={-7} />
          </XAxis>
          <YAxis fontSize="12px" >
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
