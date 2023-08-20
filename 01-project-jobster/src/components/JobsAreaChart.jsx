import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  Area,
  CartesianGrid,
  YAxis,
  Tooltip,
} from 'recharts';

const JobsAreaChart = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='count'
          stroke='#8884d8'
          fillOpacity={1}
          fill='#8884d8'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default JobsAreaChart;
