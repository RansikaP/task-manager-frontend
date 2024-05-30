import taskService from '../../services/task'
import moment from 'moment'

const getProjectTasks = async (projectId) => {
    const tasksJson = await taskService.getProjectTasks(projectId)
    const tasksObject = Object.keys(tasksJson).map((i) => tasksJson[i])

    const formattedTasks = tasksObject.map((task) => ({
        name: task.title,
        description: task.description,
        creator: task.assignee,
        assignedUsers: task.assignedTo,
        dueDate: moment(task.dueDate).utc().format('YYYY-MM-DD'),
        status: task.status,
    }))
    console.log('array: ', formattedTasks)
    return formattedTasks
}

export default { getProjectTasks }
