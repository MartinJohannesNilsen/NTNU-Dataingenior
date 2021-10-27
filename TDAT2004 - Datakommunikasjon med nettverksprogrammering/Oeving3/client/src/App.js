import React, {useState} from 'react';
import { render } from "react-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

/* With Docker */
let PORT = "49160";
/* Without Docker */
//let PORT = "8080";

function App() {
  const [kodeObj, setKode] = useState({kode: cppEksempel, resultat: "", språk: "cpp"});
  let editorTekst = kodeObj.kode;
  let selectedRadioButton = "cpp";
  const handleChange = event => {
    let nyttEksempel = "";
    selectedRadioButton = event.target.value;
    if(event.target.value === 'cpp'){
      nyttEksempel = {kode: cppEksempel, resultat: "", språk: "cpp"};
      setKode(nyttEksempel);
    }else if(event.target.value === 'python'){
      nyttEksempel = {kode: pythonEksempel, resultat: "", språk: "python"};
      setKode(nyttEksempel);
    }
  };

  function onChange(newValue) {
    editorTekst = newValue;
  }

  function onButtonClick() {
    const nyMidlTekst = {kode: editorTekst, resultat: "Compiling ...", språk: kodeObj.språk};
    setKode(nyMidlTekst);
    kompiler();
  }

  function kompiler() {
    axios.post('http://localhost:' + PORT + '/cpp', { "editorTekst": editorTekst, "språk": kodeObj.språk}).then(response => {
      console.log(response.data);
      const resTekst = {kode: editorTekst, resultat: response.data, språk: kodeObj.språk};
      setKode(resTekst);
    });
  }

  return (
    <div id="background">
      <div id="container">
        <div id="title">
          <h1>Online Compiler</h1>
        </div>
        <div id="editor">
          <AceEditor
            mode='c_cpp'
            theme="monokai"
            value={kodeObj.kode}
            onChange={onChange}
            name="aceEditor"
            enableBasicAutocompletion={true}
            width="100%"
            fontSize="14px"
            showPrintMargin={false}
            editorProps={{ $blockScrolling: true }}
          />
        </div>
        <div id="Valg">
          <div id="RadioButtons">
            <div id="RadioTitle">
              <h4>Language</h4>
            </div>
            <RadioGroup aria-label="language" name="language" value={kodeObj.språk} onChange={handleChange} id="RadioChoices">
              <FormControlLabel value="cpp" control={<Radio/>} label="C++"/>
              <FormControlLabel value="python" control={<Radio/>} label="Python" />
            </RadioGroup>
          </div>
          <div id="knapp">
            <button type="button" class="btn btn-outline-light btn-lg" onClick={() => onButtonClick()}>Compile and run</button>
          </div>
        </div>
        <div id="result">
          <div><p>{kodeObj.språk}compilator $ </p></div>
          <p>{kodeObj.resultat}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

const cppEksempel = 
'#include <iostream>\n\
using namespace std; \n\
\n\
int main() {\n\
    cout << "Hei, Martin!" << endl;\n\
    return 0;\n\
}';

const pythonEksempel = 
'print("Hei, Martin!")';

