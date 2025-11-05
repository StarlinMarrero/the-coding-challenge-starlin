import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ApiViewer from './ApiViewer';
import ReadmeViewer from './ReadmeViewer';
import Welcome from './Welcome';
import Index from './Index';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/api/viewer" element={<ApiViewer />} />
      <Route path="/readme" element={<ReadmeViewer />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      {/* TODO: Remove the redirect above and uncomment the line below to start building your portfolio view */}
      {/* <Route path="/" element={<Index />} /> */}
    </Routes>
  );
}

export default App;

