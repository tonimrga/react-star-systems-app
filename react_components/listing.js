class Listing extends React.Component {

    //print stars - loops through all of the stars in state passed via props and renders the data
    printStars = () => {
        if(this.props.stars.length>0){
            return(
                this.props.stars.map((star) => (
                    <div onClick={() => this.props.fetchDetails(star._links.star.href)} className="stars-row" key={star.name}>
                        <p><strong className="blue-text">Name:</strong> ★ {star.name}</p>
                        {star.distance ?
                        <p><strong>Distance:</strong> {star.distance} </p> : ""}
                        {star.numberOfPlanets ?
                        <p><strong>Number of planets:</strong> {star.numberOfPlanets} </p> : ""}
                    </div>
                ))
            );
        } else {
            return(
                <div className="stars-row">No stars found.</div>
            );
        }
    }

    //print pagination - prints the pagination and "buttons" (spans) for navigation
    printPagination = () => {
      if(this.props.stars.length>0){
        return(
          <div className="pagination">
            <span onClick={() => this.props.changePage(0)} className="pagination-item">First</span>
            <span onClick={() => this.props.changePage(this.props.currentPage-1)} className="pagination-item">Prev</span>
            <span className="pagination-current"><strong>{this.props.currentPage + 1}</strong></span>
            <span onClick={() => this.props.changePage(this.props.currentPage+1)} className="pagination-item">Next</span>
            <span onClick={() => this.props.changePage(this.props.pageInfo.totalPages-1)} className="pagination-item">Last</span>
          </div>
        );
      }
    }

    //render function calls printStars and printPagination
    render() {
        return (
            <div className="grid-item2">
                <h3 className="title">Star Systems</h3>
                <div className="stars-listing">
                  {this.printStars()}
                  {this.printPagination()}
                </div>
            </div>
        );
  }
}
