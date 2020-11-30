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
import {AppRegistry,PermissionsAndroid, Picker, Platform,ScrollView, AppState,
     TouchableHighlight, Animated, StyleSheet, Text, View, Image, ImageBackground, 
     TextInput, Button, Alert, TouchableOpacity, DeviceEventEmitter, BackHandler } from 'react-native';
import { ButtonGroup,Slider } from 'react-native-elements';

import SQLite from "react-native-sqlite-storage";
import { localDB } from './res/constants/constants'

var db = SQLite.openDatabase(localDB.dbName, "1.0", "reactDemo Database", 200000);

export default class Settings extends Component{
    state = {
      index: 0
    }
    constructor () {
      super()
      this.state = {
        selectedIndex: 1,
        userData: '',
        selectedSize:'',
        selectedColor:'',
        refreshing: false,
        selectSize:1,
        selectColor:0,
        choosenSpeed:1,
        choosenDelay:2,
        choosenCycle:0,
        Speed:'1',
        Delay:'0.75',
        Cycle:'1'
      }
      this.updateIndex = this.updateIndex.bind(this)
      // this.props.speed=''
      // this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }
    

    static navigationOptions =({navigation})=> ({
     headerLeft:null,
      headerTitle: 'Settings',
      
      headerRight: (
        <TouchableOpacity
           onPress={()=> navigation.navigate('Home')}
        >
          <Image source={require('./home.png')} style={{ width:25, height:25, marginRight:20 }}/>
        </TouchableOpacity>
      ),
     
    });

    // reset Function

  Reset=()=>{
    db.transaction((tx)=> {
      tx.executeSql(
        'UPDATE settings set size=?, color=? , speed=? , delay=? , cycle=? where id=1',
        [75, '#f00', 1, .75, 1],
        (tx, results) => {
          console.log('Results',results.rowsAffected);
            // this.props.size=75
            // this.props.color='#f00'
            // this.props.speed=1
            // this.props.delay=0.75
            // this.props.cycle=1
            Alert.alert( 'Success', 'All Changes Set Default',
            [
              {text: 'ok',onPress:()=>{
                this.props.navigation.dispatch(StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Home' })
                  ],
                }))
              }},
            ],
            { cancelable: false }
          );
        }
      );
    });
    this.props.changeActiveSizeIndex(1)
    this.props.changeActiveColorIndex(0)
    // this.closeapp();
  }

    updateIndex (selectedIndex) {
      this.setState({selectedIndex})
      // console.log('update index')
      // console.log(selectedIndex);
      switch(selectedIndex){
        case 0:
          this.props.changeSize(50)
          break
        case 1:
            this.props.changeSize(75)
            break
        case 2:
            this.props.changeSize(100)
            break
      }
       this.props.changeActiveSizeIndex(selectedIndex)
       
  
    }
    updateColor = (value) => {
      this.setState({value})
      switch(value){
        case 0:
          this.props.changeColor('#f00')
          break
        case 1:
            this.props.changeColor('#00f')
            break
        case 2:
            this.props.changeColor('#000')
            break
      }
  
      this.props.changeActiveColorIndex(value)
    }
    state = {
      // isOnCycle: false,
      isOnLeft: true,
      isOnHpath: false,
    };
   
  
    componentDidMount (){
      
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
              this.setState({
                Speed:this.state.userData.speed.toString(),
                Delay:this.state.userData.delay.toString(),
                Cycle:this.state.userData.cycle.toString()
          });
        console.log(this.state.Delay, this.state.Speed, this.state.Cycle)
            }
            
          }
        );
      }.bind(this));
      console.log(this.props.size, this.props.color, this.props.speed, this.props.delay, this.props.cycle);
     
    }

    // closeapp=()=>{
      

    // }
   
    
  
    componentWillReceiveProps(nextprops,nextState){
      console.log(nextprops);
      // console.log(this.props.color.toLocaleString);
        db.transaction((tx)=> {
          tx.executeSql(
            'UPDATE settings set size=?, color=? , speed=? , delay=? , cycle=? where id=1',
            [this.props.size, this.props.color, this.state.Speed, this.state.Delay, this.state.Cycle],
            (tx, results) => {
              console.log('Results',results.rowsAffected);
              // this.props.navigation.dispatch(StackActions.reset({
              //             index: 0,
              //             actions: [
              //               NavigationActions.navigate({ routeName: 'Settings' })
              //             ],
              //           }))
                    
            }
          );
        });
    }
  
    render() {

    //    console.log(this.state.Speed, this.state.Delay, this.state.Cycle)
      const buttons = ['Small', 'Medium', 'Large']
      const { selectedIndex } = this.state
      
      return(
         <ScrollView style={styles.settingContainer}>
            <View style={styles.blockContainer}>
           {/* -----------------------------Size------------------      */}
              <Text>Dot Setting</Text>
               <View style={styles.block}>
                  <Text>Size</Text>
                  <ButtonGroup
                    selectedBackgroundColor="#05bbd3"
                    selectedButtonStyle={styles.selectedButtonStyle}
                    onPress={this.updateIndex}
                    selectedIndex={this.props.activeSize}
                    buttons={buttons}
                    containerStyle={{height: 30}} />
               </View> 
               <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginTop:10,
                    marginBottom:10
                  }}
                />
             {/* -------------------------------------color----------------------------    */}
               <View style={styles.block}>
                  <Text>Color</Text>
                  <ButtonGroup
                    selectedBackgroundColor="pink"
                    onPress={this.updateColor}
                    selectedButtonStyle={styles.selectedButtonStyle}
                    selectedIndex={this.props.activeColor}
                    buttons={['Red', 'Blue', 'Black']}
                    containerStyle={{height: 30}} />
               </View>
               <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginTop:10,
                    marginBottom:10
                  }}
                />
              
              {/* ----------------------------------------speed------------------------------- */}

               <View style={styles.block}>
                 <Text>Speed(1 to 5sec)</Text>
                 <View style={{ width:'100%', alignItems: 'stretch', justifyContent: 'center' }}>
                    <View style={{flex:1 ,flexDirection: 'row', borderRadius:5, borderColor:'#02a8ee', borderWidth: 1 ,justifyContent:"space-between", }}>
                        {/* <Text style={{width:'39.5%'}}>Speed</Text> */}
                        <Picker style={{ width:'100%', }}  
                            selectedValue={this.state.Speed}  
                            onValueChange={(speedValue, speedPosition) =>  
                                {this.setState({Speed: speedValue, choosenSpeed: speedPosition,}),this.props.changeDelay(speedValue) }}  
                        >  
                        {/* <Picker.Item label="Select Speed" value='' />   */}
                        <Picker.Item label="0.50 " value="0.5" />  
                        <Picker.Item label="1.00" value="1" /> 
                        <Picker.Item label="1.50" value="1.5" />
                        <Picker.Item label="2.00" value="2" />
                        <Picker.Item label="2.50" value="2.5" />
                        <Picker.Item label="3.00" value="3" />
                        <Picker.Item label="3.50" value="3.5" />
                        <Picker.Item label="4.00" value="4" />
                        <Picker.Item label="4.50" value="4.5" />
                        <Picker.Item label="5.00" value="5" />
                    </Picker> 
                    </View>
                    {/* <Text>Value: {this.state.Speed}</Text> */}
                  </View>
               </View>  
               <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginTop:10,
                    marginBottom:10
                  }}
                />

             {/* --------------------------------------------delay------------------------ */}

               <View style={styles.block}>
                 <Text>Transition Delay(0 to 2sec)</Text>
                 <View style={{ width:'100%', alignItems: 'stretch', justifyContent: 'center' }}>
                 <View style={{flex:1 ,flexDirection: 'row', borderRadius:5, borderColor:'#02a8ee', borderWidth: 1 ,justifyContent:"space-between", }}>
                        {/* <Text style={{width:'39.5%'}}>Speed</Text> */}
                        <Picker style={{ width:'100%', }}  
                            selectedValue={this.state.Delay}  
                            prompt='Options'
                            onValueChange={(delayValue, delayPosition) =>  
                                {this.setState({Delay: delayValue, choosenDelay: delayPosition,}),this.props.changeDelay(delayValue) }}  
                        >  
                        {/* <Picker.Item label="Select Delay" value="" />   */}
                        <Picker.Item label="0.00" value="0" />  
                        <Picker.Item label="0.25" value="0.25" /> 
                        <Picker.Item label="0.50" value="0.5" />
                        <Picker.Item label="0.75" value="0.75" />
                        <Picker.Item label="1.00" value="1" />
                        <Picker.Item label="1.25" value="1.25" />
                        <Picker.Item label="1.50" value="1.5" />
                        <Picker.Item label="1.75" value="1.75" />
                        <Picker.Item label="2.00" value="2" />
                        {/* <Picker.Item label="5" value="5" /> */}
                    </Picker> 
                    </View>
                    {/* <Text>Value: {this.state.Delay}</Text> */}
                  </View>
               </View>
               <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginTop:10,
                    marginBottom:10
                  }}
                />

              {/* -----------------------------------------cycle-------------------------------- */}

               <View style={styles.block}>
                 <Text>Animation Cycle(1 To 5)</Text>
                 <View style={{ width:'100%', alignItems: 'stretch', justifyContent: 'center' }}>
                 <View style={{flex:1 ,flexDirection: 'row', borderRadius:5, borderColor:'#02a8ee', borderWidth: 1 ,justifyContent:"space-between", }}>
                        {/* <Text style={{width:'39.5%'}}>Speed</Text> */}
                        <Picker style={{ width:'100%', }}  
                            selectedValue={this.state.Cycle}  
                            onValueChange={(cycleValue, cyclePosition) =>  
                                {this.setState({Cycle: cycleValue, choosenCycle: cyclePosition,}),this.props.changeDelay(cycleValue) }}  
                        >  
                        {/* <Picker.Item label="Select Cycle" value="" />   */}
                        <Picker.Item label="1" value="1" />  
                        <Picker.Item label="2" value="2" /> 
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        
                        {/* <Picker.Item label="5" value="5" /> */}
                    </Picker> 
                    </View>
                    {/* <Text>Value: {this.state.Cycle}</Text> */}
                  </View>
               </View>  
            </View>
            <View style={styles.blockContainer}>
               <View style={{width:'100%', paddingBottom:20, justifyContent: 'center', alignItems: 'center',}}>
               <TouchableOpacity style={styles.loginbtn}
                    onPress={this.Reset}
               >
                <Text style={styles.text}>Reset</Text>
              </TouchableOpacity>
               </View>
            </View>
         </ScrollView>
      );
    }
  }
  
  
  