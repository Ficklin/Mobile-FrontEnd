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

const TaskList: React.FC<{ completed: boolean }> = ({ completed }) => {
  let { task, updateTask, deleteTask } = useContext(TaskContext);

  const complete = (t: any) => {
    updateTask(t.taskId, { task: t.title, completed: true })
      .then(() => {})
      .catch((error: any) => {
        console.log(error);
      });
  };

  const incomplete = (t: any) => {
    updateTask(t.taskId, { task: t.title, completed: false })
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

  // Sort tasks by completion status (incomplete tasks first)
  const sortedTasks = task.slice().sort((a: any, b: any) => {
    if (a.completed && !b.completed) return 1; // Completed tasks come after incomplete tasks
    if (!a.completed && b.completed) return -1; // Incomplete tasks come before completed tasks
    return 0; // No change in order if both tasks have the same completion status
  });

  return (
    <div>
      <IonList>
        {sortedTasks.map((t: any) => {
          if (t.completed === completed) {
            return (
              <IonItemSliding key={t.taskId}>
                <IonItem>
                  <IonCheckbox
                    labelPlacement="start"
                    aria-label={t.title}
                    checked={t.completed}
                    color="danger"
                    onClick={() => (t.completed ? incomplete(t) : complete(t))}
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
          return null;
        })}
      </IonList>
    </div>
  );
};

export default TaskList;
