import { Box, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import CreateTask from './CreateTask';
import Column from './Column';

function Board({projectName, userEmail}) {

    const [tasks, setTasks] = useState([]);
    const [toDo, setToDo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [completed, setCompleted] = useState([])
    const [isCreatingTask, setIsCreatingTask] = useState(false);


    function filterTasksByStatus(status, setMethod) {

      setMethod(tasks.filter((task) => task.status === status));

    }

    function segregateTasks() {

      filterTasksByStatus("toDo", setToDo)
      filterTasksByStatus("inProgress", setInProgress)
      filterTasksByStatus("completed", setCompleted)

    }


    function updateTaskStatus(id, status) {

      if (userEmail && projectName) {
        
        fetch(`http://localhost:3003/tasks/${projectName}/${userEmail}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }).catch((error) => {
          console.log("Error:", error);
        });

      }
    }

    useEffect(() => {
      if (userEmail && projectName) {
        fetch(`http://localhost:3003/tasks/${projectName}/${userEmail}`)
          .then((response) => response.json())
          .then((json) => {
            setTasks(json)
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
    }, [projectName, userEmail]);

    useEffect(() => {
      if (tasks.length > 0) {
        segregateTasks();
      }
    }, [tasks]);

    const handleDragEnd = (result) => {
      const { destination, source, draggableId } = result;


      if ( !destination || source.droppableId == destination.droppableId) return;


      const task = findTaskById(draggableId,[...toDo, ...inProgress, ...completed])


      if (source.droppableId == "toDo") {
        setToDo(removeTaskById(draggableId, toDo))
      } else if (source.droppableId == "inProgress") {
        setInProgress(removeTaskById(draggableId, inProgress))
      } else {
        setCompleted(removeTaskById(draggableId, completed))
      }


      if (destination.droppableId === "completed") {
        setCompleted([{ ...task, status: "completed" }, ...completed]);
        updateTaskStatus(task.id, "completed");
      } else if (destination.droppableId === "inProgress") {
        setInProgress([{ ...task, status: "inProgress" }, ...inProgress]);
        updateTaskStatus(task.id, "inProgress");
      } else {
        setToDo([{ ...task, status: "toDo" }, ...toDo]);
        updateTaskStatus(task.id, "toDo");
      }

    };

    function findTaskById(id, array) {
      return array.find((item) => item.id == id)
    }

    function removeTaskById(id, array) {
      return array.filter((item) => item.id != id)
    }

    const handleCloseCreateTask = () => {
      setIsCreatingTask(false);
    };


    return (
      <Box margin="28px">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Heading color="#2C2C2C" className="heading">{projectName}</Heading>
          <Flex flexDir="row" justifyContent="space-between" alignItems="center" marginTop="28px" marginBottom="28px">
            <Column
              title={"To Do"}
              tasks={toDo}
              id={"toDo"}
              setTasks={setTasks}
              setIsCreatingTask= {setIsCreatingTask}
            />
            <Column
              title={"In Progress"}
              tasks={inProgress}
              id={"inProgress"}
            />
            <Column title={"Completed"} tasks={completed} id={"completed"} />
          </Flex>
        </DragDropContext>
        {isCreatingTask && (
          <Box margin="12px">
            <CreateTask
              setTasks={setTasks}
              isOpen={isCreatingTask}
              onClose={handleCloseCreateTask}
              projectName={projectName}
              userEmail={userEmail}
            />
          </Box>
        )}
      </Box>
    );
}

export default Board;