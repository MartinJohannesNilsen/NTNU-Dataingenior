// @flow

import React, {Component} from "react"
import "../../css/ArticleStructure.css"
import {sakService, sak, kommentar} from '../Service/service'
import Footer from '../Footer/Footer'
import editArticle from '../../img/editArticle.png'
import deleteArticle from '../../img/deleteArticle.png'

type ACProps = {
  id: number,
  tidspunkt: string,
  innhold: string,
  bilde: string,
  overskrift: string,
  bildetekst: string,
  forfatter: string,
  dato: string
}

class ArticleComponent extends Component<ACProps> {
  render() {
    let id  = this.props.id;
    let tidString = JSON.stringify(this.props.tidspunkt);
    let innholdString = JSON.stringify(this.props.innhold);

    function tidSubstring():any {
      if(tidString !== undefined){
        return tidString.substr(1,5);
      } 
    }

    function innholdArray():any {
      if(innholdString !== undefined){
        return innholdString.substr(1,innholdString.length-2).split("\\n");
      } 
    }

    function onDeleteClick() {
      if (window.confirm('Er du sikker på at du vil slette denne saken?')){
        sakService.slettSak(id);
        setTimeout(function() {window.location.href = "#/"; window.location.reload()}, 1000);
      }
    }

    return (
      <div class="background">
        <div class = "grid-container-article">
          <div class="editIcon">
            <a href={"/#/EndreSak/"+this.props.id}><img src={editArticle} width="28" height="28" alt="endre-sak-ikon" id="editArticleIconInArticleStructure"></img></a>
            <a onClick={onDeleteClick}><img src={deleteArticle} width="30" height="30" alt="slett-sak-ikon" id="deleteArticleIconInArticleStructure"></img></a>
          </div>
          <div class = "bilde">
            <img class = "tittelBilde" src={this.props.bilde} alt={this.props.overskrift}></img>
            <a>{this.props.bildetekst}</a>
          </div>
          <div class = "overskrift">
            <h1>{this.props.overskrift}</h1>
          </div>
          <div class = "info">
            <p><strong>Publisert av:</strong> {this.props.forfatter}</p>
            <p><strong>Dato:</strong> {this.props.dato + " kl: " + tidSubstring()}</p>
          </div>
          <div class="avsnitt">
              {innholdArray().map(avsnitt => (
                <div class="avsnittsOppdeling">
                  <a>{avsnitt}</a>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}

//Må sette disse til any da jeg får feil om jeg bruker sak[] og kommentar[], på grunn av at jeg må fylle state sin nyhetssak og kommentar med noe ved initialisering. Dette må jeg på grunn av rendering før mounting. 
type State = {
  nyhetssak: any,
  kommentar: any
};

type ASProps = {
  match: {params: {id: number}}
} 

class ArticleStructure extends Component<ASProps, State>{
  constructor(props:void) {
    super(props);
    this.state = {
      nyhetssak: [{
        innhold: ""
      }],
      kommentar: [{
        kommentar: ""
      }]
    };

    this.onSendClick = this.onSendClick.bind(this);
  }  

  render(){
      return(
        <div>
          <div>
            <ArticleComponent
              id={this.state.nyhetssak[0].id}
              overskrift={this.state.nyhetssak[0].overskrift}
              forfatter={this.state.nyhetssak[0].forfatter}
              innhold={this.state.nyhetssak[0].innhold}
              bilde={this.state.nyhetssak[0].bilde}
              tidspunkt={this.state.nyhetssak[0].tidspunkt}
              dato={this.state.nyhetssak[0].dato}
              kategori={this.state.nyhetssak[0].kategori}
              bildetekst={this.state.nyhetssak[0].bildetekst}
              kommentarArray={this.state.kommentar}      
            />
          </div>
          <div class="kommentarfelt">
            <div class="kommentarfeltKomponent">
              <div class="comment-wrapper">
                  <div class="panel panel-info">
                    <div class="panel-heading">
                      Kommentarfelt
                    </div>
                    <div class="panel-warning">
                      Vi oppfordrer til saklighet i kommentarfeltet!
                    </div>
                    <div class="panel-body">
                      <input type="text" class="form-control" id="forfatterInput" placeholder="Skriv inn navnet ditt ..."/>
                      <textarea type="text" class="form-control" id="kommentarInput" placeholder="Skriv en kommentar ..." rows="3"></textarea>
                      <br />
                      <button type="button" class="btn btn-info pull-right" onClick={e => this.onSendClick(e)}>Send</button>
                      <div class="clearfix"></div>
                      <hr />
                      <div id="kommentarer">
                        <ul class="media-list">
                          {this.state.kommentar.map(kommentar => (
                            <li class="media">
                            <div class="media-body">
                                <span class="text-muted pull-right">
                                    <small class="text-muted">{kommentar.datoOgTidspunkt}</small>
                                </span>
                                <strong class="text-info"> {kommentar.forfatter}</strong>
                                <p>
                                  {kommentar.kommentar}
                                </p>
                                <hr />
                            </div>
                          </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )
    }

    onSendClick:function = event => {
      let forfatterInputElement:any = document.getElementById("forfatterInput");
      let kommentarInputElement:any = document.getElementById("kommentarInput");

      let forfatterInput:string = forfatterInputElement.value;
      let kommentarInput:string = kommentarInputElement.value; 
      let nyKommentar:any = new kommentar(this.props.match.params.id, forfatterInput, kommentarInput);
      let kommentarArray:any = this.state.kommentar;
      let now:any = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      if(hours < 10){hours = "0" + hours;};
      if(minutes < 10){minutes = "0"+minutes;};
      let tidspunkt:string = hours+":"+minutes;
      let dato:string = ("0" + now.getDate()).slice(-2)+"."+("0" + (now.getMonth() + 1)).slice(-2)+"."+now.getFullYear().toString().substr(-2);
      let datoOgTidspunkt:string = dato + " - " + tidspunkt; 

      kommentarArray.unshift({
        nyhetssakID: this.props.match.params.id,
        datoOgTidspunkt: datoOgTidspunkt,
        forfatter: forfatterInput,
        kommentar: kommentarInput
      })

      this.setState({kommentar: kommentarArray})
      sakService.opprettKommentar(nyKommentar).then((response) => console.log("Det gikk bra å legge inn i databasen")).catch(error => console.error(error.message));
      forfatterInputElement.value = "";
      kommentarInputElement.value = "";
    }

    componentDidMount(){
      window.scrollTo(0, 0);
      sakService.getSakMedID(this.props.match.params.id).then(sak => this.setState({nyhetssak: sak})).catch(error => console.error(error.message));
      sakService.getKommentarMedNyhetssakID(this.props.match.params.id).then(kommentar => {if(kommentar.length !== 0){this.setState({kommentar: kommentar})}}).catch(error => console.error(error.message));  
    }

    componentDidUpdate(prevProps: any){
      if(this.props.match.params.id !== prevProps.match.params.id){
        window.scrollTo(0, 0);
        sakService.getSakMedID(this.props.match.params.id).then(sak => this.setState({nyhetssak: sak})).catch(error => console.error(error.message));
        sakService.getKommentarMedNyhetssakID(this.props.match.params.id).then(kommentar => {this.setState({kommentar: kommentar})}).catch(error => console.error(error.message));  
      }
    }

}

export default ArticleStructure;