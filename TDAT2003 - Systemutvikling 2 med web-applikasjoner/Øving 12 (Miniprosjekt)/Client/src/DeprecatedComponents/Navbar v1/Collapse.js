
import React, {Component} from 'react';

    /*
    Har måttet flytte denne komponentens innhold direkte inn i Nav da jeg vil kunne
    lukke collapsen med nav's metode "toggle()" hver gang en trykker på en link i collapsemenyen.
    Denne komponenten er derfor deprecated
    */

class CollapseComponent extends Component {
    render() {
        return (
            <div></div>
        )}
}

export default CollapseComponent;


/*
<div class="collapseDiv">
                <div>
                    <h4>Kategorier:</h4>
                </div>
                <div class="collapseButton">
                    <div>
                    <button type="button" class="btn btn-outline-light" onClick={() => window.location.href="#/"}>Nyheter</button>
                    </div>
                    <div class="collapseButton">
                    <button type="button" class="btn btn-outline-light" onClick={() => window.location.href="#/kat/Sport"}>Sport</button>
                    </div>
                    <div class="collapseButton">
                    <button type="button" class="btn btn-outline-light" onClick={() => window.location.href="#/kat/Underholdning"}>Underholdning</button>
                    </div>
                    <div class="collapseButton">
                    <button type="button" class="btn btn-outline-light" onClick={() => window.location.href="#/kat/Politikk"}>Politikk</button>
                    </div>
                    <div class="collapseButton">
                    <button type="button" class="btn btn-outline-light" onClick={() => window.location.href="#/kat/Teknologi"}>Teknologi</button>
                    </div>
                    <div class="collapseBottomDiv">
                        <div style={{padding: 10}}>
                            <button type="button" id="collapseBottomButton" class="btn btn-outline-light" onClick={() => window.location.href="#/RegSak"}>Registrer sak</button>
                            <button type="button" id="collapseBottomButton" class="btn btn-outline-light" onClick={() => window.location.href="#/EndreSak"}>Endre sak</button>
                            <button type="button" id="collapseBottomButton" class="btn btn-outline-light" onClick={() => window.location.href="#/SlettSak"}>Slett sak</button>
                        </div>
                    </div>
                </div>

*/