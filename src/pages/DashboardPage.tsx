import { useTaskStore } from '../store/taskStore';
import { format, isAfter, isBefore } from 'date-fns';
import { useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import Skeleton from '../components/Skeleton';

const DashboardPage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const isLoading = useTaskStore((state) => state.isLoading);

  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === 'in-progress',
  ).length;
  const completedTasks = tasks.filter((task) => task.status === 'done').length;
  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate || task.status === 'done') return false;
    return isBefore(new Date(task.dueDate), new Date());
  }).length;

  const prepareChartData = () => {
    const groupedByDate = tasks.reduce(
      (acc, task) => {
        const date = new Date(task.createdAt).toLocaleDateString('en-CA');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    return Object.entries(groupedByDate).map(([date, count]) => ({
      date,
      tasks: count,
    }));
  };

  const chartData = prepareChartData();

  const upcomingTasks = tasks
    .filter((task) => task.dueDate)
    .filter((task) => isAfter(new Date(task.dueDate!), new Date()))
    .sort(
      (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
    )
    .slice(0, 5);

  const statusList = [
    { name: 'Total', value: tasks.length, color: 'white' },
    { name: 'In Progress', value: inProgressTasks, color: '#3B82F6' },
    {
      name: 'In Review',
      value: tasks.filter((t) => t.status === 'todo').length,
      color: '#F59E0B',
    },
    { name: 'Completed', value: completedTasks, color: '#10B981' },
    { name: 'On Hold', value: 0, color: '#6B7280' },
  ];

  const pieChartData = statusList.filter((item) => item.name !== 'Total');

  useEffect(() => {
    if (tasks.length === 0 && !isLoading) {
      fetchTasks();
    }
  }, [tasks.length, isLoading, fetchTasks]);

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-80 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-shadow">
          <div className="text-yellow-400 text-sm">Total Tasks</div>
          <div className="text-white text-3xl font-bold mt-2">{totalTasks}</div>
          <div className="text-gray-400 text-sm mt-2">
            <span className="text-yellow-400">+12%</span> from last week
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:shadow-[0_0_20px_rgba(96,165,250,0.4)] transition-shadow">
          <div className="text-blue-400 text-sm">In Progress</div>
          <div className="text-white text-3xl font-bold mt-2">
            {inProgressTasks}
          </div>
          <div className="text-gray-400 text-sm mt-2">
            <span className="text-blue-400">+8%</span> from last week
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-shadow">
          <div className="text-green-400 text-sm">Completed</div>
          <div className="text-white text-3xl font-bold mt-2">
            {completedTasks}
          </div>
          <div className="text-gray-400 text-sm mt-2">
            <span className="text-green-400">+24%</span> from last week
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:shadow-[0_0_20px_rgba(248,113,113,0.4)] transition-shadow">
          <div className="text-red-400 text-sm">Overdue</div>
          <div className="text-white text-3xl font-bold mt-2">
            {overdueTasks}
          </div>
          <div className="text-gray-400 text-sm mt-2">
            <span className="text-red-400">+4%</span> from last week
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
        <h2 className="text-white text-xl mb-4">Tasks Overview</h2>
        {chartData.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  borderColor: '#374151',
                }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Area
                type="monotone"
                dataKey="tasks"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#taskGradient)"
                dot={{
                  fill: '#3B82F6',
                  stroke: '#3B82F6',
                  strokeWidth: 2,
                  r: 4,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-white text-xl mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex justify-between items-center">
                <div>
                  <div className="text-white font-medium">{task.title}</div>
                  <div className="text-gray-400 text-sm">
                    {task.projectId === 'proj-1'
                      ? 'Website Project'
                      : 'Research'}
                  </div>
                </div>
                <div className="text-orange-400 text-sm">
                  {format(new Date(task.dueDate!), 'MMM dd, yyyy')}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-white text-xl mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div>
              <div className="text-gray-300 text-sm">
                <span className="text-white font-medium">Alex Johnson</span>{' '}
                completed "Design System"
              </div>
              <div className="text-gray-500 text-xs mt-1">2 months ago</div>
            </div>
            <div>
              <div className="text-gray-300 text-sm">
                <span className="text-white font-medium">Sarah Williams</span>{' '}
                commented on "User Research"
              </div>
              <div className="text-gray-500 text-xs mt-1">1 hour ago</div>
            </div>
            <div>
              <div className="text-gray-300 text-sm">
                <span className="text-white font-medium">Mike Chen</span>{' '}
                updated task "API Integration"
              </div>
              <div className="text-gray-500 text-xs mt-1">3 hours ago</div>
            </div>
            <div>
              <div className="text-gray-300 text-sm">
                <span className="text-white font-medium">Emily Davis</span>{' '}
                created project "Marketing Campaign"
              </div>
              <div className="text-gray-500 text-xs mt-1">5 hours ago</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-white text-xl mb-6">Projects Status</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-3">
              {statusList.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-400">{item.name}</span>
                  <span
                    className="font-bold"
                    style={{
                      color: item.name === 'Total' ? 'white' : item.color,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-white text-3xl font-bold">
                    {tasks.length}
                  </div>
                  <div className="text-gray-400 text-sm">Total Tasks</div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-6 m-auto">
                {pieChartData.map((item) => {
                  const percentage =
                    tasks.length > 0
                      ? Math.round((item.value / tasks.length) * 100)
                      : 0;
                  return (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-400 text-sm">{item.name}</span>
                      <span className="text-white text-sm font-medium">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
