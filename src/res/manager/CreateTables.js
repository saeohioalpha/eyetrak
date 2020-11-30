
import React, { Component } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { localDB } from '../constants/constants'

export default class CreateTables extends Component {  

    constructor(props) {
        super(props)
    }  
        
  
    
    componentDidMount() { 
       // const db = SQLite.openDatabase(localDB.dbName, '1.0', '', 1);
        var db = SQLite.openDatabase(localDB.dbName, "1.0", "reactDemo Database", 200000, this.openCB, this.errorCB);
            
    }

    errorCB(err) {
        console.log("SQL Error: " + err);
      }
      
      successCB() {
        console.log("SQL executed fine");
      }
      
      openCB() {
        console.log("Database OPENED");
      }   

    render() {
        return null
      }  

}
