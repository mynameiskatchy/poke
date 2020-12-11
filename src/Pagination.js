import React from 'react'

export default function Pagination(goToNextPage, goToPrevPage) {
    return (
        <div>
            <button onClick={goToPrevPage}>Previous</button>
            <button onClick={goToNextPage}>Next</button>
        </div>
    )
}
