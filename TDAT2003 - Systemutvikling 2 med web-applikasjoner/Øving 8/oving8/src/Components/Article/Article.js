import React, {Component} from "react"
import "./Article.css"

class Article extends Component{
    render(){
        return(
            <div class="article-box card">
                <img id="article-img" src="https://ap.mnocdn.no/images/af26e7d7-8532-498c-9ddc-497d1e62ce1b?fit=crop&h=326&q=80&w=580" alt="Leverpostei er fortsatt godt med agurk fra sia :)"/>
                <a href="#"><h3>{this.props.title}</h3></a>
            </div>
        );
    }
}

export default Article;