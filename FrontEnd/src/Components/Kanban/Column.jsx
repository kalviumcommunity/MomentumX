import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task';

function Column({title, tasks, id}) {
    return (
        <Box
            borderRadius="4px"
            width="340px"
            height="calc(100vh - 140px)"
            border="1px gray solid"
        >
            <Heading position="fixed" className='sub-heading' fontWeight="medium" textAlign="left" margin="12px">
                {title}
            </Heading>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <Box
                        marginTop="44px"
                        height="calc(100% - 44px)"
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
        </Box>
    );
}

export default Column;