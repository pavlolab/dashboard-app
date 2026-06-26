import type { Task } from '../types/task';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

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

const TaskDetailModal = ({ task, onClose }: TaskDetailModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-semibold">Task Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
              Title
            </p>
            <p className="text-white font-medium">{task.title}</p>
          </div>

          {task.description && (
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                Description
              </p>
              <p className="text-gray-300 text-sm">{task.description}</p>
            </div>
          )}

          <div className="flex gap-6">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                Status
              </p>
              <StatusBadge status={task.status} />
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                Priority
              </p>
              <PriorityBadge priority={task.priority} />
            </div>
          </div>

          {task.dueDate && (
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                Due Date
              </p>
              <p className="text-white text-sm">
                {new Date(task.dueDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
              Created
            </p>
            <p className="text-gray-300 text-sm">
              {new Date(task.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
