import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

 const App = () => {
 
  const apikey = process.env.REACT_APP_API_KEY;

  const [progress, setProgress] = useState(0)

    return(
      <div>
        <Router>
          <NavBar/>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route  path="/" element = {<News setProgress={setProgress} apikey={apikey} key = "home" pageSize={5} category="general"/>}/>
            <Route  path="/home" element = {<News setProgress={setProgress}apikey={apikey} key = "home" pageSize={5} category="general"/>}/>
            <Route  path="/general" element = {<News setProgress={setProgress} apikey={apikey} key = "general" pageSize={5} category="general"/>}/>
            <Route  path="/business" element = {<News setProgress={setProgress}apikey={apikey} key = "business" pageSize={5} category="business"/>} />
            <Route  path="/entertainment" element = {<News setProgress={setProgress}apikey={apikey} key = "entertainment" pageSize={5} category="entertainment"/>} />
            <Route  path="/science" element = {<News setProgress={setProgress} apikey={apikey} key = "science" pageSize={5} category="science"/>} />
            <Route  path="/health" element = {<News setProgress={setProgress}apikey={apikey} key = "health" pageSize={5} category="health"/>}/>
            <Route  path="/technology" element = {<News setProgress={setProgress}apikey={apikey} key = "technology" pageSize={5} category="technology"/>}/>
            <Route  path="/sports" element = {<News setProgress={setProgress} apikey={apikey} key = "sports" pageSize={5} category="sports"/>} />
          </Routes>
        </Router>
        
      </div>
    )

}

export default App;