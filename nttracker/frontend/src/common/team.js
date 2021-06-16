import { useContext } from "react";

import { NTTrackerContext } from "../nttracker/context";


function pushhistory(url, callback) {
  history.push(url);
  callback();
}


function checklogin(url, auth, refreshCallback, callback) {
  if (!auth) 
    pushhistory(url, function(){refreshCallback();});
  else 
    callback();
}


export { checklogin };
