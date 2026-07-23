import AdminSidePanel from "../../components/AdminSidePanel.jsx";

import { IndianRupee } from "lucide-react";

import "./Sales.css";
import { useEffect, useState } from "react";
import { getEmpIndivTotalSales, getTotalSaleByEmp } from "../../api/empApi.js";

function Sales() {
  const [empIndivSaleData, setEmpIndivSaleData] = useState(null);

  const [totalSales, setTotalSales] = useState(null);

  useEffect(() => {
    const fetchIndivEmpSaleData = async () => {
      try {
        const response = await getEmpIndivTotalSales();
        setEmpIndivSaleData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchTotalSaleByEmp = async () => {
      try {
        const response = await getTotalSaleByEmp();
        setTotalSales(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTotalSaleByEmp();
    fetchIndivEmpSaleData();
  }, []);

  return (
    <main>
      <AdminSidePanel />
      <section className="employee-sales">
        <h1>Employee Sales</h1>
        <p>
          Below are the details of total sales and individual sales information.
        </p>
        <div className="employee-sales-information">
          {totalSales && empIndivSaleData?.length > 0 && (
            <>
              <h2>
                Total Sales :
                <span>
                  <IndianRupee size={15} />
                  {parseFloat(totalSales).toFixed(2)}
                </span>
              </h2>
              <table>
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Employee Email</th>
                    <th>Phone No</th>
                    <th>Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {empIndivSaleData.map((data) => (
                    <tr key={data.userId}>
                      <td>{data.userName}</td>
                      <td>{data.userEmail}</td>
                      <td>{data.phoneNo}</td>
                      <td>
                        <IndianRupee size={15} />
                        {parseFloat(data.empIndivSale).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Sales;
