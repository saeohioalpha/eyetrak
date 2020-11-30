import { combineReducers } from "redux";




const settingsState = {
    size:75,
    color:'#f00',
    speed:1,
    delay:.75,
    cycle:1,
    path:{
        hpath:false,
        ltr:false,
        cycle:false
    },
    activeColor:0,
    activeSize:1
}

export const ActionChangeDirection = 'settings [change direction]'
export const ActionChangeColor = 'settings [change color]'
export const ActionChangeSpeed = 'settings [change speed]'
export const ActionChangeSize = 'settings [change size]'
export const ActionChangeDelay = 'settings [change delay]'
export const ActionChangeCycle = 'settings [change cycle]'
export const ActionChangeActiveColor = 'settings [active color]'
export const ActionChangeActiveSize = 'settings [active size]'

const SettingsReducer = (state=settingsState,action) => {
    switch(action.type){
        case ActionChangeDirection:{
            return {
                ...state,
                path:{
                    ...action.payload
                }
            }
        }
            
        case ActionChangeActiveColor:
            return {
                ...state,
                activeColor:action.payload
            }

        case ActionChangeActiveSize:
            return {
                ...state,
                activeSize:action.payload
            }

        case ActionChangeColor:
            return {
                ...state,
                color:action.payload
            }

        case ActionChangeSpeed:
            return {
                ...state,
                speed:action.payload
            }


        case ActionChangeSize:
            return {
                ...state,
                size:action.payload
            }
            
        case ActionChangeDelay:
            return {
                ...state,
                delay:action.payload
            }
            case ActionChangeCycle:
                return {
                    ...state,
                    cycle:action.payload
                }

        default:
            return state

    }    
}

export default combineReducers({settings:SettingsReducer})
