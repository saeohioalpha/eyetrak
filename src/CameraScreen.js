/**

 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import styles from '../stylesheet.js';
import {
  Easing,
  NativeModules
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AppRegistry,PermissionsAndroid, Picker, Platform,ScrollView, AppState, TouchableHighlight, Animated, StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Alert, TouchableOpacity, DeviceEventEmitter, BackHandler } from 'react-native';
import { RNCamera } from 'react-native-camera';

import SQLite from "react-native-sqlite-storage";

import { localDB } from './res/constants/constants'
import { withNavigation } from 'react-navigation';
import  {
  BackAndroid,
} from 'react-native';
import {connect} from "react-redux"
var db = SQLite.openDatabase(localDB.dbName, "1.0", "reactDemo Database", 200000);

export default class CameraScreen extends Component{
  
  
    static navigationOptions =({navigation})=> ({
      headerTitle: 'Concussion Protocol Exam',
      headerRight: (
        <TouchableOpacity
           onPress={()=> navigation.navigate('Settings')}
        >
          <Image source={require('../images/settings.png')} style={{ width:25, height:25, marginRight:20 }}/>
        </TouchableOpacity>
      ),
    });
     
    constructor(props) {
   
      super(props)
   
      this.state = {
   
        TextInput_Name: '',
        NumberHolder : 1,
        CurrentDate:''
      }
   
    }
  
    componentDidMount(){
  
       this.GenerateRandomNumber()
       this.setCurrentdateTime();
        
      db.transaction(function (txn) {
        //txn.executeSql('DROP TABLE IF EXISTS ' + localDB.tableName.tblLogin, []);  
        txn.executeSql('CREATE TABLE IF NOT EXISTS ' + localDB.tableName.patient + ' (id  INTEGER PRIMARY KEY AUTOINCREMENT,userId TEXT,patientName TEXT,datetime TEXT )', []);
        console.log('create databse success.')
    });  
  
  
    }
  
    setCurrentdateTime=()=>{
  
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
       if (date < 10) {
        date = '0' + date;
        }
        if (month < 10) {
          month = '0' + month;
        }
        if (hours < 10) {
          hours = '0' + hours;
        }
        if (min < 10) {
          min = '0' + min;
        }
        if (sec < 10) {
          sec = '0' + sec;
        }
      // this.setState({
      //   //Setting the value of the date time
      //   CurrentDate:
      //   ,
      // });
    
      var dateTime= year + '' + month + '' + date + '-' + hours + '' + min + '' + sec
      this.setState({
        CurrentDate: dateTime
      })
    
      
    }
    
  
  GenerateRandomNumber=()=>
  {
   
  var RandomNumber = Math.floor(Math.random() * 1000) + 1 ;
   
  this.setState({
   
    NumberHolder : RandomNumber
   
  })
  this.state.NumberHolder
  // Alert.alert(RandomNumber)
  }
  
    Send_Data_Function = () => {
   
      this.props.navigation.navigate('MovingScreen', {
          NameOBJ: this.state.TextInput_Name
      });
      // var userId= this.state.TextInput_Name+this.state.NumberHolder.toString()
      // Alert.alert(this.state.CurrentDate)
      // db.transaction(function(txn) {
      //   txn.executeSql(
      //     "INSERT INTO " +
      //       localDB.tableName.patient +
      //       " (userId,patientName,datetime) VALUES (:userId,:patientName,:datetime)",
      //     [
      //       userId,
      //       this.state.TextInput_Name,
      //       this.state.CurrentDate,
      //     ],
      //     (txn, results) => {
      //       console.log('Results', results.rowsAffected);
      //       if (results.rowsAffected > 0) {
      //          this.props.navigation.navigate('Move', {
      //               NameOBJ: userId
      //           });
      //       }
      //       }
      //   );
      // }.bind(this));
     
   
    }
   
    render(){
      return(
          <View style={styles.cameracontainer}>
             <View style={{flex: 2, backgroundColor: 'powderblue', margin:10,}} >
             <RNCamera
             style={styles.pcamera}
              ref={ref => {
              this.camera = ref;
            }}
            // captureMode={RNCamera.constants.CaptureMode.video}
            // aspect={RNCamera.constants.Aspect.fill}
            type={RNCamera.Constants.Type.front}
            flashMode={RNCamera.Constants.FlashMode.on}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes);
            }}
          />
           
             </View>
             <View style={styles.textContainer} >
                <View style={styles.inputContainer}>
                   {/* <Text style={styles.inputText}></Text> */}
                   <TextInput style={styles.input}
                    onChangeText={data => this.setState({ TextInput_Name: data })}
                    placeholder={'Exam/Patient Id'}
                     placeholderTextColor={'#000'} />
                </View>
                <View style={{width:'100%',justifyContent:'center', alignItems:'center',}}>
                <TouchableOpacity style={styles.loginbtn}
                      onPress={this.Send_Data_Function}
                 >
                  <Text style={styles.text}>Start Exam</Text>
                </TouchableOpacity>
                </View>
             </View>
          </View>
      );
    }
    
    // takePicture = async function() {
    //   if (this.camera) {
    //     const options = { quality: 0.5, base64: true };
    //     const data = await this.camera.takePictureAsync(options)
    //     console.log(data.uri);
    //   }
    // };
  }
  
  