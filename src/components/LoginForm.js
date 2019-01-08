import React, {Component} from 'react';
import logo from '../starwar_logo.png';
import * as Materialize from "materialize-css";
import Redirect from "react-router-dom/es/Redirect";

class LoginForm extends Component {
    state = {
        email: null,
        password: null,
        names: [],
        toHomePage: false,
        loading: false
    };

    componentDidMount() {
        if (localStorage.getItem("name") !== "") {
            console.log("Yes already logged In");
            this.setState({
                toHomePage: true
            });
        }
    }


    emailData = (e) => {
        this.setState({
                email: e.target.value,
            }
        );
        e.preventDefault()
    };

    passwordData = (e) => {
        this.setState({
                password: e.target.value
            }
        );
        e.preventDefault()
    };

    verifyLogin = (e) => {
        if (this.state.email != null && this.state.password != null) {
            this.fetchPeople()
        } else {
            Materialize.toast({
                html: 'Missing Fields',
                displayLength: 4000,
                classes: 'rounded'
            })
        }
        e.preventDefault()
    };

    returnUser = (e) => {
        return this.state.email
    }

    fetchPeople = () => {
        this.setState({
            loading: true
        });
        fetch('https://swapi.co/api/people?search=' + this.state.email).then((Response) => Response.json()).then((findResponse) => {
            if (findResponse.results.length > 0) {
                let user = findResponse.results[0];
                if (this.state.email.toLowerCase() === user.name.toLowerCase() && this.state.password.toLowerCase() === user.birth_year.toLowerCase()) {
                    localStorage.setItem("name", this.state.email);
                    Materialize.toast({
                            html: 'Welcome to StarWars',
                            displayLength: 2000,
                            classes: 'rounded'
                        }
                    );
                    this.setState({
                        toHomePage: true
                    });
                }
                else {
                    Materialize.toast({
                        html: 'InCorrect credentials, try again!',
                        displayLength: 4000,
                        classes: 'rounded'
                    })
                }
            }
            else {
                Materialize.toast({
                    html: 'InCorrect credentials, try again!',
                    displayLength: 4000,
                    classes: 'rounded'
                })
            }
            this.setState({
                names: findResponse.results,
                loading: false
            })
        })
    };

    render() {
        if (this.state.toHomePage === true) {
            return <Redirect to='/HomePage'/>
        }

        return (
            <div align="center">
                <img src={logo} alt={'StarWars'} style={{height: '60px', width: '190px'}}/>
                <div>
                    <input style={{width: "370px"}} type='text' id='enter_email' onChange={this.emailData}
                           placeholder={'Username'}/>
                </div>
                <div>
                    <input style={{width: "370px"}} type='text' id='enter_password' onChange={this.passwordData}
                           placeholder={'Password'}/>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="login"
                        onClick={this.verifyLogin}>Login
                    <i className="material-icons left">fingerprint</i>
                </button>
                <div className="progress" style={{display: this.state.loading ? '' : 'none'}}>
                    <div className="indeterminate"></div>
                </div>
            </div>
        )
    }
}

export default LoginForm;