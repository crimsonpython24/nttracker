import React from 'react';

import 'antd/dist/antd.css';
import { Steps, Button, Row, Col, Card, Typography, Space } from 'antd';

const { Title } = Typography;


const { Step } = Steps;
const { Text } = Typography;

const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    name: `snaakie ${i}`,
    username: 'snaakie',
    date: 'August 31',
    races: 126000,
    wpm: 100,
    accuracy: 0.97
  });
}


function Step3(props) {
  return (
    <>
      <Row>
        <Col xs={1} sm={2} md={3} lg={4} xl={6} />
        <Col xs={22} sm={20} md={18} lg={16} xl={12}>
          <Card>
            <Steps
              size="small"
              current={2}
              onChange={current => props.gotoStep(current)}
              style={{ paddingBottom: 20 }}
            >
              <Step title="Basic Info" />
              <Step title="Members " />
              <Step title="Teams" />
              <Step title="More Settings" />
            </Steps>
            <Title level={3}>Team Splitter</Title>
            <div style={{ marginTop: -13, marginBottom: 13 }}>
              <Text italic="true">Choose who will belong to each team.</Text>
            </div>
            Yes, I'll keep this in mind. I'll do this once I get all the
            necessary components done.
            <br style={{ marginBottom: 10 }} />
            <Space spacing={3}>
              <Button
                label="Back" onClick={() => props.prevStep()} pagination="none"
              >
                Back
              </Button>
              <Button label="Continue" onClick={() => props.nextStep()}>
                {' '}
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


export default Step3;
