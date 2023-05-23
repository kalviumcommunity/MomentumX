import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task';

function Column({title, tasks, id}) {
    return (
        <Box
            borderRadius="4px"
            width="340px"
            height="480px"
            overflowY="scroll"
            border="1px gray solid"
            sx={{
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            }}
        >
            <Text className="heading" textAlign="center">
                {title}
            </Text>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <Box
                        minHeight="100px"
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
        </Box>
    );
}

export default Column;