import { useState, useEffect, useRef } from 'react'
import styles from './home.module.css'
import { createTask, getTasks, deleteTask, logout, updateTask } from '../../api'
import { useNavigate } from 'react-router-dom'
import BarSpinner from '../../components/spinner'

export default function Home () {
  const taskNameRef = useRef()
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [createOption, setCreateOption] = useState(false)
  const [task, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'to-do-mern-app - Home'
    inicio(getTasks, setTasks, setLoading)
  }, [])

  useEffect(() => {
    if (createOption) {
      taskNameRef.current.focus()
    }
  }, [createOption])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setCreateOption(false)
    const result = await createTask({ task, description, priority })
    if (result.status === 201) {
      limparInputs(setTaskName, setDescription, setPriority)
      tasks.push(result.data.task)
    }
    setLoading(false)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const id = e.target.value
    setLoading(true)
    const result = await deleteTask(id)
    if (result.status === 200) {
      tasks.splice(tasks.findIndex((arrayTask) => arrayTask._id === id), 1)
    }
    setLoading(false)
  }

  const handleCreateOption = async (e) => {
    e.preventDefault()
    if (!createOption) {
      limparInputs(setTaskName, setDescription, setPriority)
    }
    setCreateOption(!createOption)
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    await logout()
    navigate('/')
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    let data = {[e.target.getAttribute('data-type')]: e.target.value}
    await updateTask(e.target.getAttribute('data-id'), data)
  }

  return (
    <>
      <div className={styles.home}>
        <h1>HOME</h1>
        {loading
          ? (
          <><BarSpinner /><div>Loading...</div></>
            )
          : (
          <>
            <div className={styles.header}>
              <button hidden={createOption} onClick={handleCreateOption}>
                {tasks.length > 0 ? 'Create new task' : 'Create one!'}
              </button>
              <button onClick={handleLogout}> Logout</button>
            </div>
            <div className={styles.tasks}>
              {tasks.length > 0
                ? (
                    tasks.map((task, index) => (
                      <div className={styles.task} key={index}>
                        <p hidden={editNameOption} className={styles.taskName}>{task.task}</p>
                        <input hidden={!editNameOption} type="text" defaultValue={task.task} />
                        <div className={styles.actions}>
                          <select defaultValue={task.priority} data-id={task._id} data-type="priority" onChange={handleUpdate}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                            <option values="Critical">Critical</option>
                          </select>
                          <select defaultValue={task.status} data-id={task._id} data-type="status" onChange={handleUpdate}>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button className={styles.deleteButton} onClick={handleDelete} value={task._id}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )
                : (
                <>
                  <p>No tasks</p>
                </>
                  )}
            </div>
            <button hidden={!createOption} onClick={handleCreateOption}>
              Cancel
            </button>
            <div className="create" hidden={!createOption}>
              <form>
                <label>
                  <p>Task</p>
                  <input
                    type="text"
                    autoComplete="task"
                    ref={taskNameRef}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </label>
                <label>
                  <p>Description</p>
                  <textarea
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="5"
                  ></textarea>
                </label>
                <label>
                  <p>Priority</p>
                  <select
                    onChange={(e) => setPriority(e.target.value)}
                    id="priority"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                    <option values="Critical">Critical</option>
                  </select>
                </label>

                <div className="submit">
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </form>
            </div>
          </>
            )}
      </div>
    </>
  )
}
function limparInputs (setTaskName, setDescription, setPriority) {
  setTaskName('')
  setDescription('')
  setPriority('')
}

function inicio (getTasks, setTasks, setLoading) {
  setLoading(true)
  getTasks()
    .then((result) => {
      setTasks(result.data)
    })
    .catch((_err) => {
      setTasks([])
    })
    .finally(() => {
      setLoading(false)
    })
}
