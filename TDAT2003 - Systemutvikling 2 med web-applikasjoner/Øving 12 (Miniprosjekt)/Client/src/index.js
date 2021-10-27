// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import '././css/index.css'

import Navbar from '../src/Components/Navbar/Navbar'
import Livefeed from '../src/Components/Livefeed/Livefeed'
import HomeStructure from '../src/Components/HomeStructure/HomeStructure';
import CategoryStructure from './Components/CategoryStructure/CategoryStructure';
import ArticleStructure from '../src/Components//ArticleStructure/ArticleStructure'
import RegSak from '../src/Components/NewArticle/RegSak'
import EndreSakRedirect from '../src/Components/EditArticle/EndreSakRedirect'
import SlettSak from '../src/Components/DeleteArticle/SlettSak'
import EndreSak from './Components/EditArticle/EndreSak'
import ToTop from './Components/ToTop/ToTop'


ReactDOM.render(
    <HashRouter>
        <div class = "website">
            <Navbar />
            <Livefeed />
            <ToTop />
            <Route exact path="/" component={HomeStructure} />
            <Route exact path="/kat/:id" component={CategoryStructure} />
            <Route exact path="/sak/:id" component={ArticleStructure} />
            <Route exact path="/RegSak" component={RegSak} />
            <Route exact path="/EndreSak" component={EndreSakRedirect} />
            <Route exact path="/EndreSak/:id" component={EndreSak} />
            <Route exact path="/SlettSak" component={SlettSak} />
        </div>
    </HashRouter>
    , (document.getElementById('root'):any));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
