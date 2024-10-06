import React from 'react'
import {Link} from "react-router-dom"

const NewsItem = (props) =>{

    let {title, description, urlToImage, url, author, publishedAt} = props
    return (
      <div>
       <div className="card my-5" >
            <div className='badges' style={{display: 'flex',
                position: 'absolute',
                right: '0%',
                justifyContent: 'flex-end'}}>
              <span className=" badge rounded-pill bg-danger" >
                    {props.source.name === '[Removed]'? 'Censored' : props.source.name}
              </span>
            </div>
            
            <img src={urlToImage} className="card-img-top" alt=""/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
                <Link to={url} target='_blank' className="btn btn-primary">Read More</Link>
            </div>
        </div>
      </div>
    )
 
}

export default NewsItem
