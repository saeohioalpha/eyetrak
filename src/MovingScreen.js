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
import { ButtonGroup,Slider } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import { Dimensions } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native' 
import RNFetchBlob from 'react-native-fetch-blob'
import {ToastAndroid} from 'react-native';
import SQLite from "react-native-sqlite-storage";
import CreateTables from './res/manager/CreateTables'
import { localDB } from './res/constants/constants'
import { withNavigation } from 'react-navigation';
import  {
  BackAndroid,
} from 'react-native';
import {connect} from "react-redux"
import { ActionChangeColor, ActionChangeSize, ActionChangeSpeed, ActionChangeDirection,ActionChangeDelay,ActionChangeCycle, ActionChangeActiveColor, ActionChangeActiveSize } from './reducers/index.js';

var db = SQLite.openDatabase(localDB.dbName, "1.0", "reactDemo Database", 200000);
const { RecorderManager } = NativeModules;  //import screen recording from native modules (android/app/src/main/java/com/eyetest/mainActivity.java)

export default class MovingScreen extends Component{
  
    static navigationOptions =({navigation})=> ({
       
      header: null,
    });
    constructor(props){
      super(props)
      
      this.state = {timer:5, timerRunning:false, recording:false, userData: '', currentTime: Date.now()}
      this.onTimerComplete = this.onTimerComplete.bind(this)
      
      this.startRecording=this.startRecording.bind(this) 
      this.stopRecording=this.stopRecording.bind(this)
      this.startSpy = this.startSpy.bind(this)
      this.writeFile = this.writeFile.bind(this)
      this._isMounted = false;
      this.animatedValue = new Animated.Value(-70)
      this.translateValue = new Animated.ValueXY({x: 0, y: 0});
    }
  
    state = {
      appState: AppState.currentState,
    };
  
    
    
//   ------------------------------on Timer Complete Function------------------------
    onTimerComplete(){
      console.log('====================================');
      // console.log(this.camera);
      console.log('====================================');
      setTimeout(() => {
        this.animate() // start animation
        this.startTimer()
        // this.stopapp()
        console.log('animation stayrt');
     }, 200);
     console.log('====================================');
     
  }
//   -------------------------end--------------

//   ---------------------- function for screen recording start-----------------  
  startSpy(){
    RecorderManager.start(
      ()=> console.log("SUCCESS IN RECORDING START"),
      (error) => console.log("Eoor"+error)
    )
  }

//   --------------------function for  screen recording stop--------------------
  stopSpy(){
    RecorderManager.stop(
      ()=> console.log("SUCCESS IN STOP "),
      (error) => console.log("Eoor"+error)
    )
  
   
  }


//   function for calling stop front facing or Screen recoring--------------
  
  stopRecording(){
    this.stopSpy() //stop screen recording
    this.camera.stopRecording() //stop front facing
    this.stopapp() //back to home screen
  }
  
//   function for wirte file on storage

  writeFile(data){
    // Alert.alert();
    console.log(this.state.patientName);
    RNFetchBlob.fs.writeFile(RNFetchBlob.fs.dirs.DownloadDir+`/${this.state.CurrentDate}_${this.props.navigation.state.params.NameOBJ}_vr.mp4`,data,'base64').then(
      ()=> {  
        this.setState(state => ({...state,examStatus:'completed'}))
      }
    ).catch(console.log)
  }
  
//   function for strating front facing

  startRecording() {
    // this.startSpy()
    this._isMounted = true;
    this._isMounted && this.setState({ recording: true });
    
    // this.setState(state=>({...state,examStatus:'started'}))
    // default to mp4 for android as codec is not set
    this.camera.recordAsync().then(data => {
      const {uri} = data
      RNFetchBlob.fs.readFile(uri,'base64').then(this.writeFile).catch(err => console.log('FILE READ ERROR'+err.message))
    }).catch(a=>console.log(a.message))
  
   
  }
  
  
  
  // componentWillMount() {
     
  //  DeviceEventEmitter.removeListener("updateFilePath");
  // }
  
