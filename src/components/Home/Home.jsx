import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function Home({data}) {
    const customers = data.customers;
    const transactions = data.transactions;
  
    const customerNames = customers.map(customer => customer.name);
    const transactionAmounts = customers.map(customer => {
      return transactions
        .filter(transaction => transaction.customer_id === customer.id)
        .reduce((total, transaction) => total + transaction.amount, 0);
    });
  
    const chartData = {
      labels: customerNames,
      datasets: [
        {
          label: 'Total Transaction Amount',
          data: transactionAmounts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Customer Transactions',
        },
      },
    };
  
  return <Bar data={chartData} options={options} />
}
