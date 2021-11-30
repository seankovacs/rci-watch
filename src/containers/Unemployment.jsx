import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { getUnemploymentData } from "../lib/api";
import RealEstateCitiesPicker from "../components/RealEstateCitiesPicker";
import YearPicker from "../components/YearPicker";
import Chart from "react-apexcharts";
import { groupBy } from "../lib/utils";

const Unemployment = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cities, setCities] = useState([]);
  const [seriesA, setSeriesA] = useState([]);
  const [seriesB, setSeriesB] = useState([]);

  // get data
  useEffect(() => {
    if (startDate && endDate && cities.length > 0) {
      getUnemploymentData(startDate, endDate, cities.join("|"))
        .then((resp) => {
          console.log(resp);
          const grouped = groupBy(resp.data, (i) => i.major_metro);
          const dataA = [];
          const dataB = [];

          // setSeries(
          Object.keys(grouped).forEach((key) => {
            dataA.push({
              name: key,
              type: "line",
              data: grouped[key].map((d) => ({
                x: d.year,
                y: d.median_sale_price.toFixed(2),
              })),
            });
            dataB.push({
              name: key,
              opposite: true,
              type: "line",
              data: grouped[key].map((d) => ({
                x: d.year,
                y: `${(d.unemployment_rate * 100).toFixed(2)}%`,
              })),
            });
          });
          // );

          setSeriesA(dataA);
          setSeriesB(dataB);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setSeriesA([]);
      setSeriesB([]);
    }
  }, [startDate, endDate, cities]);

  const startDateDidChange = (e) => {
    setEndDate("");
    setStartDate(e.target.value);
  };

  const endDateDidChange = (e) => {
    setEndDate(e.target.value);
  };

  const citiesDidChange = (items) => {
    setCities(items);
  };

  const optionsA = React.useMemo(
    () => ({
      title: {
        text: "Median Home Sales Price $",
      },
      chart: {
        type: "line",
        stacked: false,
        toolbar: {
          show: false,
        },
        animation: {
          enabled: true,
        },
        dynamticAnimation: {
          enabled: false,
        },
        id: "lineA",
        group: "unemp",
      },
      grid: {
        padding: {
          left: 50,
        },
      },
      legend: {
        showForSingleSeries: true,
        show: true,
        position: "right",
      },
      dataLabels: {
        enabled: true,
        rotate: 45,
        formatter: (value) => `$${value.toLocaleString()}`,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "categories",
        tickAmount: "dataPoints",
        categories: [],
      },
      yaxis: [
        {
          type: "column",
          labels: {
            rotate: -45,
            formatter: (value) => `$${value.toLocaleString()}`,
          },
        },
      ],
      tooltip: {
        x: {
          format: "yyyy",
        },
        y: {
          formatter: (value) => `$${value.toLocaleString()}`,
        },
      },
    }),
    []
  );

  const optionsB = React.useMemo(
    () => ({
      title: {
        text: "Unemployment %",
      },
      chart: {
        type: "line",
        // stacked: false,
        toolbar: {
          show: false,
        },
        animation: {
          enabled: true,
        },
        dynamticAnimation: {
          enabled: false,
        },
        id: "lineB",
        group: "unemp",
      },
      grid: {
        padding: {
          left: 50,
        },
      },
      legend: {
        showForSingleSeries: true,
        show: true,
        position: "right",
      },
      dataLabels: {
        enabled: true,
        formatter: (value) => `${value.toFixed(1)}%`,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "categories",
        tickAmount: "dataPoints",
        categories: [],
      },
      yaxis: [
        {
          type: "line",
          labels: {
            minWidth: 40,
            rotate: -45,
            formatter: (value) => `${value.toFixed(1)}%`,
          },
        },
      ],
      tooltip: {
        x: {
          format: "yyyy",
        },
        y: {
          formatter: (value) => `${value.toFixed(2)}%`,
        },
      },
    }),
    []
  );

  return (
    <Container fluid>
      <Row className="my-2">
        <Col md={2}>
          <YearPicker
            label="Start Year"
            endYear={2020}
            value={startDate}
            onChange={startDateDidChange}
          />
        </Col>
        <Col md={2}>
          <YearPicker
            label="End Year"
            endYear={2020}
            value={endDate}
            onChange={endDateDidChange}
          />
        </Col>
        <Col md={4}>
          <RealEstateCitiesPicker label="Cities" onChange={citiesDidChange} />
        </Col>
      </Row>
      <Row>
        <Chart
          className="mr-10"
          options={optionsA}
          series={seriesA}
          width="100%"
          height="300"
        />
      </Row>
      <Row>
        <Chart
          className="mr-10"
          options={optionsB}
          series={seriesB}
          width="100%"
          height="300"
        />
      </Row>
    </Container>
  );
};

export default Unemployment;
