import { useState } from "react";
import "./App.css";
import CreateTemplates from "./components/CreateTemplates";


function App() {
  const [viewTemplate, setViewTemplate] = useState(false)

  return (
    <div className="container_primary"> 
      <div>
        <button className={viewTemplate ? "btn_templates" : ""} onClick={() => setViewTemplate(!viewTemplate)}>Crear Plantilla</button>
      </div>
      <div className="templates">
      
        {
          viewTemplate && (
            <CreateTemplates />
          )
        }
     
      </div>  
    </div>
  );

}

export default App;
