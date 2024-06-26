import {
  Chart as ChartJS,
  CategoryScale,
  Title,
  LineElement,
  Legend,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  Title,
  LineElement,
  Legend,
  LinearScale,
  PointElement,
  Tooltip
);

const Chart = ({ arr = [], currency, days }) => {
  const prices = [];
  const date = [];
  const data = {
    labels: date,
    datasets: [
      {
        label: `price on ${currency}`,
        data: prices,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgba(255,99,132,0.5)",
      },
    ],
  };
  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
    else date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }
  return (
    <>
      <Line options={{ responsive: true }} data={data} />
    </>
  );
};

export default Chart;
