// import React from 'react';
// import { Link } from 'react-router-dom';
// export default class Header extends React.Component {
//     render() {
//         return (
//             <nav>
//                 <div className='nav-wrapper'>
//                     <Link to="/landing">Bus Stop Operator</Link>
//                     <Link to="/busOp">Bus Operator</Link>
                    
//                 </div>
//             </nav>
//         )
//     }
// }
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return <li>hello</li>;
      case false:
        return <li>Login With Google</li>;
        default:
        return <li>asdf</li>;
      
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          
          <ul className="right">
            {this.renderContent()}
          </ul>
          
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);