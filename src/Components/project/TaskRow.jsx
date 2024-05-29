import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskRow = ({ task, onDelete, onEdit }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Not Started':
                return 'bg-danger text-white';
            case 'In Progress':
                return 'bg-primary text-white';
            case 'In Review':
                return 'bg-warning text-dark';
            case 'Completed':
                return 'bg-success text-white';
            default:
                return 'bg-secondary text-white';
        }
    };

    const statusClass = getStatusClass(task.status);

    return (
        <tr>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{task.creator}</td>
            <td>{task.assignedUsers.join(', ')}</td>
            <td>{task.dueDate}</td>
            <td className={`p-2 ${statusClass} rounded`} >{task.status}</td>
            <td>
                <button className="btn btn-warning btn-sm me-2 mb-2" onClick={() => onEdit(task)}>Edit</button>
                <button className="btn btn-danger btn-sm mb-2" onClick={() => onDelete(task)}>Delete</button>
            </td>
        </tr>
    );
};

export default TaskRow;