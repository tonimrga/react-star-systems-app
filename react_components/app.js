class App extends React.Component {
    //conustructor and defining the state variables
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 20,
            stars : {},
            pageInfo: {},
            starDetails: ''
        };
    }

    //fetch all of the star systems on componentDidMount
    componentDidMount() {
        this.fetchStars();
    }

    //if the page number is updated fetch all of the star systems - paging
    componentDidUpdate(prevProps, prevState) {
      if (this.state.page !== prevState.page) {
        this.fetchStars();
      }
    }

    //fetch all of the star systems and store it in state
    fetchStars = () => {
        fetch('http://webdevelopertest.playfusionservices.com/webapptest/stars?page='+ this.state.page + '&size=' + this.state.size + '&sort=numberOfPlanets,desc')
            .then(response => response.json())
            .then(response => {
              this.setState({
                stars: response._embedded.stars,
                pageInfo: response.page
              });
            })
    }

    //fetch details of the star system that is clicked on and store it in state - read one
    fetchDetails = (self) => {
        fetch(self)
            .then(response => response.json())
            .then(response => {
              this.setState({
                starDetails: response
              });
            })
    }

    //search stars and store the results in state
    searchStars = (e) => {
          e.preventDefault();
          fetch('http://webdevelopertest.playfusionservices.com/webapptest/alternateNames/search/findByNameLike?name='+ encodeURIComponent(e.target.search.value))
              .then(response => response.json())
              .then(response => {
                this.setState({
                  stars: response._embedded.alternateNames,
                  pageInfo: response.page,
                  page: 0
                });
          })
    }

    // calling fetch stars to clear all of searches and filters
    clearSearch = () => {
        this.fetchStars();
        this.setState({
            page: 0
        });
    }

    // filter stars and store them in state
    filterStarsWithPlanets = () => {
        fetch('http://webdevelopertest.playfusionservices.com/webapptest/stars/search/findByNumberOfPlanetsGreaterThan?numberOfPlanets=1&page=0&size=' + this.state.size + '&sort=distance,desc')
          .then(response => response.json())
          .then(response => {
              this.setState({
                  stars: response._embedded.stars,
                  pageInfo: response.page,
                  page: 0
              });
          })
    }

    // change page function used for pagination
    changePage = (page) => {
        if(page===-1){
          alert('You are on page 1. There is no previous page.')
        }
        else if(page===this.state.pageInfo.totalPages){
          alert('You are on the last page. There is no next page.')
        }
        else{
          window.scrollTo(0, 0);
          this.setState({
            page: page
          });
        }
    }

    //render function - renders the react components and passes the needed props
    render() {
        return (
            <div className="grid-container">
                <Search filterStarsWithPlanets={this.filterStarsWithPlanets} searchStars={this.searchStars} clearSearch={this.clearSearch} />
                <Listing fetchDetails={this.fetchDetails} stars={this.state.stars} pageInfo={this.state.pageInfo} size={this.state.size} currentPage={this.state.page} changePage={this.changePage} />
                <Details starDetails={this.state.starDetails} />
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('root'));
