import React, { useEffect, useState } from "react";
import { useApi } from "../../../../hooks/useApi";
import toast from "react-hot-toast";
import { FaCircle, FaTimes} from "react-icons/fa";


const ViewCategoryModal = ({ modalData }) => {
  const [category, setCategory] = useState(null);
  const [transactions, setTransaction] = useState(null)
  const { get, loading, error } = useApi();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await get(`/public/category/${modalData?.data}`);
        // console.log(data)
        setCategory(data?.category);
        setTransaction(data?.transactions);

      } catch (err) {
        toast.error(error || "Something went wrong");
      }
    };

    fetchCategory();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB"); // Output: DD/MM/YYYY
  };

  


  return (
    <div
      className="fixed inset-0 bg-opacity-40  bg-opacity-50 flex items-center justify-center z-50  bg-transparent  backdrop-blur-md  "
      onClick={modalData.btn1Handler}
    >
      <div
        className=" max-h-[80vh] bg-white rounded-2xl w-full max-w-md p-6 border-1 border-gray-500  shadow-lg overflow-y-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-300">
          <h3 className="text-xl font-semibold text-gray-800">
            Category Details
          </h3>
          <button
            onClick={modalData.btn1Handler}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <FaTimes/>
          </button>
        </div>

        {/* Body */}
        {loading ? (
          <p className="text-center text-sm text-gray-600">Loading...</p>
        ) : !category ? (
          <p className="text-center text-sm text-gray-600">Category not found</p>
        ) : (
          <div className="space-y-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 font-medium">Category Name</p>
                <p className="mt-1 text-[#023E8A]">{category.Category_Name}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Status</p>
                <span
                  className={`mt-1 inline-block px-2 py-1 rounded-full text-xs ${new Date(category.End_Date) > new Date()
                      ? "bg-[#2AAA6D] text-white"
                      : "bg-red-100 text-red-600"
                    }`}
                >
                  {new Date(category.End_Date) > new Date()
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Start Date</p>
                <p className="mt-1 text-[#023E8A]">
                  {formatDate(category.Start_Date)}
                </p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">End Date</p>
                <p className="mt-1 text-[#023E8A]">
                  {formatDate(category.End_Date)}
                </p>
              </div>



              <div>
                <p className="text-gray-500 font-medium">Created By</p>
                <p className="mt-1 text-[#023E8A]">{category.Created_By}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Updated By</p>
                <p className="mt-1 text-[#023E8A]">{category.Updated_By}</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Created Date</p>
                <p className="mt-1 text-[#023E8A]">
                  {formatDate(category.Created_Date)}
                </p>
              </div>



              <div>
                <p className="text-gray-500 font-medium">Updated Date</p>
                <p className="mt-1 text-[#023E8A]">
                  {formatDate(category.Updated_Date)}
                </p>
              </div>
            </div>


            <div className=" overflow-y-scroll h-16">
              {
                transactions?.map((trn) =>
                  <div
                    key={trn?.Upload_Number}
                    className="flex items-center text-sm font-semibold text-blue-800  "
                  >
                    <div className=" flex gap-x-2 items-center justify-center   mr-3">
                      <div className=" text-[10px]">
                        <FaCircle />
                      </div>
                      <div>{trn?.Upload_Title}</div>
                    </div>

                  </div>)
              }
            </div>

          </div>

        )}



        {/* Footer */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={modalData.btn1Handler}
            className="px-4 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#023E8A] text-sm !rounded-button cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCategoryModal;
