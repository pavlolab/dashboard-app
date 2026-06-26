import { useState, useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import TaskDetailModal from '../components/TaskDetailModal';
import type { Task } from '../types/task';
const CalendarPage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (tasks.length === 0) fetchTasks();
  }, [tasks.length, fetchTasks]);
  const buildCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = [];
    let day = calendarStart;

    while (day <= calendarEnd) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const days = buildCalendarDays();

  const getTasksForDay = (day: Date) => {
    return tasks.filter(
      (task) => task.dueDate && isSameDay(new Date(task.dueDate), day),
    );
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Calendar</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          >
            ←
          </button>
          <span className="text-white font-medium w-36 text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          >
            →
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors text-sm"
          >
            Today
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 flex-1 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-700">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div
              key={day}
              className="px-3 py-2 text-gray-400 text-sm font-medium text-center"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-1">
          {days.map((day, index) => {
            const dayTasks = getTasksForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isTodayDate = isToday(day);

            return (
              <div
                key={index}
                className={`min-h-24 p-2 border-b border-r border-gray-700 ${
                  !isCurrentMonth ? 'bg-gray-900/50' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-sm mb-1 ${
                    isTodayDate
                      ? 'bg-orange-500 text-white font-bold'
                      : isCurrentMonth
                        ? 'text-gray-300'
                        : 'text-gray-600'
                  }`}
                >
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`text-xs px-1.5 cursor-pointer py-0.5 rounded truncate ${
                        task.priority === 'high'
                          ? 'bg-red-500/30 text-red-300'
                          : task.priority === 'medium'
                            ? 'bg-yellow-500/30 text-yellow-300'
                            : 'bg-blue-500/30 text-blue-300'
                      }`}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayTasks.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default CalendarPage;
