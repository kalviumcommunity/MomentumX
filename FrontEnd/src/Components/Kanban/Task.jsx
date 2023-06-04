import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTask from "./EditTask";

function Task({ task, index, setTasks, projectName }) {
    const estimatedHours = Math.floor(task.estimatedTime / 60);
    const estimatedMinutes = task.estimatedTime % 60;
    const formattedTime = `Estimated- ${String(estimatedHours).padStart(
        2,
        "0"
    )}:${String(estimatedMinutes).padStart(2, "0")} hrs`;
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editTask, setEditTask] = useState(task);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const HOST_URL = import.meta.env.VITE_HOST_URL;

    const handleEditOpen = (task) => {
        setEditTask(task);
        setIsEditOpen(true);
    };

    const handleEditClose = () => {
        setIsEditOpen(false);
    };

    const handleDelete = () => {
        setIsConfirmOpen(true);
    };

    const cancelDelete = () => {
        setIsConfirmOpen(false);
    };

    const confirmDelete = async () => {

        try {
            const response = await fetch(
                `/projects/${projectName}/tasks/${task._id}`,
                {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ assignedTo: task.assignedTo })
                  }
            );

            if (response.ok) {
                setTasks((prevTasks) => {
                    if (prevTasks.length === 1) {
                        return [];
                    } else {
                        return prevTasks.filter((t) => t._id !== task._id);
                    }
                });
                cancelDelete();
            } else {
                // Handle error case
                console.error("Failed to delete task");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Draggable
                draggableId={`${task._id}`}
                key={`${task._id}`}
                index={index}
            >
                {(provided, snapshot) => (
                    <Flex
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isdragging={snapshot.isDragging.toString()}
                        minHeight="100px"
                        borderRadius="4px"
                        padding="8px 10px"
                        cursor="pointer"
                        flexDirection="column"
                        justifyContent="space-between"
                        backgroundColor="#FFFFFF"
                        margin="0px 8px 20px 8px"
                    >
                        <Flex
                            flexDirection="column"
                            alignItems="flex-start"
                            justifyContent="flex-start"
                        >
                            <Text
                                color="#888888"
                                className="xx-small"
                                fontWeight="medium"
                            >
                                {formattedTime}
                            </Text>
                            <Text
                                margin="4px 0px"
                                className="x-small"
                                fontWeight="medium"
                            >
                                {task.taskHead}
                            </Text>
                        </Flex>
                        <Flex
                            width="100%"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                            marginTop="12px"
                        >
                            <Flex
                                width="50%"
                                flexDirection="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    height="24px"
                                    marginRight="12px"
                                    borderRadius="4px"
                                    width="24px"
                                    backgroundColor="#C6C6C6"
                                    onClick={() => handleEditOpen(task)}
                                    sx={{
                                        "&:hover": {
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <EditIcon
                                        sx={{
                                            color: "#464646",
                                            fontSize: "18px",
                                        }}
                                    />
                                </Flex>
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    height="24px"
                                    marginRight="12px"
                                    borderRadius="4px"
                                    width="24px"
                                    backgroundColor="#C6C6C6"
                                    onClick={handleDelete}
                                    sx={{
                                        "&:hover": {
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <DeleteIcon
                                        sx={{
                                            color: "#464646",
                                            fontSize: "18px",
                                        }}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Draggable>
            <EditTask
                isOpen={isEditOpen}
                onClose={handleEditClose}
                setTasks={setTasks}
                task={editTask}
                projectName={projectName}
            />
            {isConfirmOpen && (
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    position="fixed"
                    top="0"
                    bottom="0"
                    left="0"
                    right="0"
                    background="rgba(0, 0, 0, 0.5)"
                >
                    <Flex
                        flexDirection="column"
                        background="#FFFFFF"
                        padding="20px"
                        borderRadius="4px"
                    >
                        <Text fontWeight="bold" marginBottom="10px">
                            Are you sure you want to delete this task?
                        </Text>
                        <Flex justifyContent="center">
                            <Button
                                margin="20px 18px 12px 18px"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </Button>
                            <Button
                                margin="20px 18px 12px 18px"
                                onClick={confirmDelete}
                            >
                                Delete
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </>
    );
}

export default Task;
