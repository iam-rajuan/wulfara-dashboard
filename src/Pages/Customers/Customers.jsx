import React from 'react';
import { Eye, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock customer data - export so it can be used in CustomerDetails
export const customersData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    memberSince: 'Member since Jan 2024',
    totalBookings: 24,
    totalSpent: 3240,
    status: 'Active',
    avatar: 'SJ',
    address: '1234 Oak Street',
    city: 'Springfield, IL 62701',
    propertyType: 'Single Family Home',
    yardSize: '0.5 acres',
    bookings: [
      { date: 'Dec 10, 2024', service: 'Lawn Mowing', provider: "Mike's Lawn Care", status: 'Completed', amount: 85.00, rating: 5.0 },
      { date: 'Nov 28, 2024', service: 'Tree Trimming', provider: 'Urban Thumb Services', status: 'Completed', amount: 320.00, rating: 4.0 },
      { date: 'Nov 10, 2024', service: 'Leaf Removal', provider: 'Seasonal Solutions', status: 'Completed', amount: 150.00, rating: 5.0 },
      { date: 'Oct 22, 2024', service: 'Garden Maintenance', provider: 'Pro Landscaping', status: 'Completed', amount: 200.00, rating: 5.0 },
      { date: 'Sep 15, 2024', service: 'Lawn Mowing', provider: "Mike's Lawn Care", status: 'Canceled', amount: 85.00, rating: 0 }
    ],
    totalSpentSummary: 2450.00,
    outstandingBalance: 0.00,
    averageOrder: 175.00,
    paymentMethod: '**** 4242',
    lastPayment: 'Dec 15, 2024'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    memberSince: 'Member since Dec 2023',
    totalBookings: 18,
    totalSpent: 2890,
    status: 'Active',
    avatar: 'MC',
    address: '5678 Maple Ave',
    city: 'Chicago, IL 60601',
    propertyType: 'Townhouse',
    yardSize: '0.3 acres',
    bookings: [
      { date: 'Dec 8, 2024', service: 'Snow Removal', provider: 'Winter Services Pro', status: 'Completed', amount: 120.00, rating: 5.0 },
      { date: 'Nov 15, 2024', service: 'Gutter Cleaning', provider: 'Home Maintenance Plus', status: 'Completed', amount: 180.00, rating: 4.5 }
    ],
    totalSpentSummary: 1890.00,
    outstandingBalance: 0.00,
    averageOrder: 160.00,
    paymentMethod: '**** 5555',
    lastPayment: 'Dec 10, 2024'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '(555) 345-6789',
    memberSince: 'Member since Nov 2023',
    totalBookings: 32,
    totalSpent: 4560,
    status: 'Active',
    avatar: 'ER',
    address: '9012 Pine Street',
    city: 'Boston, MA 02101',
    propertyType: 'Single Family Home',
    yardSize: '0.8 acres',
    bookings: [
      { date: 'Dec 12, 2024', service: 'Landscaping Design', provider: 'Green Horizon', status: 'Completed', amount: 450.00, rating: 5.0 },
      { date: 'Nov 20, 2024', service: 'Lawn Fertilization', provider: 'Lawn Doctor', status: 'Completed', amount: 95.00, rating: 4.0 }
    ],
    totalSpentSummary: 3200.00,
    outstandingBalance: 0.00,
    averageOrder: 142.50,
    paymentMethod: '**** 8888',
    lastPayment: 'Dec 13, 2024'
  },
  {
    id: 4,
    name: 'David Thompson',
    email: 'david.thompson@email.com',
    phone: '(555) 456-7890',
    memberSince: 'Member since Oct 2023',
    totalBookings: 12,
    totalSpent: 1680,
    status: 'Inactive',
    avatar: 'DT',
    address: '3456 Oak Lane',
    city: 'Seattle, WA 98101',
    propertyType: 'Condo',
    yardSize: '0.1 acres',
    bookings: [
      { date: 'Sep 5, 2024', service: 'Lawn Mowing', provider: 'Quick Cuts', status: 'Completed', amount: 65.00, rating: 3.5 }
    ],
    totalSpentSummary: 890.00,
    outstandingBalance: 0.00,
    averageOrder: 140.00,
    paymentMethod: '**** 1234',
    lastPayment: 'Sep 10, 2024'
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    email: 'jessica.martinez@email.com',
    phone: '(555) 567-8901',
    memberSince: 'Member since Sep 2023',
    totalBookings: 28,
    totalSpent: 3920,
    status: 'Active',
    avatar: 'JM',
    address: '7890 Cedar Road',
    city: 'Portland, OR 97201',
    propertyType: 'Single Family Home',
    yardSize: '0.6 acres',
    bookings: [
      { date: 'Dec 5, 2024', service: 'Pruning', provider: 'Tree Care Experts', status: 'Completed', amount: 175.00, rating: 5.0 },
      { date: 'Nov 18, 2024', service: 'Mulching', provider: 'Garden Solutions', status: 'Completed', amount: 130.00, rating: 4.5 }
    ],
    totalSpentSummary: 2750.00,
    outstandingBalance: 0.00,
    averageOrder: 140.00,
    paymentMethod: '**** 6789',
    lastPayment: 'Dec 6, 2024'
  },
  {
    id: 6,
    name: 'Robert Wilson',
    email: 'robert.wilson@email.com',
    phone: '(555) 678-9012',
    memberSince: 'Member since Aug 2023',
    totalBookings: 15,
    totalSpent: 2100,
    status: 'Active',
    avatar: 'RW',
    address: '2468 Birch Ave',
    city: 'Denver, CO 80201',
    propertyType: 'Single Family Home',
    yardSize: '0.4 acres',
    bookings: [
      { date: 'Dec 1, 2024', service: 'Lawn Aeration', provider: 'Healthy Lawns Co', status: 'Completed', amount: 110.00, rating: 4.5 }
    ],
    totalSpentSummary: 1580.00,
    outstandingBalance: 0.00,
    averageOrder: 140.00,
    paymentMethod: '**** 9012',
    lastPayment: 'Dec 2, 2024'
  }
];

const Customers = () => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500';
  };

  const handleViewDetails = (customer) => {
    navigate(`/customer/${customer.id}`, { state: { customer } });
  };

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="mx-auto ">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="mb-1 text-2xl font-bold">2,847</div>
            <div className="text-sm text-gray-500">Total Customers</div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="mb-1 text-2xl font-bold">2,654</div>
            <div className="text-sm text-gray-500">Active Customers</div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="mb-1 text-2xl font-bold">8,932</div>
            <div className="text-sm text-gray-500">Total Bookings</div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="mb-1 text-2xl font-bold">$456,892</div>
            <div className="text-sm text-gray-500">Total Revenue</div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email or phone..."
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Sort by: Newest</option>
                <option>Oldest</option>
                <option>Most Bookings</option>
                <option>Highest Spent</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Total Bookings</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Total Spent</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customersData.map((customer) => (
                  <tr key={customer.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-10 h-10 mr-3 font-semibold text-white rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                          {customer.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-xs text-gray-500">{customer.memberSince}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-xs text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {customer.totalBookings}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      ${customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetails(customer)}
                        className="text-gray-600 transition-colors hover:text-gray-900"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing 1 to 6 of 47 results
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-3 py-2 text-white bg-gray-900 rounded-lg">1</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;