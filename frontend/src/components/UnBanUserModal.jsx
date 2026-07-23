import { Check, X } from "lucide-react";

import { unBanUser } from "../api/customerApi";
import "./BanUserModal.css";

function UnBanUserModal({ userId, onClose, onSuccess }) {
  const handleUnBan = async () => {
    try {
      await unBanUser(userId);
      alert("User UnBanned");
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="ban-modal">
        <h4>Are you sure want to unban the user?</h4>
        <div className="modal-ban-btns">
          <button onClick={onClose}>
            <X size={30} />
          </button>
          <button onClick={handleUnBan}>
            <Check size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnBanUserModal;
