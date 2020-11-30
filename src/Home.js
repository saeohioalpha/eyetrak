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

import SQLite from "react-native-sqlite-storage";
import CreateTables from './res/manager/CreateTables'
import { localDB } from './res/constants/constants'
import { withNavigation } from 'react-navigation';
import  {
  BackAndroid,
} from 'react-native';
import {connect} from "react-redux"
var db = SQLite.openDatabase(localDB.dbName, "1.0", "reactDemo Database", 200000);

export default class Home extends Component {
    static navigationOptions =({navigation})=> ({
      headerLeft:null,
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
      super(props);
      this.state = {
        userData: '',
      };
    }
    componentDidMount = () => {
      //Checking for the permission just after component loaded
       async function requestStoragePermission() {
         try {
           const granted = await PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
               'title': 'AndoridPermissionExample App storage Permission',
               'message': 'AndoridPermissionExample App needs access to your storage '
             }
           )
          //  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //    //To Check, If Permission is granted
          //    alert("You can use the Storage");
          //  } else {
          //    alert("Storage permission denied");
          //  }
         } catch (err) {
           alert("err",err);
           console.warn(err)
         }
       }
       if (Platform.OS === 'android') {
           //Calling the permission function
           requestStoragePermission();
       }else{
           alert('IOS device found');
       }
  
       db.transaction(function (txn) {
        //txn.executeSql('DROP TABLE IF EXISTS ' + localDB.tableName.tblLogin, []);  
        txn.executeSql('CREATE TABLE IF NOT EXISTS ' + localDB.tableName.settings + ' (id  INTEGER PRIMARY KEY AUTOINCREMENT,size INTEGER,color TEXT,speed FLOAT,delay FLOAT,cycle INTEGER )', []);
        console.log('create databse success.')
    });  
  
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT * FROM settings",
        [],
        (tx, res) => {
          console.log(res.rows.length);
          console.log( res.rows.item(0));
          if (res.rows.length == 0) {
            txn.executeSql(
              "INSERT INTO " +
                localDB.tableName.settings +
                " (size,color,speed,delay,cycle) VALUES (:size,:color,:speed,:delay,:cycle)",
              [
                75,
                "red",
                1.0,
                0.75,
                1
              ],
              (txn, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                  );
                }
                }
            );
          }
        }
      );
    });
   
    }
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.ImageContainer}>
              <Image
                style={{ height:150, width:150, position:"absolute",top:50, resizeMode:"contain",  padding:30 }}
                source={require('./eye.png')}
              />
            <TouchableOpacity style={[styles.loginbtn, styles.positionBottom]}
             onPress={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'CemeraScreen' })
                ],
              }))
            }}
  
            >
              <Text style={styles.text}>Begin Test</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  
  