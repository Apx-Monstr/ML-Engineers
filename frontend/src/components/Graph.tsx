import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
interface JobData {
  job_title: string;
  count: number;
}
interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  yAxisID?: string;
}
interface DefaultData {
  avgSalary: number;
  total_jobs: number;
  work_year: number;
}
interface ChartComponentProps {
  year?: number | null;
}
const ChartComponent: React.FC<ChartComponentProps> = ({ year }) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [] as Dataset[],
  });
  const fetchData = async (year?: number) => {
    try {
      const endpoint = year
        ? `https://apxmonstr.pythonanywhere.com/jobTitles/${year}`
        : 'https://apxmonstr.pythonanywhere.com/maintable';
      const response = await axios.get(endpoint);
      const data = response.data;
      if (year) {
        const labels = data.map((item: JobData) => item.job_title);
        const counts = data.map((item: JobData) => item.count);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Job Count',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } else {
        const labels = data.map((item: DefaultData) => item.work_year.toString());
        const avgSalaries = data.map((item: DefaultData) => item.avgSalary);
        const totalJobs = data.map((item: DefaultData) => item.total_jobs);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Average Salary',
              data: avgSalaries,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
              yAxisID: 'y1',
            },
            {
              label: 'Total Jobs',
              data: totalJobs,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              yAxisID: 'y2',
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  useEffect(() => {
    fetchData(year ?? undefined);
  }, [year]);
  const options = {
    scales: {
      y1: {
        type: 'linear' as const,
        position: 'left' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Average Salary',
        },
      },
      y2: {
        type: 'linear' as const,
        position: 'right' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Jobs',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  return (
    <div className='bg-white rounded p-8 h-full w-full' style={{ width: '600px', height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
export default ChartComponent;
