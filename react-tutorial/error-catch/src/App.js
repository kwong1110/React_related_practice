import React from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import User from './User';

function App() {
  return (
    <ErrorBoundary>
      <User />
    </ErrorBoundary>
  );
}

export default App;
