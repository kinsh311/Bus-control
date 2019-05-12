// import React from 'react';
// const Landing = () => {
//     return (
//         <div style = { { textAlign:"center"} }>
//             <h1> Bus </h1>
            
//         </div>
//     )
// }
// export default Landing;
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
 class Landing extends React.Component {
 
  state = {
    dest : '',
    src : '',
    route: '',
    ticketCount: Number,
    time: Date.now(),
    r:[],
    
    s: "",
    recievedArray: [],
    selectedRoute: 'none'
  }
  componentDidMount() {
    console.log(this.props.auth.routes)
    // this.setState( { 
    //   s: this.props.auth.stop
    // })
    const data = {
   
      src : this.props.auth.stop,
      route: this.props.auth.routes
      
    };
    setInterval(async() => {
      // 
      await axios.post(`http://localhost:5000/stops`, {data})
      .then(res => {
        this.setState({recievedArray:res.data})
        console.log(res.data);
      })
    }, 5000);
  }
  
  handleChangeDest = event => {
    this.setState({ 
      dest: event.target.value
      
     
     });
  }
  
 
  handleChangeTicketCount = event => {
    this.setState({
      ticketCount: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault();

    const data = {
      dest: this.state.dest,
      src : this.props.auth.stop,
      route: this.state.selectedRoute,
      ticketCount: this.state.ticketCount
    };

    await axios.post(`http://localhost:5000/api/stop`, { data })
      .then(res => {
        
        console.log(res.data);
        document.getElementById("myForm").reset()
      })
  }
  
  onPress = async event => {
    event.preventDefault();
    // console.log(event.target.name)
    // console.log(event.target.value)
    const data = {
      bus: event.target.name,
      route: event.target.value,
      src: this.props.auth.stop
    }
    await axios.post('http://localhost:5000/reached', {data}).then(res => {
      // console.log(res.data)

    })
    
  }
  onPressRoutes = async event => {
    event.preventDefault();
    this.setState({
      selectedRoute : event.target.value
    })
    
  }
  renderButtons() {
    return this.state.recievedArray.map((item, i) => {
        return (
          <li key = {i}><button 
                
          onClick={this.onPress.bind(this)}
          key = {i}
          name = {item.bus}
          value = {item.route}
      >
          {item.bus} in {item.route}
      </button></li>
            
        );
    });
}
renderRoutes() {
  return this.props.auth.routes.map((item, i) => {
      return (
        <li key = {i}><button 
              
        onClick={this.onPressRoutes.bind(this)}
        key = {i}
        name = {item}
        value = {item}
    >
        {item} 
    </button></li>
          
      );
  });
}


  render() {
    return (
      <div>
        <form id="myForm" onSubmit={this.handleSubmit}>
        
          <label>
            Destination Name:
            <input type="text" name="dest" onChange={this.handleChangeDest} />
          </label>
          <label>
          No. of Tickets
          <input type="text" name="ticketCount" onChange={this.handleChangeTicketCount} />
        </label>
        
      <ul>{this.renderButtons()}</ul>
      <ul>{this.renderRoutes()}</ul>
      <div><h3>Selected Route {this.state.selectedRoute}</h3></div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    )
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);