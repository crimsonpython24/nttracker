import enUS from 'antd/lib/calendar/locale/en_US';
import React, { useReducer } from 'react';

export const NTTrackerContext = React.createContext([{}]);


const initialState = {
  user: {id: -1, username: "", authenticated: false, email: "", available_teams: []},
  site: {locale: enUS,},
  raceapi: {
    racedata: {'data': null},
    racerlog: {},
    racerdata: {},
    teamdata: {},
    datatime: {racedata: 0, racerlog: 0, racerdata: 0, teamdata: 0,},
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
        user: {...user, id: -1, username: "", authenticated: false, email: "", available_teams: []},
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
          datatime: apidata.data_date,
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
