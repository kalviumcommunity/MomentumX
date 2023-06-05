import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';

function EditTask({ isOpen, onClose, setTasks, task, projectName }) {

  const HOST_URL = import.meta.env.VITE_HOST_URL

  const [formData, setFormData] = useState({
    taskHead: task.taskHead || "",
    description: task.description || "",
    estimatedTime: task.estimatedTime || "",
    status: task.status || "toDo",
    assignedTo : task.assignedTo || ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const formDataCopy = { ...formData };

    fetch(`${HOST_URL}/projects/${projectName}/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataCopy),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTasks((prevTasks) => prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent height="438px" margin="calc((100vh - 438px) / 2)">
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Task Head</FormLabel>
              <Input type="text" name="taskHead" value={formData.taskHead} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea name="description" value={formData.description} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Estimated Time (in mins)</FormLabel>
              <Input type="number" name="estimatedTime" value={formData.estimatedTime} onChange={handleInputChange} />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditTask;
