import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Redux/store';
import Wrapper from './Wrapper';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} />
        <Wrapper />
      </Provider>
    </div>
  );
}

export default App;
