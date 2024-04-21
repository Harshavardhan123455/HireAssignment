import './App.css';
import ItemsTable from './component/table.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ItemsTable/>
  </React.StrictMode>
);

export default App;
