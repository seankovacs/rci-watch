import React, { useState, useMemo } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Select, { components as RSComponents } from "react-select";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const RealEstateCitiesPicker = ({ label, onChange, ...rest }) => {
  const localOnChange = (i) => {
    const items = i.map((item) => item.value);
    onChange(items);
  };

  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      textOverflow: "ellipsis",
      maxWidth: "90%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      display: "initial",
      height: 28
    }),
    input: (provided, state) => ({
        ...provided,
        minWidth: '20%'
    }),
  };

  const multiValueContainer = ({ selectProps, data }) => {
    const label = data.label;
    const allSelected = selectProps.value;
    const index = allSelected.findIndex((selected) => selected.label === label);
    const isLastSelected = index === allSelected.length - 1;
    const labelSuffix = isLastSelected ? ` (${allSelected.length})` : ", ";
    const val = `${label}${labelSuffix}`;
    return val;
  };

  const options = [
    { value: "Arcadia, FL", label: "Arcadia, FL" },
    { value: "Cape Coral, FL", label: "Cape Coral, FL" },
    { value: "Clewiston, FL", label: "Clewiston, FL" },
    { value: "Crestview, FL", label: "Crestview, FL" },
    { value: "Deltona, FL", label: "Deltona, FL" },
    { value: "Fort Lauderdale, FL", label: "Fort Lauderdale, FL" },
    { value: "Gainesville, FL", label: "Gainesville, FL" },
    { value: "Homosassa Springs, FL", label: "Homosassa Springs, FL" },
    { value: "Jacksonville, FL", label: "Jacksonville, FL" },
    { value: "Key West, FL", label: "Key West, FL" },
    { value: "Lakeland, FL", label: "Lakeland, FL" },
    { value: "Miami, FL", label: "Miami, FL" },
    { value: "Naples, FL", label: "Naples, FL" },
    { value: "North Port, FL", label: "North Port, FL" },
    { value: "Ocala, FL", label: "Ocala, FL" },
    { value: "Okeechobee, FL", label: "Okeechobee, FL" },
    { value: "Orlando, FL", label: "Orlando, FL" },
    { value: "Palatka, FL", label: "Palatka, FL" },
    { value: "Palm Bay, FL", label: "Palm Bay, FL" },
    { value: "Pensacola, FL", label: "Pensacola, FL" },
    { value: "Port St. Lucie, FL", label: "Port St. Lucie, FL" },
    { value: "Punta Gorda, FL", label: "Punta Gorda, FL" },
    { value: "Sebastian, FL", label: "Sebastian, FL" },
    { value: "Tallahassee, FL", label: "Tallahassee, FL" },
    { value: "Tampa, FL", label: "Tampa, FL" },
    { value: "The Villages, FL", label: "The Villages, FL" },
    { value: "Wauchula, FL", label: "Wauchula, FL" },
    { value: "West Palm Beach, FL", label: "West Palm Beach, FL" },
  ];
  return (
    <Form.Group as={Col} className="">
      <Form.Label column sm="6">
        {label}
      </Form.Label>
      <Col sm="12">
        <Select
          options={options}
          isMulti={true}
          formatGroupLabel={formatGroupLabel}
          hideSelectedOptions={false}
          components={{ MultiValueContainer: multiValueContainer }}
          styles={customStyles}
          isSearchable={false}
          onChange={localOnChange}
        />
      </Col>
    </Form.Group>
  );
};

export default RealEstateCitiesPicker;
