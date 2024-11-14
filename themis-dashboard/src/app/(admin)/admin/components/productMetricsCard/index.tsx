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
  Legend,
  DefaultLegendContentProps, 
} from 'recharts';


type ChartType = 'line' | 'bar' | 'pie';


interface DataPoint {
  name: string;
  value: number;
  value2?: number; 
}


interface DashboardCardProps {
  title: string;
  type: ChartType;
  data: DataPoint[];
  chartProps?: object;
  showLegend?: boolean; 
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  type,
  data,
  chartProps,
  showLegend = true,
}) => {
  

  const renderCustomLegend = (props: DefaultLegendContentProps) => {
    const { payload } = props;

   
    if (!payload || !Array.isArray(payload)) return null;

    return (
      <ul className="flex space-x-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center space-x-2">
            <span
              style={{ backgroundColor: entry.color }}
              className="block w-4 h-4 rounded-full"
            ></span>
            <span className="text-sm text-gray-700">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };


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
              {showLegend && (
                <Legend
                  content={renderCustomLegend}
                  wrapperStyle={{ paddingTop: '10px' }}
                />
              )}
              <Bar dataKey="value" fill="#D98B2B" name="Transcriptions" />
              {data.some((d) => d.value2 !== undefined) && (
                <Bar dataKey="value2" fill="#004B26" name="Generated Case Briefs" />
              )}
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
                outerRadius={60}
                fill="#D98B2B"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              />
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