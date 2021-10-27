import React, {Component} from "react";
import "./ArticleStructure.css";
import Article from "../Article/Article";
import MainArticle from '../MainArticle/MainArticle';

class ArticleStructure extends Component<>{
    render(){
        return(
            <div class="grid-struct-container">
                <div class="grid-struct">
                    <div id="main-article">
                        <MainArticle name="kaffe_1.jpg" title="Brasiliansk kaffe kåret til verdens beste"/>
                    </div>
                    <Article title="Norge har bursdag" />
                    <Article title="17. mai avlyst"/>
                </div>
            </div>
        )
    }
}

export default ArticleStructure;