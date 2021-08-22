// import {
//   MERCEDES,
//   WAGONR,
//   UP80CJ,
//   UP11T,
//   UP80CT  
// } from "./typestypes";

// const initialState = { 
//   items: [], 
// }

// export default (state = initialState, {type, payload}) => {
//     switch (type) {
//       case MERCEDES:
//         return {
//                 ...state,
//                 show: true
//               };
//       case WAGONR:
//         return { 
//                 ...state,
//                 loading: true
//                 };
//       case UP80CJ:
//         return { 
//                 ...state,
//                 error: payload
//                 };
//       case UP11T:
//         return {  
//                 ...state,
//                 succes:  payload
//                 };
//       case UP80CT:
//         return { 
//                 ...state, 
//                 items:  payload 
//                 }
//       default:
//         return state; 
//     }
// }