import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Steps,
  Table,
  Typography,
} from 'antd';
import 'antd/dist/antd.css';
import React from 'react';

const { Step } = Steps;
const { Text, Title } = Typography;

const columns = [
  { title: 'Name', dataIndex: 'name', width: 150 },
  { title: 'Username', dataIndex: 'username', width: 150 },
  { title: 'Join Date', dataIndex: 'date', width: 100 },
  { title: 'Races', dataIndex: 'races', width: 100 },
  { title: 'WPM', dataIndex: 'wpm', width: 80 },
  { title: 'Accuracy', dataIndex: 'accuracy', width: 80 },
];

const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    name: `snaakie ${i}`,
    username: 'snaakie',
    date: 'August 31',
    races: 126000,
    wpm: 100,
    accuracy: 0.97,
  });
}

const rowSelection = {
  getCheckboxProps: record => ({ memberlist: record.selectedRowKeys }),
};

function Step2(props) {
  const onChange = (key, val) => {
    props.setState(pre => ({ ...pre, [key]: val }));
  };
  return (
    <>
      <Row>
        <Col xs={1} sm={2} md={3} lg={4} xl={6} />
        <Col xs={22} sm={20} md={18} lg={16} xl={12}>
          <Card>
            <Steps
              size='small'
              current={1}
              onChange={current => props.gotoStep(current)}
              style={{ paddingBottom: 20 }}
            >
              <Step title='Basic Info' />
              <Step title='Members' />
              <Step title='Teams' />
              <Step title='More Settings' />
            </Steps>
            <Title level={3}>Participants</Title>
            <div style={{ marginTop: -13, marginBottom: 13 }}>
              <Text italic='true'>
                Choose who to include in the competition.
              </Text>
            </div>
            <Form>
              <Form.Item style={{ marginBottom: 0 }}>
                <Checkbox
                  onChange={e => onChange('newMembers', e.target.checked)}
                  checked={props.state.newMembers}
                >
                  Allow new members
                </Checkbox>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Checkbox
                  onChange={e => onChange('leavingMembers', e.target.checked)}
                  checked={props.state.leavingMembers}
                >
                  Remove leaving members
                </Checkbox>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Checkbox
                  onChange={e => onChange('entryReq', e.target.checked)}
                  checked={props.state.entryReq}
                >
                  Entry requirements (select to expand)
                </Checkbox>
              </Form.Item>
              {props.state.entryReq && (
                <>
                  <Form.Item
                    label='Minimum WPM'
                    style={{ paddingLeft: 49, marginBottom: -5 }}
                  >
                    <InputNumber
                      style={{ maxWidth: 150 }}
                      defaultValue={props.state.req_wpm}
                      size='small'
                      min={0}
                      bordered={false}
                      placeholder='e.g., 75'
                      onChange={value => onChange('req_wpm', value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label='Minimum accuracy'
                    style={{ paddingLeft: 49, marginBottom: -5 }}
                  >
                    <InputNumber
                      style={{ maxWidth: 150 }}
                      defaultValue={props.state.req_acc}
                      size='small'
                      min={0}
                      bordered={false}
                      placeholder='e.g., 0.97'
                      onChange={value => onChange('req_acc', value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label='Minimum races'
                    style={{ paddingLeft: 49, marginBottom: -5 }}
                  >
                    <InputNumber
                      style={{ maxWidth: 150 }}
                      defaultValue={props.state.req_races}
                      size='small'
                      min={0}
                      bordered={false}
                      placeholder='e.g., 50'
                      onChange={value => onChange('req_races', value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label='Minimum days in team'
                    style={{ paddingLeft: 49, marginBottom: 0 }}
                  >
                    <InputNumber
                      style={{ maxWidth: 150 }}
                      defaultValue={props.state.req_age}
                      size='small'
                      min={0}
                      bordered={false}
                      placeholder='e.g., 10'
                      onChange={value => onChange('req_age', value)}
                    />
                  </Form.Item>
                </>
              )}
              <Divider />
              <Table
                columns={columns}
                dataSource={data}
                scroll={{ y: 240 }}
                rowSelection={{
                  type: 'checkbox',
                  ...rowSelection,
                  onChange: e => onChange('memberList', e),
                  selectedRowKeys: props.state.memberList,
                }}
                pagination={{ pageSize: 50, position: ['none', 'none'] }}
              />
            </Form>
            <br />
            <Space spacing={3}>
              <Button label='Back' onClick={() => props.prevStep()}>
                Back
              </Button>
              <Button label='Continue' onClick={() => props.nextStep()}>
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

export default Step2;
