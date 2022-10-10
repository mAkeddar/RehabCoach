import React, {
  Component,
} from 'react'
import { Text, View, StyleSheet,FlatList,TouchableOpacity,Alert } from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import { Dimensions,Image } from "react-native";
import { connect } from 'react-redux';
import points from "../../Images/Menu/notation.png"
import I18n from '../../I18n/I18n';
import { Colors, Images, Metrics } from '../../Themes/';

const screenWidth = Dimensions.get("window").width;

class Profile extends Component {
  //name = "Points"
  constructor(props){
    super(props);
    this.state = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6","Day 7"],
        datasets: [
          {
            data: this.props.pointsArray,
            color: (opacity = 1) => `rgba(256, 100, 51, ${opacity})`, // optional
            strokeWidth: 3 // optional
          }
        ],
        //legend: [I18n.t('profile.dailyPoints')] // optional
      };
  }
  _onPressBadgesButton=()=>{
      const { navigate } = this.props.navigation;
      navigate("Badges")
  }

  render(){
    console.log(this.state.datasets)
    return (
      <>
      <View style ={styles.container}>
      <TouchableOpacity style={styles.cardTitle} onPress={() =>{} }>
              <Image
                style={styles.coachImage}
                source={
                  this.props.coach
                    ? Images.coaches[this.props.coach]
                    : Images.coaches[0]
                }
              />
              <Text style={styles.text}>{I18n.t('profile.dailyPoints')}</Text> 
            </TouchableOpacity>

        <View style = {styles.graph}>
          
          <LineChart
            data={this.state}
            width={screenWidth}
            height={400}
            chartConfig={chartConfig} 
            yAxisLabel =""
            style={{
              borderRadius: 50
            }}
            />
        </View>
        <View>
          <TouchableOpacity style={styles.buttonLetsTrain}>
          <Image style={styles.image} source={points}/>
          <Text style = {styles.text}>{I18n.t('profile.totalPoints')} : {this.props.total_points}  </Text>
        </TouchableOpacity>
        </View>
      </View>
    </> 
  )
  }
}

const mapStateToProps = (state) => { //Lire les variables depuis redux
  return {
    participantPoints: state.patientProgress.participantPoints,
    pointsArray : state.patientProgress.pointsArray,
    day_counter: state.patientProgress.day_counter,
    total_points : state.patientProgress.total_points,
    coach: state.settings.coach
  }
}
const chartConfig = {
  backgroundGradientFrom: "#33c2ff",
  backgroundGradientFromOpacity: 0.2,
  backgroundGradientTo: "#3399ff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 2) => `rgba(256, 100, 51, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  propsForLabels:{
    fontSize:15
  },
  
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10,
      backgroundColor: "#ffffff"
    },
    graph:{
      //flex:1,
      marginTop:0,
    },
    cardContent: {
      marginLeft:20,
      marginTop:10
    },
      
    button: {
      marginLeft: 20,
      marginRight: 20,  
      height :50,
      marginTop : 50,
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
    buttonLetsTrain: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop : 20,
      height : 50,
      width : 0.75*Dimensions.get('window').width,
      backgroundColor:'#3399ff',
      borderRadius:50,
      borderWidth: 1,
      borderColor: '#fff',
      flexDirection:'row',
    },
  title:{
    fontSize:20,
    alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold'
  },
  text:{
      fontSize:20,
      alignSelf:'center',
      color:"white",
      fontWeight:'bold'
    },
  image:{
      width:30,
      height:30,
      resizeMode:"contain",
      marginRight:30,
      alignSelf: 'center',
    
    },
  coachImage: {
      width: Metrics.screenWidth / 4 - 6,
      height: Metrics.screenWidth / 4 - 6,
      alignSelf:"center",

      },
    
  cardTitle:{
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginLeft: 20,
        marginRight: 20,
        marginTop:20,
        marginBottom:20,
        backgroundColor:"#3399ff",
        padding: 10,
        borderRadius:30,
        borderColor:"black",
        width:350,
        alignSelf:"center",
  
      },
  })
  export default connect(mapStateToProps,null )(Profile);
