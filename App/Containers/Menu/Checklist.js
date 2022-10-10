import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';
import read from "../../Images/Menu/livre.png"
import exercice from "../../Images/Menu/entrainement.png"
import walk from "../../Images/Menu/walk.png"
import tick from "../../Images/Menu/tick.jpg"
import { connect } from 'react-redux';
import I18n from '../../I18n/I18n';
import { Colors, Images, Metrics } from '../../Themes/';

class Checklist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      data: [
        {id:1,  name: I18n.t('checklist.learningSession'),   image:read, done : this.props.participantLearning},
        {id:2,  name: I18n.t('checklist.exerciceSession'),    image:exercice, done: this.props.participantTraining },
      ]
    };
  }

  clickEventListener = (item) => {
    console.log(item.done)
    if (item.done == 0){
      if (item.id == 1)
        Alert.alert("",I18n.t("checklist.learningNext")+ this.props.learningTime+"h");
      if (item.id == 2)
        Alert.alert("", I18n.t("checklist.trainingNext")+this.props.trainingTime+"h");
    }
    else{
      if (item.id == 1)
        Alert.alert('',I18n.t("checklist.learningDone") );
      if (item.id == 2)
        Alert.alert('',I18n.t("checklist.trainingDone"));
    }

  }
  checkIfTaskDone = (item) => {
    if(item.done == 1){
      return <Image style={styles.imageTick} source={tick}/>
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cardTitle} onPress={() =>{} }>
              <Image
                style={styles.coachImage}
                source={
                  this.props.coach
                    ? Images.coaches[this.props.coach]
                    : Images.coaches[0]
                }
              />
              <Text style={styles.text}>{I18n.t("checklist.title")}</Text> 
            </TouchableOpacity>
        
        <FlatList 
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={this.clickEventListener.bind(this,item) }>
              <Image style={styles.image} source={item.image}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>               
              {this.checkIfTaskDone(item)}
              </View>
            </TouchableOpacity>
          )}}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => { //Lire les variables depuis redux
  return {
    participantLearning: state.patientProgress.participantLearning,
    participantTraining : state.patientProgress.participantTraining,
    events:state.patientProgress.events,
    coach: state.settings.coach,
    learningTime: state.patientProgress.learningTime,
    trainingTime: state.patientProgress.trainingTime
  }
}

export default connect(mapStateToProps,null )(Checklist);

const styles = StyleSheet.create({
  container:{
    flex:1,
    //marginTop:20,
    backgroundColor:"white",
    //width:100,
    //height:100
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:70,
    height:70,
    borderRadius:45,
    //borderWidth:2,
    borderColor:"#ebf0f7",
    resizeMode:"contain"
  
  },
  imageTick:{
    width:50,
    height:50,
    borderRadius:45,
    borderWidth:2,
    borderColor:"white",
    left : 190,
    top : 0
  },
  card:{
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
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius:30,
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold'
  },
  count:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#6666ff"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "white",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  followButtonText:{
    color: "#dcdcdc",
    fontSize:12,
  },
  coachImage: {
    width: Metrics.screenWidth / 4 - 6,
    height: Metrics.screenWidth / 4 - 6,
    alignSelf:"center",
    marginTop:20
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
    text:{
      fontSize:20,
      //alignSelf:'center',
      color:"white",
      fontWeight:'bold',
      marginTop:20,
      marginLeft:10,
      alignSelf:'center',
      //justifyContent:"center"

    },
}); 
