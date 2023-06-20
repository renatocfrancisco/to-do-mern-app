import { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import styles from "./home.module.css"

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [createOption, setCreateOption] = useState(false);
  const [task, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const getTasks = async () => {
    return await axiosInstance.get("/task");
  };

  const createTask = async (data) => {
    console.log(data)
    return await axiosInstance.post("/task", data);
  };

  useEffect(() => {
    document.title = "to-do-mern-app - Home";
    tarefas(getTasks, setTasks, setLoading);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await createTask({task, description, priority});
    if (result.status === 201) {
      setCreateOption(false);
      tarefas(getTasks, setTasks, setLoading);
    } else {
      alert(result);
    }
    setLoading(false);
  };

  const handleCreateOption = async (e) => {
    e.preventDefault();
    setCreateOption(true);
  };

  const deleteTask = async (id) => {
    return await axiosInstance.delete(`/task/${id}`);
  };

  return (
    <>
      <div className="home">
        <h1>HOME</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className={styles.tasks}>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <div className={styles.task} key={index}>
                    <p className="title">{task.task}</p>
                    <p className="description">{task.description}</p>
                    <p className="priority">{task.priority}</p>
                    <p className="status">{task.status}</p>
                    <button onClick={deleteTask(task._id)}>Delete task</button>
                  </div>
                ))
              ) : (
                <>
                  <p>No tasks</p>
                </>
              )}
            </div>
            <button hidden={createOption} onClick={handleCreateOption}>
              Create new task
            </button>
            <div className="create" hidden={!createOption}>
              <form>
                <label>
                  <p>Task</p>
                  <input
                    type="text"
                    autoComplete="task"
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
                    onSelect={(e) => setPriority(e.target.value)}
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
  );
}
function tarefas(getTasks, setTasks, setLoading) {
  getTasks()
    .then((result) => {
      console.log(result);
      setTasks(result.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}

