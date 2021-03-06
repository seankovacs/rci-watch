import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { getDates } from '../lib/utils';

const RealEstateDatePicker = ({ label, startDate = "2012-01-01", endDate = "2021-07-01", value, ...rest }) => {
  const dates = getDates(startDate, endDate);

  return (
    <Form.Group as={Col} className="">
      <Form.Label column sm="6">
        {label}
      </Form.Label>
      <Col sm="12">
        <Form.Select size="md" {...rest} value={value}>
          <option></option>
          {
            dates.map(d=>{
              return <option key={d.format('YYYY-MM-DD')} value={d.format('YYYY-MM-DD')}>{d.format('YYYY - MMMM')}</option>
            })
          }
        </Form.Select>
      </Col>
    </Form.Group>
  );
};

export default RealEstateDatePicker;
