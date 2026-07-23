import { useState } from "react";
import EmployeeSidePanel from "../../components/EmpSidePanel";

import "./NewInquiry.css";
import { addInquiry } from "../../api/empApi";

const INQUIRY_TYPE = [
  "Call",
  "Mail",
  "Website",
  "Social Media",
  "Reference",
  "Advertisement",
  "Others",
];

const STATUS = [
  "Interested(Follow Up)",
  "Interested(Closed)",
  "Not Interested(Closed)",
  "Purchased(Closed)",
  "Others(Closed)",
];

function NewInquiry() {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    interestedCourse: "",
    discussion: "",
    inquiryType: "",
    callType: "",
    status: "",
    dateOfInquiry: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addInquiry(formData);
      setFormData({
        phone: "",
        name: "",
        interestedCourse: "",
        discussion: "",
        inquiryType: "",
        callType: "",
        status: "",
        dateOfInquiry: "",
      });
      alert(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <EmployeeSidePanel />

      <section className="dashboard">
        <h2>Add a new inquiry</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone-no">Customer Phone No</label>
            <input
              type="text"
              name="phone"
              id="phone-no"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="interested-course">Interested Course</label>
            <input
              type="text"
              name="interestedCourse"
              id="interestedCourse"
              value={formData.interestedCourse}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="discussion">Discussion</label>
            <textarea
              name="discussion"
              id="discussion"
              rows={10}
              value={formData.discussion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Inquiry Type</label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Inquiry Type
              </option>
              {INQUIRY_TYPE.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Call Type</label>
            <select
              name="callType"
              value={formData.callType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Call Type
              </option>
              <option value="Inbound">Inbound</option>
              <option value="Outbound">Outbound</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              {STATUS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {formData.status === "Interested(Follow Up)" && (
            <div className="form-group">
              <label htmlFor="follow-date">Follow Up Date</label>
              <input
                type="date"
                name="dateOfInquiry"
                id="follow-date"
                value={formData.dateOfInquiry}
                onChange={handleChange}
              />
            </div>
          )}

          <button id="inq-btn">Submit Inquiry</button>
        </form>
      </section>
    </main>
  );
}

export default NewInquiry;
