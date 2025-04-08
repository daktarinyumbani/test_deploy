/* eslint-disable */
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';

// eslint-disable-next-line react/prop-types
const Sales = ({ serviceRequestsTrend, ambulanceRequestsTrend, interval }) => {
  const theme = useTheme();

  const labels = [];
  let serviceRequestsData = [];
  let ambulanceRequestsData = [];

  serviceRequestsTrend.map((records) => {
    labels.push(records.date);
    serviceRequestsData.push(records.count);
  });

  ambulanceRequestsTrend.map((records) => {
    ambulanceRequestsData.push(records.count);
  });

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: serviceRequestsData,
        label: interval
      },
      {
        backgroundColor: colors.grey[200],
        data: ambulanceRequestsData,
        label: interval
      }
    ],
    labels
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card>
      <CardHeader title="Latest Requests" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default Sales;
