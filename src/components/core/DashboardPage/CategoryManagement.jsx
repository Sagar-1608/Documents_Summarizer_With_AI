// import {
//   FaSearch,
//   FaPlus,
//   FaEdit,
//   FaEye,
//   FaTrashAlt,
//   FaChevronLeft,
//   FaChevronRight,
//   FaFolder
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
// import CreateCategoryModal from "./Category/CreateCategoryModal";
// import Loding from "../../common/Loding";
// import Error from "../../common/Error";
// import { useApi } from "../../../hooks/useApi";
// import UpdateCategoryModal from "./Category/UpdateCategoryModal";
// import ViewCategoryModal from "./Category/ShowCategoryModal";

// const categories = [
//   {
//     id: 1,
//     name: "Quick Links",
//     itemCount: 12,
//     status: "active",
//     description:
//       "Essential links for quick access to important resources and tools",
//     createdAt: "2025-01-15",
//     updatedAt: "2025-04-28",
//     items: [
//       "Employee Portal",
//       "Safety Guidelines",
//       "HR Resources",
//       "IT Support",
//     ],
//   },
//   {
//     id: 2,
//     name: "News",
//     itemCount: 8,
//     status: "active",
//     description: "Latest company news, updates, and announcements",
//     createdAt: "2025-01-20",
//     updatedAt: "2025-04-28",
//     items: [
//       "Company Updates",
//       "Industry News",
//       "Employee Stories",
//       "Press Releases",
//     ],
//   },
//   {
//     id: 3,
//     name: "Safety Snap",
//     itemCount: 15,
//     status: "inative",
//     description: "Quick safety tips and guidelines for workplace safety",
//     createdAt: "2025-02-01",
//     updatedAt: "2025-04-28",
//     items: ["Daily Safety Tips", "Safety Protocols", "Emergency Procedures"],
//   },
//   {
//     id: 4,
//     name: "Video Content",
//     itemCount: 6,
//     status: "active",
//     description: "Training videos and multimedia content",
//     createdAt: "2025-02-10",
//     updatedAt: "2025-04-28",
//     items: ["Training Videos", "Product Demos", "Safety Tutorials"],
//   },
//   {
//     id: 5,
//     name: "Leaderboard",
//     itemCount: 10,
//     status: "active",
//     description: "Employee recognition and achievement tracking",
//     createdAt: "2025-02-15",
//     updatedAt: "2025-04-28",
//     items: ["Top Performers", "Monthly Awards", "Team Achievements"],
//   },
//   {
//     id: 6,
//     name: "Safety SOP",
//     itemCount: 20,
//     status: "active",
//     description: "Standard Operating Procedures for safety protocols",
//     createdAt: "2025-02-20",
//     updatedAt: "2025-04-28",
//     items: ["Safety Manuals", "Operating Guidelines", "Emergency Protocols"],
//   },
//   {
//     id: 7,
//     name: "Wellness Wave",
//     itemCount: 5,
//     status: "active",
//     description: "Health and wellness resources for employees",
//     createdAt: "2025-03-01",
//     updatedAt: "2025-04-28",
//     items: ["Health Tips", "Wellness Programs", "Mental Health Resources"],
//   },
//   {
//     id: 8,
//     name: "Victory Vault",
//     itemCount: 9,
//     status: "active",
//     description: "Success stories and achievements repository",
//     createdAt: "2025-03-10",
//     updatedAt: "2025-04-28",
//     items: ["Success Stories", "Project Wins", "Team Achievements"],
//   },
//   {
//     id: 9,
//     name: "Safety Tips",
//     itemCount: 7,
//     status: "active",
//     description: "Daily safety tips and best practices",
//     createdAt: "2025-03-15",
//     updatedAt: "2025-04-28",
//     items: ["Daily Tips", "Best Practices", "Safety Guidelines"],
//   },
//   {
//     id: 10,
//     name: "Emergency Protocols",
//     itemCount: 11,
//     status: "active",
//     description: "Emergency response procedures and guidelines",
//     createdAt: "2025-03-20",
//     updatedAt: "2025-04-28",
//     items: ["Emergency Plans", "Contact Lists", "Response Procedures"],
//   },
//   {
//     id: 11,
//     name: "Training Materials",
//     itemCount: 14,
//     status: "active",
//     description: "Educational resources and training materials",
//     createdAt: "2025-04-01",
//     updatedAt: "2025-04-28",
//     items: ["Course Materials", "Training Guides", "Learning Resources"],
//   },
//   {
//     id: 12,
//     name: "Guidelines",
//     itemCount: 8,
//     status: "active",
//     description: "Company policies and operational guidelines",
//     createdAt: "2025-04-10",
//     updatedAt: "2025-04-28",
//     items: ["Company Policies", "Operational Rules", "Process Guidelines"],
//   },
// ];

