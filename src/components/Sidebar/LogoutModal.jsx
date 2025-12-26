import { useDispatch } from "react-redux";
import { logout } from "../../feautures/auth/authSlice";
import BasicModal from "../ui/BasicModal";

const LogoutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const confirmLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <BasicModal open={isOpen} onClose={onClose}>
      <div className="max-w-[500px] text-[var(--text-primary)] flex flex-col rounded-xl shadow-lg p-10">
        <div>
          <h2 className="text-4xl font-semibold mb-4">Log out?</h2>
          <p className="mb-6">Are you sure you want to log out?</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-black rounded-md w-[70%] hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={confirmLogout}
            className="px-4 py-2 bg-green-600 text-white rounded-md w-[70%] hover:bg-green-700"
          >
            Logout
          </button>
        </div>
      </div>
    </BasicModal>
  );
};

export default LogoutModal;
