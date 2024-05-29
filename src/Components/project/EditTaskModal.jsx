// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const EditTaskModal = ({ show, handleClose, task, handleSave }) => {
//     const [editedTask, setEditedTask] = useState(task);

//     useEffect(() => {
//         setEditedTask(task);
//     }, [task]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditedTask({ ...editedTask, [name]: value });
//     };

//     const handleSubmit = () => {
//         handleSave(editedTask);
//         handleClose();
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Edit Task</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group>
//                         <Form.Label>Task Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="name"
//                             value={editedTask.name}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="description"
//                             value={editedTask.description}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Assigned Users</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="assignedUsers"
//                             value={editedTask.assignedUsers.join(', ')}
//                             onChange={(e) => handleChange({
//                                 target: {
//                                     name: 'assignedUsers',
//                                     value: e.target.value.split(',').map(user => user.trim())
//                                 }
//                             })}
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Due Date</Form.Label>
//                         <Form.Control
//                             type="date"
//                             name="dueDate"
//                             value={editedTask.dueDate}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Status</Form.Label>
//                         <Form.Control
//                             as="select"
//                             name="status"
//                             value={editedTask.status}
//                             onChange={handleChange}
//                         >
//                             <option>Not Started</option>
//                             <option>In Progress</option>
//                             <option>In Review</option>
//                             <option>Completed</option>
//                         </Form.Control>
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Close
//                 </Button>
//                 <Button variant="primary" onClick={handleSubmit}>
//                     Save Changes
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default EditTaskModal;
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';

const EditTaskModal = ({ show, handleClose, task, handleSave, users }) => {
    const [editedTask, setEditedTask] = useState(task);

    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleUserChange = (selectedOptions) => {
        const selectedUsers = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setEditedTask({ ...editedTask, assignedUsers: selectedUsers });
    };

    const handleSubmit = () => {
        handleSave(editedTask);
        handleClose();
    };

    const userOptions = users.map(user => ({ value: user, label: user }));

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={editedTask.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={editedTask.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Assigned Users</Form.Label>
                        <Select
                            isMulti
                            name="assignedUsers"
                            value={userOptions.filter(option => editedTask.assignedUsers.includes(option.value))}
                            onChange={handleUserChange}
                            options={userOptions}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="dueDate"
                            value={editedTask.dueDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={editedTask.status}
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
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTaskModal;