import { Box, Heading, Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd'
import CreateTask from './CreateTask';
import Task from './Task';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Column({title, tasks, id, setTasks}) {

    const [isCreatingTask, setIsCreatingTask] = useState(false);

    const handleCreateTask = () => {
      setIsCreatingTask(true);
    };
  
    const handleCloseCreateTask = () => {
      setIsCreatingTask(false);
    };
  

    return (
      <Box
        borderRadius="4px"
        width="340px"
        height="calc(100vh - 140px)"
        backgroundColor="#E4E4E4"
      >
        <Flex
          height="48px"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading
            color="#555555"
            className="medium"
            fontWeight="bold"
            margin="12px 12px 12px 16px"
          >
            {title}
          </Heading>
          {id === "toDo" && (
            <AddCircleIcon
              onClick={() => handleCreateTask()}
              sx={{
                color: "#464646",
                fontSize: "26px",
                marginRight: "12px",
                "&:hover": {
                  cursor: "pointer",
                }
              }}
            />
          )}
        </Flex>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <Box
              height="calc(100% - 48px)"
              overflowY="scroll"
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              flexGrow="1"
              ref={provided.innerRef}
              {...provided.droppableProps}
              isdraggingover={snapshot.isDraggingOver.toString()}
            >
              {tasks.map((task, index) => (
                <Task key={index} index={index} task={task} />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
        {isCreatingTask && (
          <Box margin="12px">
            <CreateTask
              setTasks={setTasks}
              isOpen={isCreatingTask}
              onClose={handleCloseCreateTask}
            />
          </Box>
        )}
      </Box>
    );
}

export default Column;