// export default function CategoryManagement() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showCreateModal, setShowCreateModal] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(null)
//   const [showViewModal, setShowViewodal] = useState(null)
//   const itemsPerPage = 4;

//   // changes to do actual 167, 169, 203
//   const { get, loading, error } = useApi();
//   const [categories, setCategories] = useState([]);
//   const[localLoding,setLocalLoding] =useState(false)

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLocalLoding(true)
//         const data = await get("/public/category/");
//         setCategories(data);
//         // console.log(data)
//         setLocalLoding(false)
//       } catch (err) {
//         console.error("Failed to fetch:", err);
//       }
//     };

//     fetchCategories();
//   }, [get, showCreateModal, showEditModal]);

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     const maxPage = Math.ceil(categories.length / itemsPerPage);
//     setCurrentPage((prev) => Math.min(prev + 1, maxPage));
//   };



//   const paginatedCategories = categories.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );




//   if(error) return <Error error={error}/>


//   return (

//     <>
//       {
//         localLoding ? (<div className=" flex items-center justify-center">
//           <div className=" spinner  top-64 fixed items-center justify-center "></div>
//         </div>) :
//           (<div className="space-y-6">
//             {/* Header */}

//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <h2 className="text-xl font-bold text-blue-900">Categories Management</h2>
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <div className="relative w-full sm:w-64">
//                   <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search categories..."
//                     className="pl-10 pr-4 py-1 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm w-full"
//                   />
//                 </div>


//                 <button
//                   onClick={() => setShowCreateModal(true)}
//                   className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center cursor-pointer"
//                 >
//                   <FaPlus className="mr-2" />
//                   Add Category
//                 </button>
//               </div>
//             </div>

//             {/* Table Layout */}
//             <div className=" mt-10 overflow-x-auto bg-white rounded-t-md-sm border border-gray-300 ">
//               <Table className="w-full text-sm">
//                 <Thead className="bg-gray-200 text-blue-900">
//                   <Tr>
//                     <Th className="p-2 text-left">Name</Th>
//                     {/* <Th className="p-2 text-left">Description</Th> */}
//                     <Th className="p-2 text-center">Items</Th>
//                     <Th className="p-2 text-center">Status</Th>
//                     <Th className="p-2 text-center">Created By</Th>
//                     <Th className="p-2 text-center">Created On</Th>
//                     <Th className="p-2 text-center">Updated By</Th>
//                     <Th className="p-2 text-center">Updated At</Th>
//                     <Th className="p-2 text-center">Actions</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {paginatedCategories.map((category) => (
//                     <Tr key={category.id} className="border-t border-gray-300">
//                       <Td className="p-2 text-[12px] py-4 font-semibold text-blue-800 flex gap-x-2  items-center  "><FaFolder /> <span>{category.name}</span></Td>
//                       {/* <Td className="p-2 text-gray-600">{category.description}</Td> */}
//                       <Td className="p-2 text-[12px] py-4 text-center text-gray-700">{category.itemCount} items</Td>
//                       <Td className="p-2  text-[10px] py-4 text-center">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs ${category.status === "Active"
//                             ? "bg-green-500 text-white"
//                             : "bg-gray-300 text-gray-800"
//                             }`}
//                         >
//                           {category.status}
//                         </span>
//                       </Td>
//                       <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
//                         {category.createdBy}
//                       </Td>
//                       <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
//                         {category.createdOn}
//                       </Td>
//                       <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
//                         {category.updatedBy}
//                       </Td>
//                       <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
//                         {category.updatedAt}
//                       </Td>
//                       <Td className="p-2 text-center ">
//                         <div className="flex justify-center gap-3 text-blue-700">
//                           <button
//                             title="Edit"
//                             onClick={() => {
//                               setShowEditModal({
//                                 data: category,
//                                 btn1Handler: () => setShowEditModal(null)
//                               })
//                             }}
//                             className="hover:text-blue-900 cursor-pointer"
//                           >
//                             <FaEdit />
//                           </button>
//                           <button
//                            onClick={() => {
//                              setShowViewodal({
//                                 data: category?.id,
//                                 btn1Handler: () =>setShowViewodal(null)
//                               })
//                             }}
                          
