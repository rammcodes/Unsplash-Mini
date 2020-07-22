import React from 'react'
import Loader from 'react-loader-spinner'

const Header = (props) => {
  return (
    <header className="topbar">
      <div className="search-cont">
        <input
          placeholder="Search for images..."
          type="text"
          className="search"
          value={props.searchTerm}
          onChange={props.onSearchInput}
        />
        {props.searchLoader ? (
          <button>
            <Loader type="Oval" color="#fff" height={20} width={20} />
          </button>
        ) : (
          <button onClick={props.onSearch}>
            <img src={require('../assets/search-1.png')} alt="search" />
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
