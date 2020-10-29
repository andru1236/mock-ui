import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ApplicationMockApi from "./components/ApplicationMockApi";
import ApiRoutes from "./components/apiRoutes/ApiRoutes";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/apis/:apiId/routes">
            <ApiRoutes />
          </Route>
          <Route path="/">
            <ApplicationMockApi />
          </Route>
        </Switch>
      </Router>

    </div>
  );
};

export default App;
