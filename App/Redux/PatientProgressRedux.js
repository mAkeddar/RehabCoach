import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { StartupActions } from '../Redux/StartupRedux';
import moment from 'moment';
import { Colors } from '../Themes/';
import I18n from '../I18n/I18n';

import AppConfig from '../Config/AppConfig';

import Log from '../Utils/Log';
const log = new Log('Redux/SettingsRedux');

/* ------------- Actions and Action Creators ------------- */
const { Types, Creators } = createActions({ 
  setPoints : ["participantPoints","pointsArray"],
  setTotalPoints:["total_points"],
  setPointsArray : ["participantPoints","pointsArray"],
  setLearningBool : ["participantLearning"],
  setTrainingBool : ["participantTraining"],
  setSessionBool : ["sessionIsOn"],
  setDate : ["systemDay","systemMonth","systemYear",
              "learningTime","trainingTime"],
  setBadges: ["id"],
  setButtonTrainPressed:["buttonTrainPressed"]
  
});

export const PatientActions = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    participantPoints:0,
    participantLearning:0,
    participantTraining:0,
    pointsArray:[0,0,0,0,0,0,0],
    day_counter:0,
    total_points :0,
    sessionIsOn : 0,
    events:[],
    badges:[
      {id:0,title: I18n.t('Badges.first'),taskCompleted:0},
      {id:1,title: I18n.t('Badges.second'),taskCompleted:0},
      {id:2,title: I18n.t('Badges.third'),taskCompleted:0},
      {id:3,title: I18n.t('Badges.fourth'),taskCompleted:0},
      {id:4,title: I18n.t('Badges.fifth'),taskCompleted:0}
      ],
    learningTime:10,
    trainingTime:14,
    buttonTrainPressed:0
    
});

/* ------------- Reducers ------------- */

export const setPoints = (state, { participantPoints }) => {
  let newState = Object.assign({}, state);
  //let newPoints = newState.total_points;
  //newPoints += Number(participantPoints);
  return { 
    ...state, //copying the orignal state
    participantPoints: participantPoints, //reassingning temp to new array
   }
}

export const setTotalPoints = (state,{total_points}) =>{
  return { 
    ...state, //copying the orignal state
    total_points: total_points, //reassingning temp to new array
   }

}

export const setButtonTrainPressed = (state,{buttonTrainPressed}) =>{
  return {
    ... state,
    buttonTrainPressed: buttonTrainPressed
  };

}
export const setPointsArray = (state, { participantPoints }) => {
  
  const newArray = [...state.pointsArray];
  let newState = Object.assign({}, state);
  let newCounter = newState.day_counter;
  console.log(newCounter);
  newArray.splice(newCounter%7,1,participantPoints);
  newCounter += 1;
  return {
    ...state,
    pointsArray:newArray,
    day_counter:newCounter
  };
}
export const setLearningBool = (state, { participantLearning }) => {
    return {
    ... state,
    participantLearning:participantLearning
    }
  }
export const setTrainingBool = (state, { participantTraining }) => {
    return {
      ... state,
      participantTraining:participantTraining  
    }
  } 
export const setSessionBool = (state, { sessionIsOn }) => {
  return {
    ... state,
    sessionIsOn:sessionIsOn
    }
  
  } 

dateformat = (date) => {
    if (date.length == 1)
      return "0"+date;
    else 
      return date;
}
export const setDate = (state, {systemDay,systemMonth,systemYear,learningTime,trainingTime})=> {
  
  newArray = [...state.events];

  tmp1 = {
    color: Colors.badge.background,
    start : systemYear+"-"+dateformat(systemMonth)+"-"+dateformat(systemDay) +" "
            + dateformat(learningTime)+":00:00",
    end : systemYear+"-"+dateformat(systemMonth)+"-"+dateformat(systemDay) + " "
            + dateformat(learningTime)+":30:00",
    title : I18n.t("checklist.learningSession")
  }
  tmp2 = {
    color:Colors.badge.background,
    start : systemYear+"-"+dateformat(systemMonth)+"-"+dateformat(systemDay) +" "
            + dateformat(trainingTime)+":00:00",
    end : systemYear+"-"+dateformat(systemMonth)+"-"+dateformat(systemDay) + " "
            + dateformat(trainingTime)+":30:00",
    title : I18n.t("checklist.exerciceSession")
  }
  newArray = [...newArray,tmp1,tmp2]
  
  console.log(state.events)
  return {
    ...state,
    events:newArray,
    learningTime:learningTime,
    trainingTime:trainingTime
  }
}

export const setBadges = (state,{id}) =>{
  var temp = [...state.badges];
  var _id = Object.values(id)[0];
  let item = {
    ...temp[_id],
    taskCompleted:1
  }
  temp[_id] = item;

  console.log(_id)
  return { 
    ...state, //copying the orignal state
    badges: temp, //reassingning temp to new array
   }
}
/* -
------------ Hookup Reducers To Actions ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_POINTS]: setPoints,
  [Types.SET_TOTAL_POINTS]:setTotalPoints,
  [Types.SET_LEARNING_BOOL]: setLearningBool,
  [Types.SET_TRAINING_BOOL]: setTrainingBool,
  [Types.SET_POINTS_ARRAY]:setPointsArray,
  [Types.SET_SESSION_BOOL]:setSessionBool,
  [Types.SET_DATE]:setDate,
  [Types.SET_BADGES]:setBadges,
  [Types.SET_BUTTON_TRAIN_PRESSED]:setButtonTrainPressed

});
