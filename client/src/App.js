import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import MovieList from './components/MovieList';  
import SeriesList from './components/SeriesList';  
import DataList from './components/DataList';  
import DataDetail from './components/DataDetail';  
import HomePage from './components/HomePage';  
import Layout from './components/Test';  
import Test2 from './components/Test2';  
import FavoritePage from './components/FavoritePage';
import BrowseList from './components/BrowseList';  
import './App.css';
<link href="https://fonts.googleapis.com/css2?family=Museo:wght@300;400;700&display=swap" rel="stylesheet" />


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
       
          <Route path="/data/:id" element={<DataDetail />} />  
          <Route path="/movies" element={<MovieList />} />  
          <Route path="/browse" element={<BrowseList />} />  
          <Route path="/series" element={<SeriesList />} />  
          <Route path="/user" element={<DataList />} />  
          <Route path="/" element={<HomePage />} />  
          <Route path="/test" element={<Layout />} /> 
          <Route path="/test2" element={<Test2 />} /> 
          <Route path="/favorites" element={<FavoritePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
