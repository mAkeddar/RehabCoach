import React, { Component } from 'react';
import { Text, Linking,View, StyleSheet,FlatList,TouchableOpacity,Alert,Image} from 'react-native';
import PMNavigationBar from '../../Components/Navbar';
import { WebView } from 'react-native-webview';
import play from "../../Images/Menu/play.png";
import PatientActions from '../../Redux/PatientProgressRedux';
import { connect } from 'react-redux';
import I18n from '../../I18n/I18n';

class Badges extends Component{
  
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () =>
    this._onBadgeAlert());
  }
  constructor(props){
    super(props);
    this.state = {
      data: this.props.badges,
      trainButtonFirstTime : 0,
    }
  }
    render(){
        //console.log(this.props.route.params)
        return (
          <View style={styles.container}>
          <FlatList 
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.data}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.card} >
                <View style={styles.cardContent}>
                  <Text style={(item.taskCompleted == 1)?styles.nameCompleted:styles.nameNotCompleted}>{item.title}</Text>  
                </View>
              </TouchableOpacity>
            )}}/>
        </View>
          )
    }
    _onBadgeAlert(){
      //let items = [...this.state.data];
      const {setBadges} = this.props;
      console.log("total points "+this.props.total_points)
      console.log(this.state.data)
      
        // Completed first session
        if (this.state.data[0].taskCompleted ==0 && (this.props.total_points == 80 || this.props.total_points == 30)){
            
            Alert.alert(I18n.t('Badges.firstC'));
            let id = 0;
            setBadges({id});
            this.setState({data:this.props.badges});
        }
        // Completed first day
        else if (this.state.data[1].taskCompleted == 0 && this.props.total_points == 110){
            Alert.alert(I18n.t('Badges.secondC'));
            let id = 1;
            setBadges({id});
            this.setState({data:this.props.badges});
        }
        // Completed 5 trainings in a row
        else if(this.state.data[2].taskCompleted == 0 && this.props.total_points>=150){
          Alert.alert(I18n.t('Badges.thirdC'));
          let id = 2;
          setBadges({id});
          this.setState({data:this.props.badges});
        }
        // Completed 3 training in a row
        if(this.state.data[3].taskCompleted == 0 && this.props.total_points>=250){
            Alert.alert(I18n.t('Badges.fourthC'));
            let id = 3;
            setBadges({id});
            this.setState({data:this.props.badges});
        }
        // Completed first training by him self
        if(this.state.data[4].taskCompleted == 0 && this.props.buttonTrainPressed==1){
          Alert.alert(I18n.t('Badges.fifthC'));
          let id = 4;
          setBadges({id});
          this.setState({data:this.props.badges});
      }
    }
}
const mapStateToProps = (state) => { //Lire les variables depuis redux
  return {
    total_points: state.patientProgress.total_points,
    badges: state.patientProgress.badges,
    buttonTrainPressed: state.patientProgress.buttonTrainPressed
  }
}

const mapDispatchToProps = (dispatch) => ({

  setBadges: (id) =>
    dispatch(PatientActions.setBadges(id)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Badges);


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
  nameNotCompleted:{
    fontSize:18,
    marginLeft:10,
    //flex:1,
    //alignSelf:'center',
    color:"gray",
    fontWeight:'bold',
    alignItems: 'center',
    justifyContent: 'center',
    //top : 10,
    //left : 40
  },
  nameCompleted:{
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
  
 
}); 

