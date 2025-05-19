import React from "react";
import { useForm } from "react-hook-form";
import { useApi } from "../../../../hooks/useApi";
import { toast } from "react-hot-toast"
import { FaTimes } from "react-icons/fa";

const CreateCategoryModal = ({ onClose, onSuccess }) => {
  const { post, loading, error } = useApi();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      Category_Name: data.name,
      End_Date: data.endDate,
    };

    try {
      const res = await post("/private/category", payload);
      if (res?.success) {
        toast.success("Category created successfully!");
        onSuccess?.();
        reset();
        onClose();
      } else {
        toast.error("Failed to create category.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50  bg-transparent  backdrop-blur-md  ">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg border-1 border-gray-500">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Create Category</h3>
          <button
            onClick={onClose}
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
              {...register("name", { required: "Category name is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              End Date
            </label>
            <input
              type="date"
              {...register("endDate",{ required: "End date is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
             {errors.endDate && (
              <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-blue-800 rounded-lg hover:bg-gray-200  cursor-pointer "
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 cursor-pointer"
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
