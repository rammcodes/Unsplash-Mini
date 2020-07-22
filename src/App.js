import React from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import './App.scss'

const a_key = '7qFqXqdVBW22Oy6td1SFmp2EWCVcyonNbtWYWj6jtpE'
// const s_key = 's4WRw6CbxocYLTImRvpGWPLoQv8EbTCYyq1mQj5iWdc'

class App extends React.Component {
  state = {
    items: [],
    currPage: 1,
    perPage: 10,
    pagLoader: false,
    searchLoader: false,
    searchTerm: '',
    finalSearchTerm: '',
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    axios
      .get(
        `https://api.unsplash.com/photos/?page=${this.state.currPage}&per_page=${this.state.perPage}&client_id=${a_key}`
      )
      .then((res) => {
        this.setState({
          items: [...this.state.items, ...res.data],
          pagLoader: false,
          searchLoader: false,
        })
      })
  }

  loadSearchData = () => {
    axios
      .get(
        `https://api.unsplash.com/search/photos/?query=${this.state.finalSearchTerm}&page=${this.state.currPage}&per_page=${this.state.perPage}&client_id=${a_key}`
      )
      .then((res) => {
        this.setState({
          items: [...this.state.items, ...res.data.results],
          pagLoader: false,
          searchLoader: false,
        })
      })
  }

  onPageCountInc = () => {
    this.setState({
      currPage: this.state.currPage + 1,
    })
  }

  onSearchInput = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  onSearch = () => {
    this.setState({
      finalSearchTerm: this.state.searchTerm,
      currPage: 1,
      items: [],
      searchLoader: true,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currPage !== this.state.currPage ||
      prevState.finalSearchTerm !== this.state.finalSearchTerm
    ) {
      if (prevState.currPage !== this.state.currPage) {
        this.setState({
          pagLoader: true,
        })
      }
      if (this.state.finalSearchTerm.length) {
        this.loadSearchData()
      } else {
        this.loadData()
      }
    }
  }

  render() {
    return (
      <div className="app">
        <header className="topbar">
          <div className="search-cont">
            <input
              placeholder="Search for images..."
              type="text"
              className="search"
              value={this.state.searchTerm}
              onChange={this.onSearchInput}
            />
            {this.state.searchLoader ? (
              <button>
                <Loader type="Oval" color="#fff" height={20} width={20} />
              </button>
            ) : (
              <button onClick={this.onSearch}>
                <img src={require('./assets/search-1.png')} alt="search" />
              </button>
            )}
          </div>
        </header>

        {!this.state.items.length ? (
          this.state.finalSearchTerm.length ? (
            <div className="no-res-cont">
              <img
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  width: '500px',
                  transform: 'translate(-50%,-50%)',
                }}
                src={require('./assets/no-res.png')}
                alt="no-result"
              />
            </div>
          ) : (
            <div className="">Loading...</div>
          )
        ) : (
          <>
            <div
              style={{
                width: '90%',
                maxWidth: '1200px',
                margin: ' 200px auto 100px auto',
              }}
              className="container"
            >
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 200: 1, 480: 2, 900: 3 }}
              >
                <Masonry gutter="20px">
                  {this.state.items.map((item, idx) => (
                    <div key={idx} className="img-cont">
                      <img
                        style={{ width: '100%' }}
                        src={item.urls.regular}
                        alt="img"
                      />
                      <div className="img-ovr">.</div>
                    </div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </div>
            <div className="pag">
              {this.state.pagLoader ? (
                <Loader type="Oval" color="#ccc" height={60} width={60} />
              ) : (
                <button onClick={this.onPageCountInc}>Load More</button>
              )}
            </div>
          </>
        )}
      </div>
    )
  }
}

export default App

// if (prevState.finalSearchTerm !== this.state.finalSearchTerm) {
//   this.setState({
//     searchLoader: true,
//     items: [],
//   })
//   if (this.state.searchTerm.length) {
//     this.loadSearchData()
//   } else {
//     this.loadData()
//   }
// }