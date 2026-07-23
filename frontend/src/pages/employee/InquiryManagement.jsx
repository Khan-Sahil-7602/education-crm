import { Link } from "react-router";

import EmployeeSidePanel from "../../components/EmpSidePanel";

import "./InquiryManagement.css";
import { useState } from "react";
import { getInquiryData } from "../../api/empApi";
import ModalForm from "../../components/ModalForm";
import { Plus } from "lucide-react";

function InquiryManagement() {
  const [phone, setPhone] = useState("");

  const [inquiryData, setInquiryData] = useState(null);

  const [message, setMessage] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSearch = async () => {
    if (phone.length !== 10) {
      alert("Enter a valid 10 digit phone no");
      return;
    }

    try {
      const response = await getInquiryData(phone);
      setInquiryData(response.data);
      setPhone("");
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main>
      <EmployeeSidePanel />
      <section className="dashboard">
        <h2>Inquiry Management</h2>
        <p>You can search & add new inquiry here.</p>

        <div className="search-box">
          <div className="input-box">
            <div>
              <input
                type="tel"
                placeholder="Enter phone no"
                value={phone}
                onChange={handleChange}
                maxLength={10}
              />
              <button onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            {inquiryData && (
              <button
                className="show-modal-btn"
                onClick={() => setShowModal(true)}
              >
                <Plus />
              </button>
            )}
          </div>
          <Link to="/new-inquiry" className="new-inquiry-btn">
            New Inquiry
          </Link>
        </div>

        {message && <p>{message}</p>}

        {inquiryData && (
          <table>
            <thead>
              <tr>
                <th>Interested Course</th>
                <th>Discussion</th>
                <th>Inquiry Type</th>
                <th>Call Type</th>
                <th>Inquiry Date/Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiryData.map((data) => (
                <tr key={data.id}>
                  <td>{data.interestedCourse}</td>
                  <td>{data.discussion}</td>
                  <td>{data.inquiryType}</td>
                  <td>{data.callType}</td>
                  <td>{`${data.dateOfInquiry} / ${data.timeOfInquiry}`}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      {showModal && (
        <ModalForm
          onClose={() => setShowModal(false)}
          name={inquiryData[0].name}
          phone={inquiryData[0].phone}
        />
      )}
    </main>
  );
}

export default InquiryManagement;
