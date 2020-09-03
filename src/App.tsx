import React from 'react';
import './App.css';
import { AppRouter } from './AppRouter';
import { Toasts } from './components/toast';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faTimes);

function App() {
  return (
    <>
      <Toasts />
      <AppRouter />
    </>
  );
}   

export default App;
