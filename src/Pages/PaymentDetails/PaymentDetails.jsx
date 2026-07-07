import React from 'react';
import { Download, Printer, Mail, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const record = location.state?.record;

  if (!record) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">No payment record found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="mx-auto ">
        <button
          onClick={() => navigate('/')}
          className="flex items-center mb-6 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Payment Records
        </button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Job Information */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Job Information</h2>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 text-sm text-gray-500">Job Title</div>
                  <div className="font-medium">{record.jobTitle}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1 text-sm text-gray-500">Service Date</div>
                    <div className="font-medium">{record.serviceDate}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-gray-500">Job ID</div>
                    <div className="font-medium">{record.jobId.replace('#', '#JOB-2024-1')}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1 text-sm text-gray-500">Duration</div>
                    <div className="font-medium">{record.duration}</div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-500">Service Address</div>
                  <div className="font-medium">{record.address}</div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Customer Information</h2>
              <div className="flex items-start mb-4">
                <div className="flex items-center justify-center w-12 h-12 mr-3 font-semibold text-white rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                  {record.customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="font-medium">{record.customer.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Customer ID</div>
                      <div className="font-medium">{record.customerId}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="mb-1 text-sm text-gray-500">Email</div>
                  <div className="text-sm font-medium">{record.customer.email}</div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{record.phone}</div>
                </div>
              </div>
            </div>

            {/* Worker Information */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Worker Information</h2>
              <div className="flex items-start mb-4">
                <div className="flex items-center justify-center w-12 h-12 mr-3 font-semibold text-white rounded-full bg-gradient-to-br from-green-400 to-teal-500">
                  MR
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="font-medium">Mike Rodriguez</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Worker ID</div>
                      <div className="font-medium">{record.workerId}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="mb-1 text-sm text-gray-500">Rating</div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm font-medium">({record.rating})</span>
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-500">Payout Method</div>
                  <div className="flex items-center font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Bank Transfer *****1234
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Payment Breakdown */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Payment Breakdown</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Service Amount</span>
                  <span className="font-semibold">${record.serviceAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Platform Fee (12%)</span>
                  <span className="font-semibold">-${(record.serviceAmount * 0.12).toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-semibold">-${record.processingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between px-6 py-3 -mx-6 bg-gray-50">
                  <span className="font-semibold">Worker Payout (88%)</span>
                  <span className="text-xl font-bold">${(record.serviceAmount * 0.88 - record.processingFee).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Transaction Details</h2>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 text-sm text-gray-500">Payment Method</div>
                  <div className="flex items-center">
                    <div className="px-2 py-1 mr-2 text-xs font-semibold text-white bg-blue-600 rounded">
                      {record.paymentMethod === 'Visa' ? 'VISA' : record.paymentMethod === 'MC' ? 'MC' : 'PAYPAL'}
                    </div>
                    <span className="font-medium">
                      {record.paymentMethod === 'PayPal' ? 'PayPal Account' : `${record.paymentMethod} ending in ${record.cardEnding}`}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-500">Transaction ID</div>
                  <div className="font-mono text-sm">{record.transactionId}</div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-500">Payment Gateway</div>
                  <div className="font-medium">{record.gateway}</div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-500">Processed At</div>
                  <div className="font-medium">{record.processedAt}</div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-gray-500">Worker Payout Status</div>
                  <div className="flex items-center">
                    <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      record.payoutStatus === 'Paid' ? 'bg-green-100 text-green-700' : 
                      record.payoutStatus === 'Processing' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {record.payoutStatus === 'Paid' && (
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {record.payoutStatus}
                    </div>
                    <span className="ml-3 text-sm text-gray-600">{record.payoutDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
              <div className="space-y-3">
                <button className="flex items-center justify-center w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </button>
                <button className="flex items-center justify-center w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Details
                </button>
                <button className="flex items-center justify-center w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;