//                           title="View" className="hover:text-blue-900 cursor-pointer">
//                             <FaEye />
//                           </button>
//                           {/* <button title="Delete" className="text-red-500 hover:text-red-700">
//                       <FaTrashAlt />
//                     </button> */}
//                         </div>
//                       </Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </div>

//             {/* Pagination Controls */}
          //   <div className="flex items-center justify-between px-2 py-2 -mt-6 border border-t-0 border-gray-300  bg-white shadow-sm">
          //     <p className="text-[11px] text-gray-600">
          //       Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
          //       {Math.min(currentPage * itemsPerPage, categories.length)} of {categories.length} categories
          //     </p>
          //     <div className="flex items-center space-x-2">
          //       <button
          //         onClick={handlePrevPage}
          //         disabled={currentPage === 1}
          //         className={` cursor-pointer  px-3 py-1 border border-blue-300 rounded hover:bg-blue-100 text-blue-800 text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          //           }`}
          //       >
          //         <FaChevronLeft />
          //       </button>
          //       <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">{currentPage}</span>
          //       <button
          //         onClick={handleNextPage}
          //         disabled={currentPage === Math.ceil(categories.length / itemsPerPage)}
          //         className={` cursor-pointer px-3 py-1 border border-blue-300 rounded hover:bg-blue-100 text-blue-800 text-sm ${currentPage === Math.ceil(categories.length / itemsPerPage)
          //           ? "opacity-50 cursor-not-allowed"
          //           : ""
          //           }`}
          //       >
          //         <FaChevronRight />
          //       </button>
          //     </div>
          //  </div>


//             {
//               showCreateModal && <CreateCategoryModal
//                 onClose={() => {setShowCreateModal(false)}}
//                 onSuccess={() => {setShowCreateModal(false);}}
//               />
//             }
//             {showEditModal && <UpdateCategoryModal modalData={showEditModal} />}
//             {showViewModal && <ViewCategoryModal modalData={showViewModal}/>}

//           </div>)

//       }
//     </>

//   );


// }



// import {
//  FaSearch,
//   FaPlus,
//   FaEdit,
//   FaEye,
//   FaTrashAlt,
//   FaChevronLeft,
//   FaChevronRight,
//   FaFolder
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

// import CreateCategoryModal from "./Category/CreateCategoryModal";
// import UpdateCategoryModal from "./Category/UpdateCategoryModal";
// import ViewCategoryModal from "./Category/ShowCategoryModal";
// import { useApi } from "../../../hooks/useApi";
// import Error from "../../common/Error";

// export default function CategoriesManagement() {
//   const [search, setSearch] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [updateModalData, setUpdateModalData] = useState(null);
//   const [viewModalData, setViewModalData] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 4;

//   const { get, loading, error } = useApi();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await get("/public/category");
//         console.log("Fetched categories", data);
//         setCategories(data);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };

//     fetchCategories();
//   }, [createModalOpen, updateModalData]);

//   const filteredCategories = categories?.filter((cat) =>
//     cat.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   const formatDate = (dateStr) =>
//     dateStr ? new Date(dateStr).toLocaleDateString("en-IN") : "-";

//   if (loading) return <div className="spinner fixed top-64 left-1/2" />;

//   if (error) return <Error error={error} />;
 

//     const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     const maxPage = Math.ceil(categories.length / itemsPerPage);
//     setCurrentPage((prev) => Math.min(prev + 1, maxPage));
//   };



