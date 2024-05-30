import TaskRow from './TaskRow'
import './tasktable.css'
const TaskTable = ({ tasks, onDelete, onEdit }) => {
    console.log('task table: ', tasks)
    return (
        <table className="tasktable">
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Description</th>
                    <th>Creator</th>
                    <th>Assigned Users</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                    <TaskRow
                        key={index}
                        task={task}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default TaskTable
