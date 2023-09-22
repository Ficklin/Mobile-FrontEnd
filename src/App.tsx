import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Tasks from "./pages/Tasks";
import { TaskProvider } from "./contexts/TaskProvider";
import React from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <TaskProvider>
    <>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/task">
              <Tasks />
            </Route>
            <Route exact path="/task/:taskId">
              <Tasks />
            </Route>

            <Route exact path="/">
              <Redirect to="/task" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </>
  </TaskProvider>
);

export default App;
