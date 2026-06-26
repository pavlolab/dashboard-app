import { useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import type { Task } from '../types/task';
import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useToastStore } from '../store/toastStore';
const columns: { status: Task['status']; title: string; color: string }[] = [
  { status: 'todo', title: 'To Do', color: 'text-gray-300' },
  { status: 'in-progress', title: 'In Progress', color: 'text-blue-400' },
  { status: 'done', title: 'Done', color: 'text-green-400' },
];
const TaskCard = ({ task }: { task: Task }) => {
  const priorityStyles = {
    low: 'bg-gray-700 text-gray-300',
    medium: 'bg-yellow-600 text-yellow-100',
    high: 'bg-red-600 text-red-100',
  };
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 50,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-gray-700 rounded-lg p-3 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <p className="text-white text-sm font-medium mb-2">{task.title}</p>
      <span
        className={`text-xs px-2 py-0.5 rounded ${priorityStyles[task.priority]}`}
      >
        {task.priority}
      </span>
    </div>
  );
};
const Column = ({
  status,
  title,
  color,
  tasks,
}: {
  status: Task['status'];
  title: string;
  color: string;
  tasks: Task[];
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });
  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-800 rounded-lg border p-4 flex flex-col transition-colors ${
        isOver ? 'border-orange-500' : 'border-gray-700'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className={`font-medium ${color}`}>{title}</h2>
        <span className="text-gray-500 text-sm bg-gray-700 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-2 flex-1 min-h-20">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
const BoardPage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    if (tasks.length === 0) fetchTasks();
  }, [tasks.length, fetchTasks]);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    updateTask(taskId, { status: newStatus });
    addToast(`Task moved to ${newStatus}`, 'success');
  };
  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-white text-2xl font-semibold mb-6">Board</h1>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          {columns.map((column) => (
            <Column
              key={column.status}
              status={column.status}
              title={column.title}
              color={column.color}
              tasks={tasks.filter((t) => t.status === column.status)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default BoardPage;
