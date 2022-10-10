import React,{Component} from 'react'
import {
  ScrollView,
  StyleSheet,
  Button,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native'
import I18n from '../../I18n/I18n';
import SudokuGrid from 'react-native-smart-sudoku-grid';
import image_chat from '../../Images/Menu/bot.png';
import image_learn from '../../Images/Menu/info.png'
import image_checklist from '../../Images/Menu/verified.png'
import image_profile from '../../Images/Menu/user.png'
import exercice from "../../Images/Menu/entrainement.png"
import calendar from "../../Images/Menu/calendrier.png"

import { connect } from 'react-redux';
import { Colors, Images, Metrics } from '../../Themes/';
import MessageActions from '../../Redux/MessageRedux';
import PatientActions from '../../Redux/PatientProgressRedux';
import SplashScreen from 'react-native-splash-screen';


class MenuView extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }


  constructor(props){
    super(props);
    this.state = {
       columnCount : 2,
       trainButtonFirstTime : 0,
      dataList : [
              {
                icon: image_chat,
                title: 'Chat',
                transTitle : I18n.t("gridMenu.chat"),
              },
              {
                icon: image_checklist,
                title: "Checklist",
                transTitle : I18n.t("gridMenu.checklist"),
              },
              {
                icon: image_learn,
                title: "Learn",
                transTitle : I18n.t("gridMenu.learn"),
              },
              {
                icon: image_profile,
                title: "Profile",
                transTitle : I18n.t("gridMenu.profile"),
              }
            ]
      
    }
  }
  render () {
      
      return (
        
          <><View style = {styles.halfScreen}>
            <View style={styles.imageContainer}>
            <View style={styles.circle}>
              <Image
                style={styles.coachImage}
                source={
                  this.props.coach
                    ? Images.coaches[this.props.coach]
                    : Images.coaches[0]
                }
              />
              </View>
                <Text style = {styles.HeadText}> Hey {this.props.participantName} !{"\n\n"} {I18n.t('gridMenu.seeYou')}
                </Text>
            </View>

            <View style = {{flex: 1}}>
                <TouchableOpacity
                style={styles.buttonDaily}
                activeOpacity = { .5 }
                onPress={this._onPressButtonDaily} >
                <Image style={styles.imageCalendar} source={calendar}/>
                <Text style={styles.textButtonDaily}>{I18n.t('gridMenu.schedule')} </Text>
                </TouchableOpacity>       
            </View>
          </View>

          <ScrollView style={{flex : 1, backgroundColor: '#fff', }}>
                  <View style={{height: 50, paddingLeft: 10, backgroundColor: '#ffffff', justifyContent: 'center', }}>
                  </View>
                  <SudokuGrid
                      containerStyle={{ backgroundColor: '#fff', }}
                      columnCount={this.state.columnCount}
                      dataSource={this.state.dataList}
                      renderCell={this._renderGridCell} />  
          </ScrollView> 
              <View style ={{flex : 0.4,backgroundColor: '#fff'}}>
                    <TouchableOpacity
                        style={styles.buttonLetsTrain}
                        activeOpacity = { .5 }
                        onPress={this._onPressButtonTrain} >
                        <Image style={styles.image} source={exercice}/>
                        <Text style={styles.textButton}> {I18n.t('gridMenu.wanTrain')}  </Text>
                    </TouchableOpacity>       
                  </View>
              </>
      )
  }
      _onPressButtonDaily = ()=>{
          const { navigate } = this.props.navigation;
          navigate("DailySchedule")
      }
      _onPressButtonTrain = ()=>{
        if(this.props.sessionIsOn == 0){
          const {sendTrainIntention,setButtonTrainPressed } = this.props;
          const { navigate } = this.props.navigation;
          if(this.state.trainButtonFirstTime == 0)
            this.state.trainButtonFirstTime = 1;   
          sendTrainIntention();
          setButtonTrainPressed(this.state.trainButtonFirstTime);
          navigate("Chat");
        }
        else
          Alert.alert(I18n.t("gridMenu.session"))

    }
      _renderGridCell = (data, index, list) => {
          return (
              <TouchableHighlight underlayColor={'#eee'} onPress={ this._onPressCell.bind(this, data, index) }>
                  <View style={{ overflow: 'hidden',
                            justifyContent: 'center', alignItems: 'center', height: 100,
                            borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#000',
                            borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#000',
                            borderRightWidth: (index + 1) % this.state.columnCount ? StyleSheet.hairlineWidth: 0, }}>
                      <Image source={data.icon} style={{width: 50, height: 50, marginHorizontal: 10, marginBottom: 10,}}/>
                      <Text style = {styles.textGrid}>{data.transTitle}</Text>
                  </View>
              </TouchableHighlight>
          )
      }
      
      _onPressCell (data) {
          const { navigate } = this.props.navigation;
          if (data.title == "Profile")
            navigate(data.title,{screen :"Points"})
          else
            navigate(data.title);
      }
  }

  const mapStateToProps = (state) => { //Lire les variables depuis redux
    return {
      coach: state.settings.coach,
      participantName: state.participant.participantName,
      participantCanType: state.participant.participantCanType,
      participantCanWalk:state.participant.participantCanWalk,
      total_points: state.patientProgress.total_points,
      sessionIsOn: state.participant.sessionIsOn,
    }
  }
  const mapDispatchToProps = (dispatch) => ({
    sendTrainIntention: () =>
      dispatch(MessageActions.sendIntention(null, 'train', null)),
    
    setButtonTrainPressed: (buttonTrainPressed) =>
      dispatch(PatientActions.setButtonTrainPressed(buttonTrainPressed)),
  });
  export default connect(mapStateToProps, mapDispatchToProps)(MenuView);
  
  
  const styles = StyleSheet.create({
      halfScreen:{
        flex : 1,
        backgroundColor: "#473F97",
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
      },
      textGrid: {
        color : '#000',
        fontSize : 18,
        fontWeight : "bold"
      },
      textButtonDaily:{
        color : '#fff',
        fontSize : 18,
        fontWeight : "bold",
        //textAlign:"center",
        alignSelf:'center',
        flex:1
      },
      textButton: {
        color : '#fff',
        fontSize : 18,
        fontWeight : "bold",
        //textAlign:"center",
        alignSelf:'center',
        flex:1
      },
      HeadText: {
        //flex:1,
        color : '#fff',
        fontSize : 20,
        alignSelf: 'center',
        justifyContent: 'center',
        top : Metrics.screenHeight/24,
        textAlign:"center",
        fontWeight : "bold"
      },
      buttonDaily: {
          //position: 'absolute',
          //flex: 0.2,
          justifyContent: 'center',
          alignSelf: 'center',
          //top : 80,
          marginTop:Metrics.screenHeight/12,
          width : 0.75*Metrics.screenWidth,
          backgroundColor:'#3399ff',
          height : 60,
          borderRadius:50,
          borderWidth: 1,
          borderColor: '#fff',
          flexDirection:'row',
        },
      coachImage: {
        width: Metrics.screenWidth / 4 - 4,
        height: Metrics.screenWidth / 4 - 4,
        },
      circle: {
        marginTop : 30,
        width: Metrics.screenWidth / 4,
        height: Metrics.screenWidth / 4,
        borderWidth: 0,
        borderRadius: Metrics.screenWidth / 3 / 2,
        borderColor: 'white',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        },
      buttonLetsTrain: {
          justifyContent: 'center',
          alignSelf: 'center',
          //top : 20,
          height : 100,
          width : Dimensions.get('window').width,
          backgroundColor:'#3399ff',
          borderRadius:50,
          borderWidth: 1,
          borderColor: '#fff' ,
          flexDirection:'row',
          marginLeft: 20,
          marginRight: 20,  
        },
        imageContainer: {
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          backgroundColor: 'transparent',
        },
        image:{
          width:90,
          height:90,
          resizeMode:"contain",
          marginLeft:30,
          alignSelf: 'center',
        
        },
        imageCalendar:{
          width:50,
          height:50,
          resizeMode:"contain",
          marginLeft:20,
          alignSelf: 'center',
          marginRight:10
        
        },


      
  })
