import React from "react";
import TaskContext from "../contexts/TaskContext";
import {
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from "@ionic/react";
import { useContext } from "react";
import { trash } from "ionicons/icons";

const TaskList = () => {
  let { updateTask, deleteTask } = useContext(TaskContext);

  const complete = (t: any) => {
    updateTask(t.taskId, { Title: t.Title, Completed: true })
      .then(() => {})
      .catch((error: any) => {
        console.log(error);
      });
  };

  const incomplete = (t: any) => {
    updateTask(t.taskId, { Title: t.Title, Completed: false })
      .then(() => {})
      .catch((error: any) => {
        console.log(error);
      });
  };

  const del = (taskId: string) => {
    deleteTask(taskId)
      .then(() => {})
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <h2 className="ion-margin-start">Incomplete</h2>
        <TaskContext.Consumer>
          {({ task }) => {
            return (
              <IonList>
                {task.map((t: any) => {
                  if (!t.Completed) {
                    return (
                      <IonItemSliding>
                        <IonItem>
                          <IonCheckbox
                            name={t.Title}
                            checked={false}
                            color="danger"
                            onClick={() => complete(t)}
                          ></IonCheckbox>
                          <IonLabel className="ion-margin-start">
                            {t.Title}
                          </IonLabel>
                        </IonItem>
                        <IonItemOptions>
                          <IonItemOption>
                            <IonIcon
                              onClick={() => del(t.taskId)}
                              slot="icon-only"
                              icon={trash}
                            ></IonIcon>
                          </IonItemOption>
                        </IonItemOptions>
                      </IonItemSliding>
                    );
                  }
                })}
              </IonList>
            );
          }}
        </TaskContext.Consumer>
      </div>
      <div>
        <h2 className="ion-margin-start">Complete</h2>
        <TaskContext.Consumer>
          {({ task }) => {
            return (
              <IonList>
                {task.map((t: any) => {
                  if (t.Completed) {
                    return (
                      <IonItemSliding>
                        <IonItem>
                          <IonCheckbox
                            name={t.Title}
                            checked={true}
                            color="danger"
                            onClick={() => incomplete(t)}
                          ></IonCheckbox>
                          <IonLabel className="ion-margin-start">
                            {t.Title}
                          </IonLabel>
                        </IonItem>
                        <IonItemOptions>
                          <IonItemOption>
                            <IonIcon
                              onClick={() => del(t.taskId)}
                              slot="icon-only"
                              icon={trash}
                            ></IonIcon>
                          </IonItemOption>
                        </IonItemOptions>
                      </IonItemSliding>
                    );
                  }
                })}
              </IonList>
            );
          }}
        </TaskContext.Consumer>
      </div>
    </div>
  );
};

export default TaskList;
