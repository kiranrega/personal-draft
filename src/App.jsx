// src/App.js
import React from 'react';
import Title from './components/Title';
import Button from './components/Button';
import DraftEditor from './components/Editor';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <Title />
      <DraftEditor onSave={() => {}} />
    </div>
  );
};

export default App;
