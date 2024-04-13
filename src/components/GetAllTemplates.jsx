import React, { useState, useEffect } from 'react';

const GetAllTemplates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const getDataTemplate = async () => {
      try {
        const response = await fetch('http://localhost:8080/templates', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTemplates(data.result.rows);
        } else {
          console.error('Error al obtener los datos:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    getDataTemplate(); 
  }, []);

  const getStatusText = (idEstatus) => {
    switch (idEstatus) {
      case 1:
        return 'Activo';
      case 0:
        return 'Inactivo';
      case 2:
        return 'Pendiente';  
      default:
        return 'Desconocido';
    }
  };

  const getText = (text) => {
    if (typeof text === 'string') {
      return text.slice(0, 80);
    }
    return 'Texto no válido';
  };

  const renderActionButton = (idEstatus) => {
    if (idEstatus === 1) {   
      return <button onClick={() => handleAction(idEstatus)}>Desactivar</button>;
    }else if (idEstatus === 0){
        return <button onClick={() => handleAction(idEstatus)}>Activar</button>;
    }
    return null;
  };

  const handleAction = (id) => {

    const updatestatusTemplate = async () => {
        try {
          const response = await fetch(`http://localhost:8080/status/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          if (response.ok) {
        
          } else {
            console.error('Error al obtener los datos:', response.statusText);
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };
      updatestatusTemplate();
    }   

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Texto</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {templates.map(template => (
            <tr key={template.id}>
              <td>{template.nombre}</td>
              <td>{getText(template.texto)}</td>
              <td>{getStatusText(template.idestatus)}</td>
              <td>{renderActionButton(template.idestatus)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetAllTemplates;

