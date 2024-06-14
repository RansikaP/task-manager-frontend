import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import taskService from '../../services/task'
import Cookies from 'universal-cookie'

const RemoveTaskModal = ({ show, handleRemove,handleRemoveClose,users }) => {

    const [selectedUsers,setSelectedUsers] = useState();




    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Remove Collaborators</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Collaborators List</Form.Label>
                        <Select
                            isMulti
                            name="assignedUsers"
                            value={userOptions.filter((option) =>
                                newTask.assignedUsers.includes(option.value)
                            )}
                            onChange={handleUserChange}
                            options={userOptions}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handleRemoveClose}
                >
                    Close
                </Button>
                <Button
                    variant="danger"
                    onClick={handleRemove}
                >
                    Remove Collaborators
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RemoveTaskModal
