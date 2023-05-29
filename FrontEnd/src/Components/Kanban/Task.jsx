import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Task({task, index}) {

  const estimatedHours = Math.floor(task.estimatedTime / 60);
  const estimatedMinutes = task.estimatedTime % 60;
  const formattedTime = `Estimated- ${String(estimatedHours).padStart(2, '0')}:${String(estimatedMinutes).padStart(2, '0')} hrs`;


    return (
      <Draggable draggableId={`${task.id}`} key={`${task.id}`} index={index}>
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
              <Text color="#888888" className="xx-small" fontWeight="medium">
                {formattedTime}
              </Text>
              <Text margin="4px 0px" className="x-small" fontWeight="medium">
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
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    }
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
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    }
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
    );
}

export default Task;