import React, { Component,useState } from 'react';
import { Text, Linking,View, StyleSheet,FlatList,TouchableOpacity,TouchableHighlight,TextInput,Alert,Image,Modal} from 'react-native';
import PMNavigationBar from '../../Components/Navbar';
import { WebView } from 'react-native-webview';
import play from "../../Images/Menu/play.png"
import {Dimensions} from "react-native"
import SettingsActions from '../../Redux/ParticipantRedux';
import { connect } from 'react-redux';
import I18n from '../../I18n/I18n';
import { Colors, Images, Metrics } from '../../Themes/';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
class Exercises extends Component{
  
  componentDidMount(){
     //this.setState({data:this.props.exercises})
  }

  constructor(props){
    super(props);
    this.state = {
      data: this.props.exercises,
      modalVisible: false,
      _id : "",
      _title : "",
      _url : "",
    }
    
  }

  toggleModal=(visible)=> {
    this.setState({ modalVisible: visible });
  }
  clickEventListener = (item) => {
    if(item.id != 0)
        {
          Linking.canOpenURL(item.url).then((supported) => {
          if (supported) {
            Linking.openURL(item.url);
          }
          else{
            Alert.alert("The URL is not valid")
            console.log("Don't know how to open URI: " + item.url);
          }
        
          })
        }
  }
  componentWillUnmount(){
    if(this.state._id != "" &&  this.state._id != "null " && this.state._title != "" && this.state._url != ""){
      const { setExercises } = this.props;
      setExercises({id: this.state._id, title: this.state._title,url:this.state._url});
    }
  }
  addExercise = () => {
    var arr = [...this.state.data]
    var item = {id: this.state._id, title: this.state._title,url:this.state._url}
    arr.push(item)
    //this.state.data.push({id: 2, title: "Mehul",url:""});
    this.setState({data:arr})
  }
    render(){
      
      console.log(this.state.data)
      return (
          <><View style={styles.container}>
            <TouchableOpacity style={styles.cardTitle} onPress={() =>{} }>
              <Image
                style={styles.coachImage}
                source={
                  this.props.coach
                    ? Images.coaches[this.props.coach]
                    : Images.coaches[0]
                }
              />
              <Text style={styles.text}>{I18n.t("Exercises.title")}</Text> 
            </TouchableOpacity>
          <FlatList 
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.data}
            keyExtractor= {(item) => {
              if(item.id!=null)
                return item.id.toString();
              else{
                console.log(item.id)
                //Alert.alert("Item ID problem")
              }
            }}
            
            renderItem={({item}) => {if(item.id!=0){
            return (
              <TouchableOpacity style={styles.card} onPress={() =>this.clickEventListener(item) }>
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.title}</Text>  
                </View>
              </TouchableOpacity>
            )}}}/>
            <TouchableOpacity style={styles.buttonLetsTrain} onPress={() => {this.toggleModal(true)}}>
                <View>
                    <Text style={styles.textButton}>{I18n.t("Exercises.add")}</Text>  
                </View>
            </TouchableOpacity>
        </View>
        <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               
               <View style = {styles.modal}>
                  <Text style = {styles.text}>Enter exercise informations</Text>
                  <TextInput
                        style={styles.inputContainer}
                        placeholder={"Enter exercise ID"}
                        onChangeText={(value) => this.setState({_id:Number(value)})}
                      />
                  <TextInput
                        style={styles.inputContainer}
                        placeholder={"Enter exercise description"}
                        onChangeText={(value) => this.setState({_title:value})}
                      />
                  <TextInput
                        style={styles.inputContainer}
                        placeholder={"Enter exercise link"}
                        onChangeText={(value) => this.setState({_url:value})}
                  />
                  <TouchableOpacity style = {styles.buttonConfirm} onPress = {() => {
                     if(this.state._id != "" && this.state._id != null && this.state._title != "" && this.state._url != ""){
                      this.addExercise();
                      //
                      this.toggleModal(!this.state.modalVisible); 
                    }
                    else
                      Alert.alert(I18n.t("Exercises.missing"))
                     }}>
                     
                     <Text style = {styles.textButton}>{I18n.t("Exercises.confirm")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.buttonConfirm} onPress = {() => {
                      this.toggleModal(!this.state.modalVisible)}}>
                     <Text style = {styles.textButton}>{I18n.t("Exercises.close")}</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
        </>
          )
    }
}

const mapStateToProps = (state) => { //Lire les variables depuis redux
  return {
      exercises:state.participant.patientExercises,
      coach:state.settings.coach
  }
}

const mapDispatchToProps = (dispatch) => ({
  setExercises: (item) =>
    dispatch(SettingsActions.setExercises(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);
const styles = StyleSheet.create({
  container:{
    flex:1,
    //marginTop:20,
    backgroundColor:"white"
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10,
    flexDirection:'row',
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
  imagePlay:{
    width:30,
    height:30,
    borderRadius:45,
    borderWidth:2,
    borderColor:"white",
    alignItems:"center"
  },
  name:{
    fontSize:18,
    marginLeft:10,
    //flex:1,
    //alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold',
    alignItems: 'center',
    justifyContent: 'center',
    //top : 10,
    //left : 40
  },
  buttonLetsTrain: {
    justifyContent: 'center',
    alignSelf: 'center',
    top : -20,
    height : 50,
    width : 0.75*Dimensions.get('window').width,
    backgroundColor:'#3399ff',
    borderRadius:50,
    borderWidth: 1,
    borderColor: '#fff' 
  },
  buttonConfirm: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop : 30,
    height : 50,
    width : 0.75*Dimensions.get('window').width,
    backgroundColor:'#3399ff',
    borderRadius:50,
    borderWidth: 1,
    borderColor: '#fff' 
  },
  textButton:{
    fontSize:15,
    alignSelf:'center',
    color:"white",
    fontWeight:'bold'
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ebf0f7',
    padding: 20
 },
 inputContainer: {
  marginTop: Metrics.screenHeight/10,
  padding: 10,
  height: 60,
  //width: 300,
  backgroundColor: 'white',
  //width:Metrics.screenWidth,
  justifyContent: 'center',
  alignSelf: 'stretch',
  borderRadius: 50,
  paddingHorizontal: 50,
  paddingVertical: 10,
  marginBottom: 30,
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
coachImage: {
    width: Metrics.screenWidth / 4 - 6,
    height: Metrics.screenWidth / 4 - 6,
    alignSelf:"center",
    marginTop:20
    },
text:{
      fontSize:20,
      alignSelf:'center',
      color:"white",
      fontWeight:'bold',
      marginTop:20,
      marginLeft:18,
      alignSelf:'center',
      //justifyContent:"center"

    },
 
}); 

