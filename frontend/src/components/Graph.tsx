// src/App.js

// import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function Graph() {
  const data = {
    labels: [
      'Data Scientist',
      'Data Engineer',
      'Data Analyst',
      'Machine Learning Engineer',
      'Data Science',
      'Research Scientist',
      'Data Architect',
    ],
    datasets: [
      {
        label: 'Job Count',
        data: [1136, 1066, 864, 607, 233, 216, 184],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Graph;
