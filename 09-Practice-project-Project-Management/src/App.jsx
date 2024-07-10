import { useState } from "react";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[]
  })

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random()
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      }
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }})
  }

  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        )
      }})   
    }
  
  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }})
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }})
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }})   
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }}) 
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        )
      }})   
    }

  const selectedProject = projectsState.projects.find((project) => project.id === projectsState.selectedProjectId)
  let content = <SelectedProject 
                  project={selectedProject}
                  handleDeleteProject={handleDeleteProject}
                  handleAddTask={handleAddTask}
                  handleDeleteTask={handleDeleteTask}
                  tasks={projectsState.tasks}
                ></SelectedProject>

  if(projectsState.selectedProjectId === null) {
    content = <NewProject handleAddProject={handleAddProject} handleCancelAddProject={handleCancelAddProject}/>
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        handleSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
