import React from 'react';
import axios from 'axios';
import { fetchUser } from '../actions/index'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class LoginBusDriver extends React.Component {
    constructor(props, context) {
        super(props);
        this.onuserChange = this.onuserChange.bind(this);
        this.onBusIdChange = this.onBusIdChange.bind(this);
        this.onpasswordChange = this.onpasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            user: '',
            password: '',
            busId: ''
        }

    }
    onuserChange = (e) => {
        const user = e.target.value;
        this.setState(() => ({ user }));
    }
    onpasswordChange = (e) => {
        const password = e.target.value;

        this.setState(() => ({ password }));

    }
    onBusIdChange = (e) => {
        const busId = e.target.value;

        this.setState(() => ({ busId }));

    }
    onSubmit = async (e) => {


        let user = this.state.user;
        let password = this.state.password;
        let busId = this.state.busId;
        let data = { user, password, busId }
        await axios.post('http://localhost:5000/loginBusDriver', { data }).then((res) => {
        
        if(res.data.check === true){
            
            
        this.props.history.push(`/landingBusDriver/${busId}`)
        }    
        else{
            window.alert("no user found")
        }

        })
        
    }

    render() {
        return (
            <div>
                <form>
                    <input
                        type="text"
                        placeholder="User"
                        autoFocus
                        value={this.state.user}
                        onChange={this.onuserChange}
                    />
                    <input
                        type="text"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.onpasswordChange}
                    />
                    <input
                        type="text"
                        placeholder="bus Id"
                        value={this.state.busId}
                        onChange={this.onBusIdChange}
                    />
                    <br />
                    <button type="button" onClick={this.onSubmit}> add expense </button>
                </form>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(LoginBusDriver);
// to={`landing/${this.state.stop}`}