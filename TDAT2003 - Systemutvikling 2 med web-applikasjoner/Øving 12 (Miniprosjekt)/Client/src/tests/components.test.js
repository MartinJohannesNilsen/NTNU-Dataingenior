import React from 'react';
import ReactDOM from 'react-dom';

//Import components we would like to test
import Navbar from '../Components/Navbar/Navbar';
import Livefeed from '../Components/Livefeed/Livefeed';
import HomeStructure from '../Components/HomeStructure/HomeStructure';
import CategoryStructure from '../Components/CategoryStructure/CategoryStructure';
import ArticleStructure from '../Components//ArticleStructure/ArticleStructure';
import RegSak from '../Components/NewArticle/RegSak';
import EndreSakRedirect from '../Components/EditArticle/EndreSakRedirect';
import SlettSak from '../Components/DeleteArticle/SlettSak';
import EndreSak from '../Components/EditArticle/EndreSak';
import ToTop from '../Components/ToTop/ToTop';

test('Navbar renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navbar />, div);
});

test('Livefeed renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Livefeed />, div);
});

test('Homestructure renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HomeStructure />, div);
});

test('RegSak renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegSak />, div);
});

test('SlettSak renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SlettSak />, div);
});

test('ToTop renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ToTop />, div);
});


//De neste komponentene har this.props.match.params.id som må tas hensyn til
test('CategoryStructure renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        match: { params: { id: 1 } },
    };
    ReactDOM.render(<CategoryStructure {...props} />, div);
});

test('ArticleStructure renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        match: { params: { id: 1 } },
    };
    ReactDOM.render(<ArticleStructure {...props} />, div);
});

test('EndreSakRedirect renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        match: { params: { id: 1 } },
    };
    const params = {id: 1};
    ReactDOM.render(<EndreSakRedirect {...props} />, div);
});

test('EndreSak renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        match: { params: { id: 1 } },
    };
    ReactDOM.render(<EndreSak {...props} />, div);
});

