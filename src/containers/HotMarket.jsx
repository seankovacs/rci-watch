import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { getHotMarketData } from "../lib/api";
import RealEstateDatePicker from "../components/RealEstateDatePicker";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2VhbmtvdmFjcy11ZmwiLCJhIjoiY2t3Y2l4aXVoMzRkZzJubmhteTF5Mmc2ZSJ9.WGnrdlURMu5ooEfcWTZfmg";

const HotMarket = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [bounds, setBounds] = useState(null);
  const [lng] = useState(-83.11);
  const [lat] = useState(28.15);
  const [zoom] = useState(5.7);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [top5, setTop5] = useState([]);

  // setup Mapbox map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.on("load", () => {
      const bounds = map.current.getBounds();
      setBounds(bounds);
      setLoaded(true);
    });
    map.current.on("moveend", () => {
      const bounds = map.current.getBounds();
      setBounds(bounds);
    });
  });

  // get data
  useEffect(() => {
    if (loaded && startDate && endDate && bounds) {
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      getHotMarketData(startDate, endDate, ne.lat, ne.lng, sw.lat, sw.lng)
        .then((resp) => {
          loadGeoJSONToMap(resp.data);
          loadGeoJSONToTop5(resp.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [loaded, bounds, startDate, endDate]);

  const loadGeoJSONToMap = (data) => {
    if (map.current.getLayer("hotmarkets")) {
      map.current.removeLayer("hotmarkets");
    }
    if (map.current.getSource("hotmarkets")) {
      map.current.removeSource("hotmarkets");
    }
    map.current.addSource("hotmarkets", {
      type: "geojson",
      data: data,
    });
    map.current.addLayer({
      id: "hotmarkets",
      type: "heatmap",
      source: "hotmarkets",
      paint: {
        "heatmap-weight": {
          property: "hot_score",
          type: "identity",
        },
      },
    });
  };

  const loadGeoJSONToTop5 = (data) => {
    const features = data.features.slice(0, 5);
    const cities = features.map((i) => i.properties.major_metro);
    setTop5(cities);
  };

  const startDateDidChange = (e) => {
    setEndDate('');
    setStartDate(e.target.value);
  };

  const endDateDidChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <Container fluid>
      <Row className="my-2">
        <Col md={2}>
          <RealEstateDatePicker
            label="Start Date"
            value={startDate}
            onChange={startDateDidChange}
          />
        </Col>
        <Col md={2}>
          <RealEstateDatePicker label="End Date" value={endDate} onChange={endDateDidChange} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8}>
          <div ref={mapContainer} className="map-container" />
        </Col>
        <Col xs={6} md={4}>
          <h5>Top 5 Markets</h5>
          <ListGroup>
            {top5.map((city, idx) => {
              return <ListGroup.Item key={idx}>{city}</ListGroup.Item>;
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default HotMarket;
