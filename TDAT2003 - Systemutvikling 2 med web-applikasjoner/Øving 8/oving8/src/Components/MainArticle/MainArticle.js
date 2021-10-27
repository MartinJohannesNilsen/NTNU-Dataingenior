import React, {Component} from 'react';
import './MainArticle.css';

class MainArticle extends Component<> {

    render() {
        return(
            <div className="MainArticle card">
                <img className="mainImg" src={require("../../assets/images/" + this.props.name)} alt="image to the article" />
                <a href="#"><h3>{this.props.title}</h3></a>
            </div>
        );
    }
}

export default MainArticle;