// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useApi } from "../../../../hooks/useApi";
// import { toast } from "react-hot-toast";

// import { FaTimes } from "react-icons/fa";

// const CreateTransactionModal = ({ onClose }) => {
//   const { post, get, loading } = useApi();
//   const [categories, setCategories] = useState([]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await get("/public/active-category");
//         setCategories(data);
//       } catch (err) {
//         toast.error("Failed to fetch categories");
//       }
//     };
//     fetchCategories();
//   }, []);

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("Category_Id", data.categoryId);
//     formData.append("Upload_Title", data.title);
//     formData.append("Upload_Description", data.description);
//     formData.append("Image_File", data.image[0]);
//     formData.append("End_Date", data.endDate);

//     try {
//       const res = await post("/private/transaction", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (res?.success) {
//         toast.success("Transaction created successfully!");
//         onSuccess?.();
//         reset();
//         onClose();
//       } else {
//         toast.error("Failed to create transaction.");
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
//       <div className="bg-white rounded-2xl w-full h-[500px] max-w-md p-6 shadow-lg border-1 border-gray-500 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="text-xl font-semibold text-blue-800">Create Transaction</h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
//             <FaTimes />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

//           <div>
//             <label className="block text-sm font-medium text-blue-700 mb-1">Category</label>
//             <select
//               {...register("categoryId", { required: "Category is required" })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
//             >
//               <option value="">Select Category</option>
//               {categories?.map((cat) => (
//                 <option key={cat.Category_Id} value={cat.Category_Id}>
//                   {cat.Category_Name}
//                 </option>
//               ))}
//             </select>
//             {errors.categoryId && (
//               <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-blue-600 mb-1">Upload Title</label>
//             <input
//               type="text"
//               {...register("title", { required: "Title is required" })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//             />
//             {errors.title && (
//               <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
//             )}
//           </div>


//           <div>
//             <label className="block text-sm font-medium text-blue-600 mb-1">Description</label>
//             <textarea
//               {...register("description", { required: "Description is required" })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//             ></textarea>
//             {errors.description && (
//               <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
//             )}
//           </div>


//           <div>
//             <label className="block text-sm font-medium text-blue-600 mb-1">Upload Image</label>

//             <div className="w-full">
//               <label
//                 htmlFor="image-upload"
//                 className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-lg cursor-pointer border-blue-300 hover:border-blue-500 hover:bg-blue-50"
//               >
//                 <svg
//                   className="w-8 h-8 text-blue-400 mb-2"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M7 16l-4-4m0 0l4-4m-4 4h18"
//                   />
//                 </svg>
//                 <span className="text-sm text-blue-600 font-medium">Click to upload or drag & drop</span>
//                 <span className="text-xs text-gray-500">(PNG, JPG, JPEG up to 5MB)</span>
//               </label>
//               <input
//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 {...register("image", { required: "Image is required" })}
//                 className="hidden"
//               />
//               {errors.image && (
//                 <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
//               )}
//             </div>
//           </div>


//           <div>
//             <label className="block text-sm font-medium text-blue-600 mb-1">End Date</label>
//             <input
//               type="date"
//               {...register("endDate", { required: "End date is required" })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//             />
//             {errors.endDate && (
//               <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
//             )}
//           </div>

//           <div className="flex justify-end space-x-3 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 text-blue-800 rounded-lg hover:bg-gray-200 cursor-pointer"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 cursor-pointer"
//             >
//               {loading ? "Creating..." : "Create Transaction"}
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTransactionModal;


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApi } from "../../../../hooks/useApi";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const CreateTransactionModal = ({ onClose }) => {
  const { post, get, loading } = useApi();
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const selectedImage = watch("image");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get("/public/active-category");
        setCategories(data);
        // console.log(data)
      } catch (err) {
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedImage && selectedImage[0]) {
      const file = selectedImage[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [selectedImage]);

  const onSubmit = async (data) => {
    
    const cat = categories.find(cat => cat.Category_Id == data?.categoryId);
   
    const formData = new FormData();
    formData.append("Category_Id", data.categoryId);
    formData.append("Upload_Title", data.title);
    formData.append("Upload_Description", data.description);
    formData.append("End_Date", data.endDate);
    formData.append("Category_Name",cat.Category_Name)
    formData.append("Ref_Link",data.refLink)
    formData.append("file", data.image[0]);
    
    console.log(formData)

    try {
      const res = await post("/private/transaction/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.success) {
        toast.success("Transaction created successfully!");
        reset();
        setImagePreview(null);
        onClose();
      } else {
        toast.error("Failed to create transaction.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-white rounded-2xl w-full h-[500px] max-w-md p-6 shadow-lg border-1 border-gray-500  overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-gray-800">Create Transaction</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Category</label>
            <select
              {...register("categoryId", { required: "Category is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat.Category_Id} value={cat.Category_Id}>
                  {cat.Category_Name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Upload Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">End Date</label>
            <input
              type="date"
              {...register("endDate", { required: "End date is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {errors.endDate && (
              <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Reference Link (optional) </label>
            <input
              type="url"
              {...register("refLink")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.refLink.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Upload Image</label>
            <div className="w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-lg cursor-pointer border-blue-300 hover:border-blue-500 hover:bg-blue-50 overflow-hidden"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 text-blue-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg>
                    <span className="text-sm text-blue-600 font-medium">
                      Click to upload or drag & drop
                    </span>
                    <span className="text-xs text-gray-500">(PNG, JPG, JPEG up to 5MB)</span>
                  </>
                )}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                {...register("image", { required: "Image is required" })}
                className="hidden"
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
              )}
            </div>
          </div>

          

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-blue-800 rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 cursor-pointer"
            >
              {loading ? "Creating..." : "Create Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTransactionModal;

