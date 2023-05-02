import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostViewPage from './component/page/PostViewPage';
import MainPage from './component/page/MainPage';
import PostWritePage from './component/page/PostWritePage';

import { ThemeProvider, useTheme } from './context/themeProvider';
import { GlobalStyle } from './theme/GlobalStyle';
import Layout from './Layout/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App(props) {
  return (
    <BrowserRouter basename={Processi.env.PUBLIC_URL}>
      <ThemeProvider>
        <GlobalStyle />
        <Layout>
          <Routes>

            <Route index element={<MainPage />} />
            <Route path="write" element={<PostWritePage />} />
            <Route path="post/:id" element={<PostViewPage />} />

          </Routes>
        </Layout>

      </ThemeProvider>
    </BrowserRouter>
  )
}

root.render(
  <App />
);
