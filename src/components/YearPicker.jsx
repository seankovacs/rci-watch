import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { getYears } from '../lib/utils';

const YearPicker = ({ label, startYear = 2012, endYear = 2018, ...rest }) => {
  const years = getYears(startYear, endYear);

  return (
    <Form.Group as={Col} className="">
      <Form.Label column sm="6">
        {label}
      </Form.Label>
      <Col sm="12">
        <Form.Select size="md" {...rest}>
          <option></option>
          {
            years.map(d=>{
              return <option key={d} value={d}>{d}</option>
            })
          }
        </Form.Select>
      </Col>
    </Form.Group>
  );
};

export default YearPicker;