  setCurrentdateTime=()=>{
  
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds() + 4; //Current Seconds
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
  
//   this function call when screen start

    componentDidMount () {
      console.log(Dimensions.get('window').width);
      // var that = this;
      // AppState.addEventListener('change', this._handleAppStateChange);
    this.setCurrentdateTime();
    
  
        db.transaction(function(txn) {
          txn.executeSql(
            "SELECT * FROM patient ORDER BY id DESC LIMIT 1;",
            [],
            (tx, res) => {
              for (let i = 0; i < res.rows.length; ++i) {
                console.log( res.rows.item(i));
                this.setState({
                  userInfo: res.rows.item(i),
                });
              }
               this.setState({
                  patientName: this.state.userInfo['patientName'],
                  datetime: this.state.userInfo['datetime']
               })
            }
          );
        }.bind(this));
  
  
        // console.log()
        // console.log(this.state.datetime)
  
        // Start timer
     
      const interval = setInterval(() => {
          if (this.state.timer == 0) {
            clearInterval(interval)
            this.onTimerComplete()  
    
          }else{
            this.setState(state => ({...state,timer:this.state.timer-1}))
          }
    
          switch(this.state.timer){
           
            case 1:
              this.startSpy() //when timer is on 1 start Screen Recoring
              console.log('SR recording Start') 
                break
                case 0:
              this.startRecording()//when timer is on 0 or end Front facing starting
              // this.callToast()
              // console.log('animation start')
                break
            
          }
          console.log(this.state.timer)
         
        }, 1000);
  
        db.transaction(function(txn) {
          txn.executeSql(
            "SELECT * FROM settings",
            [],
            (tx, res) => {
              for (let i = 0; i < res.rows.length; ++i) {
                console.log( res.rows.item(i));
                this.setState({
                  userData: res.rows.item(i),
                });
              }
              
            }
          );
        }.bind(this));
        
  
        setInterval( () => {
          this.setState({
            timeStamp : new Date().toLocaleString()
          })
        },1000)
  
        this.intervalID = setInterval(
          () => this.tick(),
          1000
        );
    }
//   this is all animation
    animate(){
          
      Animated.sequence([
        // Animated.timing(this.translateValue,
        //   { toValue: { x: -170, y: 0 }, duration: 1000, easing: Easing.linear }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(this.translateValue,
              { toValue: { x: -(Dimensions.get('window').width/2-this.state.userData.size/2), y: 0 }, 
              duration: ((Dimensions.get('window').width/2-this.state.userData.size/2)/this.state.userData.speed)*10,
               easing: Easing.linear }),
            // ------------------------------------------------------------------------   
            Animated.timing(this.translateValue,
             { toValue: { x: -(Dimensions.get('window').width/2-this.state.userData.size/2), y: -(Dimensions.get('window').height/2-this.state.userData.size/2) },
              duration: ((Dimensions.get('window').height/2-this.state.userData.size/2)/this.state.userData.speed)*10,
               delay:this.state.userData.delay*1000,
                easing: Easing.linear }),
             
                //-------------------------------------------------------------------

             Animated.timing(this.translateValue,
              { toValue: { x: -(Dimensions.get('window').width/2-this.state.userData.size/2), y: 0 },
               duration: ((Dimensions.get('window').height/2-this.state.userData.size/2)/this.state.userData.speed)*10,
               delay:this.state.userData.delay*1000, 
               easing: Easing.linear }),
                 
            //    ---------------------------------------------------------------------------

              Animated.timing(this.translateValue,
                { toValue: { x: -(Dimensions.get('window').width/2-this.state.userData.size/2), y: (Dimensions.get('window').height/2-this.state.userData.size/2) },
                 duration: ((Dimensions.get('window').height/2-this.state.userData.size/2)/this.state.userData.speed)*10,
                  easing: Easing.linear }),
            //--------------------------------------------------------------------------

                Animated.timing(this.translateValue,
                  { toValue: { x: -(Dimensions.get('window').width/2-this.state.userData.size/2), y: 0 },
                   duration: ((Dimensions.get('window').height/2-this.state.userData.size/2)/this.state.userData.speed)*10,
                   delay:this.state.userData.delay*1000,
                    easing: Easing.linear }),
                 
             //------------------------------------------------------------------------       

                  Animated.timing(this.translateValue,
                    { toValue: { x: 0, y: 0 }, 
                    duration: ((Dimensions.get('window').width/2-this.state.userData.size/2)/this.state.userData.speed)*10,
                     delay:this.state.userData.delay*1000,
                      easing: Easing.linear }),

             //--------------------------------------------------------------------------

                  Animated.timing(this.translateValue,
                    { toValue: { x: (Dimensions.get('window').width/2-this.state.userData.size/2), y: 0 },
                     duration: ((Dimensions.get('window').width/2-this.state.userData.size/2)/this.state.userData.speed)*10,
                      easing: Easing.linear }),

              //-------------------------------------------------------------------------

                    Animated.timing(this.translateValue,
                      { toValue: { x: (Dimensions.get('window').width/2-this.state.userData.size/2), y: -(Dimensions.get('window').height/2-this.state.userData.size/2) },
                       duration: ((Dimensions.get('window').height/2-this.state.userData.size/2)/this.state.userData.speed)*10,
                        delay:this.state.userData.delay*1000,
                         easing: Easing.linear }),
            //    ---------------------------------------------------------------------------

                      Animated.timing(this.translateValue,
                        { toValue: { x: (Dimensions.get('window').width/2-this.state.userData.size/2), y: 0 }, 
                        duration: ((Dimensions.get('window').height/2-this.state.userData.size/2)/this.state.userData.speed)*10, 
                        delay:this.state.userData.delay*1000,
                         easing: Easing.linear }),
               //---------------------------------------------------------------------------

                        Animated.timing(this.translateValue,
                          { toValue: { x: (Dimensions.get('window').width/2-this.state.userData.size/2), y: (Dimensions.get('window').height/2-this.state.userData.size/2)},
                           duration: ((Dimensions.get('window').height/2-this.state.userData.size/2)/this.state.userData.speed)*10,
                            easing: Easing.linear }),
                 
                //-------------------------------------------------------------------------            

                          Animated.timing(this.translateValue,
                            { toValue: { x: (Dimensions.get('window').width/2-this.state.userData.size/2), y: 0 },
                             duration: ((Dimensions.get('window').height/2-this.state.userData.size/2)/this.state.userData.speed)*10,
                              delay:this.state.userData.delay*1000,
                               easing: Easing.linear }),
               
                //--------------------------------------------------------------------------               

                            Animated.timing(this.translateValue,
                              { toValue: { x: 0, y: 0 },
                               duration: ((Dimensions.get('window').width/2-this.state.userData.size/2)/this.state.userData.speed)*10,
                                delay:this.state.userData.delay*1000,
                                 easing: Easing.linear }),
          ]), 
        { iterations: this.state.userData.cycle })
      ]).start(console.log('animation finish'))
    }
  
   
    tick() {
      this.setState({
        time: new Date().toLocaleString()
      });
    }
   
    startTimer(){
      setTimeout(() => {
        console.log((4*((this.state.userData.speed*1000)/1.3)+8*(this.state.userData.speed*1000)+9*(this.state.userData.delay*1000))*this.state.userData.cycle+300);
        this.stopRecording()
      }, (4*(((Dimensions.get('window').width/2-this.state.userData.size/2)/this.state.userData.speed)*10)+8*(((Dimensions.get('window').height/2-this.state.userData.size/2)/this.state.userData.speed)*10)+9*(this.state.userData.delay*1000))*this.state.userData.cycle);
    }
    stopapp(){
      setTimeout(() => {
        Alert.alert('Exam Complete','Video saved Connect computer to download',[
          {
            'text':'Exit',
            onPress:()=>{
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Home' })
                ],
              }))
            }
          }
        ])
      }, 1000);
    }
  
    render() {
      // console.log(this.state.userData.size);
      const translateTransform = this.translateValue.getTranslateTransform();
      // console.log(movingMargin);
      const {timer} = this.state
  
      return <React.Fragment>
              <RNCamera
                style={styles.camera}
                ref={ref => {
                this.camera = ref;
              }}
              
              type={RNCamera.Constants.Type.front}
              flashMode={RNCamera.Constants.FlashMode.on}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
              }}
          />
        
            {
              timer == 0
              ?
            
                <View style={{ flex: 1 }}>
                        <Animated.View style={{
                          backgroundColor:this.state.userData.color,
                          width:this.state.userData.size,
                          height:this.state.userData.size,
                          borderRadius:50,
                          top:Dimensions.get('window').height/2-this.state.userData.size/2,
                          left:Dimensions.get('window').width/2-this.state.userData.size/2,
                          position: "absolute",
                          transform: translateTransform
                          }} />
                      </View>
                  
                
                
              :
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:100,color:'#000'}}>
              {this.state.timer}
            </Text>
          </View>
            }
      </React.Fragment>
    }
  }
  
 
  
  
  