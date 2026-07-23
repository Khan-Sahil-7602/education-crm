import { Check, X } from "lucide-react";

import { banUser } from "../api/customerApi";
import "./BanUserModal.css";

function BanUserModal({ userId, onClose, onSuccess }) {
  const handleBan = async () => {
    try {
      await banUser(userId);
      alert("User Banned");
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="ban-modal">
        <h4>Are you sure want to ban the user?</h4>
        <div className="modal-ban-btns">
          <button onClick={onClose}>
            <X size={30} />
          </button>
          <button onClick={handleBan}>
            <Check size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BanUserModal;
