import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


type ChartType = 'line' | 'bar' | 'pie';


interface DataPoint {
  name: string;
  value: number;
}

interface DashboardCardProps {
  title: string;
  type: ChartType;
  data: DataPoint[];
  chartProps?: object;
}


const COLORS = ['#D9822B', '#083317'];

const DashboardCard: React.FC<DashboardCardProps> = ({ title, type, data, chartProps }) => {
 
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={data}
              style={{ background: '#FFFFFF', borderRadius: '8px', padding: '10px' }}
              {...chartProps}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#FF9933" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={data}
              style={{ background: '#FFFFFF', borderRadius: '8px', padding: '10px' }}
              {...chartProps}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FF9933" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart style={{ background: '#FFFFFF', borderRadius: '8px', padding: '10px' }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                {...chartProps}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-gray-200 rounded-lg shadow-md border border-gray-300 mb-4">
      <h2 className="text-lg font-bold mb-2 text-gray-800">{title}</h2>
      <div className="flex justify-center items-center">{renderChart()}</div>
    </div>
  );
};

export default DashboardCard;


