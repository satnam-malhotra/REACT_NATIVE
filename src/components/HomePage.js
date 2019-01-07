import React, {Component} from 'react';
import Redirect from "react-router-dom/es/Redirect";

class HomePage extends Component {

    state = {
        planets: [],
        toLoginPage: false,
        updatedPlanets: [],
        maxPopulation: 0,
        planetName: null,
        singlePlanet: [],
        displayDetails: false,
        name: null
    };

    componentDidMount() {
        fetch('https://swapi.co/api/planets').then((Response) => Response.json()).then((findResponse) => {
            console.log(findResponse.results);
            const maxPopulation = Math.max(...findResponse.results.map((populate) => {
                    if (populate.population === "unknown")
                        return 0;
                    return parseFloat(populate.population)
                })
            );
            this.setState({
                planets: findResponse.results,
                updatedPlanets: findResponse.results,
                maxPopulation: maxPopulation
            });
        })
    };

    moveToLogin = () => {
        this.setState({
            toLoginPage: true
        })
    };

    filterList = (e) => {
        let updatedList = this.state.planets;
        let inputValue = this.inputValue;
        const filterResult = updatedList.filter((planet) => {
            return planet.name.toLowerCase().indexOf(inputValue) > -1
        });
        this.setState({
            updatedPlanets: filterResult
        });
    };

    refreshList = (e) => {
        let updatedList = this.state.planets;
        const freshList = updatedList.filter((planet) => {
            return planet.name
        });
        this.setState({
            updatedPlanets: freshList,
            name: ''
        });
    }

    fetchPopulation = (population) => {
        console.log("&&&&&&&", population)
        const width = population/10000000000;
        console.log("^^^^^^^", width)
        // let finalValue = Math.round((width))
        // console.log("$$$$$$4", finalValue)
        return width*100

        // if (width < 20) {
        //     return 20
        // } else {
        //     return width
        // }
    };

    fetchDetails = () => {
        if (this.state.planetName != null) {
            let singleResult = this.state.planets.filter((single) => {
                return single.name.indexOf(this.state.planetName) > -1
            });
            this.setState({
                singlePlanet: singleResult
            })
            console.log('my value is coming as', singleResult)
        }
    };

    onMouseClick = (event) => {
        this.setState({planetName: event.target.innerHTML, displayDetails: true})
        this.fetchDetails()

    };

    resetName = (event) => {
        this.setState({
            name: ''
        });
    }

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
                    color: 'blue'
                }}>
                    <p>Planet Details:</p>
                    <p>
                        {
                            this.state.singlePlanet.length == 0 ? "" : "Planet Name: " + this.state.singlePlanet[0].name
                        }
                    </p>
                    <p>
                        {
                            this.state.singlePlanet.length == 0 ? "" : "Population: " + this.state.singlePlanet[0].population
                        }
                    </p>
                    <p>
                        {
                            this.state.singlePlanet.length == 0 ? "" : "Diameter: " + this.state.singlePlanet[0].diameter
                        }
                    </p>

                </div>
                <button className='btn waves-effect waves-light green' style={{borderRadius: 20}}
                        onClick={this.filterList}>
                    Search
                </button>
                <button className='btn waves-effect waves-light blue' style={{borderRadius: 20}}
                        onClick={this.refreshList}>
                    Refresh
                </button>
                <div className='right-align'>
                    <button className='btn waves-effect waves-light red' style={{borderRadius: 20}}
                            onClick={this.moveToLogin}>
                        Logout
                    </button>
                </div>
                <nav className='black nav-wrapper'>
                    <div className="nav-wrapper">
                        <form>
                            <div className="input-field">
                                <input id="search" type="search" placeholder='Search The Planets'
                                       value={this.state.name}
                                       onChange={(c) => {
                                           this.inputValue = c.target.value;
                                           this.setState({name: c.target.value})
                                       }} name="inputValue"/>
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