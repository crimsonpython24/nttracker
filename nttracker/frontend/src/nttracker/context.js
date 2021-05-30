import React, { useReducer } from 'react';

export const NTTrackerContext = React.createContext([{}]);


const initialState = {
  user: {
    username: "",
    authenticated: false,
    email: "",
  }
};


const nttrackerReducer = (state, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      let {user, ...etc} = state;
      let {userdata} = action;
      return {
        ...etc,
        user: {
          ...user,
          ...userdata,
        }
      }
    }
    case 'LOGGED_OUT': {
      let {user, ...etc} = state;
      return {
        ...etc,
        user: {
          ...user,
          username: "",
          authenticated: false,
          email: "",
        }
      }
    }
    case 'UPDATED_PROFILE': {
      let {user, ...etc} = state;
      let {type, ...attrs} = action;
      console.log('this is some text', action);
      let ret = {
        ...etc,
        user: {
          ...user,
          ...attrs,
        }
      }
      console.log('stateuser', ret)
      return ret;
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
