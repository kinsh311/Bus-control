import React from 'react';
import { Link } from 'react-router-dom';
export default class Header extends React.Component {
    render() {
        return (
            <nav>
                <div className='nav-wrapper'>
                    <Link to="/loginBusStop">Bus Stop Operator</Link><br/>
                    <Link to="/loginBusDriver">Bus Driver</Link>
                    
                </div>
            </nav>
        )
    }
}