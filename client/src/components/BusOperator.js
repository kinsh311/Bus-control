import React from 'react';
import axios from 'axios';
export default class BusOperator extends React.Component {
    componentDidMount(){
        // const evtSource = new EventSource("http://localhost:5000/busDriver")
        // evtSource.onmessage = function(e){
        //     console.log(e.data)
        axios.get(`http://localhost:5000/busDriver`)
      .then(res => {
        
        console.log(res.data);
      })
        
    }
    render() {
        return (
            <div>this from Bus Operator</div>
        )
    }
}