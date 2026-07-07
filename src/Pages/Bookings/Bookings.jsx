import React, { useState } from 'react';
import { Search, ChevronDown, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Booking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [urgencyFilter, setUrgencyFilter] = useState('All Urgency');
  const [currentPage, setCurrentPage] = useState(1);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showUrgencyDropdown, setShowUrgencyDropdown] = useState(false);
  const itemsPerPage = 5;

  const allJobs = [
    { id: 'YP001', customer: 'Sarah Johnson', email: 'sarah@email.com', type: 'Lawn Mowing', location: 'Austin, TX 78701', urgency: 'Today', urgencyColor: 'bg-red-100 text-red-700', worker: 'Mike Chen', status: 'Assigned', statusColor: 'bg-blue-100 text-blue-700' },
    { id: 'YP002', customer: 'Robert Davis', email: 'robert@email.com', type: 'Tree Trimming', location: 'Houston, TX 77001', urgency: '24 Hours', urgencyColor: 'bg-yellow-100 text-yellow-700', worker: 'Unassigned', status: 'New', statusColor: 'bg-gray-100 text-gray-700' },
    { id: 'YP003', customer: 'Emily Wilson', email: 'emily@email.com', type: 'Leaf Raking', location: 'Dallas, TX 75201', urgency: 'Scheduled', urgencyColor: 'bg-green-100 text-green-700', worker: 'Alex Rodriguez', status: 'In Progress', statusColor: 'bg-orange-100 text-orange-700' },
    { id: 'YP004', customer: 'Michael Brown', email: 'michael@email.com', type: 'Garden Cleanup', location: 'San Antonio, TX 78201', urgency: 'Scheduled', urgencyColor: 'bg-green-100 text-green-700', worker: 'Jessica Lee', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
    { id: 'YP005', customer: 'Lisa Anderson', email: 'lisa@email.com', type: 'Hedge Trimming', location: 'Fort Worth, TX 76101', urgency: 'Scheduled', urgencyColor: 'bg-green-100 text-green-700', worker: 'David Kim', status: 'Paid', statusColor: 'bg-purple-100 text-purple-700' },
    { id: 'YP006', customer: 'John Martinez', email: 'john@email.com', type: 'Pool Cleaning', location: 'Austin, TX 78702', urgency: 'Today', urgencyColor: 'bg-red-100 text-red-700', worker: 'Sarah Kim', status: 'Assigned', statusColor: 'bg-blue-100 text-blue-700' },
    { id: 'YP007', customer: 'Amanda White', email: 'amanda@email.com', type: 'Snow Removal', location: 'Dallas, TX 75202', urgency: '24 Hours', urgencyColor: 'bg-yellow-100 text-yellow-700', worker: 'Unassigned', status: 'New', statusColor: 'bg-gray-100 text-gray-700' },
    { id: 'YP008', customer: 'Kevin Lee', email: 'kevin@email.com', type: 'Fertilizing', location: 'Houston, TX 77002', urgency: 'Scheduled', urgencyColor: 'bg-green-100 text-green-700', worker: 'Mike Chen', status: 'In Progress', statusColor: 'bg-orange-100 text-orange-700' },
    { id: 'YP009', customer: 'Michelle Garcia', email: 'michelle@email.com', type: 'Pest Control', location: 'Fort Worth, TX 76102', urgency: 'Today', urgencyColor: 'bg-red-100 text-red-700', worker: 'Alex Rodriguez', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
    { id: 'YP010', customer: 'Daniel Kim', email: 'daniel@email.com', type: 'Lawn Aeration', location: 'San Antonio, TX 78202', urgency: 'Scheduled', urgencyColor: 'bg-green-100 text-green-700', worker: 'Jessica Lee', status: 'Paid', statusColor: 'bg-purple-100 text-purple-700' },
  ];

  const statusOptions = ['All Status', 'New', 'Assigned', 'In Progress', 'Completed', 'Paid'];
  const urgencyOptions = ['All Urgency', 'Today', '24 Hours', 'Scheduled'];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // Filter jobs based on search and filters
  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = 
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || job.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'All Urgency' || job.urgency === urgencyFilter;
    
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset to page 1 when filters change
  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
    setShowStatusDropdown(false);
  };

  const handleUrgencyChange = (urgency) => {
    setUrgencyFilter(urgency);
    setCurrentPage(1);
    setShowUrgencyDropdown(false);
  };

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="mx-auto ">
        {/* Search and Filters */}
        <div className="p-4 mb-4 bg-white rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search by customer name or job ID..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Status Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowUrgencyDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {statusFilter}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showStatusDropdown && (
                <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-md shadow-lg top-full">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Urgency Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowUrgencyDropdown(!showUrgencyDropdown);
                  setShowStatusDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {urgencyFilter}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showUrgencyDropdown && (
                <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-md shadow-lg top-full">
                  {urgencyOptions.map((urgency) => (
                    <button
                      key={urgency}
                      onClick={() => handleUrgencyChange(urgency)}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                    >
                      {urgency}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Job ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Job Type
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Urgency
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Worker
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentJobs.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  currentJobs.map((job) => (
                    <tr key={job.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">#{job.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center flex-shrink-0 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full w-9 h-9">
                            {getInitials(job.customer)}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {job.customer}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {job.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{job.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{job.location}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${job.urgencyColor}`}>
                          {job.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm ${job.worker === 'Unassigned' ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                          {job.worker}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${job.statusColor}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Link 
                        //   to={`/booking/${job.id}`} 
                             to="/booking-details"
                          >
                             <button className="text-sm font-medium text-gray-900 hover:text-gray-700">
                            View
                          </button>
                          </Link>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length} results
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-2 transition border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`min-w-9 h-9 rounded-md text-sm transition ${
                          currentPage === page
                            ? 'bg-green-700 text-white font-medium hover:bg-green-800'
                            : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
                
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 transition border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;