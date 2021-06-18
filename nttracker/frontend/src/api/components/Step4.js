import React, { useState } from 'react';
import {
  Steps,
  Button,
  Row,
  Col,
  Card,
  Typography,
  Form,
  Input,
  Checkbox,
  Divider,
  Radio,
  Space
} from 'antd';
import Latex from 'react-latex';
import 'katex/dist/katex.min.css';
import 'antd/dist/antd.css';
import './test.css';

const { Step } = Steps;
const { Text, Title } = Typography;


function Step4(props) {
  const onChange = (key, val) => {
    props.setState(pre => ({
      ...pre,
      [key]: val
    }));
  };
  return (
    <>
      <div>
        <Row>
          <Col xs={1} sm={2} md={3} lg={4} xl={6} />
          <Col xs={22} sm={20} md={18} lg={16} xl={12}>
            <Card>
              <Steps
                size="small"
                current={3}
                onChange={current => props.gotoStep(current)}
                style={{ paddingBottom: 20 }}
              >
                <Step title="Basic Info" />
                <Step title="Members" />
                <Step title="Teams" />
                <Step title="More Settings" />
              </Steps>
              <Title level={3}>More Settings</Title>
              <div style={{ marginTop: -13, marginBottom: 13 }}>
                <Text italic>
                  Tweak judging criteria and what the public will see.
                </Text>
              </div>
              <Form layout="horizontal">
                <Text style={{ marginBottom: 8 }}>Make the following visible:</Text>
                <Form.Item style={{ marginBottom: -20 }}>
                  <Row>
                    <Col span={8}>
                      <Checkbox
                        onChange={e => onChange('v_points', e.target.checked)}
                        defaultChecked={true}
                      >
                        Points
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        onChange={e => onChange('v_wpm', e.target.checked)}
                        defaultChecked={true}
                      >
                        WPM
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        onChange={e => onChange('v_acc', e.target.checked)}
                        defaultChecked={true}
                      >
                        Accuracy
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Checkbox
                        onChange={e => onChange('v_races', e.target.checked)}
                        defaultChecked={true}
                      >
                        Races
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        onChange={e => onChange('v_age', e.target.checked)}
                        defaultChecked={true}
                      >
                        Join Date
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        onChange={e => onChange('v_analysis', e.target.checked)}
                        defaultChecked={true}
                      >
                        Analyses
                      </Checkbox>
                    </Col>
                  </Row>
                </Form.Item>
                <div style={{ marginTop: 40, marginBottom: -18 }}>
                  <Text>Sort winners by:</Text>
                </div>
                <Form.Item
                  style={{ marginTop: 32, marginBottom: 10, paddingBottom: 10 }}
                >
                  <Radio.Group
                    defaultValue={props.state.chooseWinner}
                    size="small"
                    style={{ paddingBottom: 18 }}
                    onChange={e => onChange('chooseWinner', e.target.value)}
                    buttonStyle="solid"
                  >
                    <Radio.Button value="points">Points</Radio.Button>
                    <Radio.Button value="races"># of Races</Radio.Button>
                    <Radio.Button value="wpm">WPM</Radio.Button>
                    <Radio.Button value="accuracy">Accuracy</Radio.Button>
                    <Radio.Button value="custom">Custom Formula</Radio.Button>
                  </Radio.Group>
                  {props.state.chooseWinner === 'custom' && (
                    <div style={{ marginTop: -5, paddingLeft: 25 }}>
                      <Text italic style={{ marginBottom: 5, marginTop: 6 }}>
                        The factors will be multiplied and constants be added
                      </Text>
                      <table>
                        <tbody>
                          <tr>
                            <td>WPM</td>
                            <td>
                              <Input
                                style={{maxWidth: 150}}
                                bordered={false}
                                placeholder="factor"
                                onChange={e =>onChange('cus_wpm_fac', e.target.value)}
                              />
                            </td>
                            <td>
                              <Input
                                style={{maxWidth: 150}}
                                bordered={false}
                                placeholder="constant"
                                onChange={e => onChange('cus_wpm_const', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Accuracy</td>
                            <td>
                              <Input
                                style={{ maxWidth: 150 }}
                                bordered={false}
                                placeholder="factor"
                                onChange={e => onChange('cus_acc_fac', e.target.value)}
                              />
                            </td>
                            <td>
                              <Input
                                style={{maxWidth: 150}}
                                bordered={false}
                                placeholder="constant"
                                onChange={e => onChange('cus_acc_const', e.target.value)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Divider style={{ marginTop: 11 }} />
                      <Text style={{ marginTop: -15, marginBottom: -10 }}>
                        e.g., Nitrotype's formula:{' '}
                      </Text>
                      <Latex
                        displayMode={true}
                      >{`$$(100 + \\frac{wpm}{2}) * acc $$`}</Latex>
                      <Text style={{ marginTop: -10, marginBottom: -15 }}>
                        is equivalent to:
                      </Text>
                      <Latex displayMode={true}>{`$$
                        \\begin{matrix}
                            0.5 & 100 \\\\
                            1 & 0 \\\\
                        \\end{matrix}
                      $$`}</Latex>
                    </div>
                  )}
                </Form.Item>
              </Form>
              <br />
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
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}


export default Step4;