import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height:null,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  movingcontainer:{
    width:'100%',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButtonStyle:{
       backgroundColor:'#05bbd3'
  },
  ImageContainer:{
    width:'100%',
    height:'100%',
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  object:{
    width:50,
    height:50,
    backgroundColor:'#ff0000',
    borderRadius:50,
   
  },
  logocontainer:{

  },
  logo:{
    width:80,
    height:80,
  },
  inputContainer:{
    width:'100%',
    flexDirection:'row',
    justifyContent:"space-between",
    padding:25,
  },
  inputText:{
     width:'29%',
     marginTop:10,
  },
  input:{
         width:'100%',
         height:38,
         
         marginBottom:10,
         borderRadius: 5,
         fontSize: 16,
         paddingLeft:10,
         backgroundColor: '#ffffff',
         color:'#000',
  },
  loginbtn:{
    width:'70%',
    height:38,
    marginTop:10,
    marginBottom:10,
    borderRadius: 5,
    backgroundColor: '#05bbd3',
    fontSize: 16,
    paddingTop:7,
    textAlign:'center',
    shadowOffset: { width: 10, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 7,
  },
  positionBottom:{
      position:"absolute",
      bottom:50,
  },
  mt50:{
    marginTop:50
  },
  text:{
    color:'#fff',
    fontSize: 16,
    textAlign:'center',
  },
  savebtn:{
    width:'70%',
    height:38,
    marginTop:10,
    marginBottom:10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    fontSize: 16,
    paddingTop:7,
    textAlign:'center',
  },
  camera:{
    flex:1,
    width:'100%',
    height:'50%',
    opacity:0,
    position:'absolute',
    borderRadius:5,
  },
  pcamera:{
    flex:1,
    width:'100%',
    height:'50%',
    position:'absolute',
    borderRadius:5,
  },
  cameracontainer:{
    flex: 1,
    backgroundColor: '#ddd',
  },
  textContainer:{
    flex: 2, 
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  dotcontainer: {
  //  flexDirection :'row',
  //  width:'100%',
   flex:1,
   padding:25,
   backgroundColor:'#ddd',

  },

  boxView:{
    backgroundColor:'#0f0',
    flex:1
 },
 
 box: {
 
  
},
  dot:{
     width :50,
     height:50,
     backgroundColor:'red',
     borderRadius:50,
     margin:10,
     position:'absolute',
     top:'50%'

  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
settingContainer:{
  paddingLeft:10,
  paddingTop:10
},
blockContainer:{
  paddingLeft:10,
  paddingTop:10,
  paddingRight:10
},
block:{
  paddingLeft:10,
  paddingRight:10,
   paddingTop:10
},
bottomOverlay: {
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
overlay: {
  position: 'absolute',
  padding: 16,
  right: 0,
  left: 0,
  alignItems: 'center',
},
captureButton: {
  padding: 15,
  backgroundColor: 'white',
  borderRadius: 40,
},
});