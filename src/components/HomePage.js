import React, {Component} from 'react';
import Redirect from "react-router-dom/es/Redirect";
import * as Materialize from "materialize-css";

class HomePage extends Component {

    state = {
        planets: [],
        planetArray: [],
        toLoginPage: false,
        updatedPlanets: [],
        planetName: '',
        singlePlanet: [],
        displayDetails: false,
        name: '',
        count: 0,
        flag: true
    };

    componentDidMount() {
        if (localStorage.getItem("name") === '') {
            this.moveToLogin()
        }
        else {
            fetch('https://swapi.co/api/planets').then((Response) => Response.json()).then((findResponse) => {
                this.setState({
                    planets: findResponse.results,
                    planetArray: findResponse.results,
                    updatedPlanets: findResponse.results,
                });
            })
        }

    };

    moveToLogin = () => {
        this.setState({
            toLoginPage: true
        })
        localStorage.setItem("name", '');
    };

    filterList = () => {
        if (this.state.count === 0) {
            setTimeout(this.resetCount, 60000)
        }
        if (this.inputValue.length === 0) {
            this.setState({
                updatedPlanets: this.state.planetArray,
            });
        }
        else {
            if (this.state.count < 5 || localStorage.getItem("name") === 'luke skywalker') {
                fetch('https://swapi.co/api/planets/?search=' + this.inputValue).then((Response) => Response.json()).then((findResponse) => {
                    this.setState({
                        planets: findResponse.results,
                        updatedPlanets: findResponse.results,
                        count: this.state.count + 1
                    });
                })
            }
            else {
                Materialize.Toast.dismissAll();
                Materialize.toast({
                    html: 'You have exceeded the maximum search limit!, Please refresh or login again',
                    displayLength: 4000,
                    classes: 'rounded'
                })

            }
        }
    };

    resetCount = () => {
        this.setState({
            count: 0
        });
    };

    fetchPopulation = (population) => {
        let value = parseInt(population);
        if (value > 100000000000 && value <= 1000000000000) {
            value = 100;
        }
        else if (value > 10000000000 && value <= 100000000000) {
            value = 90;
        }
        else if (value > 1000000000 && value <= 10000000000) {
            value = 80;
        }
        else if (value > 100000000 && value <= 1000000000) {
            value = 70;
        }
        else if (value > 10000000 && value <= 100000000) {
            value = 60;
        }
        else if (value > 1000000 && value <= 10000000) {
            value = 50;
        }
        else if (value > 100000 && value <= 1000000) {
            value = 40;
        }
        else if (value > 10000 && value <= 100000) {
            value = 30;
        }
        else if (value > 1000 && value <= 10000) {
            value = 20;
        }
        else if (value > 100 && value <= 1000) {
            value = 10;
        }
        else if (population === 'unknown') {
            value = 8;
        }
        return value
    };

    fetchDetails = () => {
        if (this.state.planetName != null) {
            let singleResult = this.state.updatedPlanets.filter((single) => {
                return single.name.indexOf(this.state.planetName) > -1
            });
            this.setState({
                singlePlanet: singleResult
            })
        }
    };

    onMouseClick = (event) => {
        this.setState({planetName: event.target.innerHTML, displayDetails: true});
        this.fetchDetails()
    };

    render() {
        if (this.state.toLoginPage === true) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <div style={{
                    height: '160px',
                    width: '200px',
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    margin: "0px 0px 0px 10px",
                    color: 'red'
                }}>
                    <p>Planet Details:</p>
                    <p>
                        {
                            this.state.singlePlanet.length === 0 ? "" : "Planet Name: " + this.state.singlePlanet[0].name
                        }
                    </p>
                    <p>
                        {
                            this.state.singlePlanet.length === 0 ? "" : "Population: " + this.state.singlePlanet[0].population
                        }
                    </p>
                    <p>
                        {
                            this.state.singlePlanet.length === 0 ? "" : "Diameter: " + this.state.singlePlanet[0].diameter
                        }
                    </p>
                </div>

                <div className='right-align' style={{padding: 10}}>
                    <button className='btn waves-effect waves-light red' style={{borderRadius: 20}}
                            onClick={this.moveToLogin}>
                        Logout
                    </button>
                </div>
                <nav className='black nav-wrapper' style={{borderRadius: 30}}>
                    <div className="nav-wrapper rounded">
                        <form>
                            <div className="input-field">
                                <input id="search" type="search" placeholder='Search The Planets'
                                       value={this.state.name}
                                       onChange={(c) => {
                                           this.inputValue = c.target.value;
                                           this.setState({
                                               name: c.target.value
                                           });
                                           this.filterList()
                                       }} name="inputValue" style={{borderRadius: 30}}/>
                                <label className="label-icon" htmlFor="search">
                                    <i className="material-icons">search</i>
                                </label>
                                <i className="material-icons">close</i>
                            </div>
                        </form>
                    </div>
                </nav>

                <div className='center-align'>
                    {
                        this.state.updatedPlanets.map((planets) =>
                            <p onClick={event => this.onMouseClick(event)} style={{
                                background: '#5ca011',
                                borderRadius: 20,
                                backgroundImage: 'images/sample-1.jpg',
                                padding: 5,
                                width: `${this.fetchPopulation(planets.population)}%`
                            }}>{planets.name}
                            </p>
                        )
                    }
                </div>
            </div>

        )
    }
}

export default HomePage