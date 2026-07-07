import React, { useState } from 'react';
import { Search, ChevronDown, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Workers = () => {
      const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [skillsFilter, setSkillsFilter] = useState('All Skills');
  const [currentPage, setCurrentPage] = useState(1);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const itemsPerPage = 5;

  const allWorkers = [
    {
      id: 1,
      name: 'Michael Rodriguez',
      email: 'michael.r@email.com',
      avatar: 'MR',
      age: 32,
      location: 'Austin, TX',
      zipCode: '78701',
      skills: ['Lawn Mowing', 'Landscaping'],
      availability: 'Mon-Fri',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      avatar: 'SJ',
      age: 28,
      location: 'Dallas, TX',
      zipCode: '75201',
      skills: ['Tree Trimming', 'Gardening'],
      availability: 'Weekends',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 3,
      name: 'James Thompson',
      email: 'james.t@email.com',
      avatar: 'JT',
      age: 45,
      location: 'Houston, TX',
      zipCode: '77001',
      skills: ['Landscaping', 'Snow Removal'],
      availability: 'Flexible',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.d@email.com',
      avatar: 'ED',
      age: 35,
      location: 'San Antonio, TX',
      zipCode: '78201',
      skills: ['Gardening'],
      availability: 'Mon-Sat',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-700'
    },
    {
      id: 5,
      name: 'David Martinez',
      email: 'david.m@email.com',
      avatar: 'DM',
      age: 29,
      location: 'Fort Worth, TX',
      zipCode: '76101',
      skills: ['Lawn Mowing', 'Tree Trimming'],
      availability: 'Mon-Fri',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 6,
      name: 'Jennifer Lee',
      email: 'jennifer.l@email.com',
      avatar: 'JL',
      age: 31,
      location: 'Austin, TX',
      zipCode: '78702',
      skills: ['Landscaping', 'Gardening'],
      availability: 'Weekends',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 7,
      name: 'Robert Wilson',
      email: 'robert.w@email.com',
      avatar: 'RW',
      age: 38,
      location: 'Dallas, TX',
      zipCode: '75202',
      skills: ['Tree Trimming'],
      availability: 'Mon-Fri',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-700'
    }
  ];

  const statusOptions = ['All Status', 'Pending', 'Approved', 'Rejected'];
  const skillsOptions = ['All Skills', 'Lawn Mowing', 'Landscaping', 'Tree Trimming', 'Gardening', 'Snow Removal'];

  const filteredWorkers = allWorkers.filter(worker => {
    const matchesSearch = 
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.id.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All Status' || worker.status === statusFilter;
    const matchesSkills = skillsFilter === 'All Skills' || worker.skills.includes(skillsFilter);
    
    return matchesSearch && matchesStatus && matchesSkills;
  });

  const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWorkers = filteredWorkers.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
    setShowStatusDropdown(false);
  };

  const handleSkillsChange = (skill) => {
    setSkillsFilter(skill);
    setCurrentPage(1);
    setShowSkillsDropdown(false);
  };

   const handleViewWorker = (workerId) => {
    // Use navigate to route to the worker's detail page
    navigate(`/workers/${workerId}`);
  };

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="mx-auto ">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Workers Management</h1>

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
            
            <div className="relative">
              <button 
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowSkillsDropdown(false);
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

            <div className="relative">
              <button 
                onClick={() => {
                  setShowSkillsDropdown(!showSkillsDropdown);
                  setShowStatusDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {skillsFilter}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showSkillsDropdown && (
                <div className="absolute z-10 w-48 mt-1 bg-white border border-gray-200 rounded-md shadow-lg top-full">
                  {skillsOptions.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillsChange(skill)}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                    >
                      {skill}
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
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Worker</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Age</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Skills</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Availability</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentWorkers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No workers found</td>
                  </tr>
                ) : (
                  currentWorkers.map((worker) => (
                    <tr key={worker.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">
                            {worker.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                            <div className="text-xs text-gray-500 truncate">{worker.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{worker.age}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{worker.location}</div>
                        <div className="text-xs text-gray-500">{worker.zipCode}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {worker.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{worker.availability}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${worker.statusColor}`}>
                          {worker.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleViewWorker(worker.id)}
                          className="p-1 text-gray-600 transition hover:text-gray-700"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredWorkers.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredWorkers.length)} of {filteredWorkers.length} results
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
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
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
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
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
export default Workers;