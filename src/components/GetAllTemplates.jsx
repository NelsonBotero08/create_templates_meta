import React, { useState, useEffect } from "react";
import "./GetAllTemplates.css"
import { Link } from "react-router-dom";

const GetAllTemplates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const getDataTemplate = async () => {
      try {
        const response = await fetch("http://localhost:8080/templates", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTemplates(data.result.rows);
        } else {
          console.error("Error al obtener los datos:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    getDataTemplate();
  }, []);

  const getStatusText = (idEstatus) => {
    switch (idEstatus) {
      case 0:
        return "Inactivo";
      case 1:
        return "Activo";
      case 2:
        return "Pendiente";
      default:
        return "Desconocido";
    }
  };

  const getText = (text) => {
    if (typeof text === "string") {
      return text.slice(0, 120);
    }
    return "Texto no válido";
  };

  const renderActionButton = (idEstatus) => {
    if (idEstatus === 1) {
      return (
        <button className="button_action--desactivar" onClick={() => handleAction(idEstatus)}>Desactivar</button>
      );
    } else if (idEstatus === 0) {
      return <button className="button_action" onClick={() => handleAction(idEstatus)}>Activar</button>;
    }
    return null;
  };

  const handleAction = (id) => {
    const updatestatusTemplate = async () => {
      try {
        const response = await fetch(`http://localhost:8080/status/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
        } else {
          console.error("Error al obtener los datos:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };
    updatestatusTemplate();
  };

  return (
    <div className="container__gettemplates">
      <article className="article_gettemplates">
        <section className="seccion_title-gettemplates">
          <h2>Consulta plantillas</h2>
          <figure className="img_multiagente">
            <img
              src="https://intercomsoluciones.com/wp-content/uploads/2021/07/servicio_8web.png"
              alt="Image module"
            ></img>
          </figure>
          <div className="div__btn__create">
            <Link to="/create"> 
              <button className='btn_create--template'>Crear Plantillas</button>
          </Link> 
          </div>
        </section>
        <section className="seccion__table--templates">
          <table className="table__templates">
            <thead className="head__table--template">
              <tr>
                <th>Titulo</th>
                <th>Texto</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody className="body__get--template">
              {templates.map((template) => (
                <tr key={template.id}>
                  <td>{template.nombre}</td>
                  <td>{getText(template.texto)}</td>
                  <td className={`status ${getStatusText(template.idestatus)}`}>{getStatusText(template.idestatus)}</td>
                  <td>{renderActionButton(template.idestatus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </article>
    </div>
  );
};

export default GetAllTemplates;
