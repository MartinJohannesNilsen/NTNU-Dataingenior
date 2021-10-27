// @flow

import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/HomeStructure.css";
import {sakService, sak} from '../Service/service';
import Footer from '../Footer/Footer'
import serverFail from '../../img/serverFail.jpg';
import plainWhite from '../../img/plainWhite.jpg';

type Props = {
}

type State = {
    nyhetssakerHome: any,
    length: number
}

class HomeStructure extends Component<Props, State>{
    constructor(props: void){
        super(props);
        this.state = {
            nyhetssakerHome: [{bilde: plainWhite}],
            length: 15
        };
    }
    
    render(){
        return(
            <div class="Structure">
                <div class="marginTop"></div>
                <div class="grid-struct-container">
                    <div class="grid-struct">
                        <div id="main-article" onClick={() => window.location.href='#/sak/'+this.state.nyhetssakerHome[0].id}>
                            <MainArticleCard id={this.state.nyhetssakerHome[0].id} imgLink={this.state.nyhetssakerHome[0].bilde} title={this.state.nyhetssakerHome[0].overskrift}/>
                        </div>
                        {this.state.nyhetssakerHome.slice(1,this.state.length).map(sak => (
                            <div class="Article card" onClick={() => window.location.href = "#/sak/"+ sak.id}>
                                <ArticleCard id={sak.id} imgLink={sak.bilde} title={sak.overskrift} />
                            </div>
                        ))}
                    </div>
                </div>
                {this.state.nyhetssakerHome.length > this.state.length && 
                    <div id="getMoreArticlesButton">
                        <button type="button" class="btn btn-light" onClick={() => this.setState({length: this.state.length+6})}>Last inn eldre saker</button>
                    </div> 
                }
                <Footer />
            </div>
        )
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        sakService.getSakerMedViktighet1().then(saker => this.setState({nyhetssakerHome: saker})).catch(error => console.error(error.message));
    }
}

type ArticleProps = {
    id: number,
    imgLink: string,
    title: any
}

class ArticleCard extends Component<ArticleProps>{
    render(){
        return(
            <div>
                <img id="article-img" src={this.props.imgLink} alt={"Bilde som illustrerer nyhetssaken: " + this.props.title}/>
                <a id="article-text" href={"#/sak/"+this.props.id}><h3>{this.props.title}</h3></a>
            </div>
        );
    }
}

class MainArticleCard extends Component<ArticleProps> {
    render() {
        return(
            <div className="MainArticle card">
                <img className="mainImg" src={this.props.imgLink} alt={"Bilde som illustrerer nyhetssaken: " + this.props.title}/>
                <a id="article-text" href={"#/sak/"+this.props.id}><h3>{this.props.title}</h3></a>
            </div>
        );
    }
}

export {ArticleCard, MainArticleCard};
export default HomeStructure;