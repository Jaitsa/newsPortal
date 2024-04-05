import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import AppHeader from '../appHeader/AppHeader';
import NewsList from '../newsList/NewsList';
import NewsPage from '../newsPage/NewsPage';
import './app.css';

const App = () => {
  return (
    <Router>
      <main className="app">
        <div className="content">
          <AppHeader />
          <Routes>
            <Route exact path="/" element={<NewsList />} />
            <Route path="/news/:id" element={<NewsPage />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;
