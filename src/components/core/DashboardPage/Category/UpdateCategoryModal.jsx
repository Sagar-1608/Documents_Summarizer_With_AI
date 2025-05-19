import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApi } from "../../../../hooks/useApi";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const UpdateCategoryModal = ({ modalData }) => {
 
  const { put, loading, error } = useApi();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (modalData) {
      setValue("Category_Name", modalData?.data?.name || "");
    setValue("Separate_Render", modalData?.data?.separateRender=== "N" ? "N" : "Y");
    const rawDate = modalData?.data?.endDate; // e.g., "15/5/2025"
    if (rawDate) {
      const [day, month, year] = rawDate.split("/");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      setValue("End_Date", formattedDate);
    } else {
      setValue("End_Date", "");
    }
    }
  }, [modalData, setValue]);

   const isFormUpdated = () => {
    const currentValues = getValues();
     const [day, month, year] = modalData?.data?.endDate.split("/");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    if (
      currentValues.Category_Name !== modalData?.data?.name||
      currentValues.Separate_Render !== modalData?.data?.separateRender ||
      currentValues.End_Date !== formattedDate
    ) {
      return true;
    } else return false;
  };
  const onSubmit = async (data) => {
    if(isFormUpdated()){
       try {
      await put(`/private/category/${modalData?.data?.id}`, data);
      modalData.onSuccess?.();
      modalData.btn1Handler();
      toast.success("Category Updated Successful")
    } catch (err) {
      // console.error("Update failed", err);
      toast.error("Fail to update Category")

    }

    }else {
      toast.error("No changes made to the form")
    }

   
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50  bg-transparent  backdrop-blur-md ">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg border-1 border-gray-500">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Edit Category
          </h3>
          <button
            onClick={modalData.btn1Handler}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <FaTimes/>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Category Name
            </label>
            <input
              type="text"
              {...register("Category_Name", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-700"
            />
            {errors.Category_Name && (
              <span className="text-red-600 text-sm">
                Category name is required.
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Separate Render
            </label>
            <select
              {...register("Separate_Render")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-700"
            >
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              End Date
            </label>
            <input
             
              type="date"
              {...register("End_Date")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-700"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={modalData.btn1Handler}
              className="px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100  cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800  cursor-pointer"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
