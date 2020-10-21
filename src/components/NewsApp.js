import React, {useState} from 'react';
//React-bootstrap dependencies
import Container from 'react-bootstrap/Container';
//Search bar dependencies
import Button from 'react-bootstrap/Button'; 
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
//Results dependencies
import Card from 'react-bootstrap/Card';

const NewsApp = () => {
    //initialize state 
    const [searchQuery, setSearch] = useState("");
    const [selectedSort, setSort] = useState("");
    const [results, setResults] = useState([]);

    //key for .map() to display each article
    let articleKey = 0;

    const handleSearch = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearch(value);
    }

    const handleSort = (val) => {
        setSort(val);
        fetchResult();
    }

    const submitSearch = (e) => {
        e.preventDefault();
        fetchResult();
    }

    const fetchResult = () => {
        const encodedSearchQuery = encodeURIComponent(searchQuery.toLowerCase()); //take user input & encode expression into URL format
        const url = `http://newsapi.org/v2/everything?q=${encodedSearchQuery}&sortBy=${selectedSort}&apiKey=${process.env.REACT_APP_.API_KEY}`
        console.log(url);
        fetch(url) 
            .then(res => res.json())
            .then(res => setResults(res.articles));
    }

    const getKey = () => {
        articleKey++;
        return articleKey;
    }

    return(
        <div> 
            {/* Nav with search, sort dropdown: date, relevance, popularity or none & BUTTON */}
            <Container fluid>
                <div className="navbar bg-info" id="search"> 
                    <form className="form-inline"> 
                        <input onChange={handleSearch} className="form-control w-auto mr-2" type="search" placeholder="Search for a topic" aria-label="Search"></input>
                        <DropdownButton onSelect={handleSort} className="mx-2" id="dropdown-basic-button" title="Sort by">
                            <Dropdown.Item eventKey="publishedAt">Date Published</Dropdown.Item>
                            <Dropdown.Item eventKey="relevancy">Relevance</Dropdown.Item>
                            <Dropdown.Item eventKey="popularity">Popularity</Dropdown.Item>
                        </DropdownButton>
                        <Button onClick={submitSearch} type="submit" name="search" aria-label="Search Button">Search</Button>
                    </form>
                </div>
            </Container>
            {/* Results: 1-column for mobile, 2-col all other devices */}
            <div id="results"> 
                {results.map(article => (
                    <Card key={getKey()} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={article.urlToImage} />
                        <Card.Body>
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Text>{article.description}</Card.Text>
                            <Card.Text>by {article.author}</Card.Text>
                            <Card.Text>Published at: {new Date(article.publishedAt).toLocaleDateString()}</Card.Text>
                            <Button variant="primary" href={article.url} target="_blank">Read more</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        {/* Pagination? Infinite scroll? --how many per page? */}
        </div>
    ) 
}

export default NewsApp;