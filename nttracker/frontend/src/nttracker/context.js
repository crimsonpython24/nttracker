import enUS from 'antd/lib/calendar/locale/en_US';
import React, { useReducer } from 'react';

export const NTTrackerContext = React.createContext([{}]);


const initialState = {
  user: {
    username: "",
    authenticated: false,
    email: "",
  },
  site: {
    locale: enUS,
  }
};


const nttrackerReducer = (state, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      let {user, site, ...etc} = state;
      let {userdata} = action;
      return {
        ...etc,
        user: {
          ...user,
          ...userdata,
        },
        site: {
          ...site
        }
      }
    }
    case 'LOGGED_OUT': {
      let {user, site, ...etc} = state;
      return {
        ...etc,
        user: {
          ...user,
          username: "",
          authenticated: false,
          email: "",
        },
        site: {
          ...site
        }
      }
    }
    case 'SWITCHED_LOCALE': {
      let {user, site, ...etc} = state;
      let {locale} = action;
      return {
        ...etc,
        user: {
          ...user,
        },
        site: {
          locale: locale
        }
      }
    }
    default:
      return state;
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
