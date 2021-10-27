// @flow

import React, {Component} from "react";
import {sakService, sak} from '../Service/service';
import Footer from '../Footer/Footer';
import { MainArticleCard, ArticleCard } from '../HomeStructure/HomeStructure';
import serverFail from '../../img/serverFail.jpg';
import plainWhite from '../../img/plainWhite.jpg';

type CSProps = {
    match: {params: {id:string}},
    id: number,
    imgLink: string,
    title: string
}

type State = {
    nyhetssaker: any,
}

class CategoryStructure extends Component<CSProps, State>{
    constructor(props: void){
        super(props);
        this.state = {
            nyhetssaker: [{
                bilde: plainWhite, 
                overskrift: "", 
                id: ""
            }]
        };
    }

    render(){
        return(
            <div class="Structure">
                <div class="grid-struct-container">
                    <div class="grid-struct">
                        <div id="main-article" onClick={() => window.location.href='#/sak/'+this.state.nyhetssaker[0].id}>
                            <MainArticleCard id={this.state.nyhetssaker[0].id} imgLink={this.state.nyhetssaker[0].bilde} title={this.state.nyhetssaker[0].overskrift}/>
                        </div>
                        {this.state.nyhetssaker.slice(1,this.state.nyhetssaker.length).map(sak => (
                            <div class="Article card" onClick={() => window.location.href = "#/sak/"+ sak.id}>
                                <ArticleCard id={sak.id} imgLink={sak.bilde} title={sak.overskrift} />
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    componentDidUpdate(prevProps: any){
        if(this.props.match.params.id !== prevProps.match.params.id){
            window.scrollTo(0, 0);
            sakService.getSakerMedKategori(this.props.match.params.id).then(saker => this.setState({nyhetssaker: saker})).catch(error => console.error(error.message));
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        sakService.getSakerMedKategori(this.props.match.params.id).then(saker => this.setState({nyhetssaker: saker})).catch(error => console.error(error.message));
    }
}

export default CategoryStructure;