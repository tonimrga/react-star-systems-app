class Details extends React.Component {

  //constructor that defines state variables
  constructor(props) {
      super(props);
      this.state = {
          altNames: [],
          planets: []
      };
  }

  //if props changed(if selected star changed) call fetchAltNames and fetchPlanets and also scroll to the star details(good for mobile devices)
  componentDidUpdate(prevProps) {
    if (this.props.starDetails !== prevProps.starDetails) {
      this.fetchAltNames();
      this.fetchPlanets();
      document.getElementById(this.props.starDetails.name).scrollIntoView();
    }
  }

  //fetch alternate names for a given star and store them in state
  fetchAltNames = () => {
      fetch(this.props.starDetails._links.additionalNames.href)
          .then(response => response.json())
          .then(response => {
            this.setState({
              altNames: response._embedded.alternateNames
            });
          })
  }

  //fetch planets for a given star and store them in state
  fetchPlanets = () => {
      fetch(this.props.starDetails._links.planets.href)
          .then(response => response.json())
          .then(response => {
            this.setState({
              planets: response._embedded.planets
            });
          })
  }

  //print the details of the star system
  printDetails = () => {
      if(!this.props.starDetails){
        return (
            <div className="grid-item3">
                <h3 className="title">System Details</h3>
                <div className="details">
                  <p>Please select a star system.</p>
                </div>
            </div>
        );
      }
      else{
        return (
            <div className="grid-item3">
                <h3 id={this.props.starDetails.name} className="title">System Details</h3>
                <div className="details">
                    <h3>Name: <span className="blue-text">{this.props.starDetails.name}</span></h3>
                    <p>
                       <strong>Radius: </strong> {this.props.starDetails.radius ? this.props.starDetails.radius + " km" : "no data"} |
                       <strong> Age: </strong>{this.props.starDetails.age ? this.props.starDetails.age : "no data"} |
                       <strong> Temperature: </strong> {this.props.starDetails.temperature ? this.props.starDetails.temperature : "no data"}
                    </p>
                    <p>
                       <strong> Mass: </strong> {this.props.starDetails.mass ? this.props.starDetails.mass : "no data"} |
                       <strong> Distance: </strong> {this.props.starDetails.distance ? this.props.starDetails.distance + " ly" : "no data"} |
                       <strong> Number of planets: </strong> {this.props.starDetails.numberOfPlanets ? this.props.starDetails.numberOfPlanets : "no data"}
                    </p>
                </div>
                <h3 className="title">Alternate Names</h3>
                <div className="details">
                    {this.printAlternateNames()}
                </div>
                <h3 className="title">Planets</h3>
                <div>
                    {this.printPlanets()}
                </div>
            </div>
          );
      }
  }

  //loop through alternate names and print them out
  printAlternateNames = () => {
    return(
        this.state.altNames.map((altName) => (
              <p key={altName.name}>{altName.name}</p>
        ))
    );
  }

  //loop through planetsand print them out
  printPlanets = () => {
    return(
        this.state.planets.map((planet) => (
            <div className="details" key={planet.name}>
                <p className="planets-title" >{planet.name}</p>
                <p><strong>List: </strong> {planet.list ? planet.list : "no data"}</p>
                <p>{planet.description ? planet.description  : "no data"}</p>
                <p>
                  <strong>Radius: </strong> {planet.radius ? planet.radius + " km" : "no data"} |
                  <strong> Age: </strong> {planet.age ? planet.age : "no data"} |
                  <strong> Temperature: </strong> {planet.temperature ? planet.temperature + " K" : "no data"}
                </p>
                <p>
                   <strong>Mass: </strong> {planet.mass ? planet.mass : "no data"} |
                   <strong> Discovery method: </strong> {planet.discoveryMethod ? planet.discoveryMethod : "no data"} |
                   <strong> Discovery date: </strong> {planet.discoveryDate ? planet.discoveryDate.slice(0,10) : "no data"}
                </p>
            </div>
        ))
    );
  }

  //render printDetails
  render() {
    return(
      this.printDetails()
    )
  }
}
