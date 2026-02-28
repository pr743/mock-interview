import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ITEMS_PER_PAGE = 10;

function Home() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const loadData = () => {
    fetch("http://localhost:9000/employees")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await fetch(`http://localhost:9000/employees/${id}`, {
      method: "DELETE",
    });

    loadData();
  };

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.employeeId.toUpperCase().includes(search.toUpperCase()) ||
      u.phone.toUpperCase().includes(search.toUpperCase())  ||
      u.email.toUpperCase().includes(search.toUpperCase())

  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );


  const handleSearch = ()=>{
    setCurrentPage(1);
  }
  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="table-container bg-white p-4 rounded-3xl shadow-3xl w-full max-w-5xl">
          <h1 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-300 to-blue-400 text-transparent bg-clip-text animate-fadeSlide">
            Employee Details
          </h1>


          <div className="flex flex-col md:flex-row justify-between gap-2 mb-1">



          <div className="relative w-full md:w-1/2">
           <span 
           onClick={handleSearch}
           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
           >

          </span>

          <input
              type="text"
              placeholder="Search by Employee Name or ID...."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
             className="border pl-10 pr-4 py-2 rounded-lg w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

          </div>

            <button
              onClick={() => navigate("/add")}

               className="bg-green-600 text-white px-3 py-2 text-sm rounded-lg shadow hover:bg-green-700 transition flex items-center gap-1"
            >
              Add NEW employees
            </button>
          </div>

          <table className="w-full border-collapse overflow-hidden rounded-2xl shadow-xl">
            <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white animate-headerGradient">
              <tr>
                <th className="px-2 py-3">EmployeeId</th>
                <th className="px-2 py-3">FullName</th>
                <th className="px-2 py-3">Email</th>
                <th className="px-2 py-3">Phone</th>
                <th className="px-2 py-3">Address</th>
                <th className="px-2 py-3">Department</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No records found
                  </td>
                </tr>
              ) : (
                currentUsers.map((u, i) => (
                  <tr
                    key={u.id}
                    className="table-row border-b animate-fadeSlide rainbow-row hover-row-glow"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    <td className="px-3 py-3">{u.employeeId}</td>
                    <td className="px-3 py-3">{u.fullName}</td>
                    <td className="px-3 py-3">{u.email}</td>
                    <td className="px-3 py-3">{u.phone}</td>
                    <td className="px-3 py-3">{u.address}</td>
                    <td className="px-3 py-3">{u.department}</td>

                    <td className="flex gap-2 px-4 py-3">
                      <button
                        onClick={() => navigate(`/sever/${u.id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteStudent(u.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-800 transition"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex  justify-center items-center gap-4 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Prev
            </button>

            <span className="font-semibold">
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;












