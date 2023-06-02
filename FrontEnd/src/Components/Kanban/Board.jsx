import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import CreateTask from "./CreateTask";
import Column from "./Column";

function Board({ projectName, userEmail }) {
    const [tasks, setTasks] = useState([]);
    const [toDo, setToDo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const HOST_URL = import.meta.env.VITE_HOST_URL

    function filterTasksByStatus(status, setMethod) {
        setMethod(tasks && tasks.filter((task) => task.status === status));
    }

    function segregateTasks() {
        filterTasksByStatus("toDo", setToDo);
        filterTasksByStatus("inProgress", setInProgress);
        filterTasksByStatus("completed", setCompleted);
    }

    useEffect(() => {
        if (userEmail && projectName) {
            fetch(`${HOST_URL}/alltasks/${projectName}/${userEmail}`)
                .then((response) => response.json())
                .then((json) => {
                    setTasks(json);
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
        }
    }, [projectName]);

    function updateTaskStatus(id, status) {
        if (userEmail && projectName) {
            fetch(
                `${HOST_URL}/updatetask/${projectName}/${userEmail}/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                }
            ).catch((error) => {
                console.log("Error:", error);
            });
        }
    }

    useEffect(() => {
        segregateTasks();
    }, [tasks]);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId == destination.droppableId)
            return;

        const task = findTaskById(draggableId, [
            ...toDo,
            ...inProgress,
            ...completed,
        ]);

        if (source.droppableId == "toDo") {
            setToDo(removeTaskById(draggableId, toDo));
        } else if (source.droppableId == "inProgress") {
            setInProgress(removeTaskById(draggableId, inProgress));
        } else {
            setCompleted(removeTaskById(draggableId, completed));
        }

        if (destination.droppableId === "completed") {
            setCompleted([{ ...task, status: "completed" }, ...completed]);
            updateTaskStatus(task._id, "completed");
        } else if (destination.droppableId === "inProgress") {
            setInProgress([{ ...task, status: "inProgress" }, ...inProgress]);
            updateTaskStatus(task._id, "inProgress");
        } else {
            setToDo([{ ...task, status: "toDo" }, ...toDo]);
            updateTaskStatus(task._id, "toDo");
        }
    };

    function findTaskById(id, array) {
        return array.find((item) => item._id == id);
    }

    function removeTaskById(id, array) {
        return array.filter((item) => item._id != id);
    }

    const handleCloseCreateTask = () => {
        setIsCreatingTask(false);
    };

    return (
        <Box margin="28px">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Heading color="#2C2C2C" className="heading">
                    {projectName}
                </Heading>
                <Flex
                    flexDir="row"
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop="28px"
                    marginBottom="28px"
                >
                    <Column
                        title={"To Do"}
                        tasks={toDo}
                        id={"toDo"}
                        setTasks={setTasks}
                        setIsCreatingTask={setIsCreatingTask}
                        projectName={projectName}
                    />
                    <Column
                        title={"In Progress"}
                        tasks={inProgress}
                        id={"inProgress"}
                        setTasks={setTasks}
                        projectName={projectName}
                    />
                    <Column
                        title={"Completed"}
                        tasks={completed}
                        id={"completed"}
                        setTasks={setTasks}
                        projectName={projectName}
                    />
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
