import React, { Component } from 'react';

import { Typography } from 'antd';

import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Finish from './components/Finish';

const { Title } = Typography;


function UserForm() {
  const [step, setStep] = React.useState(1);

  const [stateone, setStateone] = React.useState({
    title: '',
    url: '',
    date: '',
    freq: 0,
    freqdate: 'day',
    end_mode: 'time',
    raceend_date: "",
    raceend_count: ""
  });

  const [statetwo, setStatetwo] = React.useState({
    newMembers: false,
    leavingMembers: false,
    entryReq: false,
    req_wpm: 0,
    req_acc: 0,
    req_races: 0,
    req_age: 0,
    memberList: []
  });

  const [statefour, setStatefour] = React.useState({
    v_wpm: true,
    v_acc: true,
    v_races: true,
    v_age: true,
    v_points: true,
    v_analysis: true,
    chooseWinner: 'points',
    cus_wpm_fac: 0,
    cus_wpm_const: 0,
    cus_acc_fac: 0,
    cus_acc_const: 0,
    repeat: false, 
    repeat_cnt: 0,
    repeat_freq: "day",
  });

  // Go to next step
  const nextStep = () => {setStep(step + 1);};
  const prevStep = () => {setStep(step - 1);};
  const firstStep = () => {setStep(1);};
  const gotoStep = step => {setStep(step + 1);};

  switch (step) {
    default: return <Title level={2}>User Forms not working. Enable Javascript!</Title>;
    case 1:
      return (
        <Step1
          nextStep={nextStep}
          setState={setStateone}
          state={stateone}
          gotoStep={step => gotoStep(step)}
        />
      );
    case 2:
      return (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          setState={setStatetwo}
          state={statetwo}
          gotoStep={step => gotoStep(step)}
        />
      );
    case 3:
      return (
        <Step3
          nextStep={nextStep} prevStep={prevStep} gotoStep={step => gotoStep(step)}
        />
      );
    case 4:
      return (
        <Step4
          nextStep={nextStep}
          prevStep={prevStep}
          state={statefour}
          setState={setStatefour}
          gotoStep={step => gotoStep(step)}
        />
      );
    case 5:
      return (
        <Finish
          firstStep={firstStep}
          stateone={stateone}
          statetwo={statetwo}
          statefour={statefour}
        />
      );
  }
}


export default UserForm;
