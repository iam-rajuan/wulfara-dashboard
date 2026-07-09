import React, { useState } from 'react';
import { Plus, Filter, Download, Edit3, Trash2, TrendingUp, Clock, Archive, AlertTriangle, UploadCloud } from 'lucide-react';
import { Table, Tag, Tooltip, Modal, Form, Input, Select, DatePicker, Upload, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

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
  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Mock Data for SEO Inventory (Matching Banner Layout)
  const [seoData, setSeoData] = useState([
    {
      key: '1',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8ed3c812b0?q=80&w=200&auto=format&fit=crop',
      title: 'Find Trusted Suppliers',
      placement: 'Home Hero',
      startDate: '2023-10-01',
      endDate: '2024-10-01',
      status: 'Active',
    },
    {
      key: '2',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200&auto=format&fit=crop',
      title: 'Global Logistics Partners',
      placement: 'Sidebar Sticky',
      startDate: '2023-11-15',
      endDate: '2024-05-15',
      status: 'Active',
    },
    {
      key: '3',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=200&auto=format&fit=crop',
      title: 'Manufacturing Suppliers',
      placement: 'Footer Top',
      startDate: '2024-01-10',
      endDate: '2024-03-10',
      status: 'Scheduled',
    },
    {
      key: '4',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop',
      title: 'List Your Company',
      placement: 'Category Listing',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: 'Expired',
    },
  ]);

  const handleDelete = (key) => {
    setSeoData(seoData.filter(item => item.key !== key));
    message.success('Item deleted successfully');
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      title: record.title,
      placement: record.placement,
      status: record.status,
      dates: [dayjs(record.startDate), dayjs(record.endDate)]
    });
    setIsEditModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const updatedData = seoData.map(item => {
        if (item.key === editingRecord.key) {
          return {
            ...item,
            title: values.title,
            placement: values.placement,
            status: values.status,
            startDate: values.dates[0].format('YYYY-MM-DD'),
            endDate: values.dates[1].format('YYYY-MM-DD')
          };
        }
        return item;
      });
      setSeoData(updatedData);
      setIsEditModalVisible(false);
      message.success('Item updated successfully');
    });
  };

  // Define Table Columns
  const columns = [
    {
      title: 'IMAGE PREVIEW',
      dataIndex: 'image',
      key: 'image',
      render: (img) => (
        <div className="w-[100px] h-[45px] rounded overflow-hidden shadow-sm">
          <img src={img} alt="Preview" className="w-full h-full object-cover" />
        </div>
      ),
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span className="font-bold text-gray-800 text-sm max-w-[150px] block leading-tight">{text}</span>,
    },
    {
      title: 'PLACEMENT',
      dataIndex: 'placement',
      key: 'placement',
      render: (text) => <span className="text-gray-500 text-sm">{text}</span>,
    },
    {
      title: 'START DATE',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => <span className="text-gray-500 text-sm">{text}</span>,
    },
    {
      title: 'END DATE',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => <span className="text-gray-500 text-sm">{text}</span>,
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
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${color} ${bgColor} border-opacity-50`}>
            {status}
          </span>
        );
      },
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Scheduled', value: 'Scheduled' },
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
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(record);
              }}
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit3 size={18} />
            </button>
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete this record"
              description="Are you sure you want to delete this record?"
              onConfirm={(e) => {
                e.stopPropagation();
                handleDelete(record.key);
              }}
              onCancel={(e) => e.stopPropagation()}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <button onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-red-600 transition-colors">
                <Trash2 size={18} />
              </button>
            </Popconfirm>
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
        <Link to="/seo/add" className="flex items-center gap-2 px-5 py-2.5 bg-[#dcb14b] text-gray-900 rounded-md text-sm font-semibold hover:bg-[#c9a040] transition-colors shadow-sm">
          <Plus size={18} />
          Add SEO
        </Link>
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

      {/* Dynamic Edit Modal */}
      <Modal
        title={<span className="font-bold text-gray-800">Edit SEO / Banner Record</span>}
        open={isEditModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Save Changes"
        okButtonProps={{ style: { backgroundColor: '#dcb14b', borderColor: '#dcb14b', color: '#111' } }}
        width={600}
      >
        <Form form={form} layout="vertical" className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label={<span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Title</span>}
              rules={[{ required: true }]}
            >
              <Input className="rounded-lg" />
            </Form.Item>
            
            <Form.Item
              name="placement"
              label={<span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Placement</span>}
              rules={[{ required: true }]}
            >
              <Select className="rounded-lg">
                <Select.Option value="Home Hero">Home Hero</Select.Option>
                <Select.Option value="Sidebar Sticky">Sidebar Sticky</Select.Option>
                <Select.Option value="Footer Top">Footer Top</Select.Option>
                <Select.Option value="Category Listing">Category Listing</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="dates"
              label={<span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Start & End Dates</span>}
              rules={[{ required: true }]}
            >
              <DatePicker.RangePicker className="w-full rounded-lg" />
            </Form.Item>

            <Form.Item
              name="status"
              label={<span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Status</span>}
              rules={[{ required: true }]}
            >
              <Select className="rounded-lg">
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Scheduled">Scheduled</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
                <Select.Option value="Expired">Expired</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Banner / Graph Image</span>}
          >
            <Upload.Dragger name="image" action="/upload.do" maxCount={1} showUploadList={false}>
              <div className="p-6 flex flex-col items-center justify-center">
                <UploadCloud className="text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-600 font-semibold mb-1">Click or drag image to upload</p>
                <p className="text-xs text-gray-400">Support for high-res webp, png, jpg.</p>
              </div>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
      
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
