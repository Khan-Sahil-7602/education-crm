import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./FeedBackForm.css";
import { useState } from "react";
import { handleCustomerFeedback } from "../../api/customerApi";

function FeedBackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handleCustomerFeedback(formData);
      setFormData({
        name: "",
        email: "",
        feedback: "",
      });
      alert(response.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="customer-feedback">
        <h2>Customer Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              name="feedback"
              id="feedback"
              rows={5}
              value={formData.feedback}
              onChange={handleChange}
            />
          </div>
          <button>Send Feedback</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default FeedBackForm;
