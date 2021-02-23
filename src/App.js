import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Main from './components/Main';
import myStore from './redux/store';
import { Provider } from 'react-redux';

const App = () => {
    return (
      // BEM
      <div className="app">
        <Provider store={myStore}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </Provider>
      </div>
    );
}

export default App;
