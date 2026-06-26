import { useToastStore } from '../store/toastStore';
import { TfiCheck, TfiClose, TfiAlert } from 'react-icons/tfi';

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-64 animate-in slide-in-from-bottom-2 ${
            toast.type === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {toast.type === 'success' ? (
            <TfiCheck size={16} />
          ) : (
            <TfiAlert size={16} />
          )}
          <span className="text-sm flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)}>
            <TfiClose size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
