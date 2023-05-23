import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import Column from './Column';

function Board() {

    const [tasks, setTasks] = useState([]);
    const [toDo, setToDo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [completed, setCompleted] = useState([])


    function filterTasksByStatus(status, setMethod) {

      setMethod(tasks.filter((task) => task.status === status));

    }

    function segregateTasks() {

      filterTasksByStatus("toDo", setToDo)
      filterTasksByStatus("inProgress", setInProgress)
      filterTasksByStatus("completed", setCompleted)

    }

    useEffect(() => {
        fetch("http://localhost:3003/tasks")
          .then((response) => response.json())
          .then((json) => {
            setTasks(json)
          })
          .catch((error) => {
            console.log("Error:", error);
          });
    }, []);

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
      } else if (destination.droppableId === "inProgress") {
        setInProgress([{ ...task, status: "inProgress" }, ...inProgress]);
      } else {
        setToDo([{ ...task, status: "toDo" }, ...toDo]);
      }
    };

    function findTaskById(id, array) {
      return array.find((item) => item.id == id)
    }

    function removeTaskById(id, array) {
      return array.filter((item) => item.id != id)
    }


    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Text textAlign="center" className="heading">
          Progress board
        </Text>
        <Flex flexDir="row" justifyContent="space-evenly" alignItems="center">
          <Column
            title={"To Do"}
            tasks={toDo}
            id={"toDo"}
          />
          <Column
            title={"In Progress"}
            tasks={inProgress}
            id={"inProgress"}
          />
          <Column
            title={"Completed"}
            tasks={completed}
            id={"completed"}
          />
        </Flex>
      </DragDropContext>
    );
}

export default Board;