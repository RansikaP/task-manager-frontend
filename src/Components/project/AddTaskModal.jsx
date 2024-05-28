import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';

const AddTaskModal = ({ show, handleClose, handleSave, users }) => {
    const [newTask, setNewTask] = useState({
        name: '',
        description: '',
        creator: 'Current User',  // Adjust as needed to get the current user
        assignedUsers: [],
        dueDate: '',
        status: 'Not Started',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleUserChange = (selectedOptions) => {
        const selectedUsers = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setNewTask({ ...newTask, assignedUsers: selectedUsers });
    };

    const handleSubmit = () => {
        handleSave(newTask);
        handleClose();
    };

    const userOptions = users.map(user => ({ value: user, label: user }));

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={newTask.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={newTask.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Assigned Users</Form.Label>
                        <Select
                            isMulti
                            name="assignedUsers"
                            value={userOptions.filter(option => newTask.assignedUsers.includes(option.value))}
                            onChange={handleUserChange}
                            options={userOptions}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="dueDate"
                            value={newTask.dueDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={newTask.status}
                            onChange={handleChange}
                        >
                            <option>Not Started</option>
                            <option>In Progress</option>
                            <option>In Review</option>
                            <option>Completed</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Task
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTaskModal;