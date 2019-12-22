class Search extends React.Component {
  //render function - renders the search bar on top and calls functions via props for searches, filter and clearing.
  render() {
    return (
        <div className="grid-item1">
            <form onSubmit={this.props.searchStars}>
              <input name="search" id="search" type="text" className="search-input" placeholder="Search star system by name..." />
              <input type="submit" className="search-submit" value="Search" />
            </form>
            <button onClick={() => this.props.filterStarsWithPlanets()} className="search-submit">Filter stars with planets by distance</button>
            <button
                onClick={() => {
                    this.props.clearSearch();
                    document.getElementById('search').value="";
                }}
                className="search-cancel">
                  Reset Search and Filter
                </button>

        </div>);
  }
}
