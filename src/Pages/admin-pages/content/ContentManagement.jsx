import React, { useState } from 'react';
import { 
  FileText, 
  ImageIcon, 
  Edit3, 
  AlertTriangle, 
  Home, 
  HelpCircle, 
  Book, 
  Gavel,
  Plus,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  UploadCloud
} from 'lucide-react';
import StatCard from '../../../Components/admin-components/content/StatCard';
import SectionCard from '../../../Components/admin-components/content/SectionCard';
import { Link } from 'react-router-dom';
import { Modal, Form, Input, Upload, message } from 'antd';

const ContentManagement = () => {
  // State for Banners
  const [banners, setBanners] = useState([
    { id: 1, title: 'Summer Sale', status: 'Active' },
    { id: 2, title: 'New Arrivals', status: 'Active' },
    { id: 3, title: 'Holiday Special', status: 'Active' },
    { id: 4, title: 'Flash Deal', status: 'Active' }
  ]);
  
  const [isBannerModalVisible, setIsBannerModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showBannerModal = () => {
    setIsBannerModalVisible(true);
  };

  const handleBannerCancel = () => {
    setIsBannerModalVisible(false);
    form.resetFields();
  };

  const handleBannerOk = () => {
    form.validateFields().then((values) => {
      const newBanner = {
        id: Date.now(),
        title: values.title,
        status: 'Active'
      };
      setBanners([...banners, newBanner]);
      message.success('Banner added successfully!');
      setIsBannerModalVisible(false);
      form.resetFields();
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const activeBannersCount = banners.filter(b => b.status === 'Active').length;

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[#FAFAFA] min-h-screen mt-16">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1f36] mb-2">Content Management</h1>
          <p className="text-[#697386]">Manage homepage content, banners, FAQs, policies, static pages, and SEO settings.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Edit3 size={16} />
            Update FAQ
          </button>
          <button 
            onClick={showBannerModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#d9a05b] text-white rounded-lg text-sm font-medium hover:bg-[#c89250] transition-colors"
          >
            <Plus size={16} />
            Add Banner
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Published Pages"
          value="12"
          icon={<FileText size={24} />}
          badgeColor="bg-yellow-50"
          badgeTextColor="text-yellow-600"
        />
        <StatCard
          title="Active Banners"
          value={activeBannersCount}
          icon={<ImageIcon size={24} />}
          badgeColor="bg-green-50"
          badgeTextColor="text-green-600"
        />
        <StatCard
          title="Draft Updates"
          value="3"
          icon={<Edit3 size={24} />}
          badgeColor="bg-orange-50"
          badgeTextColor="text-orange-600"
        />
        <StatCard
          title="SEO Issues"
          value="2"
          icon={<AlertTriangle size={24} />}
          badgeColor="bg-red-50"
          badgeTextColor="text-red-600"
          borderColor="border-red-200 bg-red-50/30"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column - Content Sections (Spans 2 columns on large screens) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionCard
            title="Homepage Content"
            description="Control sections, feature highlights, and body copy on the main landing page."
            badgeText="Published"
            badgeType="success"
            icon={<Home size={20} />}
            editLink="/content/homepage"
          />
          <SectionCard
            title="Banner Management"
            description="Promotional carousels and top-bar announcements for marketing campaigns."
            badgeText={`${activeBannersCount} Active`}
            badgeType="info"
            icon={<ImageIcon size={20} />}
            editLink="#"
          />
          <SectionCard
            title="FAQ"
            description="Common questions and answers structured for easy user consumption and help desk deflection."
            badgeText="Published"
            badgeType="success"
            icon={<HelpCircle size={20} />}
            editLink="#"
          />
          <SectionCard
            title="Help Center Articles"
            description="Comprehensive guides, tutorials, and troubleshooting articles for complex platform features."
            badgeText="Drafts Available"
            badgeType="warning"
            icon={<Book size={20} />}
            editLink="#"
          />
          <SectionCard
            title="Policies"
            description="Legal terms, privacy policy, and cookie consent documentation management."
            badgeText="Published"
            badgeType="success"
            icon={<Gavel size={20} />}
            editLink="#"
          />
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="space-y-6">
          {/* Content Health Widget */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <RefreshCw size={20} className="text-yellow-600" />
              Content Health
            </h3>

            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <span>System Sync</span>
                <span className="text-yellow-600">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 border-l-2 border-green-500 pl-3">
                <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Policies Updated</p>
                  <p className="text-xs text-gray-500">Terms of Service sync 2h ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-orange-500 pl-3">
                <Clock size={16} className="text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Pending Drafts</p>
                  <p className="text-xs text-gray-500">3 items awaiting approval</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-red-500 pl-3">
                <AlertCircle size={16} className="text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Broken Links</p>
                  <p className="text-xs text-gray-500">2 links in Help Center</p>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Logs Widget */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Audit Logs
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-600">Admin_01 edited "Home"</span>
                </div>
                <span className="text-gray-400 text-xs">12m</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-600">SEO Bot scanned site</span>
                </div>
                <span className="text-gray-400 text-xs">1h</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-gray-600">New Banner "Summer24"</span>
                </div>
                <span className="text-gray-400 text-xs">4h</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Add Banner Modal */}
      <Modal 
        title="Add New Banner" 
        open={isBannerModalVisible} 
        onOk={handleBannerOk} 
        onCancel={handleBannerCancel}
        okText="Add Banner"
        okButtonProps={{ style: { backgroundColor: '#d9a05b', borderColor: '#d9a05b' } }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item 
            name="title" 
            label="Banner Title"
            rules={[{ required: true, message: 'Please input the banner title!' }]}
          >
            <Input placeholder="e.g., Summer Mega Sale" />
          </Form.Item>
          
          <Form.Item label="Banner Image">
            <Upload.Dragger name="files" action="/upload.do" maxCount={1}>
              <p className="ant-upload-drag-icon flex justify-center text-gray-400">
                <UploadCloud size={32} />
              </p>
              <p className="ant-upload-text">Click or drag image to this area to upload</p>
              <p className="ant-upload-hint">Support for a single image upload. Strict strictly prohibit from uploading company data or other band files</p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentManagement;
