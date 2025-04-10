import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Toast = () => {
  return (
    <ToastContainer
      position="top-right" // Position of the toast
      autoClose={3000} // Close after 3 seconds
      hideProgressBar={false} // Show progress bar
      newestOnTop={true} // Display newest toast on top
      closeOnClick // Close when clicked
      rtl={false} // Support Right-To-Left
      pauseOnFocusLoss // Pause on focus loss
      draggable // Allow dragging the toast
      pauseOnHover // Pause on hover
    />
  );
};

// Helper functions to trigger toasts
export const toastSuccess = (message) => toast.success(message);
export const toastError = (message) => toast.error(message);
export const toastWarning = (message) => toast.warn(message);

export default Toast;