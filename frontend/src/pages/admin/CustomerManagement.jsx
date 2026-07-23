import AdminSidePanel from "../../components/AdminSidePanel";

import { Check, Ellipsis, X } from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getCustomerList } from "../../api/customerApi";
import BanUserModal from "../../components/BanUserModal";
import "./CustomerManagement.css";
import UnBanUserModal from "../../components/UnBanUserModal";

function CustomerManagement() {
  const [customersData, setCustomersData] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null);

  const [showBanModal, setShowBanModal] = useState(false);

  const [showUnBanModal, setShowUnBanModal] = useState(false);

  useEffect(() => {
    const fetchCustomersList = async () => {
      try {
        const data = await getCustomerList();
        setCustomersData(data.data);
      } catch (error) {
        setErrorMsg(error.message);
      }
    };

    fetchCustomersList();
  }, []);

  const handleBanClick = (userId) => {
    setSelectedUserId(userId);
    setShowBanModal(true);
  };

  const handleUnBanClick = (userId) => {
    setSelectedUserId(userId);
    setShowUnBanModal(true);
  };

  const onSuccess = async () => {
    const fetchCustomersList = async () => {
      try {
        const data = await getCustomerList();
        setCustomersData(data.data);
      } catch (error) {
        setErrorMsg(error.message);
      }
    };

    fetchCustomersList();
  };

  return (
    <main>
      <AdminSidePanel />
      <section className="customer-manage-container">
        <h1>Manage Customers</h1>
        <p>You can view, update and delete customers from here.</p>
        <div className="customer-desc-container">
          <h2>Customers List</h2>
          {customersData !== null ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone NO</th>
                  <th>Active Status</th>
                  <th>Ban</th>
                  <th>Unban</th>
                  <th>Full Details</th>
                </tr>
              </thead>
              <tbody>
                {customersData.map((customer) => (
                  <tr key={customer.userId}>
                    <td>{customer.customerName}</td>
                    <td>{customer.customerEmail}</td>
                    <td>{customer.phoneNo}</td>
                    <td>{customer.activeStatus ? "Active" : "Inactive"}</td>
                    <td>
                      <button
                        className="ban-btn"
                        onClick={() => handleBanClick(customer.userId)}
                      >
                        <X size={25} />
                      </button>
                    </td>
                    <td>
                      <button
                        className="unban-btn"
                        onClick={() => handleUnBanClick(customer.userId)}
                      >
                        <Check size={25} />
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/courseDetails/${customer.userId}`}
                        className="full-desc-link"
                      >
                        <Ellipsis size={25} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3>{errorMsg}</h3>
          )}
        </div>
      </section>
      {showBanModal && (
        <BanUserModal
          userId={selectedUserId}
          onClose={() => setShowBanModal(false)}
          onSuccess={onSuccess}
        />
      )}
      {showUnBanModal && (
        <UnBanUserModal
          userId={selectedUserId}
          onClose={() => setShowUnBanModal(false)}
          onSuccess={onSuccess}
        />
      )}
    </main>
  );
}

export default CustomerManagement;
