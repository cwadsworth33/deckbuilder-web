import React from 'react';
import './App.css';
import { AppRouter } from './AppRouter';
import { Toasts } from './components/toast';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlus, faTrash, faArrowLeft, faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import AppServices from './AppServices';

library.add(fab, faTimes, faPlus, faTrash, faArrowLeft, faCheck, faMinus);

export const ServiceContext = React.createContext(AppServices);

function App() {
  return (
    <ServiceContext.Provider value={AppServices}>
      <Toasts />
      <AppRouter />
    </ServiceContext.Provider>
  );
}   

export default App;
