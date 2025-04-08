/* eslint-disable */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { Box, Container, Grid, MenuItem, Select } from '@material-ui/core';
import Doctors from 'src/components/dashboard/Doctors';
// import LatestOrders from 'src/components/dashboard//LatestOrders';
// import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard//Sales';
import Requests from 'src/components/dashboard/Requests';
import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import Ambulances from 'src/components/dashboard/Ambulances';
import { makePostRequest } from 'src/services/httpservice';
// import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';

const Dashboard = () => {
  const [summary, setSummary] = useState();
  const [intervalUnit, setIntervalUnit] = useState('day');
  const [startDate, setStartDate] = useState(
    moment().subtract('30', 'days').format()
  );
  // const [interval, setInterval] = useState({
  //   name: 'Last 7 days',
  //   value: '7',
  //   unit: 'days'
  // });
  const [interval, setInterval] = useState({
    name: '30 days',
    value: '30',
    unit: 'days'
  });

  const availableTimeSlots = [
    { name: 'Today', value: '24', unit: 'hours' },
    { name: 'Last 7 days', value: '7', unit: 'days' },
    { name: '30 days', value: '30', unit: 'days' },
    { name: '3 months', value: '3', unit: 'months' },
    { name: '6 months', value: '6', unit: 'months' },
    { name: '1 year', value: '1', unit: 'year' }
  ];

  function updateReportTimes(event) {
    const value = event.target.value;
    var selectedInterval = availableTimeSlots.filter((obj) => {
      return obj.value === value;
    });

    if (selectedInterval.length) {
      selectedInterval = selectedInterval[0];
      setInterval(selectedInterval);

      selectedInterval.name === 'Today'
        ? setIntervalUnit('hour')
        : setIntervalUnit('day');

      //set start date
      if (selectedInterval.name === 'Today') {
        setStartDate(moment().startOf('day'));
      } else {
        setStartDate(
          moment()
            .subtract(selectedInterval.value, selectedInterval.unit)
            .format()
        );
      }
    }
  }

  function getSummary() {
    let body = JSON.stringify({
      from: startDate,
      to: moment().format(),
      unit: intervalUnit
    });

    setSummary(null);

    makePostRequest('reports/summary', body)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setSummary(responseJson.data.summary);
        } else {
          console.log('bad status returned for summary');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getSummary();
  }, [startDate]);

  return (
    <>
      <Helmet>
        <title>Dashboard | Daktari Nyumbani</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          {summary && (
            <Grid container spacing={3}>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={interval.value}
                  onChange={updateReportTimes}
                >
                  {availableTimeSlots.map((slot) => (
                    <MenuItem value={slot.value}>{slot.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Doctors count={summary.serviceProvidersCount} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Ambulances count={summary.ambulancesCount} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalCustomers count={summary.usersCount} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Requests
                  count={summary.requestsCount}
                  interval={interval.name}
                />
              </Grid>

              <Grid item lg={12} md={12} xl={12} xs={12}>
                <Sales
                  serviceRequestsTrend={summary.serviceRequestsTrend}
                  ambulanceRequestsTrend={summary.ambulanceRequestsTrend}
                  interval={interval.name}
                />
              </Grid>
              {/* <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid> */}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
