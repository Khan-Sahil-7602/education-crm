import { useEffect, useState } from "react";
import EmpSidePanel from "../../components/EmpSidePanel";

import "./FollowUp.css";
import { getFollowUpPhoneNo, getInquiryData } from "../../api/empApi";
import ModalForm from "../../components/ModalForm";

function FollowUp() {
  const today = new Date().toISOString().split("T")[0];

  const [followUpDate, setFollowUpDate] = useState(today);

  const [phoneNo, setPhoneNo] = useState(null);

  const [discussionDetails, setDiscussionDetails] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFollowUpPhoneNo = async () => {
      try {
        const data = await getFollowUpPhoneNo(followUpDate);
        setPhoneNo(data.data);
      } catch (error) {
        setPhoneNo(null);
        setDiscussionDetails(null);
        setErrorMsg(error.message);
      }
    };
    fetchFollowUpPhoneNo();
  }, [followUpDate]);

  const handleChange = (e) => {
    setFollowUpDate(e.target.value);
  };

  const getAllDiscussion = async () => {
    const response = await getInquiryData(phoneNo);
    setDiscussionDetails(response.data);
  };

  let customerName = "";

  if (discussionDetails) {
    customerName = discussionDetails[0].name;
  }

  return (
    <main>
      <EmpSidePanel />
      <section className="container">
        <div>
          <h1>Follow Ups</h1>
          <p>Below are the follow-ups list, handle customers proficiently.</p>
        </div>

        <div className="follow-up-container">
          <div className="follow-up-container-input">
            <label htmlFor="follow-date">Select Follow Up Date :</label>
            <input
              type="date"
              value={followUpDate}
              onChange={handleChange}
              id="follow-date"
            />
          </div>
          {phoneNo !== null ? (
            <div className="follow-up-container-details">
              <h4>
                Customer Phone No : <span>{phoneNo}</span>
              </h4>
              <button className="details-btn" onClick={getAllDiscussion}>
                Get All Details
              </button>
            </div>
          ) : (
            <h1>{errorMsg}</h1>
          )}
        </div>

        {discussionDetails && (
          <div className="discussion-details">
            <h1>Discussion Details</h1>
            <div className="details-container">
              <h4>Customer Name : {discussionDetails[0].name}</h4>
              <table>
                <thead>
                  <tr>
                    <th>Interested Course</th>
                    <th>Discussion</th>
                    <th>Inquiry Type</th>
                    <th>Call Type</th>
                    <th>Date Of Inquiry</th>
                    <th>Time Of Inquiry</th>
                  </tr>
                </thead>
                <tbody>
                  {discussionDetails.map((data) => (
                    <tr key={data.id}>
                      <td>{data.interestedCourse}</td>
                      <td>{data.discussion}</td>
                      <td>{data.inquiryType}</td>
                      <td>{data.callType}</td>
                      <td>{data.dateOfInquiry}</td>
                      <td>{data.timeOfInquiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="discussion-btn"
                onClick={() => setShowModal(true)}
              >
                Add New Discussion
              </button>
            </div>
          </div>
        )}
      </section>
      {showModal && (
        <ModalForm
          onClose={() => setShowModal(false)}
          name={customerName}
          phone={phoneNo}
        />
      )}
    </main>
  );
}

export default FollowUp;
