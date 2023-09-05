import { Button, Steps, Typography } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';

const { Title } = Typography;

function Finish(props) {
  console.log(props.statefour);
  return (
    <>
      <div>
        <Title level={2}>Results</Title>
        <Title level={5}>Just temporary smh</Title>
        <ul>
          <li>Event: {props.stateone.title}</li>
          <li>URL: {props.stateone.url}</li>
          <li>End mode: {props.stateone.end_mode}</li>
          {props.stateone.end_mode === 'races' && (
            <ul>
              <li>End date: {props.stateone.raceend_date.toString()}</li>
              <li>End count: {props.stateone.raceend_count}</li>
            </ul>
          )}
          {props.stateone.end_mode === 'count' && (
            <ul>
              <li>Date: {props.stateone.date.toString()}</li>
            </ul>
          )}
          <li>New Members: {props.statetwo.newMembers.toString()}</li>
          <li>Leaving Members: {props.statetwo.leavingMembers.toString()}</li>
          <li>Entry Requirements: {props.statetwo.entryReq.toString()}</li>
          <ul>
            <li>WPM: {props.statetwo.req_wpm}</li>
            <li>Accuracy: {props.statetwo.req_acc}</li>
            <li>Races: {props.statetwo.req_races}</li>
            <li>Days in team: {props.statetwo.req_age}</li>
          </ul>
          <li>Members: {props.statetwo.memberList.toString()}</li>
          <li>View:</li>
          <ul>
            <li>Races: {props.statefour.v_races.toString()}</li>
            <li>WPM: {props.statefour.v_wpm.toString()}</li>
            <li>Points: {props.statefour.v_points.toString()}</li>
            <li>Accuracy: {props.statefour.v_acc.toString()}</li>
            <li>Analysis: {props.statefour.v_analysis.toString()}</li>
            <li>Date: {props.statefour.v_age.toString()}</li>
          </ul>
          <li>Ranking: {props.statefour.chooseWinner}</li>
          <ul>
            <li>WPM factor: {props.statefour.cus_wpm_fac}</li>
            <li>WPM const: {props.statefour.cus_wpm_const}</li>
            <li>Accuracy factor: {props.statefour.cus_acc_fac}</li>
            <li>Accuracy const: {props.statefour.cus_acc_const}</li>
          </ul>
          <li>Repeating: {props.statefour.repeat.toString()}</li>
          {props.statefour.repeat.toString() === 'true' && (
            <ul>
              <li>{props.statefour.freq}</li>
              <li>{props.statefour.freqdate}</li>
            </ul>
          )}
        </ul>
        <Button label='Continue' onClick={() => props.firstStep()}>
          {' '}
          FIrst step
        </Button>
      </div>
    </>
  );
}

export default Finish;
