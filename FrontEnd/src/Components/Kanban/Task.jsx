import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd'

function Task({task, index}) {


    return (
        <Draggable draggableId={`${task.id}`} key={`${task.id}`} index={index}> 
            {(provided, snapshot) => (
                <Box
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isdragging= {snapshot.isDragging.toString()}
                    borderRadius="12px"
                    padding="8px"
                    cursor="pointer"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    backgroundColor="aqua"
                    margin="9px 0px"
                >
                    <Text className='xx-small' fontWeight="medium">{task.estimatedTime}</Text>
                    <Text className='small' fontWeight="medium">{task.taskHead}</Text>
                </Box>
            )}
        </Draggable>
    );
}

export default Task;