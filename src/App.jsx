import { useState } from "react";
import "./App.css";
import CreateTemplates from "./components/CreateTemplates";
import GetAllTemplates from "./components/GetAllTemplates";


function App() {
  // const [viewTemplate, setViewTemplate] = useState(false)

  return (
    <div className="container_primary"> 
      {/* <div>
        <button className={viewTemplate ? "btn_templates" : ""} onClick={() => setViewTemplate(!viewTemplate)}>Crear Plantilla</button>
      </div> */}
      <div className="templates">
        {/* {
          viewTemplate && (
            <CreateTemplates />
          )
        }
      */}
        {/* <CreateTemplates /> */}
        <GetAllTemplates />
      </div>  
    </div>
  );

}

export default App;
