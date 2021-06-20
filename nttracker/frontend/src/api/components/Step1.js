import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Link, useParams } from "react-router-dom"
import 'antd/dist/antd.css';
import {
  Steps,
  Row,
  Col,
  Button,
  Input, Card, 
  Form,
  DatePicker,
  Typography,
  Space,
  Radio,
  Divider,
  InputNumber
} from 'antd';


const { TextArea } = Input;

const { RangePicker } = DatePicker;
const { Step } = Steps;
const { Text, Title } = Typography;


function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++)
    result.push(i);
  return result;
}

function disabledDate(current) {return current && current < moment().endOf('day');}

let minutes = range(0, 60).filter(function(value, index, arr) {return value % 15 != 0;});

function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20), disabledMinutes: () => minutes
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4), disabledMinutes: () => minutes
  };
}


function Step1(props) {
  const onChange = (key, val) => {props.setState(pre => ({...pre, [key]: val}));};
  
  const [radio1value, setRadio1Value] = React.useState("time");
  const onRadio1Change = e => {
    console.log('radio checked', e.target.value);
    setRadio1Value(e.target.value);
    props.setState(pre => ({...pre, "end_mode": e.target.value}));
  };

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
              <Text italic="true">
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
              <Form.Item label="Event Description" style={{ maxWidth: 550 }}>
                <TextArea rows={4} />
              </Form.Item>
              <Divider/>
              <Form.Item
                label="End mode (how the event will end):"
                style={{ marginBottom: 7 }}
              >
                <Radio.Group
                  onChange={onRadio1Change} value={props.state.end_mode}
                >
                  <Radio value="time">Time</Radio>
                  <Radio value="races">Races</Radio>
                </Radio.Group>
              </Form.Item>
              {props.state.end_mode.toString() === "time" &&
                <Form.Item label="Event Date" style={{ maxWidth: 360 }}>
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
              }
              {props.state.end_mode.toString() === "races" &&
                <Space direction="horizontal" style={{ width: "100%" }}>
                  <Form.Item label="Event Date" style={{ maxWidth: 550 }}>
                    <DatePicker
                      disabledDate={disabledDate}
                      disabledTime={disabledRangeTime} 
                      showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [
                          moment('00:00:00', 'HH:mm'), moment('11:59:59', 'HH:mm')
                        ]
                      }}
                      onChange={value => onChange('raceend_date', value.toString())}
                      format="YYYY-MM-DD HH:mm"/>
                  </Form.Item>
                  <Form.Item label="Race count" style={{ maxWidth: 550 }}>
                    <InputNumber
                      min={1}
                      max={1000}
                      defaultValue={100}
                      onChange={e => onChange('raceend_count', e.target.value)}
                    />
                  </Form.Item>
                </Space>
              }
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
