import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import { getHotMarketData } from '../lib/api';
import RealEstateDatePicker from '../components/RealEstateDatePicker';

const HotMarket = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // get data
 
  const startDateDidChange = (e) => {
    setStartDate(e.target.value)
  }

  const endDateDidChange = (e) => {
    setEndDate(e.target.value)
  }

  return (
    <Container fluid>
      <Row className="my-2">
        <Col md={2}><RealEstateDatePicker label="Start Date" onChange={startDateDidChange} /></Col>
        <Col md={2}><RealEstateDatePicker label="End Date"onChange={endDateDidChange} /></Col>
        <Col md={2}>CityPicker</Col>
      </Row>
      <Row>
        <Col xs={12} md={8}>
          
        </Col>
        <Col xs={6} md={4}>
          <h5>Cities</h5>
          <ListGroup>
          {/* {top5.map((city, idx)=>{
            return (
              <ListGroup.Item key={idx}>{city}</ListGroup.Item>
            )
          })} */}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default HotMarket;
