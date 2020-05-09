import React, { Component } from 'react'
import { ReactiveBase,
         DataSearch,
         SingleRange,
         MultiRange,
         MultiDataList,
         ResultList,
         ReactiveList } from '@appbaseio/reactivesearch'
import { Row,
         Col } from 'react-bootstrap'
import Books from './../images/bookshelf1.png' 
import './styles.css'

const { ResultListWrapper } = ReactiveList;

class MainPage extends Component {

    render() {
        return (
            <div className='main-page'>
                <ReactiveBase app='books-data' credentials='d6eocVSSG:19e0d3ee-f015-4b41-9929-17d54b920150' 
                theme={{
                    typography: {
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',fontSize: "16px"
                    },
                    colors: {
                        textColor: "#fff",
                        backgroundColor: "#212121",
                        primaryTextColor: "#fff",
                        primaryColor: "#2196F3",
                        titleColor: "#fff",
                        alertColor: "#d9534f",
                        borderColor: "#666"
                    }
                }}>
                    <Row className='main-row'>
                        <Col sm={2} className='column'>
                            <div>
                                <img src={Books} alt='BOOKS' className='sticky-top'/>
                            </div>
                            <SingleRange
                                componentId='setRating'
                                dataField='average_rating'
                                data={
                                    [{"start": 4, "end": 5, "label": "4 and up"},
                                    {"start": 3, "end": 5, "label": "3 and up"},
                                    {"start": 2, "end": 5, "label": "2 and up"},
                                    {"start": 0, "end": 2, "label": "Less than 2"}]
                                }
                                title='Ratings'
                                className='ratings mt-3'
                                react={{
                                    and: ['setPages', 'language-list', 'main-search', 'searchResult']
                                }}
                                innerClass={{
                                    title: "title-text text-uppercase",
                                }}/>
                            <MultiRange
                                componentId='setPages'
                                dataField='num_pages'
                                data={
                                    [{start: 0, end: 500, label: "0 - 500"},
                                     {start: 500, end: 1000, label: "500 - 1000"},
                                     {start: 1000, end: 2000, label: "1000+"}]}
                                title='Pages'
                                className='ratings mt-3'
                                react={{
                                    and: ['setRating', 'language-list', 'main-search', 'searchResult']
                                }}
                                innerClass={{
                                    title: "title-text text-uppercase",
                                }}/>
                            <MultiDataList
                                componentId="language-list"
                                dataField="language_code"
                                className="ratings mt-3"
                                title="Languages"
                                sortBy="asc"
                                queryFormat="or"
                                selectAllLabel="All Languages"
                                placeholder="Language search"
                                data={[
                                    {label: "English", value: "en"},
                                    {label: "English(US)", value: "en-US"},
                                    {label: "English(UK)", value: "en-GB"},
                                    {label: "German", value: "ger"},
                                    {label: "Spanish", value: "spa"},
                                    {label: "French", value: "fre"},
                                    {label: "Portugese", value: "por"},
                                    {label: "Japanese", value: "jpn"},
                                    {label: "Greek", value: "grc"}
                                ]}
                                react={{
                                    and: ['setPages', 'setRating', 'main-search', 'searchResult']
                                }}
                                innerClass={{
                                    title: "title-text text-uppercase",
                                }}/>
                        </Col>
                        <Col sm={10}>
                            <DataSearch 
                                componentId="main-search"
                                dataField={['title', 'authors']} 
                                placeholder='Search for books...'
                                showIcon={false}
                                className='m-5 sticky-top search-bar'/>   
                            <ReactiveList
                                react={{
                                    "and": ["language-list", "setRating", "setPages", 'searchResult']
                                }}
                                componentId="searchResult"
                                pagination={true}
                                paginationAt="bottom"
                                size={6}
                                pages={5}>
                                {({ data, error, loading }) => (
                                    <ResultListWrapper>
                                        {data.map(item => (
                                            <ResultList key={item._id}>
                                                <ResultList.Content>
                                                    <ResultList.Title
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.title
                                                        }}/>
                                                    <ResultList.Description>
                                                        <div>
                                                            <div>by {item.authors}</div>
                                                            <div>Rating: {item.average_rating}/5</div>
                                                        </div>
                                                        <span>Published on: {item.publication_date}</span>
                                                    </ResultList.Description>
                                                </ResultList.Content>
                                            </ResultList>
                                            ))}
                                    </ResultListWrapper>
                                    )}
                            </ReactiveList>
                        </Col>
                    </Row>
                </ReactiveBase>
            </div>
        )
    }
}

export default MainPage;