
import { FaSearch, FaPlus, FaEdit, FaEye ,FaChevronLeft, FaChevronRight} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useApi } from "../../../hooks/useApi";
import CreateTransactionModal from "./Transaction/CreateTransactionModal";
import Error from "../../common/Error";
import ViewTransactionModal from "./Transaction/ShowTransactionModal";
import UpdateTransactionModal from "./Transaction/UpdateTransactionModal";


export default function TransactionsManagement() {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [createTransactionModal, setCreatetTransactionModal] = useState(false)
  const [updateTransactionModal, setUpdateTransactionModal] = useState(null)
  const [viewTransactionModal, setViewTransactionModal] = useState(null)
  const { get, loading, error } = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;


  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await get("/public/transaction");
        console.log("Fetched transaction data", data);
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };
    fetchTransaction();
  }, [createTransactionModal, updateTransactionModal]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("en-IN") : "-";

  const filteredTransactions = transactions?.filter((tx) =>
    tx.Upload_Title?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  
  if (loading)
    return (
      <div className="flex items-center justify-center">
        <div className="spinner top-64 fixed items-center justify-center"></div>
      </div>
    );

  if (error) return <Error error={error} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-blue-900">Transactions Management</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-1 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm w-full"
            />
          </div>
          <button
            onClick={() => setCreatetTransactionModal(true)}
            className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center cursor-pointer">
            <FaPlus className="mr-2" />
            Add Transaction
          </button>
        </div>
      </div>
      
      {filteredTransactions?.length ===0 ? (<div className=" w-full flex items-center justify-center text-center p-4 text-2xl  font-bold">
            <div className=" text-center ">No transactions Found</div> 
           </div>):(
           <div className="mt-10 overflow-x-auto bg-white rounded-t-md-sm border border-gray-300">
        <Table className="w-full text-sm">
          <Thead className="bg-gray-200 text-blue-900">
            <Tr>
              <Th className="p-2 text-left w-[350px]">Transaction Title</Th>
              <Th className="p-2 text-center">Category</Th>
              <Th className="p-2 text-center">Status</Th>
              <Th className="p-2 text-center">Created By</Th>
              {/* <Th className="p-2 text-center">Created On</Th> */}
              <Th className="p-2 text-center">Updated By</Th>
              <Th className="p-2 text-center">Updated At</Th>
              <Th className="p-2 text-center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedTransactions?.map((tx, idx) => (
              <Tr key={idx} className="border-t border-gray-300">
                <Td className="text-left flex items-start gap-x-2 py-3 ">
                  <img

                    src={`http://127.0.0.1:5500/backend${tx.Folder_Path}`}
                    alt="Preview"
                    className="m-2 h-16 w-24 rounded-md object-cover"
                  />

                  <div className="flex max-w-xs flex-col gap-2 mt-2">
                    <p className="text-[15px] font-semibold">{tx.Upload_Title}</p>
                    <p className="text-xs text-richblack-300">
                      {tx.Upload_Description?.length > 40
                        ? `${tx.Upload_Description.slice(0, 40)}...`
                        : tx.Upload_Description}
                    </p>
                  </div>
                </Td>
                <Td className="  text-[12px] text-center text-gray-700 ">
                  {tx.Category_Name}
                </Td>
                <Td className="text-[10px] text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${new Date(tx.End_Date) > new Date()
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-800"
                      }`}
                  >
                    {new Date(tx.End_Date) > new Date() ? "Active" : "Inactive"}
                  </span>
                </Td>
                <Td className="text-[12px] text-center text-gray-700">
                  {tx.Created_By}
                </Td>
                {/* <Td className="text-[12px] text-center text-gray-700">
                  {formatDate(tx.Created_Date)}
                </Td> */}
                <Td className="text-[12px] text-center text-gray-700">
                  {tx.Updated_By || "-"}
                </Td>
                <Td className="text-[12px] text-center text-gray-700">
                  {formatDate(tx.Updated_Date)}
                </Td>
                <Td className="text-center">
                  <div className="flex justify-center gap-3 text-blue-700">
                    <button
                      onClick={
                        () => {
                              setUpdateTransactionModal({
                                data:tx,
                                btn1Handler: () => setUpdateTransactionModal(null)
                              })
                            }
                      }
                     title="Edit" className="hover:text-blue-900 cursor-pointer">
                      <FaEdit />
                    </button>
                    <button 
                    onClick={()=>{
                       setViewTransactionModal({
                                data: tx,
                                btn1Handler: () =>setViewTransactionModal(null)
                              })

                    }}
                    
                    title="View" className="hover:text-blue-900 cursor-pointer">
                      <FaEye />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
           
          </Tbody>
        </Table>
      </div>
           )}

      {filteredTransactions?.length > 0 && (
        <div className="flex items-center justify-between px-2 py-2 -mt-6 border border-t-0 border-gray-300 bg-white shadow-sm">
          <p className="text-[11px] text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{" "}
            {filteredTransactions.length} transactions
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`cursor-pointer px-3 py-1 border border-blue-300 rounded hover:bg-blue-100 text-blue-800 text-sm ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaChevronLeft />
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              {currentPage}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`cursor-pointer px-3 py-1 border border-blue-300 rounded hover:bg-blue-100 text-blue-800 text-sm ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
      
      {createTransactionModal && <CreateTransactionModal onClose={() => { setCreatetTransactionModal(false) }} />}
      {viewTransactionModal && <ViewTransactionModal modalData={viewTransactionModal}/>}
      {updateTransactionModal && <UpdateTransactionModal modalData={updateTransactionModal}/>}
    </div>
  );
}




// import {
//   FaSearch,
//   FaPlus,
//   FaEdit,
//   FaEye,
//   FaChevronLeft,
//   FaChevronRight
// } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import {
//   Table,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr,
// } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

// import CreateTransactionModal from "./Transaction/CreateTransactionModal"
// import UpdateTransactionModal from "./Transaction/UpdateTransactionModal";
// import ViewTransactionModal from "./Transaction/ShowTransactionModal";
// import { useApi } from "../../../hooks/useApi";
// import Error from "../../common/Error";

// export default function TransactionManagement() {
//   const [search, setSearch] = useState("");
//   const [transactions, setTransactions] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(null);
//   const [showViewModal, setShowViewModal] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   const { get, loading, error } = useApi();

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//        const data = await get("/public/transaction");
//         setTransactions(data);
//         console.log(data)
//       } catch (err) {
//         console.error("Failed to fetch transactions", err);
//       }
//     };

//     fetchTransactions();
//   }, [showEditModal, showCreateModal]);

//   const filteredTransactions = transactions.filter((t) =>
//     t.Upload_Title?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

//   const paginatedTransactions = filteredTransactions.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//    const formatDate = (dateStr) =>
//     dateStr ? new Date(dateStr).toLocaleDateString("en-IN") : "-";


//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search]);

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   if (loading) return <div className="spinner fixed top-64 left-1/2" />;
//   if (error) return <Error error={error} />;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h2 className="text-xl font-bold text-blue-900">Transaction Management</h2>
//         <div className="flex flex-col sm:flex-row gap-2">
//           <div className="relative w-full sm:w-64">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search transactions..."
//               className="pl-10 pr-4 py-1 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm w-full"
//             />
//           </div>
//           <button
//             onClick={() => setShowCreateModal(true)}
//             className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center cursor-pointer"
//           >
//             <FaPlus className="mr-2" />
//             Add Transaction
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       {filteredTransactions.length == 0 ? (
//         <div className="w-full text-center p-4 text-2xl font-bold">
//           No transactions found
//         </div>
//       ) : (
//         <div className="mt-10 overflow-x-auto bg-white rounded-t-md-sm border border-gray-300">
//           <Table className="w-full text-sm">
//             <Thead className="bg-gray-200 text-blue-900">
//               <Tr>
//                 <Th className="p-2 text-left">Title</Th>
//                 <Th className="p-2 text-center">Category</Th>
//                 <Th className="p-2 text-center">End Date</Th>
//                 <Th className="p-2 text-center">Created By</Th>
//                 <Th className="p-2 text-center">Created On</Th>
//                 <Th className="p-2 text-center">Actions</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//              {paginatedTransactions?.map((tx, idx) => (
//               <Tr key={idx} className="border-t border-gray-300">
//                 <Td className="text-left flex items-start gap-x-2 py-3 ">
//                   <img

//                     src={`http://127.0.0.1:5500/backend${tx.Folder_Path}`}
//                     alt="Preview"
//                     className="m-2 h-16 w-24 rounded-md object-cover"
//                   />

//                   <div className="flex max-w-xs flex-col gap-2 mt-2">
//                     <p className="text-[15px] font-semibold">{tx.Upload_Title}</p>
//                     <p className="text-xs text-richblack-300">
//                       {tx.Upload_Description?.length > 40
//                         ? `${tx.Upload_Description.slice(0, 40)}...`
//                         : tx.Upload_Description}
//                     </p>
//                   </div>
//                 </Td>
//                 <Td className="  text-[12px] text-center text-gray-700 ">
//                   {tx.Category_Name}
//                 </Td>
//                 <Td className="text-[10px] text-center">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${new Date(tx.End_Date) > new Date()
//                         ? "bg-green-500 text-white"
//                         : "bg-gray-300 text-gray-800"
//                       }`}
//                   >
//                     {new Date(tx.End_Date) > new Date() ? "Active" : "Inactive"}
//                   </span>
//                 </Td>
//                 <Td className="text-[12px] text-center text-gray-700">
//                   {tx.Created_By}
//                 </Td>
//                 {/* <Td className="text-[12px] text-center text-gray-700">
//                   {formatDate(tx.Created_Date)}
//                 </Td> */}
//                 <Td className="text-[12px] text-center text-gray-700">
//                   {tx.Updated_By || "-"}
//                 </Td>
//                 <Td className="text-[12px] text-center text-gray-700">
//                   {formatDate(tx.Updated_Date)}
//                 </Td>
//                 <Td className="text-center">
//                   <div className="flex justify-center gap-3 text-blue-700">
//                     <button
//                       onClick={
//                         () => {
//                               setUpdateTransactionModal({
//                                 data:tx,
//                                 btn1Handler: () => setUpdateTransactionModal(null)
//                               })
//                             }
//                       }
//                      title="Edit" className="hover:text-blue-900 cursor-pointer">
//                       <FaEdit />
//                     </button>
//                     <button 
//                     onClick={()=>{
//                        setViewTransactionModal({
//                                 data: tx,
//                                 btn1Handler: () =>setViewTransactionModal(null)
//                               })

//                     }}
                    
//                     title="View" className="hover:text-blue-900 cursor-pointer">
//                       <FaEye />
//                     </button>
//                   </div>
//                 </Td>
//               </Tr>
//             ))}
//             </Tbody>
//           </Table>
//         </div>
//       )}

//       {/* Pagination */}
//       {filteredTransactions.length > 0 && (
//         <div className="flex items-center justify-between px-2 py-2 -mt-6 border border-t-0 border-gray-300 bg-white shadow-sm">
//           <p className="text-[11px] text-gray-600">
//             Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
//             {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{" "}
//             {filteredTransactions.length} transactions
//           </p>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handlePrevPage}
//               disabled={currentPage === 1}
//               className={`cursor-pointer px-3 py-1 border border-blue-300 rounded hover:bg-blue-100 text-blue-800 text-sm ${
//                 currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               <FaChevronLeft />
//             </button>
//             <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
//               {currentPage}
//             </span>
//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className={`cursor-pointer px-3 py-1 border border-blue-300 rounded hover:bg-blue-100 text-blue-800 text-sm ${
//                 currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               <FaChevronRight />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Modals */}
//       {showCreateModal && (
//         <CreateTransactionModal
//           onClose={() => setShowCreateModal(false)}
//           onSuccess={() => setShowCreateModal(false)}
//         />
//       )}
//       {showEditModal && <UpdateTransactionModal modalData={showEditModal} />}
//       {showViewModal && <ViewTransactionModal modalData={showViewModal} />}
//     </div>
//   );
// }

