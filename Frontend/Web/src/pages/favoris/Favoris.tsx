import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale);

const favoris: React.FC = () => {
  const articlesData = {
    labels: ['Article 1', 'Article 2', 'Article 3', 'Article 4', 'Article 5'],
    datasets: [
      {
        label: 'Articles',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const clientsData = {
    labels: ['Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 5'],
    datasets: [
      {
        label: 'Clients',
        data: [10, 15, 9, 6, 11],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const stockData = {
    labels: ['Stock 1', 'Stock 2', 'Stock 3', 'Stock 4', 'Stock 5'],
    datasets: [
      {
        label: 'Stock',
        data: [8, 12, 5, 6, 9],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [5, 10, 3, 7, 6],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
    datasets: [
      {
        label: 'Revenue',
        data: [500, 700, 400, 600, 800],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const comparativeData1 = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: '2023 Sales',
        data: [30, 50, 40, 60, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: '2024 Sales',
        data: [40, 35, 70, 70, 80],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const comparativeData2 = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: '2023 Revenue',
        data: [1000, 1500, 1200, 1800, 2000],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: '2024 Revenue',
        data: [1100, 1600, 1300, 1900, 2100],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return (
    <div>
      <div>
        <h2>Articles Chart</h2>
        <Bar data={articlesData} />
      </div>
      <div>
        <h2>Clients Chart</h2>
        <Line data={clientsData} />
      </div>
      <div>
        <h2>Comparative Sales Chart</h2>
        <Line data={comparativeData1} />
      </div>
      <div>
        <h2>Stock Chart</h2>
        <Doughnut data={stockData} />
      </div>
      <div>
        <h2>Sales Chart</h2>
        <Radar data={salesData} />
      </div>
      <div>
        <h2>Revenue Chart</h2>
        <Pie data={revenueData} />
      </div>
     
      <div>
        <h2>Comparative Revenue Chart</h2>
        <Line data={comparativeData2} />
      </div>
    </div>
  );
}

export default favoris;
