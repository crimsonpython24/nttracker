import enUS from 'antd/lib/calendar/locale/en_US';
import React, { useReducer } from 'react';

export const NTTrackerContext = React.createContext([{}]);


const initialState = {
  user: {username: "", authenticated: false, email: "",},
  site: {locale: enUS,},
  raceapi: {
    racedata: {'data': null}, racerlog: {}, racerdata: {}, teamdata: {},
  }
};


const nttrackerReducer = (state, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      let {user, site, raceapi, ...etc} = state;
      let {userdata} = action;
      return {
        ...etc, user: {...user, ...userdata,}, site: {...site}, raceapi: {...raceapi},
      }
    }
    case 'LOGGED_OUT': {
      let {user, site, raceapi, ...etc} = state;
      return {
        ...etc,
        user: {...user, username: "", authenticated: false, email: "",},
        site: {...site},
        raceapi: {...raceapi},
      }
    }
    case 'SWITCHED_LOCALE': {
      let {user, site, raceapi, ...etc} = state;
      let {locale} = action;
      return {...etc, user: {...user,}, site: {locale: locale}, raceapi: {...raceapi},}
    }
    case 'REFRESH_APIS': {
      let {user, site, raceapi, ...etc} = state;
      let apidata = action.data;
      return {
        ...etc,
        user: {...user,},
        site: {...site},
        raceapi: {
          ...raceapi,
          racedata: apidata.racedata.racedata,
          racerlog: apidata.racerlog.racerlog,
          racerdata: apidata.racerdata.racerdata,
          teamdata: apidata.teamdata.teamdata,
        },
      }
    }
    default: return state;
  }
};


const NTTrackerContextProvider = props => {
  const initState = props.initState || initialState;
  const [state, dispatch] = useReducer(nttrackerReducer, initState);

  return (
    <NTTrackerContext.Provider value={[state, dispatch]}>
      {props.children}
    </NTTrackerContext.Provider>
  );
};


export default NTTrackerContextProvider;
