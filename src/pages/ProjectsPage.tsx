import { useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';

const ProjectsPage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const projects = useTaskStore((state) => state.projects);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const isLoading = useTaskStore((state) => state.isLoading);
  useEffect(() => {
    if (tasks.length === 0) fetchTasks();
  }, [tasks.length, fetchTasks]);
  if (isLoading) return <div className="p-6 text-white">Loading...</div>;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Projects</h1>
        <span className="text-gray-400 text-sm">
          {projects.length} projects
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
        {projects.map((project) => {
          const projectTasks = tasks.filter((t) => t.projectId === project.id);
          const total = projectTasks.length;
          const done = projectTasks.filter((t) => t.status === 'done').length;
          const inProgress = projectTasks.filter(
            (t) => t.status === 'in-progress',
          ).length;
          const todo = projectTasks.filter((t) => t.status === 'todo').length;
          const progress = total > 0 ? Math.round((done / total) * 100) : 0;
          return (
            <div
              key={project.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <h2 className="text-white font-medium">{project.name}</h2>
              </div>

              <p className="text-gray-400 text-sm mb-4">
                {project.description}
              </p>
              <div className="flex gap-4 mb-4">
                <div className="text-center">
                  <p className="text-white font-bold">{total}</p>
                  <p className="text-gray-500 text-xs">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-400 font-bold">{inProgress}</p>
                  <p className="text-gray-500 text-xs">In Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-green-400 font-bold">{done}</p>
                  <p className="text-gray-500 text-xs">Done</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 font-bold">{todo}</p>
                  <p className="text-gray-500 text-xs">To Do</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: project.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProjectsPage;
