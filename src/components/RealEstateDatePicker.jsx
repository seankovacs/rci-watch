import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const RealEstateDatePicker = ({ label, ...rest }) => {
  return (
    <Form.Group as={Col} className="">
      <Form.Label column sm="6">
        {label}
      </Form.Label>
      <Col sm="12">
        <Form.Select size="md" {...rest}>
          <option></option>
          <option value="2021-07-01">JULY 2021</option>
          <option value="2021-06-01">JUNE 2021</option>
          <option value="2021-05-01">MAY 2021</option>
          <option value="2021-04-01">APRIL 2021</option>
          <option value="2021-03-01">MARCH 2021</option>
          <option value="2021-02-01">FEBRUARY 2021</option>
          <option value="2021-01-01">JANUARY 2021</option>
          <option value="2020-12-01">DECEMBER 2020</option>
          <option value="2020-11-01">NOVEMBER 2020</option>
          <option value="2020-10-01">OCTOBER 2020</option>
          <option value="2020-09-01">SEPTEMBER 2020</option>
          <option value="2020-08-01">AUGUST 2020</option>
          <option value="2020-07-01">JULY 2020</option>
          <option value="2020-06-01">JUNE 2020</option>
          <option value="2020-05-01">MAY 2020</option>
          <option value="2020-04-01">APRIL 2020</option>
          <option value="2020-03-01">MARCH 2020</option>
          <option value="2020-02-01">FEBRUARY 2020</option>
          <option value="2020-01-01">JANUARY 2020</option>
          <option value="2019-12-01">DECEMBER 2019</option>
          <option value="2019-11-01">NOVEMBER 2019</option>
          <option value="2019-10-01">OCTOBER 2019</option>
          <option value="2019-09-01">SEPTEMBER 2019</option>
          <option value="2019-08-01">AUGUST 2019</option>
          <option value="2019-07-01">JULY 2019</option>
          <option value="2019-06-01">JUNE 2019</option>
          <option value="2019-05-01">MAY 2019</option>
          <option value="2019-04-01">APRIL 2019</option>
          <option value="2019-03-01">MARCH 2019</option>
          <option value="2019-02-01">FEBRUARY 2019</option>
          <option value="2019-01-01">JANUARY 2019</option>
          <option value="2018-12-01">DECEMBER 2018</option>
          <option value="2018-11-01">NOVEMBER 2018</option>
          <option value="2018-10-01">OCTOBER 2018</option>
          <option value="2018-09-01">SEPTEMBER 2018</option>
          <option value="2018-08-01">AUGUST 2018</option>
          <option value="2018-07-01">JULY 2018</option>
          <option value="2018-06-01">JUNE 2018</option>
          <option value="2018-05-01">MAY 2018</option>
          <option value="2018-04-01">APRIL 2018</option>
          <option value="2018-03-01">MARCH 2018</option>
          <option value="2018-02-01">FEBRUARY 2018</option>
          <option value="2018-01-01">JANUARY 2018</option>
          <option value="2017-12-01">DECEMBER 2017</option>
          <option value="2017-11-01">NOVEMBER 2017</option>
          <option value="2017-10-01">OCTOBER 2017</option>
          <option value="2017-09-01">SEPTEMBER 2017</option>
          <option value="2017-08-01">AUGUST 2017</option>
          <option value="2017-07-01">JULY 2017</option>
          <option value="2017-06-01">JUNE 2017</option>
          <option value="2017-05-01">MAY 2017</option>
          <option value="2017-04-01">APRIL 2017</option>
          <option value="2017-03-01">MARCH 2017</option>
          <option value="2017-02-01">FEBRUARY 2017</option>
          <option value="2017-01-01">JANUARY 2017</option>
          <option value="2016-12-01">DECEMBER 2016</option>
          <option value="2016-11-01">NOVEMBER 2016</option>
          <option value="2016-10-01">OCTOBER 2016</option>
          <option value="2016-09-01">SEPTEMBER 2016</option>
          <option value="2016-08-01">AUGUST 2016</option>
          <option value="2016-07-01">JULY 2016</option>
          <option value="2016-06-01">JUNE 2016</option>
          <option value="2016-05-01">MAY 2016</option>
          <option value="2016-04-01">APRIL 2016</option>
          <option value="2016-03-01">MARCH 2016</option>
          <option value="2016-02-01">FEBRUARY 2016</option>
          <option value="2016-01-01">JANUARY 2016</option>
          <option value="2015-12-01">DECEMBER 2015</option>
          <option value="2015-11-01">NOVEMBER 2015</option>
          <option value="2015-10-01">OCTOBER 2015</option>
          <option value="2015-09-01">SEPTEMBER 2015</option>
          <option value="2015-08-01">AUGUST 2015</option>
          <option value="2015-07-01">JULY 2015</option>
          <option value="2015-06-01">JUNE 2015</option>
          <option value="2015-05-01">MAY 2015</option>
          <option value="2015-04-01">APRIL 2015</option>
          <option value="2015-03-01">MARCH 2015</option>
          <option value="2015-02-01">FEBRUARY 2015</option>
          <option value="2015-01-01">JANUARY 2015</option>
          <option value="2014-12-01">DECEMBER 2014</option>
          <option value="2014-11-01">NOVEMBER 2014</option>
          <option value="2014-10-01">OCTOBER 2014</option>
          <option value="2014-09-01">SEPTEMBER 2014</option>
          <option value="2014-08-01">AUGUST 2014</option>
          <option value="2014-07-01">JULY 2014</option>
          <option value="2014-06-01">JUNE 2014</option>
          <option value="2014-05-01">MAY 2014</option>
          <option value="2014-04-01">APRIL 2014</option>
          <option value="2014-03-01">MARCH 2014</option>
          <option value="2014-02-01">FEBRUARY 2014</option>
          <option value="2014-01-01">JANUARY 2014</option>
          <option value="2013-12-01">DECEMBER 2013</option>
          <option value="2013-11-01">NOVEMBER 2013</option>
          <option value="2013-10-01">OCTOBER 2013</option>
          <option value="2013-09-01">SEPTEMBER 2013</option>
          <option value="2013-08-01">AUGUST 2013</option>
          <option value="2013-07-01">JULY 2013</option>
          <option value="2013-06-01">JUNE 2013</option>
          <option value="2013-05-01">MAY 2013</option>
          <option value="2013-04-01">APRIL 2013</option>
          <option value="2013-03-01">MARCH 2013</option>
          <option value="2013-02-01">FEBRUARY 2013</option>
          <option value="2013-01-01">JANUARY 2013</option>
          <option value="2012-12-01">DECEMBER 2012</option>
          <option value="2012-11-01">NOVEMBER 2012</option>
          <option value="2012-10-01">OCTOBER 2012</option>
          <option value="2012-09-01">SEPTEMBER 2012</option>
          <option value="2012-08-01">AUGUST 2012</option>
          <option value="2012-07-01">JULY 2012</option>
          <option value="2012-06-01">JUNE 2012</option>
          <option value="2012-05-01">MAY 2012</option>
          <option value="2012-04-01">APRIL 2012</option>
          <option value="2012-03-01">MARCH 2012</option>
          <option value="2012-02-01">FEBRUARY 2012</option>
          <option value="2012-01-01">JANUARY 2012</option>
        </Form.Select>
      </Col>
    </Form.Group>
  );
};

export default RealEstateDatePicker;
