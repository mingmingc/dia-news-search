import React from 'react';

const NewsApp = (props) => {
    return(
        <div> 
            {/* Nav with search - live update no button reqd & sort: date, relevance, popularity or none */}
            <div className="navbar bg-info"> 
                <form className="form-inline"> 
                    <input className="form-control w-auto" type="search" placeholder="Search for a topic" aria-label="Search"></input>
                </form>
            </div>
            {/* Results: 1-column for mobile, 2-col all other devices */}
            {/* Card w/ props:
                image
                title
                publish date
                description 
                url (as 'Read More' button)  */}
        {/* Pagination? Infinite scroll? --how many per page? */}
        </div>
    ) 
}

export default NewsApp;