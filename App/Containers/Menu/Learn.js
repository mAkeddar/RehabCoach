import React, { Component } from 'react';
import { Text, Linking,View, StyleSheet,FlatList,TouchableOpacity,Alert,Image} from 'react-native';
import PMNavigationBar from '../../Components/Navbar';
import { WebView } from 'react-native-webview';
import play from "../../Images/Menu/play.png"

class Learn extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: [
      {id:1,title: "Conosci il tuo cervello?", url:"https://www.youtube.com/watch?v=xRLS42VsJlw&ab_channel=IstitutoMarioNegriIRCCS"},
      {id:2,title: "ICTUS: Che cos'è e quali sono \n le cause", url:"https://www.youtube.com/watch?v=bHoJYXJ234o&ab_channel=IstitutoMarioNegriIRCCS"},
      {id:3,title: "ICTUS: Fattori di rischio e progressi \n della ricerca", url:"https://www.youtube.com/watch?v=RADYH4uiOEU&ab_channel=IstitutoMarioNegriIRCCS"},
      {id:4,title: "Il Sale: fa bene o fa male?", url:"https://www.youtube.com/watch?v=bG--XO6WlLk&ab_channel=LoretoNemi"},
      {id:5,title: "Cos'è il colesterolo", url:"https://www.youtube.com/watch?v=DhOF8hTXeNo&ab_channel=Salugea"},
      {id:6,title: "5 Cose Curiose da sapere sul corpo umano", url:"https://www.youtube.com/watch?v=3HvqlVrmgoA&ab_channel=LeDomande"},
      ]
    }
  }
  clickEventListener = (item) => {
      Linking.canOpenURL(item.url).then((supported) => {
        if (supported) {
          Linking.openURL(item.url);
        }
        else{
          console.log("Don't know how to open URI: " + url);
        }
  })
  }
    render(){
        return (
          <View style={styles.container}>
          <FlatList 
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.data}
            keyExtractor= {(item) => {
              return item.id.toString();
            }}
            renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.card} onPress={() =>this.clickEventListener(item) }>
                <View style={styles.cardContent}>
                  <Image style={styles.imagePlay} source={play}/>
                  <Text style={styles.name}>{item.title}</Text>  
                </View>
              </TouchableOpacity>
            )}}/>
        </View>
          )
    }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    //marginTop:20,
    backgroundColor:"#ebf0f7"
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
 
}); 

export default Learn;