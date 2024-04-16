import React from 'react';
import "./SkeletonLoader.css"; 

const SkeletonLoader = () => {
  return (
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
        <tr>
          <td colSpan="4" className="loading-row">
            <div className="loading-cell"></div>
            <div className="loading-cell"></div>
            <div className="loading-cell"></div>
            <div className="loading-cell"></div>
            {/* <div className="loading-cell"></div>
            <div className="loading-cell"></div>
            <div className="loading-cell"></div>
            <div className="loading-cell"></div> */}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SkeletonLoader;
