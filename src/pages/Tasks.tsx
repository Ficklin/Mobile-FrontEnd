import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import TaskList from "../components/TaskList";
import { add } from "ionicons/icons";
import React, { useContext } from "react";
import { useDialog } from "../hooks/useDialog";
import TaskContext from "../contexts/TaskContext";

function Tasks() {
  const { createTask } = useContext(TaskContext);
  const { showPrompt } = useDialog();

  function handleAddTask() {
    showPrompt("Hey!", "Enter task to destiny!").then((task) => {
      createTask(task);
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle color="light">Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
          <IonFabButton color="tertiary" onClick={handleAddTask}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonList>
          <IonListHeader color="secondary">
            <IonLabel>Incomplete Tasks</IonLabel>
          </IonListHeader>
          <TaskList completed={false} />
        </IonList>
        <></>
        <IonList>
          <IonListHeader color="secondary">
            <IonLabel>Complete Tasks</IonLabel>
          </IonListHeader>
          <TaskList completed={true} />
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Tasks;
