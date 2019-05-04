import axios from 'axios';
import { FETCH_USER} from './types';

export const  fetchUser = (stop, routes)=> {
    const data ={stop, routes}
    
    return {
        type: 'FETCH_USER',
        stop: data.stop,
        routes:data.routes
}}
// export  function fetchUser(user, password, stop){
//   const data ={user, password, stop}
//    axios.post('http://localhost:5000/login', {data}).then((res)=>{
//   console.log(res.data)
  
// })
  
