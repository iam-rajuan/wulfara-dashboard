import React from 'react';
import { ChevronLeft, Star } from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { customersData } from '../Customers/Customers';

const CustomerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  // Get customer from location state or find by id
  const selectedCustomer = location.state?.customer || customersData.find(c => c.id === parseInt(id));

  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Canceled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 text-yellow-400 opacity-50 fill-yellow-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  if (!selectedCustomer) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Customer not found</h2>
          <button
            onClick={() => navigate('/customers')}
            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Go to Customers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="mx-auto ">
        <button
          onClick={() => navigate('/customers')}
          className="flex items-center mb-6 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Customers
        </button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Customer Info */}
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Customer Information</h2>
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 mr-4 text-xl font-semibold text-white rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                  {selectedCustomer.avatar}
                </div>
                <div>
                  <div className="text-lg font-semibold">{selectedCustomer.name}</div>
                  <div className="text-sm text-gray-500">{selectedCustomer.memberSince}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{selectedCustomer.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{selectedCustomer.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-medium">{selectedCustomer.address}</div>
                  <div className="font-medium">{selectedCustomer.city}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Property Type</div>
                  <div className="font-medium">{selectedCustomer.propertyType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Yard Size</div>
                  <div className="font-medium">{selectedCustomer.yardSize}</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Payment Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-semibold">${selectedCustomer.totalSpentSummary.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Outstanding Balance</span>
                  <span className="font-semibold">${selectedCustomer.outstandingBalance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Average Order</span>
                  <span className="font-semibold">${selectedCustomer.averageOrder.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">{selectedCustomer.paymentMethod}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Last Payment</span>
                  <span className="font-medium">{selectedCustomer.lastPayment}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Booking History</h2>
                  <div className="flex gap-3">
                    <select className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>All Services</option>
                      <option>Lawn Mowing</option>
                      <option>Tree Trimming</option>
                      <option>Garden Maintenance</option>
                    </select>
                    <select className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Last 6 months</option>
                      <option>Last 3 months</option>
                      <option>Last year</option>
                      <option>All time</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Service</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Provider</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedCustomer.bookings.map((booking, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm whitespace-nowrap">{booking.date}</td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">{booking.service}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">{booking.provider}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getBookingStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">${booking.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.rating > 0 ? (
                            <div className="flex items-center gap-1">
                              {renderStars(booking.rating)}
                              <span className="ml-1 text-sm text-gray-600">{booking.rating.toFixed(1)}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing 1-5 of {selectedCustomer.bookings.length} bookings
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 text-sm text-white bg-gray-900 rounded">1</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;