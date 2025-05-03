
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DriverData } from '@/lib/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
//import {  } from '@/utilities/loadingCSVData';

interface SpeedChartProps {
  driverData: DriverData[];
}

const SpeedChart: React.FC<SpeedChartProps> = ({ driverData }) => {
  // Process data for the chart - take 20 most recent entries based on timestamp
  const chartData = [...driverData]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 20)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .map(driver => ({
      time: new Date(driver.timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      driverName: driver.driver_name,
      speed: Math.round(driver.speed),
      driverId: driver.driver_id
    }));
    
  // Group by time for the chart
  const uniqueTimes = [...new Set(chartData.map(item => item.time))];
  const processedData = uniqueTimes.map(time => {
    const entries = chartData.filter(item => item.time === time);
    const result: { [key: string]: any } = { time };
    
    entries.forEach(entry => {
      result[entry.driverName] = entry.speed;
    });
    
    return result;
  });

  // Generate colors for lines
  const generateColors = () => {
    const uniqueDrivers = [...new Set(chartData.map(item => item.driverName))];
    const colorPalette = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
    
    return uniqueDrivers.map((driver, index) => ({
      driver,
      color: colorPalette[index % colorPalette.length]
    }));
  };
  
  const driverColors = generateColors();

  return (
    <Card className="col-span-3 hover-scale">
      <CardHeader>
        <CardTitle>Real-time Speed Monitoring</CardTitle>
        <CardDescription>Live data from active drivers (mph)</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={processedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="time" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip />
            <Legend />
            {driverColors.map((item) => (
              <Line
                key={item.driver}
                type="monotone"
                dataKey={item.driver}
                stroke={item.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpeedChart;
