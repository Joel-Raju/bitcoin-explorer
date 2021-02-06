import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './containers/home';
import BlockDetails from './containers/block-details';
import NotFoundPage from './containers/NotFoundPage';
import TransactionDetails from './containers/transaction-details';
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/blocks/:hash' component={BlockDetails} />
          <Route path='/transactions/:hash' component={TransactionDetails} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
