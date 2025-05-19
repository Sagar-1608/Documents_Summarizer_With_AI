// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useApi } from "../../../../hooks/useApi";
// import toast from "react-hot-toast";
// import { FaTimes } from "react-icons/fa";

// const UpdateTransactionModal = ({ modalData }) => {
//   console.log("modal",modalData)

//   const { get,put, loading, error } = useApi();
//   const [previewImage, setPreviewImage] = useState(null);
//   const [categories, setCategories] = useState([]);

// useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await get("/public/active-category");
//         setCategories(data);
//       } catch (err) {
//         console.log(err)
//         toast.error("Failed to fetch categories");
//       }
//     };
//     fetchCategories();
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     if (modalData?.data) {
//       setValue("Category_Id", modalData.data.Category_Id || "");
//       setValue("Upload_Title", modalData.data.Upload_Title || "");
//       setValue("Upload_Description", modalData.data.Upload_Description || "");

//       const rawDate = modalData?.data?.End_Date; // e.g., "2025-05-24T00:00:00.000Z"
// if (rawDate) {
//   const isoDate = new Date(rawDate).toISOString().split("T")[0]; // "2025-05-24"
//   setValue("End_Date", isoDate);
// } else {
//   setValue("End_Date", "");
// }


//       setPreviewImage(`http://127.0.0.1:5500/backend${modalData.data.Folder_Path}` || null); // show image if available
//     }
//   }, [modalData, setValue]);

//   const isFormUpdated = () => {
//     const current = getValues();
//    const isoDate = new Date(modalData?.data?.End_Date).toISOString().split("T")[0];
  

//     return (
//       current.Category_Id !== modalData.data.categoryId ||
//       current.Sequence !== modalData.data.sequence ||
//       current.Upload_Title !== modalData.data.uploadTitle ||
//       current.Upload_Description !== modalData.data.uploadDescription ||
//       current.End_Date !== isoDate||
//       current.file?.[0]
//     );
//   };

//   const onSubmit = async (data) => {
//     if (isFormUpdated()) {
//       const formData = new FormData();
//       formData.append("Category_Id", data.Category_Id);
//       formData.append("Upload_Title", data.Upload_Title);
//       formData.append("Upload_Description", data.Upload_Description);
//       formData.append("End_Date", data.End_Date);
//       if (data.file?.[0]) {
//         formData.append("file", data.file[0]);
//       }

//       try {
//         await put(`/private/transaction/${modalData?.data?.Upload_Number}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         modalData.onSuccess?.();
//         modalData.btn1Handler();
//         toast.success("Transaction Updated Successfully");
//       } catch (err) {
//         toast.error("Failed to update Transaction");
//       }
//     } else {
//       toast.error("No changes made to the form");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
//       <div className="max-h-[80vh] bg-white rounded-2xl w-full max-w-md p-6 shadow-lg border border-gray-500 overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-semibold text-gray-800">Edit Transaction</h3>
//           <button onClick={modalData.btn1Handler} className="text-gray-400 hover:text-gray-600">
//            <FaTimes/>
//           </button>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Category Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800 mb-2">Category</label>
//             <select
//               {...register("Category_Id", { required: true })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//             >
//               <option >{modalData?.data?.Category_Name}</option>
//               {categories?.map((cat) => (
//                 <option key={cat.Category_Id} value={cat.Category_Id}>
//                   {cat.Category_Name}
//                 </option>
//               ))}
//             </select>
//             {errors.Category_Id && <span className="text-red-600 text-sm">Category is required.</span>}
//           </div>


//           {/* Upload Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800 mb-2">Upload Title</label>
//             <input
//               type="text"
//               {...register("Upload_Title", { required: true })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg "
//             />
//             {errors.Upload_Title && <span className="text-red-600 text-sm">Title is required.</span>}
//           </div>

//           {/* Upload Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800 mb-2">Upload Description</label>
//             <textarea
//               {...register("Upload_Description", { required: true })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//             />
//             {errors.Upload_Description && <span className="text-red-600 text-sm">Description is required.</span>}
//           </div>

//           {/* End Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-800 mb-2">End Date</label>
//             <input
//               type="date"
//               {...register("End_Date", { required: true })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//             />
//           </div>

//           {/* Image File */}
//           {/* <div>
//             <label className="block text-sm font-medium text-gray-800 mb-2">Upload Image</label>
//             <input
//               type="file"
//               {...register("file")}
//               accept="image/*"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               onChange={(e) => setPreviewImage(URL.createObjectURL(e.target.files[0]))}
//             />
//             {previewImage && (
//               <div className=" flex  items-center  justify-center space-x-2">
//                 <div> Previous Image</div>
//                  <img src={previewImage} alt="Preview" className="mt-2 h-32 object-cover rounded-lg border" /></div>
             
//             )}
//           </div> */}
//           {/* Image File Section */}
// <div>
//   <label className="block text-sm font-medium text-gray-800 mb-2">Upload Image</label>

//   {/* Image Preview Box */}
//   {previewImage && (
//     <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 mb-2">
//       <span className="text-gray-600">Image Preview</span>
//       <img src={previewImage} alt="Preview" className="h-40 object-contain rounded" />
//     </div>
//   )}

//   {/* Select New Image Button */}
//   <div className="flex justify-center">
//     <label className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-200">
//       Select New Image
//       <input
//         type="file"
//         {...register("file")}
//         accept="image/*"
//         className="hidden"
//         onChange={(e) => {
//           if (e.target.files?.[0]) {
//             setPreviewImage(URL.createObjectURL(e.target.files[0]));
//           }
//         }}
//       />
//     </label>
//   </div>
// </div>


//           {/* Error */}
//           {error && <div className="text-red-600 text-sm">{error}</div>}

//           {/* Buttons */}
//           <div className="flex justify-end space-x-3 mt-6">
//             <button
//               type="button"
//               onClick={modalData.btn1Handler}
//               className="px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
//             >
//               {loading ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateTransactionModal;


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApi } from "../../../../hooks/useApi";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const UpdateTransactionModal = ({ modalData }) => {
  const { get, put, loading, error } = useApi();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Track selected file
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // Fetch categories on load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get("/public/active-category");
        setCategories(data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  // Pre-fill form values
  useEffect(() => {
    if (modalData?.data) {
      setValue("Category_Id", modalData.data.Category_Id || "");
      setValue("Upload_Title", modalData.data.Upload_Title || "");
      setValue("Upload_Description", modalData.data.Upload_Description || "");

      const rawDate = modalData.data.End_Date;
      if (rawDate) {
        const isoDate = new Date(rawDate).toISOString().split("T")[0];
        setValue("End_Date", isoDate);
      }

      setPreviewImage(`http://127.0.0.1:5500/backend${modalData.data.Folder_Path}` || null);
    }
  }, [modalData, setValue]);

  // Check if form was modified
  const isFormUpdated = () => {
    const current = getValues();
    const isoDate = new Date(modalData.data.End_Date).toISOString().split("T")[0];

    return (
      current.Category_Id !== modalData.data.Category_Id ||
      current.Upload_Title !== modalData.data.Upload_Title ||
      current.Upload_Description !== modalData.data.Upload_Description ||
      current.End_Date !== isoDate ||
      selectedFile
    );
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!isFormUpdated()) {
      toast.error("No changes made to the form");
      return;
    }

    const formData = new FormData();
    formData.append("Category_Id", data.Category_Id);
    formData.append("Upload_Title", data.Upload_Title);
    formData.append("Upload_Description", data.Upload_Description);
    formData.append("End_Date", data.End_Date);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await put(`/private/transaction/${modalData.data.Upload_Number}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      modalData.onSuccess?.();
      modalData.btn1Handler();
      toast.success("Transaction Updated Successfully");
    } catch (err) {
      toast.error("Failed to update Transaction");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="max-h-[80vh] bg-white rounded-2xl w-full max-w-md p-6 shadow-lg border border-gray-500 overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Edit Transaction</h3>
          <button onClick={modalData.btn1Handler} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Category</label>
            <select
              {...register("Category_Id", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option>{modalData?.data?.Category_Name}</option>
              {categories.map((cat) => (
                <option key={cat.Category_Id} value={cat.Category_Id}>
                  {cat.Category_Name}
                </option>
              ))}
            </select>
            {errors.Category_Id && <span className="text-red-600 text-sm">Category is required.</span>}
          </div>

          {/* Upload Title */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Upload Title</label>
            <input
              type="text"
              {...register("Upload_Title", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {errors.Upload_Title && <span className="text-red-600 text-sm">Title is required.</span>}
          </div>

          {/* Upload Description */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Upload Description</label>
            <textarea
              {...register("Upload_Description", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {errors.Upload_Description && (
              <span className="text-red-600 text-sm">Description is required.</span>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">End Date</label>
            <input
              type="date"
              {...register("End_Date", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Upload Image</label>

            {/* Image Preview Box */}
            {previewImage && (
              <div className="flex items-center justify-evenly  border rounded-lg p-3 mb-2">
            
               <div className=" flex flex-col space-y-0.5">
                 <div className="text-gray-600 text-xs ">Image Preview</div>
                <img src={previewImage} alt="Preview" className="h-24 object-contain rounded" />
               </div>
               <div className="flex justify-center">
              <label className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-200">
                Select New Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>
              </div>
            )}

            
            
          </div>

          {/* Error */}
          {error && <div className="text-red-600 text-sm">{error}</div>}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={modalData.btn1Handler}
              className="px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 cursor-pointer"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransactionModal;
