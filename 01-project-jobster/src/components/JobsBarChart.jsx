import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Bar,
  Legend,
  CartesianGrid,
  YAxis,
  Tooltip,
} from 'recharts';

const JobsBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} height={300} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey='count' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default JobsBarChart;
