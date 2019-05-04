// import React, { Component } from 'react';
// import Landing from './Landing';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Landing />
//       </div>
//     );
//   }
// }

// export default App;
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginBusStop from './LoginBusStop';
import LoginBusDriver from './LoginBusDriver';
import Header from './Header'
import Landing from './Landing';
import BusOperator from './BusOperator';
import LandingBusDriver from './LandingBusDriver'
import First from './First'





class App extends React.Component{
    
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component = {First} />
                        <Route exact path="/loginBusDriver" component = {LoginBusDriver} />
                        <Route exact path="/loginBusStop" component = {LoginBusStop} />
                        <Route exact path="/landing/:stop" component = {Landing} />
                        <Route exact path="/busOp" component = {BusOperator} />
                        <Route exact path="/landingBusDriver/:busId" component={LandingBusDriver} />
                        <Route exact path="/header" component = {Header} />
                    </div>
                </BrowserRouter>
            </div>
        );
    };
}

export default App;     //actions are connected to App component as props