import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import type { Task } from '../types/task';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface TaskState {
  tasks: Task[];
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

export interface TaskAction {
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
}

export type TaskStore = TaskState & TaskAction;

const mapRowToTask = (row: Record<string, any>): Task => ({
  id: row.id,
  title: row.title,
  description: row.description ?? undefined,
  status: row.status,
  priority: row.priority,
  createdAt: new Date(row.created_at),
  dueDate: row.due_date ? new Date(row.due_date) : undefined,
  projectId: row.project_id,
});

const createTaskSlice: StateCreator<TaskStore> = (set) => ({
  tasks: [],
  projects: [
    {
      id: 'proj-1',
      name: 'Website Project',
      description: 'Company website redesign',
      color: '#3B82F6',
    },
    {
      id: 'proj-2',
      name: 'Research',
      description: 'Market research and analysis',
      color: '#8B5CF6',
    },
  ],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });

    const { data, error } = await supabase.from('tasks').select('*');

    if (error) {
      set({ error: error.message, isLoading: false });
      return;
    }

    set({ tasks: (data ?? []).map(mapRowToTask), isLoading: false });
  },

  addTask: async (task) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title: task.title,
        description: task.description ?? null,
        status: task.status,
        priority: task.priority,
        due_date: task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : null,
        project_id: task.projectId,
      })
      .select()
      .single();

    if (error) {
      set({ error: error.message });
      return;
    }

    set((state) => ({ tasks: [...state.tasks, mapRowToTask(data)] }));
  },

  deleteTask: async (id) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) {
      set({ error: error.message });
      return;
    }

    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
  },

  updateTask: async (id, updatedTask) => {
    const dbFields: Record<string, unknown> = {};
    if (updatedTask.title !== undefined) dbFields.title = updatedTask.title;
    if (updatedTask.description !== undefined)
      dbFields.description = updatedTask.description ?? null;
    if (updatedTask.status !== undefined) dbFields.status = updatedTask.status;
    if (updatedTask.priority !== undefined)
      dbFields.priority = updatedTask.priority;
    if (updatedTask.dueDate !== undefined) {
      dbFields.due_date = updatedTask.dueDate
        ? format(updatedTask.dueDate, 'yyyy-MM-dd')
        : null;
    }
    if (updatedTask.projectId !== undefined)
      dbFields.project_id = updatedTask.projectId;

    const { error } = await supabase
      .from('tasks')
      .update(dbFields)
      .eq('id', id);

    if (error) {
      set({ error: error.message });
      return;
    }

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      ),
    }));
  },
});

export const useTaskStore = create<TaskStore>()(createTaskSlice);
