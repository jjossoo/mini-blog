import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostViewPage from './component/page/PostViewPage';
import MainPage from './component/page/MainPage';
import PostWrightPage from './component/page/PostWrightPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App(props) {
  return (
    <BrowserRouter>

      <Routes>

        <Route index element={<MainPage />} />
        <Route path="write" element={<PostWrightPage />} />
        <Route path="post/:id" element={<PostViewPage />} />

      </Routes>
    </BrowserRouter>
  )
}

root.render(
  <App />
);
