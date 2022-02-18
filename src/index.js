import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import { DataProvider } from './context/DataContext';
import Post from './routes/Post';

ReactDOM.render(
  
  <React.StrictMode>
    <DataProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
        <Route path="/posts/:id" element={<Post />} />
     {/*  <Route path="invoices" element={<Invoices />} /> */}
    </Routes>
    </BrowserRouter>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
