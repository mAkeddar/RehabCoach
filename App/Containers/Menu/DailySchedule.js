import React, {Component} from 'react';
import EventCalendar from "react-native-events-calendar"
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { Colors, Images, Metrics } from '../../Themes/';
import { connect } from 'react-redux';

class DailySchedule extends Component {
    constructor(props){
        super(props)
        this.state ={ 
        eventData :[]
    }
    }
    
    eventClicked = (event) => {
        //On Click of event showing alert from here
        alert("test");
      };
    render () {
        return (
            <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <EventCalendar 
                style = {styles.event}
                eventTapped={this.eventClicked}
                // Function on event press
                events={this.props.events}
                // Passing the Array of event
                width={Metrics.screenWidth}
                // Container width
                size={60}
                // number of date will render before and after initDate
                // (default is 30 will render 30 day before initDate
                // and 29 day after initDate)
                initDate={"2022-04-26"}
                // Show initial date (default is today)
                scrollToFirst
                // Scroll to first event of the day (default true)
                />
            </View>
            </SafeAreaView>
        );
    };   
}

const mapStateToProps = (state) => { //Lire les variables depuis redux
    return {
      events : state.patientProgress.events
    }
  }
  
  export default connect(mapStateToProps)(DailySchedule);

  const styles = StyleSheet.create({
        test: {
        color : 'black',
        },
        container: {
            flex: 1,
            backgroundColor:'black',
            alignItems: 'center',
            justifyContent: 'center',
          },
        event:{
          backgroundColor : "black"
        }
    })