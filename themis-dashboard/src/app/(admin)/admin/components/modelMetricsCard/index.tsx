import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

type ChartType = 'line' | 'bar' | 'pie';

interface DataPoint {
  name: string;
  value: number;
}

interface ModelMetricsCardProps {
  title: string;
  type: ChartType;
  data: DataPoint[];
  chartProps?: object;
}

const COLORS = ['#D9822B', '#083317'];

const ModelMetricsCard: React.FC<ModelMetricsCardProps> = ({
  title,
  type,
  data,
  chartProps,
}) => {
  const renderChart = () => {
    switch (type) {
      case 'line': 
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={data}
              style={{ background: '#FFFFFF', borderRadius: '8px', padding: '10px' }}
              {...chartProps}
            >
              <XAxis 
                dataKey="name" 
                label={{ 
                  value: 'Transcription Request', 
                  position: 'insideBottom', 
                  offset: -5,
                  style: { fontWeight: 'bold', fill: '#333333' }, 
                }} 
              />
              <YAxis 
                label={{ 
                  value: 'Response Time (seconds)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontWeight: 'bold', fill: '#333333' }, 
                }} 
              />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#FF9933" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar': 
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data}
              style={{ background: '#FFFFFF', borderRadius: '8px', padding: '10px' }}
              {...chartProps}
            >
              <XAxis 
                dataKey="name" 
                label={{ 
                  value: title === 'Adaptability to Case Types' ? 'Case Type' : 'Language Transcribed', 
                  position: 'insideBottom', 
                  offset: -5,
                  style: { fontWeight: 'bold', fill: '#333333' }, 
                }} 
              />
              <YAxis 
                label={{ 
                  value: title === 'Adaptability to Case Types' ? 'Adaptability Score' : 'Word Error Rate (%)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontWeight: 'bold', fill: '#333333' }, 
                }} 
              />
              <Tooltip />
              <Bar dataKey="value" fill="#FF9933" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={250}>
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
    <div className="p-4 bg-gray-200 rounded-lg border border-gray-300 mb-4">
      <h2 className="text-lg font-bold mb-2 text-gray-800">{title}</h2>
      <div className="flex justify-center items-center">{renderChart()}</div>
    </div>
  );
};

export default ModelMetricsCard;
