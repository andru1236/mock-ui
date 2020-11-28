import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import ViewApi from "./packages/apis/components/ViewApi";
import ViewRoutes from "./packages/routes/components/ViewRoutes";

const App: React.FC = () => {
    return (
      <div className="App">
          <Router>
              <Switch>

                  <Route path="/apis/:apiId/routes">
                      <ViewRoutes/>
                  </Route>

                  <Route path="/">
                      <ViewApi/>
                  </Route>

              </Switch>
          </Router>

      </div>
    );
};

export default App;
