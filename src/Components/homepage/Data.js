import taskService from '../../services/task'
import moment from 'moment'

const urgentTasks = async () => {
    const tasksJson = await taskService.getMyTasks()
    const tasksObject = Object.keys(tasksJson).map((i) => tasksJson[i])

    const filteredAndFormattedTasks = tasksObject
        .map((task) => ({
            name: task.title,
            Project: 'project-name',
            date: moment(task.dueDate).utc().format('YYYY-MM-DD'),
        }))
        .sort((a, b) => {
            return new Date(a.date) - new Date(b.date)
        })
        .slice(0, 3)

    return filteredAndFormattedTasks
}

const upcomingTasks = async () => {
    const tasksJson = await taskService.getMyTasks()
    const tasksObject = Object.keys(tasksJson).map((i) => tasksJson[i])

    const oneMonthFromNow = moment().add(1, 'week')

    const filteredAndFormattedTasks = tasksObject
        .filter((task) => {
            const dueDate = moment(task.dueDate)
            return dueDate.isBefore(oneMonthFromNow)
        })
        .map((task) => ({
            name: task.title,
            Project: 'project-name',
            date: moment(task.dueDate).utc().format('YYYY-MM-DD'),
        }))
        .sort((a, b) => {
            return new Date(a.date) - new Date(b.date)
        })

    return filteredAndFormattedTasks
}

export default { upcomingTasks, urgentTasks }
