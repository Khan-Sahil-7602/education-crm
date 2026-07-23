import { useEffect, useRef, useState } from "react";
import { getCustomerData } from "../../api/customerApi";
import { getToken } from "../../utils/auth";

import "./CustomerProfile.css";

import Header from "../../components/Header";

function CustomerProfile() {
  const token = getToken();

  const [customerData, setCustomerData] = useState([]);

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await getCustomerData(token);
        setCustomerData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (hasFetched.current) {
      return;
    }

    hasFetched.current = true;

    fetchCustomerData();
  }, [token]);

  return (
    <>
      <Header />

      <div className="customer-profile">
        <section className="show-user-details">
          <div className="profile-image">
            <img src="/user.png" />
            <span>{customerData.name}</span>
          </div>
          <div className="profile-desc">
            <h4>User Details</h4>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{customerData.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{customerData.email}</td>
                </tr>
                <tr>
                  <td>Phone No.</td>
                  <td>{customerData.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export default CustomerProfile;
