import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Loader from 'react-loader-spinner'

const Main = (props) => {
  return (
    <>
      <div className="container">
        <ResponsiveMasonry columnsCountBreakPoints={{ 200: 1, 480: 2, 900: 3 }}>
          <Masonry gutter="20px">
            {props.items.map((item, idx) => (
              <div key={idx} className="img-cont">
                <img src={item.urls.regular} alt="img" />
                <div className="img-ovr">.</div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <div className="pag">
        {props.pagLoader ? (
          <Loader type="Oval" color="#ccc" height={60} width={60} />
        ) : props.finalSearchTerm.length ? (
          props.currPage < props.totalPages ? (
            <button onClick={props.onPageCountInc}>Load More</button>
          ) : (
            <h5>End of Results!</h5>
          )
        ) : (
          <button onClick={props.onPageCountInc}>Load More</button>
        )}
      </div>
    </>
  )
}

export default Main
