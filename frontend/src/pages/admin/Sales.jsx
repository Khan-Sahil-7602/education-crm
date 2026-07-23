import AdminSidePanel from "../../components/AdminSidePanel.jsx";

import { IndianRupee } from "lucide-react";

import "./Sales.css";

function EmployeeSales() {
  return (
    <main>
      <AdminSidePanel />
      <section className="employee-sales">
        <h1>Employee Sales</h1>
        <p>
          Below are the details of total sales and individual sales information.
        </p>
        <div className="employee-sales-information">
          <h2>
            Total Sales :
            <span>
              <IndianRupee size={15} />
              5999
            </span>
          </h2>
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Phone NO</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Joy Adak</td>
                <td>joy@gmail.com</td>
                <td>9876543210</td>
                <td>5999</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default EmployeeSales;
