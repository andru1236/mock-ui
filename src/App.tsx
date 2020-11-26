import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainView from "./packages/apis/MainView";
import ApiRoutesView from "./packages/routes/ApiRoutesView";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/apis/:apiId/routes">
            <ApiRoutesView />
          </Route>
          <Route path="/">
            <MainView/>
          </Route>
        </Switch>
      </Router>

    </div>
  );
};

export default App;
