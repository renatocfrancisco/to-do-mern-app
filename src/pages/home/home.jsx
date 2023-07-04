import { useState, useEffect, useRef } from 'react'
import styles from './home.module.css'
import { createTask, getTasks, deleteTask, logout, updateTask } from '../../api'
import { useNavigate } from 'react-router-dom'

import BarSpinner from '../../assets/loading'
import BiTrash from '../../assets/delete'
import BiBoxArrowInRight from '../../assets/logout'
import BiPlusCircle from '../../assets/create'
import BiClockHistory from '../../assets/pending'
import BiCheckLg from '../../assets/completed'
import BiExclamationCircle from '../../assets/progress'
import BiPauseCircle from '../../assets/onhold'
import BiXCircle from '../../assets/cancelled'

export default function Home () {
  const taskNameRef = useRef()
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [createOption, setCreateOption] = useState(false)
  const [task, setTaskName] = useState('')
  const [priority, setPriority] = useState('')
  const navigate = useNavigate()

  const svgOption = useState({
    Pending: <BiClockHistory />,
    'In Progress': <BiExclamationCircle />,
    Completed: <BiCheckLg />,
    'On Hold': <BiPauseCircle />,
    Cancelled: <BiXCircle />
  })

  const colorOption = useState({
    Low: '#00ff00',
    Medium: '#ffff00',
    High: '#f5a937',
    Urgent: '#ff4040',
    Critical: '#ff56f7'
  })

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
    const result = await createTask({ task, priority })
    if (result.status === 201) {
      limparInputs(setTaskName, setPriority)
      tasks.push(result.data.task)
    }
    setLoading(false)
  }

  const handleDelete = async (e, index) => {
    e.preventDefault()
    setLoading(true)
    if(tasks[index]._id){
      const result = await deleteTask(tasks[index]._id)
      if (result.status === 200) {
        tasks.splice(index, 1)
      }
    }
    setLoading(false)
  }

  const handleCreateOption = async (e) => {
    e.preventDefault()
    if (!createOption) {
      limparInputs(setTaskName, setPriority)
    }
    setCreateOption(!createOption)
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    await logout()
    navigate('/')
  }

  const handleUpdate = async (e, index) => {
    e.preventDefault()
    setLoading(true)
    const data = { [e.target.getAttribute('data-type')]: e.target.value }
    await updateTask(tasks[index]._id, data)
    tasks.find((arrayTask) => arrayTask._id === tasks[index]._id)[e.target.getAttribute('data-type')] = e.target.value
    setLoading(false)
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
                {tasks.length > 0 ? 'Create new task' : 'Create one!'} <BiPlusCircle />
              </button>
              <button className={styles.logout} onClick={handleLogout}> Logout <BiBoxArrowInRight/></button>
            </div>
            <div className={styles.tasks}>
              {tasks.length > 0
                ? (
                    tasks.map((task, index) => (
                      <div className={styles.task} key={index}>
                        <div className={styles.statusIcon} style={{ color: `${colorOption[0][task.priority]}` }}>
                          {svgOption[0][task.status]}
                        </div>
                        <p className={styles.taskName}>{task.task}</p>
                        <div className={styles.actions}>
                          <select defaultValue={task.priority} data-type="priority" onChange={(e) => handleUpdate(e, index)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                            <option values="Critical">Critical</option>
                          </select>
                          <select defaultValue={task.status} data-type="status" onChange={(e) => handleUpdate(e, index)}>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button className={styles.deleteButton} onClick={(e) => handleDelete(e,index)}>
                            Delete <BiTrash />
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
function limparInputs (setTaskName, setPriority) {
  setTaskName('')
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
