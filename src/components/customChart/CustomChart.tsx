import { Line, Bar, Doughnut, Pie, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip
);

const DEFAULT_COLORS: string[] = [
  '255, 99, 132',
  '54, 162, 235',
  '255, 206, 86',
  '75, 192, 192',
  '153, 102, 255',
  '255, 159, 64',
];

const getRandomColor = (): number => Math.round(Math.random() * 255);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Monthly profit chart',
    },
  },
};

interface CustomChartProps {
  labels: string[];
  dataValue: string[];
  chartType: string;
}

export const CustomChart = ({ labels, dataValue, chartType }: CustomChartProps) => {
  const [colors, setColors] = useState(DEFAULT_COLORS);

  useEffect(() => {
    if (dataValue.length > colors.length) {
      setColors([...colors, `${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}`]);
    }
  }, [dataValue, colors]);

  const getRGBAColors = (alpha: number = 1): string[] => colors.map(color => `rgba(${color}, ${alpha})`);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Profit',
        backgroundColor: chartType === 'Line' ? `rgb(${colors[0]})` : getRGBAColors(0.5),
        fill: false,
        borderColor: chartType === 'Line' ? `rgb(${colors[0]})` : getRGBAColors(),
        data: dataValue,
      },
    ],
  };

  let CustomChartComponent;

  switch (chartType) {
    case 'Bar':
      CustomChartComponent = Bar;
      break;
    case 'Doughnut':
      CustomChartComponent = Doughnut;
      break;
    case 'Line':
      CustomChartComponent = Line;
      break;
    case 'Pie':
      CustomChartComponent = Pie;
      break;
    case 'Polar':
      CustomChartComponent = PolarArea;
      break;

    default:
      CustomChartComponent = Bar;
      break;
  }

  return <CustomChartComponent data={data} options={options} />;
};
