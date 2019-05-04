import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
export default class LandingBusDriver extends React.Component {
    
    async componentDidMount() {
        
        const busId_from_props =this.props.match.params.busId
        console.log(busId_from_props)
        setInterval(async() => {
            // 
            await axios.post(`http://localhost:5000/busDriver`,
             {busId:busId_from_props})
            .then(res => {
              
              console.log(res.data);
            })
          }, 5000);
        }
    
        handleSubmit = async event => {
            event.preventDefault();
        
            const data = {
              busId :this.props.match.params.busId
            };
        
            await axios.post(`http://localhost:5000/busReached`, { data })
              .then(res => {
                
                console.log(res.data);
                document.getElementById("myForm").reset()
              })
          }
    render() {
        return (
            <nav>
                <div className='nav-wrapper'>
                    this is from bus driver
                    <form id="myForm" onSubmit={this.handleSubmit}>
                    <button type="submit">reached</button>
                    </form>
                </div>
                
            </nav>
        )
    }
}