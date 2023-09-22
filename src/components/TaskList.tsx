import React from "react";
import TaskContext from "../contexts/TaskContext";
import {
  IonList,
  IonItem,
  IonCheckbox,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from "@ionic/react";
import { useContext } from "react";
import { trash } from "ionicons/icons";
//import { useDialog } from "../hooks/useDialog";

const TaskList: React.FC<{ completed: boolean }> = () => {
  let { updateTask, deleteTask } = useContext(TaskContext);
  //const { showPrompt } = useDialog(); // Need to edit task

  // const correctTask = (taskId: number) => {
  //   showPrompt("Edit Task", "Enter the updated task").then((newTitle) => {
  //     if (newTitle) {
  //       updateTask(taskId, { task: newTitle })
  //         .then(() => {})
  //         .catch((error: any) => {
  //           console.error("Error updating task:", error);
  //         });
  //     }
  //   });
  // };

  const complete = (t: any) => {
    updateTask(t.taskId, { task: t.title, Completed: true })
      .then(() => {})
      .catch((error: any) => {
        console.log(error);
      });
  };

  const incomplete = (t: any) => {
    updateTask(t.taskId, { task: t.title, Completed: false })
      .then(() => {})
      .catch((error: any) => {
        console.log(error);
      });
  };

  const del = (taskId: number) => {
    deleteTask(taskId)
      .then(() => {})
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        {/* <h2 className="ion-margin-start">Incomplete</h2> */}
        <TaskContext.Consumer>
          {({ task }) => {
            return (
              <IonList>
                {task.map((t: any) => {
                  if (!t.Completed) {
                    return (
                      <IonItemSliding key={t.taskId}>
                        <IonItem>
                          <IonCheckbox
                            labelPlacement="start"
                            aria-label={t.title}
                            checked={false}
                            color="danger"
                            onClick={() => complete(t)}
                          >
                            {t.Title}
                          </IonCheckbox>
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
        {/* <h2 className="ion-margin-start">Complete</h2> */}
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
                            labelPlacement="start"
                            aria-label={t.title}
                            checked={true}
                            color="danger"
                            onClick={() => incomplete(t)}
                          >
                            {t.title}
                          </IonCheckbox>
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
