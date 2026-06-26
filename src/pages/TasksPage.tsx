import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import type { Task } from '../types/task';
import AddTaskModal from '../components/AddTaskModal';
import { useUIStore } from '../store/uiStore';
import ConfirmDialog from '../components/ConfirmDialog';
import { useToastStore } from '../store/toastStore';
import Skeleton from '../components/Skeleton';
const StatusBadge = ({ status }: { status: Task['status'] }) => {
  const styles = {
    todo: 'bg-gray-600 text-gray-200',
    'in-progress': 'bg-blue-600 text-blue-100',
    done: 'bg-green-600 text-green-100',
  };
  const labels = {
    todo: 'To Do',
    'in-progress': 'In Progress',
    done: 'Done',
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};
const PriorityBadge = ({ priority }: { priority: Task['priority'] }) => {
  const styles = {
    low: 'bg-gray-700 text-gray-300',
    medium: 'bg-yellow-600 text-yellow-100',
    high: 'bg-red-600 text-red-100',
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
};

const TasksPage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const isLoading = useTaskStore((state) => state.isLoading);
  const error = useTaskStore((state) => state.error);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const addToast = useToastStore((state) => state.addToast);
  const [statusFilter, setStatusFilter] = useState<Task['status'] | 'all'>(
    'all',
  );
  const [priorityFilter, setPriorityFilter] = useState<
    Task['priority'] | 'all'
  >('all');
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const {
    isAddTaskModalOpen,
    openAddTaskModal,
    closeAddTaskModal,
    searchQuery,
  } = useUIStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === 'all' || task.status === statusFilter;
    const priorityMatch =
      priorityFilter === 'all' || task.priority === priorityFilter;
    const searchMatch =
      searchQuery === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && priorityMatch && searchMatch;
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="flex gap-3 mb-6">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Помилка: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Tasks</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">
            {filteredTasks.length} tasks
          </span>
          <button
            onClick={openAddTaskModal}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors text-sm"
          >
            + Add New Task
          </button>
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as Task['status'] | 'all')
          }
          className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm focus:outline-none focus:border-orange-500"
        >
          <option value="all">All status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value as Task['priority'] | 'all')
          }
          className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm focus:outline-none focus:border-orange-500"
        >
          <option value="all">All priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">
                Назва
              </th>
              <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">
                Статус
              </th>
              <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">
                Пріоритет
              </th>
              <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">
                Дедлайн
              </th>
              <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
              >
                <td className="px-4 py-3 text-white">{task.title}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={task.status} />
                </td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={task.priority} />
                </td>
                <td className="px-4 py-3 text-gray-400 text-sm">
                  {task.dueDate ? task.dueDate.toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setTaskToEdit(task)}
                    className="text-gray-500 hover:text-blue-400 transition-colors text-sm mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setTaskToDelete(task.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isAddTaskModalOpen && <AddTaskModal onClose={closeAddTaskModal} />}
      {taskToEdit && (
        <AddTaskModal task={taskToEdit} onClose={() => setTaskToEdit(null)} />
      )}
      {taskToDelete && (
        <ConfirmDialog
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={() => {
            deleteTask(taskToDelete);
            setTaskToDelete(null);
            addToast('Task deleted successfully', 'success');
          }}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
};

export default TasksPage;
