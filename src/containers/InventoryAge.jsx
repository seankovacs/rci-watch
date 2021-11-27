import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { getInventoryAgeData } from "../lib/api";
import RealEstateDatePicker from "../components/RealEstateDatePicker";
import RealEstateCitiesPicker from "../components/RealEstateCitiesPicker";
import Chart from "react-apexcharts";
import { groupBy } from "../lib/utils";

const InventoryAge = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cities, setCities] = useState([]);
  const [series, setSeries] = useState([]);

  // get data
  useEffect(() => {
    if (startDate && endDate && cities.length > 0) {
      getInventoryAgeData(startDate, endDate, cities.join("|"))
        .then((resp) => {
          const grouped = groupBy(resp.data,i=>i.major_metro);
          setSeries(Object.keys(grouped).map((key) => ({
            name: key,
            data: grouped[key].map((d) => ({
              x: new Intl.DateTimeFormat('en-US').format(new Date(d.start_period)),
              y: d.median_dom.toFixed(1),
            })),
          })))
        })
        .catch((err) => {
          console.log(err.message);
        });
    }else {
        setSeries([])
    }
  }, [startDate, endDate, cities]);

  const startDateDidChange = (e) => {
    setStartDate(e.target.value);
  };

  const endDateDidChange = (e) => {
    setEndDate(e.target.value);
  };

  const citiesDidChange = (items) => {
    setCities(items);
  };

  const options = React.useMemo(
    () => ({
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
        animation: {
          enabled: true,
        },
        dynamticAnimation: {
          enabled: false,
        },
      },
      legend: {
        showForSingleSeries: true,
        show: true,
        position: 'right'
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "categories",
        tickAmount: 'dataPoints',
        categories: []
      },
      yaxis: {
          type: "number"
      },
      tooltip: {
        x: {
          format: "MM/dd/yyyy",
        },
      },
    }),
    []
  );

  return (
    <Container fluid>
      <Row className="my-2">
        <Col md={2}>
          <RealEstateDatePicker
            label="Start Date"
            onChange={startDateDidChange}
          />
        </Col>
        <Col md={2}>
          <RealEstateDatePicker label="End Date" onChange={endDateDidChange} />
        </Col>
        <Col md={4}>
          <RealEstateCitiesPicker label="Cities" onChange={citiesDidChange} />
        </Col>
      </Row>
      <Row>
          <Chart
            className="mr-10"
            options={options}
            series={series}
            type="line"
            width="100%"
            height="600"
          />
      </Row>
    </Container>
  );
};

export default InventoryAge;
