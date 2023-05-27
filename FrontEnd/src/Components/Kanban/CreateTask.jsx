import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';

function CreateTask({ isOpen, onClose, setTasks }) {


  const [formData, setFormData] = useState({
    taskHead: "",
    description: "",
    estimatedTime: "",
    status: "toDo",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const estimatedHours = Math.floor(formData.estimatedTime / 60);
    const estimatedMinutes = formData.estimatedTime % 60;
    const formattedTime = `Estimated- ${String(estimatedHours).padStart(2, '0')}:${String(estimatedMinutes).padStart(2, '0')} hrs`;
  
    const formDataCopy = { ...formData, estimatedTime: formattedTime };

    fetch("http://localhost:3003/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataCopy),
    })
      .then((response) => response.json())
      .then((newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Task</ModalHeader>
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
            Create
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateTask;