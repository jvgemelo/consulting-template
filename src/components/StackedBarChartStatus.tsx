'use client'
import { useMazo } from '@/context/giro-context';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import ChartCard from './ChartCard';

const StackedBarChartStatus = () => {
  const { status } = useMazo();
  function formatDates(array: any[]) {
    return array.map(item => {
      const formattedDate = item.timestamp.toLocaleDateString('en-GB');
      return {
        ...item,
        timestamp: formattedDate
      };
    });
  }
  return (
    <ChartCard title="Status" description="Contaje de mazos de ajos producidos a lo largo del tiempo.">
      <ResponsiveContainer width="100%" height={480}>
        <BarChart data={formatDates(status)} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" fontSize="12px">
            <Label value="Tiempo" offset={0} position="bottom" fontSize="13px" dy={-7} />
          </XAxis>
          <YAxis fontSize="12px">
            <Label
              value="Mazos de ajos"
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

          <Bar dataKey="total" stackId="a" fill="#8884d8" />

        </BarChart>
      </ResponsiveContainer>
    </ChartCard>

  );
};

export default StackedBarChartStatus;