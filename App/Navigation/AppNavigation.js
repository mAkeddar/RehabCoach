import React from 'react';

import { enableScreens } from 'react-native-screens';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Badge } from 'react-native-elements';
import { Colors } from '../Themes';
import Icon from 'react-native-vector-icons/Ionicons';
import { Images } from '../Themes';

import LoadingContainer from '../Containers/LoadingContainer';

import Chat from '../Containers/Chat/Chat';

import Learn from '../Containers/Menu/Learn';
import Profile from '../Containers/Menu/Profile';
import Checklist from '../Containers/Menu/Checklist';
import MenuView from '../Containers/Menu/MenuView';
import DailySchedule from '../Containers/Menu/DailySchedule';
import Exercises from "../Containers/Menu/Exercises";
import Badges  from "../Containers/Menu/Badges";

import ScreenStartWithLogo from '../Containers/Onboarding/ScreenStartWithLogo';
import ScreenLanguageSelection from '../Containers/Onboarding/ScreenLanguageSelection';
import ScreenCoachSelection from '../Containers/Onboarding/ScreenCoachSelection';
import ScreenWelcomeByCoach from '../Containers/Onboarding/ScreenWelcomeByCoach';
import ScreenPatientInfo from '../Containers/Onboarding/ScreenPatientInfo';

import play from "../Images/Menu/playGray.png"
import exercises from "../Images/Menu/en-cours.png"
import badges from "../Images/Menu/badge.png"
import points from "../Images/Menu/favoris.png"

import I18n from '../I18n/I18n';
import { connect } from 'react-redux';

const StackOnboarding = createStackNavigator();
function Onboarding() {
  return (
    <StackOnboarding.Navigator
      initialRouteName={'ScreenStartWithLogo'}
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
      }}>
      <StackOnboarding.Screen
        name="ScreenStartWithLogo"
        component={ScreenStartWithLogo}
      />
      <StackOnboarding.Screen
        name="ScreenLanguageSelection"
        component={ScreenLanguageSelection}
      />
      <StackOnboarding.Screen
        name="ScreenCoachSelection"
        component={ScreenCoachSelection}
      />
      <StackOnboarding.Screen
        name="ScreenPatientInfo"
        component={ScreenPatientInfo}
      />
      <StackOnboarding.Screen
        name="ScreenWelcomeByCoach"
        component={ScreenWelcomeByCoach}
      />
    </StackOnboarding.Navigator>
  );
}
const StackMain = createStackNavigator();

function Main({ route }) {
  const { screenProps } = route.params;
  return (
    <StackMain.Navigator initialRouteName={MenuView}>
      <StackMain.Screen
        name="Hello"
        component={MenuView}
        options={{
          headerShown: false,
        }}
        initialParams={{ screenProps }}
        //headerMode =  "none"
      />
      <StackMain.Screen
        name="Chat"
        component={Chat}
        initialParams={{ screenProps }}
      />
      <StackMain.Screen
        name="Profile"
        component={ProfileStack}
        initialParams={{ screenProps }}
      />
      <StackMain.Screen
        name="Checklist"
        component={Checklist}
        initialParams={{ screenProps }}
      />
      <StackMain.Screen
        name="Learn"
        component={LearnStack}
        initialParams={{ screenProps }}
      />
      <StackMain.Screen
        name="DailySchedule"
        component={DailySchedule}
        initialParams={{ screenProps }}
      />
    </StackMain.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function LearnStack({screenProps}){
  return(
    <Tab.Navigator
      tabBarOptions={{ showIcon: true}}>
        <Tab.Screen 
        name = "Exercises"
        options={{
          headerShown: false,
          tabBarIcon:() => (< Image source={exercises} style={{width: 25, height:30}}/>) 
        }}
        component={Exercises}
        initialParams={{ screenProps }}
        />
      <Tab.Screen 
        name = {I18n.t("gridMenu.learn")}
        component={Learn}
        options={{
          headerShown: false,
          tabBarIcon:() => (< Image source={play} style={{width: 25, height:25}}/>) 
        }}
        initialParams={{ screenProps }}
        />
      
    </Tab.Navigator>
  )
}

const StackProfile = createStackNavigator();

function ProfileStack ({screenProps}){
  return (
    <Tab.Navigator
      tabBarOptions={{ showIcon: true}}>
      <Tab.Screen 
        name = {"Points"}
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon:() => (< Image source={points} style={{width: 25, height:25}}/>) 
        }}
        initialParams={{ screenProps }}
        />
      <Tab.Screen 
        name = "Badges"
        options={{
          headerShown: false,
          tabBarIcon:() => (< Image source={badges} style={{width: 25, height:30}}/>) 
        }}
        component={Badges}
        initialParams={{ screenProps }}
        />
    </Tab.Navigator>
  )
}

const StackNavigatorRoot = createStackNavigator();
function RootStack({ screenProps }) {
  return (
    <StackNavigatorRoot.Navigator
      initialRouteName={LoadingContainer}
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
      }}>
      <StackNavigatorRoot.Screen
        name="LoadingContainer"
        component={LoadingContainer}
        headerMode="none"
      />
      <StackNavigatorRoot.Screen 
        name="OnboardingNav" 
        component={Onboarding} 
      />
      <StackNavigatorRoot.Screen
        name="MainNavigation"
        component={MainContainer}
        initialParams={{ screenProps }}
      />
    </StackNavigatorRoot.Navigator>
  );
}

// Connecting Redux to Components in React-Navigation
const MainContainer = connect((state) => ({
  lang: state.settings.language, // TODO(cslim): Language selection for "Francais" is defaulted to en. To fix
  coach: state.settings.coach,
  unreadMessages: state.guistate.unreadMessages,
  unreadDashboardMessages: state.storyProgress.unreadDashboardMessages,
}))(Main);

export default function App(props) {
  enableScreens();
  return (
    <NavigationContainer>
      <RootStack screenProps={props.screenProps} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: Colors.sideMenu.actionButton,
  },
  bottom: {
    flex: 0,
  },
  versionInfo: {
    alignItems: 'center',
    top: '45%',
  },
  coachAvater: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginTop: 10,
  },
  coachName: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 10,
    alignSelf: 'center',
  },
  drawerLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: Colors.sideMenu.actionButton,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});
