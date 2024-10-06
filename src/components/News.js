import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import news from './news.png'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) =>{


    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const capitalize = (string) => {
        return (string.charAt(0).toUpperCase() + string.slice(1))
    }


    const updateNews = async () => {

        props.setProgress(10);
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
        props.setProgress(30);
        let response = await fetch(url)
        let parsedData = await response.json();
        setTotalResults(parsedData.totalResults)
        props.setProgress(60);
        setArticles(parsedData.articles)

        // let parsedData = finalData.articles.filter((article) => {
        //     return article.title!=="[Removed]" && article.description!=="[Removed]";
        // });

        // let wrongData = finalData.articles.filter((article) => {
        //     return article.title==="[Removed]" || article.description==="[Removed]";
        // });
        
        // setHasMore(parsedData.length < finalData.totalResults);
        // setNotArticles(notArticles.concat(wrongData));
        // setArticles(articles.concat(parsedData));
        // setTotalResults(finalData.totalResults);
        // console.log("updateNews: ",finalData.totalResults);
        // console.log(articles);
        // console.log(notArticles);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `NewsMonkey - ${capitalize(props.category)}`;
        updateNews();
        // eslint-disable-next-line 
    },[])


    const fetchMoreData = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pagesize=${props.pageSize}`;
        setPage(page+1)
        let response = await fetch(url)
        let parsedData = await response.json();
        
        // let parsedData = finalData.articles.filter((article) => {
        //     return article.title!=="[Removed]" && article.description!=="[Removed]"
        // });
        
        // let wrongData = finalData.articles.filter((article) => {
        //     return article.title==="[Removed]" || article.description==="[Removed]"
        // });
        // setNotArticles(notArticles.concat(wrongData));
        // setArticles(articles.concat(parsedData));
        
        // console.log(articles.length+notArticles.length);
        // console.log('',notArticles.length)
        // setPage(page+1);
        // setHasMore(articles.length+notArticles.length < totalResults);

        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
    }

    return (
        <>
            <h1 className='text-center' style={{marginTop : '100px'}}>{`NewsMonkey's Top Headlines - ${capitalize(props.category)}`}</h1>
            {loading &&<Spinner/>}
            
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
            >
                
            <div className='container'>
            <div className='row'>
                {articles.map((element, index) => {
                    return (
                        
                        <div className='col-md-4' key={index}>
                            <NewsItem title={element.title !== "[Removed]"? element.title : "Censored"} description={element.description === "[Removed]" ? "Follow the link to read more..." : element.description} urlToImage={element.urlToImage ? element.urlToImage : news} url={element.url}
                                author={element.author} publishedAt={element.publishedAt} source={element.source} />
                        </div>
                    )
                })}

            </div>
            </div>
            </InfiniteScroll>

        </>
    )
}


News.defaultProps = {
    category: "general",
    pageSize: 5
}

News.propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number
};

export default News