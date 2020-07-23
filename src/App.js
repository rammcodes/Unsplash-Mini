import React from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import Header from './components/Header'
import Main from './components/Main'
import './App.scss'

const a_key = '7qFqXqdVBW22Oy6td1SFmp2EWCVcyonNbtWYWj6jtpE'

class App extends React.Component {
  state = {
    items: null,
    currPage: 1,
    perPage: 10,
    pagLoader: false,
    searchLoader: false,
    searchTerm: '',
    finalSearchTerm: '',
    totalPages: null,
    fullScreenImg: null,
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
          items:
            this.state.items === null
              ? [...res.data]
              : [...this.state.items, ...res.data],
          pagLoader: false,
          searchLoader: false,
          totalPages: null,
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
          items:
            this.state.items === null
              ? [...res.data.results]
              : [...this.state.items, ...res.data.results],
          pagLoader: false,
          searchLoader: false,
          totalPages: res.data.total_pages,
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
    if (this.state.searchTerm === this.state.finalSearchTerm) {
      return null
    }

    this.setState({
      finalSearchTerm: this.state.searchTerm,
      currPage: 1,
      items: null,
      searchLoader: true,
      totalPages: null,
    })
  }

  setFullScreenImage = (url) => {
    this.setState({
      fullScreenImg: url,
    })
  }

  UnsetFullScreenImage = (e) => {
    console.log('by', e)
    this.setState({
      fullScreenImg: null,
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
        <Header
          searchTerm={this.state.searchTerm}
          onSearchInput={this.onSearchInput}
          searchLoader={this.state.searchLoader}
          onSearch={this.onSearch}
        />
        {this.state.fullScreenImg ? (
          <div onClick={this.UnsetFullScreenImage} className="full-img">
            <img src={this.state.fullScreenImg} alt="fullImage" />
          </div>
        ) : null}

        {this.state.items === null ? (
          <div className="main-loader-cont">
            <Loader type="Oval" color="grey" height={50} width={50} />
          </div>
        ) : !this.state.items.length ? (
          <div className="no-res-cont">
            <img src={require('./assets/no-res.png')} alt="no-result" />
          </div>
        ) : (
          <Main
            items={this.state.items}
            pagLoader={this.state.pagLoader}
            finalSearchTerm={this.state.finalSearchTerm}
            currPage={this.state.currPage}
            totalPages={this.state.totalPages}
            onPageCountInc={this.onPageCountInc}
            setFullScreenImage={this.setFullScreenImage}
          />
        )}
      </div>
    )
  }
}

export default App
