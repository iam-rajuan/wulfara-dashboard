import React, { useState } from 'react';
import { Plus, Filter, Download, Edit3, Trash2, TrendingUp, Clock, Archive, AlertTriangle } from 'lucide-react';
import { Table, Tag, Tooltip } from 'antd';

// Custom Stat Card Component to match the design
const SeoStatCard = ({ title, count, subtitle, icon, colorClass, numberColorClass, subtitleColorClass }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{title}</h3>
      <div className={`text-5xl font-black ${numberColorClass} mb-6`}>
        {count}
      </div>
      <div className={`flex items-center gap-2 text-xs font-bold ${subtitleColorClass}`}>
        {icon}
        <span>{subtitle}</span>
      </div>
    </div>
  );
};

const SeoManagement = () => {
  // Mock Data for SEO Inventory
  const [seoData] = useState([
    {
      key: '1',
      pagePath: '/home',
      metaTitle: 'Wulfara - Industrial Logistics Matrix',
      focusKeyword: 'industrial logistics',
      lastUpdated: '2024-10-01',
      status: 'Active',
    },
    {
      key: '2',
      pagePath: '/capabilities',
      metaTitle: 'Certified Supplier Network | Wulfara',
      focusKeyword: 'supplier network',
      lastUpdated: '2024-09-15',
      status: 'Active',
    },
    {
      key: '3',
      pagePath: '/about-us',
      metaTitle: 'About Wulfara Technologies',
      focusKeyword: 'about wulfara',
      lastUpdated: '2024-08-20',
      status: 'Inactive',
    },
    {
      key: '4',
      pagePath: '/new-feature-landing',
      metaTitle: 'Matrix v2.0 - Coming Soon',
      focusKeyword: 'matrix v2',
      lastUpdated: '2024-10-10',
      status: 'Scheduled',
    },
    {
      key: '5',
      pagePath: '/holiday-promo',
      metaTitle: 'End of Year Supplier Discounts',
      focusKeyword: 'supplier discounts',
      lastUpdated: '2023-12-01',
      status: 'Expired',
    },
    {
      key: '6',
      pagePath: '/blog/quantum-encryption',
      metaTitle: 'Quantum Encryption in Logistics',
      focusKeyword: 'quantum encryption logistics',
      lastUpdated: '2024-07-05',
      status: 'Active',
    },
    {
      key: '7',
      pagePath: '/contact',
      metaTitle: 'Contact Our Global Support',
      focusKeyword: 'contact wulfara',
      lastUpdated: '2024-05-11',
      status: 'Active',
    },
  ]);

  // Define Table Columns
  const columns = [
    {
      title: 'PAGE PATH',
      dataIndex: 'pagePath',
      key: 'pagePath',
      render: (text) => <span className="font-semibold text-gray-800">{text}</span>,
      sorter: (a, b) => a.pagePath.localeCompare(b.pagePath),
    },
    {
      title: 'META TITLE',
      dataIndex: 'metaTitle',
      key: 'metaTitle',
      render: (text) => <span className="text-gray-600 truncate max-w-[200px] block" title={text}>{text}</span>,
    },
    {
      title: 'FOCUS KEYWORD',
      dataIndex: 'focusKeyword',
      key: 'focusKeyword',
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: 'LAST UPDATED',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      sorter: (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        let bgColor = '';
        
        switch(status) {
          case 'Active':
            color = 'text-green-700';
            bgColor = 'bg-green-100';
            break;
          case 'Scheduled':
            color = 'text-blue-700';
            bgColor = 'bg-blue-100';
            break;
          case 'Inactive':
            color = 'text-gray-600';
            bgColor = 'bg-gray-100';
            break;
          case 'Expired':
            color = 'text-red-700';
            bgColor = 'bg-red-100';
            break;
          default:
            color = 'text-gray-700';
            bgColor = 'bg-gray-100';
        }
        
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${color} ${bgColor}`}>
            {status}
          </span>
        );
      },
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Scheduled', value: 'Scheduled' },
        { text: 'Inactive', value: 'Inactive' },
        { text: 'Expired', value: 'Expired' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Tooltip title="Edit SEO">
            <button className="text-gray-400 hover:text-blue-600 transition-colors">
              <Edit3 size={18} />
            </button>
          </Tooltip>
          <Tooltip title="Delete">
            <button className="text-gray-400 hover:text-red-600 transition-colors">
              <Trash2 size={18} />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Calculate stats dynamically
  const activeCount = seoData.filter(item => item.status === 'Active').length;
  const scheduledCount = seoData.filter(item => item.status === 'Scheduled').length;
  const inactiveCount = seoData.filter(item => item.status === 'Inactive').length;
  const expiredCount = seoData.filter(item => item.status === 'Expired').length;

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[#FAFAFA] min-h-screen mt-16">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-medium text-[#333] mb-1">SEO Management</h1>
          <p className="text-[#888] text-sm">Create, schedule, activate, and manage WULFARA website SEO.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#dcb14b] text-gray-900 rounded-md text-sm font-semibold hover:bg-[#c9a040] transition-colors shadow-sm">
          <Plus size={18} />
          Add SEO
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SeoStatCard 
          title="ACTIVE"
          count={activeCount}
          subtitle="+2 this week"
          icon={<TrendingUp size={14} />}
          numberColorClass="text-[#dcb14b]"
          subtitleColorClass="text-[#dcb14b]"
        />
        <SeoStatCard 
          title="SCHEDULED"
          count={scheduledCount}
          subtitle="Next in 4 days"
          icon={<Clock size={14} />}
          numberColorClass="text-[#3b82f6]"
          subtitleColorClass="text-[#6b7280]"
        />
        <SeoStatCard 
          title="INACTIVE"
          count={inactiveCount}
          subtitle="Archive available"
          icon={<Archive size={14} />}
          numberColorClass="text-[#d1d5db]"
          subtitleColorClass="text-[#9ca3af]"
        />
        <SeoStatCard 
          title="EXPIRED"
          count={expiredCount}
          subtitle="Action required"
          icon={<AlertTriangle size={14} />}
          numberColorClass="text-[#ef4444]"
          subtitleColorClass="text-[#ef4444]"
        />
      </div>

      {/* Inventory Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table Header Controls */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-base font-bold text-gray-900">SEO Inventory</h2>
          <div className="flex gap-4 text-gray-400">
            <button className="hover:text-gray-700 transition-colors">
              <Filter size={18} />
            </button>
            <button className="hover:text-gray-700 transition-colors">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Ant Design Table */}
        <div className="px-6 pb-6 pt-2">
          <Table 
            columns={columns} 
            dataSource={seoData} 
            pagination={{
              pageSize: 4,
              showSizeChanger: true,
              pageSizeOptions: ['4', '10', '20'],
              showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} SEO records`,
              className: 'mt-6'
            }}
            rowClassName="hover:bg-gray-50 cursor-pointer"
            className="seo-management-table"
          />
        </div>
      </div>
      
      {/* Custom Styles for Antd Table to match the design (Optional but helpful for precise matching) */}
      <style jsx global>{`
        .seo-management-table .ant-table-thead > tr > th {
          background-color: transparent;
          color: #8892A3;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-bottom: 1px solid #f3f4f6;
          padding: 16px 16px;
        }
        .seo-management-table .ant-table-tbody > tr > td {
          padding: 16px 16px;
          border-bottom: 1px solid #f9fafb;
          font-size: 14px;
        }
        .seo-management-table .ant-pagination-item-active {
          border-color: #dcb14b;
          background-color: #dcb14b;
        }
        .seo-management-table .ant-pagination-item-active a {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default SeoManagement;
