import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Link, useParams } from "react-router-dom"
import 'antd/dist/antd.css';
import {
  Steps,
  Row,
  Col,
  Button,
  Input,
  Card,
  Form,
  DatePicker,
  Checkbox,
  Select,
  Divider,
  Typography,
  Space
} from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Step } = Steps;
const { Text, Title } = Typography;


function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}


function disabledDate(current) {
  return current && current < moment().endOf('day');
}


let minutes = range(0, 60).filter(function(value, index, arr) {
  return value % 15 != 0;
});


function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => minutes
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => minutes
  };
}


const PriceInput = ({
  value = {},
  onChange,
  editable,
  freqchange,
  datefreqchange
}) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState('day');

  const triggerChange = changedValue => {
    onChange?.({number, currency, ...value, ...changedValue});
  };

  const onNumberChange = e => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {return;}
    if (!('number' in value)) {setNumber(newNumber); freqchange(newNumber);}
    triggerChange({number: newNumber});
  };

  const onCurrencyChange = newCurrency => {
    if (!('currency' in value)) {setCurrency(newCurrency); datefreqchange(newCurrency);}
    triggerChange({currency: newCurrency});
  };

  useEffect(() => {editable = false;}, []);
  let selectprops = { disabled: !editable };
  let numinputprops = { disabled: !editable };

  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        {...numinputprops}
        style={{width: 70}}
      />
      <Select
        value={value.currency || currency}
        style={{maxWidth: 130, margin: '0 8px'}}
        {...selectprops}
        onChange={onCurrencyChange}
      >
        <Option value="day">Per day</Option>
        <Option value="week">Per week</Option>
        <Option value="two weeks">Per two weeks</Option>
        <Option value="month">Per month</Option>
      </Select>
    </span>
  );
};


function Step1(props) {
  const onChange = (key, val) => {props.setState(pre => ({...pre, [key]: val}));};
  const { teamname } = useParams();
  return (
    <>
      <Row>
        <Col xs={1} sm={2} md={3} lg={4} xl={6} />
        <Col xs={22} sm={20} md={18} lg={16} xl={12}>
          <Card>
            <Steps
              size="small"
              current={0}
              onChange={current => props.gotoStep(current)}
              style={{ paddingBottom: 20 }}
            >
              <Step title="Basic Info" />
              <Step title="Members" />
              <Step title="Teams" />
              <Step title="More Settings" />
            </Steps>
            <Title level={3}>Basic Information</Title>
            <div style={{ marginTop: -13, marginBottom: 13 }}>
              <Text italic>
                Title, optional URL, date range, and repetition settings.
              </Text>
            </div>
            <Form layout="vertical">
              <Form.Item label="Event Title" style={{ maxWidth: 550 }}>
                <Input
                  placeholder="e.g., S34 Season Tracker"
                  onChange={e => onChange('title', e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Event URL (clickable at title)"
                style={{ maxWidth: 550 }}
                onChange={e => onChange('url', e.target.value)}
              >
                <Input placeholder="e.g., https://youtu.be/dQw4w9WgXcQ" />
              </Form.Item>
              <Form.Item label="Event Date" style={{ maxWidth: 550 }}>
                <RangePicker
                  style={{ width: '100%' }}
                  disabledDate={disabledDate}
                  disabledTime={disabledRangeTime}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [
                      moment('00:00:00', 'HH:mm'), moment('11:59:59', 'HH:mm')
                    ]
                  }}
                  onChange={value => onChange('date', value.toString())}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
              <Divider />
              <Form.Item>
                <Checkbox
                  checked={props.state.repeat}
                  onChange={e => onChange('repeat', e.target.checked)}
                >
                  Repeat Event
                </Checkbox>
                <PriceInput
                  editable={props.state.repeat}
                  freqchange={e => onChange('freq', e)}
                  datefreqchange={e => onChange('freqdate', e)}
                />
              </Form.Item>
            </Form>
            <br />
            <Space spacing={3}>
              <Link to={"/team/" + teamname}>
                <Button pagination="none">Back</Button>
              </Link>
              <Button label="Continue" onClick={() => props.nextStep()}>
                Continue
              </Button>
            </Space>
            <br />
          </Card>
        </Col>
      </Row>
    </>
  );
}


export default Step1;
