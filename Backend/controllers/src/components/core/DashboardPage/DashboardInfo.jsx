import { FaPlus, FaArrowRight, FaFolder, FaFileAlt, FaUsers, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { useEffect, useState } from 'react';
import Loding from '../../common/Loding';
import Error from '../../common/Error';
const iconMap = {
  FaFolder: FaFolder,
  FaFileAlt: FaFileAlt,
  FaUsers: FaUsers,
  FaEye: FaEye,
};

// const Categories= [
//     {
//       id: 1,
//       name: "Quick Links",
//       itemCount: 12,
//       status: "active",
//       description:
//         "Essential links for quick access to important resources and tools",
//       createdAt: "2025-01-15",
//       updatedAt: "2025-04-28",
//       items: [
//         "Employee Portal",
//         "Safety Guidelines",
//         "HR Resources",
//         "IT Support",
//       ],
//     },
//     {
//       id: 2,
//       name: "News",
//       itemCount: 8,
//       status: "active",
//       description: "Latest company news, updates, and announcements",
//       createdAt: "2025-01-20",
//       updatedAt: "2025-04-28",
//       items: [
//         "Company Updates",
//         "Industry News",
//         "Employee Stories",
//         "Press Releases",
//       ],
//     },
//     {
//       id: 3,
//       name: "Safety Snap",
//       itemCount: 15,
//       status: "active",
//       description: "Quick safety tips and guidelines for workplace safety",
//       createdAt: "2025-02-01",
//       updatedAt: "2025-04-28",
//       items: ["Daily Safety Tips", "Safety Protocols", "Emergency Procedures"],
//     },
//     {
//       id: 4,
//       name: "Video Content",
//       itemCount: 6,
//       status: "inactive",
//       description: "Training videos and multimedia content",
//       createdAt: "2025-02-10",
//       updatedAt: "2025-04-28",
//       items: ["Training Videos", "Product Demos", "Safety Tutorials"],
//     },
    
//   ];

  

export default function DashboardInfo() {

  const { get, loading, error } = useApi();
  const [data, setdata] = useState([]);
 
useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get("/private/category/");
        // console.log(data)
        setdata(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchCategories();
  }, [get]);

  if (loading) return (<div className=" flex items-center justify-center">
          <div className=" spinner  top-64 fixed items-center justify-center "></div>
        </div>)
  if(error) return <Error error={error}/>
  


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-900">Dashboard Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       {data?.stats?.map((stat, index) => {
    const IconComponent = iconMap[stat.icon];
    return (
      <div
        key={index}
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-300 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-normal text-gray-600">{stat.title}</p>
            <p className="text-2xl font-bold text-blue-800 mt-1">{stat.value}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            {IconComponent && <IconComponent className="text-blue-600 text-xl" />}
          </div>
        </div>
      </div>
    );
  })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className=" text-md font-semibold text-blue-800">Categories Overview</h3>
          <Link
            to="/dashboard/category-management"
            className=" text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            View All <FaArrowRight className="inline-block ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.categories?.map((category,index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className=" font-semibold text-sm text-blue-800">{category.name}</h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    category.status === "Active"
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {category.status}
                </span>
              </div>
              <p className="text-xs text-gray-600">{category.transactionCount} items</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
