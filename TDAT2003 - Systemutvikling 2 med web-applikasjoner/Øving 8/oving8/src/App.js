import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Livefeed from './Components/Livefeed/Livefeed'
import Navbar from "./Components/Navbar/Navbar"
import MainArticle from './Components/MainArticle/MainArticle'
import Article from "./Components/Article/Article"
import ArticleStructure from "./Components/ArticleStructure/ArticleStructure"

class App extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Livefeed />
                <ArticleStructure />
            </div>
        );
    };
}

export default App;

