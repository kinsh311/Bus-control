import React from 'react';
import axios from 'axios';
import { fetchUser } from '../actions/index'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class LoginBusStop extends React.Component {
    constructor(props, context) {
        super(props);
        this.onuserChange = this.onuserChange.bind(this);
        this.onstopChange = this.onstopChange.bind(this);
        this.onpasswordChange = this.onpasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            user: '',
            password: '',
            stop: ''
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
    onstopChange = (e) => {
        const stop = e.target.value;

        this.setState(() => ({ stop }));

    }
    onSubmit = async (e) => {


        let user = this.state.user;
        let password = this.state.password;
        let stop = this.state.stop;
        let data = { user, password, stop }
        await axios.post('http://localhost:5000/loginBusStop', { data }).then((res) => {
        
        if(res.data.check === true){
            
            this.props.dispatch(fetchUser(stop,res.data.routes))
        this.props.history.push(`/landing/:${this.state.stop}`)
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
                        placeholder="stop"
                        value={this.state.stop}
                        onChange={this.onstopChange}
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
export default connect(mapStateToProps)(LoginBusStop);
// to={`landing/${this.state.stop}`}