//   const paginatedCategories = categories.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h2 className="text-xl font-bold text-blue-900">Category Management</h2>
//         <div className="flex flex-col sm:flex-row gap-2">
//           <div className="relative w-full sm:w-64">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search categories..."
//               className="pl-10 pr-4 py-1 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm w-full"
//             />
//           </div>
//           <button
//             onClick={() => setCreateModalOpen(true)}
//             className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center"
//           >
//             <FaPlus className="mr-2" />
//             Add Category
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       {categories?.length === 0 ? (
//         <div className="w-full text-center p-4 text-2xl font-bold">
//           No categories found
//         </div>
//       ) : (
//         <div className=" mt-10 overflow-x-auto bg-white rounded-t-md-sm border border-gray-300 ">
//               <Table className="w-full text-sm">
//                 <Thead className="bg-gray-200 text-blue-900">
//                   <Tr>
//                     <Th className="p-2 text-left">Name</Th>
//                     {/* <Th className="p-2 text-left">Description</Th> */}
//                     <Th className="p-2 text-center">Items</Th>
//                     <Th className="p-2 text-center">Status</Th>
//                     <Th className="p-2 text-center">Created By</Th>
//                     <Th className="p-2 text-center">Created On</Th>
//                     <Th className="p-2 text-center">Updated By</Th>
//                     <Th className="p-2 text-center">Updated At</Th>
//                     <Th className="p-2 text-center">Actions</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {paginatedCategories.map((category) => (
//                     <Tr key={category.id} className="border-t border-gray-300">
//                       <Td className="p-2 text-[12px] py-4 font-semibold text-blue-800 flex gap-x-2  items-center  "><FaFolder /> <span>{category.name}</span></Td>
//                       {/* <Td className="p-2 text-gray-600">{category.description}</Td> */}
//                       <Td className="p-2 text-[12px] py-4 text-center text-gray-700">{category.itemCount} items</Td>
//                       <Td className="p-2  text-[10px] py-4 text-center">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs ${category.status === "Active"
//                             ? "bg-green-500 text-white"
//                             : "bg-gray-300 text-gray-800"
//                             }`}
//                         >
//                           {category.status}
//                         </span>
//                       </Td>
//                       <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
//                         {category.createdBy}
//                       </Td>
//                       <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
//                         {category.createdOn}
//                       </Td>
//                       <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
//                         {category.updatedBy}
//                       </Td>
//                       <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
//                         {category.updatedAt}
//                       </Td>
//                       <Td className="p-2 text-center ">
//                         <div className="flex justify-center gap-3 text-blue-700">
//                           <button
//                             title="Edit"
//                             onClick={() => {
//                               setShowEditModal({
//                                 data: category,
//                                 btn1Handler: () => setShowEditModal(null)
//                               })
//                             }}
//                             className="hover:text-blue-900 cursor-pointer"
//                           >
//                             <FaEdit />
//                           </button>
//                           <button
//                            onClick={() => {
//                              setShowViewodal({
//                                 data: category?.id,
//                                 btn1Handler: () =>setShowViewodal(null)
//                               })
//                             }}
                          
//                           title="View" className="hover:text-blue-900 cursor-pointer">
//                             <FaEye />
//                           </button>
//                           {/* <button title="Delete" className="text-red-500 hover:text-red-700">
//                       <FaTrashAlt />
//                     </button> */}
//                         </div>
//                       </Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </div>
//       )}
// <div className="flex items-center justify-between px-2 py-2 -mt-6 border border-t-0 border-gray-300  bg-white shadow-sm">
//               <p className="text-[11px] text-gray-600">
//                 Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
//                 {Math.min(currentPage * itemsPerPage, categories.length)} of {categories.length} categories
//               </p>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={handlePrevPage}
//                   disabled={currentPage === 1}
//                   className={` cursor-pointer  px-3 py-1 border border-blue-300 rounded hover:bg-blue-100 text-blue-800 text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                 >
//                   <FaChevronLeft />
//                 </button>
//                 <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">{currentPage}</span>
//                 <button
//                   onClick={handleNextPage}
//                   disabled={currentPage === Math.ceil(categories.length / itemsPerPage)}
//                   className={` cursor-pointer px-3 py-1 border border-blue-300 rounded hover:bg-blue-100 text-blue-800 text-sm ${currentPage === Math.ceil(categories.length / itemsPerPage)
//                     ? "opacity-50 cursor-not-allowed"
//                     : ""
//                     }`}
//                 >
//                   <FaChevronRight />
//                 </button>
//               </div>
//            </div>

//       {/* Modals */}
//       {createModalOpen && (
//         <CreateCategoryModal onClose={() => setCreateModalOpen(false)} />
//       )}
//       {updateModalData && (
//         <UpdateCategoryModal modalData={updateModalData} />
//       )}
//       {viewModalData && (
//         <ViewCategoryModal modalData={viewModalData} />
//       )}
//     </div>
//   );
// }


import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaFolder
} from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import CreateCategoryModal from "./Category/CreateCategoryModal";
import UpdateCategoryModal from "./Category/UpdateCategoryModal";
import ViewCategoryModal from "./Category/ShowCategoryModal";
import { useApi } from "../../../hooks/useApi";
import Error from "../../common/Error";

export default function CategoriesManagement() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
 const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(null)
  const [showViewModal, setShowViewodal] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { get, loading, error } = useApi();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get("/public/category");
        // console.log("Fetched categories", data);
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, [showEditModal, showCreateModal]);

  // Filtered and paginated categories
  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    // Reset to first page if search changes
    setCurrentPage(1);
  }, [search]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) return <div className="spinner fixed top-64 left-1/2" />;
  if (error) return <Error error={error} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-blue-900">Category Management</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="pl-10 pr-4 py-1 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm w-full"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center cursor-pointer"
          >
            <FaPlus className="mr-2" />
            Add Category
          </button>
        </div>
      </div>

      {/* Table */}
      {filteredCategories.length === 0 ? (
        <div className="w-full text-center p-4 text-2xl font-bold">
          No categories found
        </div>
      ) : (
        <div className="mt-10 overflow-x-auto bg-white rounded-t-md-sm border border-gray-300">
          <Table className="w-full text-sm">
            <Thead className="bg-gray-200 text-blue-900">
              <Tr>
                <Th className="p-2 text-left">Name</Th>
                <Th className="p-2 text-center">Items</Th>
                <Th className="p-2 text-center">Status</Th>
                <Th className="p-2 text-center">Created By</Th>
                <Th className="p-2 text-center">Created On</Th>
                <Th className="p-2 text-center">Updated By</Th>
                <Th className="p-2 text-center">Updated At</Th>
                <Th className="p-2 text-center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedCategories.map((category) => (
                <Tr key={category.id} className="border-t border-gray-300">
                  <Td className="p-2 text-[12px] py-4 font-semibold text-blue-800 flex gap-x-2 items-center">
                    <FaFolder /> <span>{category.name}</span>
                  </Td>
                  <Td className="p-2 text-[12px] py-4 text-center text-gray-700">
                    {category.itemCount} items
                  </Td>
                  <Td className="p-2 text-[10px] py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${category.status === "Active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-800"
                        }`}
                    >
                      {category.status}
                    </span>
                  </Td>
                  <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
                    {category.createdBy}
                  </Td>
                  <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
                    {category.createdOn}
                  </Td>
                  <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
                    {category.updatedBy}
                  </Td>
                  <Td className="p-2 text-[11px] py-4 text-center text-gray-700">
                    {category.updatedAt}
                  </Td>
                  <Td className="p-2 text-center">
                    <div className="flex justify-center gap-3 text-blue-700">
                      <button
                        title="Edit"
                       onClick={() => {
                              setShowEditModal({
                                data: category,
                                btn1Handler: () => setShowEditModal(null)
                              })
                            }}
                        className="hover:text-blue-900 cursor-pointer"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                             setShowViewodal({
                                data: category?.id,
                                btn1Handler: () =>setShowViewodal(null)
                              })
                            }}
                        title="View"
                        className="hover:text-blue-900 cursor-pointer"
                      >
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

      {/* Pagination Footer */}
      {filteredCategories.length > 0 && (
        <div className="flex items-center justify-between px-2 py-2 -mt-6 border border-t-0 border-gray-300 bg-white shadow-sm">
          <p className="text-[11px] text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, filteredCategories.length)} of{" "}
            {filteredCategories.length} categories
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`cursor-pointer px-3 py-1 border border-blue-300 rounded hover:bg-blue-100 text-blue-800 text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
              className={`cursor-pointer px-3 py-1 border border-blue-300 rounded hover:bg-blue-100 text-blue-800 text-sm ${currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : ""
                }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
     {
              showCreateModal && <CreateCategoryModal
                onClose={() => {setShowCreateModal(false)}}
                onSuccess={() => {setShowCreateModal(false);}}
              />
            }
            {showEditModal && <UpdateCategoryModal modalData={showEditModal} />}
            {showViewModal && <ViewCategoryModal modalData={showViewModal}/>}
    </div>
  );
}

