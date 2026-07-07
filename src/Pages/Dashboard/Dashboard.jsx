import React from 'react';
import { Calendar, Users, Clock, DollarSign, User } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,247',
      change: '12% from last month',
      icon: Calendar,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Active Workers',
      value: '342',
      change: '8% from last month',
      icon: Users,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Pending Jobs',
      value: '89',
      change: 'Awaiting assignment',
      icon: Clock,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      changeColor: 'text-orange-600'
    },
    {
      title: 'Platform Earnings',
      value: '$18,492',
      change: '12% commission total',
      icon: DollarSign,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const bookings = [
    { name: 'Sarah Johnson', service: 'Lawn Mowing', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
    { name: 'Michael Chen', service: 'Tree Trimming', status: 'In Progress', statusColor: 'bg-blue-100 text-blue-700' },
    { name: 'Emily Rodriguez', service: 'Garden Cleanup', status: 'Pending', statusColor: 'bg-orange-100 text-orange-700' },
    { name: 'David Thompson', service: 'Hedge Trimming', status: 'Completed', statusColor: 'bg-green-100 text-green-700' },
    { name: 'Jessica Martinez', service: 'Lawn Fertilizing', status: 'In Progress', statusColor: 'bg-blue-100 text-blue-700' }
  ];

  const applications = [
    { name: 'Robert Williams', location: 'Austin, TX', status: 'Under Review', statusColor: 'bg-yellow-100 text-yellow-700' },
    { name: 'James Anderson', location: 'Dallas, TX', status: 'Under Review', statusColor: 'bg-yellow-100 text-yellow-700' },
    { name: 'Christopher Lee', location: 'Houston, TX', status: 'Approved', statusColor: 'bg-green-100 text-green-700' },
    { name: 'Daniel Brown', location: 'San Antonio, TX', status: 'Under Review', statusColor: 'bg-yellow-100 text-yellow-700' },
    { name: 'Matthew Davis', location: 'Fort Worth, TX', status: 'Rejected', statusColor: 'bg-red-100 text-red-700' }
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="mx-auto ">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 shadow-md md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-2 text-sm text-gray-600">{stat.title}</p>
                  <h3 className="mb-2 text-3xl font-bold text-#0A3019">{stat.value}</h3>
                  <p className={`text-sm flex items-center ${stat.changeColor || 'text-gray-600'}`}>
                    {stat.title === 'Total Bookings' || stat.title === 'Active Workers' ? '↑ ' : ''}
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          {/* Latest Bookings */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-#0A3019">Latest Bookings</h2>
              <button className="text-sm text-gray-600 hover:text-#0A3019">View All</button>
            </div>
            <div className="space-y-4">
              {bookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                      {getInitials(booking.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-#0A3019">{booking.name}</p>
                      <p className="text-sm text-gray-600">{booking.service}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.statusColor}`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* New Worker Applications */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-#0A3019">New Worker Applications</h2>
              <button className="text-sm text-gray-600 hover:text-#0A3019">View All</button>
            </div>
            <div className="space-y-4">
              {applications.map((app, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                      {getInitials(app.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-#0A3019">{app.name}</p>
                      <p className="text-sm text-gray-600">{app.location}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='p-6 bg-white rounded-lg shadow-md'>
          <h2 className="mb-4 text-xl font-bold text-#0A3019 ">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <button className="flex items-center justify-center gap-3 px-6 py-4 font-semibold text-white transition bg-[#0A3019] rounded-lg ">
              <Calendar className="w-5 h-5" />
              View All Bookings
            </button>
            <button className="flex items-center justify-center gap-3 px-6 py-4 font-semibold text-white transition bg-[#0A3019] rounded-lg ">
              <User className="w-5 h-5" />
              Review Worker Applications
            </button>
            <button className="flex items-center justify-center gap-3 px-6 py-4 font-semibold text-white transition bg-[#0A3019] rounded-lg ">
              <DollarSign className="w-5 h-5" />
              View Payments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}