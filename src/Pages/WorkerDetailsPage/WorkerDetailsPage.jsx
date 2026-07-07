import React from 'react';
import { ChevronLeft, CheckCircle, XCircle, Pause, Play } from 'lucide-react';

export default function WorkerDetailsPage() {
  // In a real app, you would fetch this data based on the worker ID from the URL
  const workerData = {
    id: 1,
    name: 'Michael David Thompson',
    email: 'michael.thompson@email.com',
    phone: '+1 (555) 123-4567',
    address: '1234 Oak Street, Austin, TX 78701',
    dateOfBirth: 'March 15, 1985',
    emergencyContact: 'Sarah Thompson - (555) 987-6543',
    skills: ['Lawn Mowing', 'Tree Trimming', 'Landscaping', 'Garden Design'],
    experienceLevel: '10 Years Professional',
    serviceRadius: '25 miles',
    weekSchedule: {
      Mon: '8AM-6PM',
      Tue: '8AM-6PM',
      Wed: '8AM-6PM',
      Thu: '8AM-6PM',
      Fri: '8AM-6PM',
      Sat: '8AM-3PM',
      Sun: 'Unavailable'
    },
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    applicationDate: 'December 15, 2023',
    backgroundCheck: { status: 'Passed', date: 'Dec 18, 2023' },
    references: [
      { name: 'John Smith - Previous Employer', phone: '(555) 234-5678', verified: true },
      { name: 'Lisa Johnson - Client Reference', phone: '(555) 345-6789', verified: true }
    ],
    status: 'Pending'
  };

  const handleBack = () => {
    // In a real app: navigate(-1) or navigate('/workers')
    alert('Navigate back to workers table');
  };

  const handleApprove = () => {
    alert('Approve worker action');
  };

  const handleReject = () => {
    alert('Reject application action');
  };

  const handleSuspend = () => {
    alert('Suspend worker action');
  };

  const handleReactivate = () => {
    alert('Reactivate worker action');
  };

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="mx-auto">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 text-gray-600 transition hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Workers
        </button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - 2/3 width */}
          <div className="space-y-6 lg:col-span-2">
            {/* Personal Information */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-xs text-gray-500">Full Name</label>
                  <span className="text-sm text-gray-900">{workerData.name}</span>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">Email</label>
                  <span className="text-sm text-gray-900">{workerData.email}</span>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">Phone</label>
                  <span className="text-sm text-gray-900">{workerData.phone}</span>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">Date of Birth</label>
                  <span className="text-sm text-gray-900">{workerData.dateOfBirth}</span>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">Address</label>
                  <span className="text-sm text-gray-900">{workerData.address}</span>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">Emergency Contact</label>
                  <span className="text-sm text-gray-900">{workerData.emergencyContact}</span>
                </div>
              </div>
            </div>

            {/* Skills & Availability */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Skills & Availability</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-xs text-gray-500">Services Offered</label>
                  <div className="flex flex-wrap gap-2">
                    {workerData.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-900 text-white">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-xs text-gray-500">Experience Level</label>
                    <span className="text-sm text-gray-900">{workerData.experienceLevel}</span>
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-gray-500">Service Radius</label>
                    <span className="text-sm text-gray-900">{workerData.serviceRadius}</span>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-xs text-gray-500">Availability</label>
                  <div className="grid grid-cols-7 gap-2">
                    {Object.entries(workerData.weekSchedule).map(([day, time]) => (
                      <div key={day} className="text-center">
                        <div className="mb-1 text-xs font-medium text-gray-700">{day}</div>
                        <div className={`text-xs px-2 py-1.5 rounded ${time === 'Unavailable' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'}`}>
                          {time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Uploaded Documents</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Profile Photo</span>
                    <button className="text-xs text-blue-600 hover:text-blue-700">View</button>
                  </div>
                  <div className="overflow-hidden bg-gray-100 rounded-lg aspect-video">
                    <img src={workerData.profilePhoto} alt="Profile" className="object-cover w-full h-full" />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Uploaded: Dec 15, 2023</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Government ID</span>
                    <button className="text-xs text-blue-600 hover:text-blue-700">View</button>
                  </div>
                  <div className="flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg aspect-video">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2"/>
                      <path d="M3 10h18" strokeWidth="2"/>
                    </svg>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Uploaded: Dec 15, 2023</p>
                </div>
              </div>
            </div>

            {/* Application Summary */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Application Summary</h2>
              <div className="space-y-3">
                <div>
                  <label className="block mb-1 text-xs text-gray-500">Application Date</label>
                  <span className="text-sm text-gray-900">{workerData.applicationDate}</span>
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-500">Background Check</label>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">{workerData.backgroundCheck.status}</span>
                    <span className="text-xs text-gray-500">- Completed on {workerData.backgroundCheck.date}</span>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-xs text-gray-500">References</label>
                  <div className="space-y-2">
                    {workerData.references.map((ref, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                          <div className="text-sm text-gray-900">{ref.name}</div>
                          <div className="text-xs text-gray-500">{ref.phone}</div>
                        </div>
                        <span className={`text-xs font-medium ${ref.verified ? 'text-green-600' : 'text-gray-500'}`}>
                          {ref.verified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 bg-white rounded-lg shadow-sm top-6">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Admin Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={handleApprove}
                  className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Worker
                </button>
                <button 
                  onClick={handleReject}
                  className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Application
                </button>
                <button 
                  onClick={handleSuspend}
                  className="w-full px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition"
                >
                  <Pause className="w-4 h-4" />
                  Suspend Worker
                </button>
                <button 
                  onClick={handleReactivate}
                  className="w-full px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition"
                >
                  <Play className="w-4 h-4" />
                  Reactivate Worker
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}