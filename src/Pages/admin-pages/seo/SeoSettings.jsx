import React, { useState } from 'react';
import { 
  Globe, Eye, CheckCircle2, AlertTriangle, UploadCloud, 
  Filter, Download, Search, LayoutGrid, ShoppingCart, Truck, HelpCircle
} from 'lucide-react';
import { Input, Select, Switch, Upload, Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const SeoSettings = () => {
  const navigate = useNavigate();
  const [siteTitle, setSiteTitle] = useState('WULFARA | B2B Supplier Marketplace Directory');
  const [metaDesc, setMetaDesc] = useState('Wulfara Matrix is the leading global B2B supplier marketplace, connecting verified manufacturers with high-volume buyers through secure logistics networks.');
  const [ogImage, setOgImage] = useState(null);

  const initialPageData = [
    { key: '1', entity: { icon: <LayoutGrid size={16} />, name: 'Marketplace Homepage' }, path: '/', metaConfig: 'WULFARA | Global B2B Supplier Marketplace', status: 'OPTIMIZED', indexed: true, updated: '2h ago' },
    { key: '2', entity: { icon: <ShoppingCart size={16} />, name: 'Suppliers Directory' }, path: '/suppliers', metaConfig: 'Verified B2B Suppliers & Manufacturers Directory', status: 'NEEDS KEYWORDS', indexed: true, updated: 'Yesterday' },
    { key: '3', entity: { icon: <Truck size={16} />, name: 'Logistics Hub' }, path: '/logistics-hub', metaConfig: 'Strategic Global Logistics and Chain Solutions', status: 'NEEDS REVIEW', indexed: false, updated: '3 days ago' },
    { key: '4', entity: { icon: <HelpCircle size={16} />, name: 'Support Center' }, path: '/support', metaConfig: 'Wulfara Support Center - B2B Marketplace', status: 'OPTIMIZED', indexed: true, updated: 'May 12, 2024' },
    { key: '5', entity: { icon: <LayoutGrid size={16} />, name: 'About Us' }, path: '/about', metaConfig: 'About Wulfara | Neo-industrial Enterprise', status: 'OPTIMIZED', indexed: true, updated: '1 week ago' },
    { key: '6', entity: { icon: <ShoppingCart size={16} />, name: 'Pricing Plans' }, path: '/pricing', metaConfig: 'B2B Marketplace Pricing & Subscriptions', status: 'NEEDS KEYWORDS', indexed: true, updated: '2 weeks ago' },
    { key: '7', entity: { icon: <HelpCircle size={16} />, name: 'FAQ' }, path: '/faq', metaConfig: 'Frequently Asked Questions | Wulfara Matrix', status: 'OPTIMIZED', indexed: true, updated: '3 weeks ago' },
    { key: '8', entity: { icon: <Truck size={16} />, name: 'Shipping API' }, path: '/api/shipping', metaConfig: 'Global Shipping & Logistics API Documentation', status: 'NEEDS REVIEW', indexed: false, updated: '1 month ago' },
    { key: '9', entity: { icon: <LayoutGrid size={16} />, name: 'Contact Us' }, path: '/contact', metaConfig: 'Contact Wulfara Support & Sales', status: 'OPTIMIZED', indexed: true, updated: '1 month ago' },
    { key: '10', entity: { icon: <ShoppingCart size={16} />, name: 'Featured Suppliers' }, path: '/featured', metaConfig: 'Top Tier-One Industrial Partners', status: 'OPTIMIZED', indexed: true, updated: '2 months ago' },
    { key: '11', entity: { icon: <HelpCircle size={16} />, name: 'Terms of Service' }, path: '/terms', metaConfig: 'Legal Terms of Service | Wulfara', status: 'NEEDS KEYWORDS', indexed: true, updated: '3 months ago' },
    { key: '12', entity: { icon: <LayoutGrid size={16} />, name: 'Privacy Policy' }, path: '/privacy', metaConfig: 'Privacy Policy & Data Protection', status: 'OPTIMIZED', indexed: true, updated: '6 months ago' },
    { key: '13', entity: { icon: <LayoutGrid size={16} />, name: 'Careers' }, path: '/careers', metaConfig: 'Join the Wulfara Team | Careers', status: 'NEEDS REVIEW', indexed: false, updated: '6 months ago' },
    { key: '14', entity: { icon: <Truck size={16} />, name: 'Warehouse Network' }, path: '/warehouses', metaConfig: 'Global Warehouse Network & Storage', status: 'OPTIMIZED', indexed: true, updated: '7 months ago' }
  ];

  const [pageData, setPageData] = useState(initialPageData);

  const handleImageUpload = (info) => {
    if (info.file.originFileObj) {
      setOgImage(info.file.originFileObj);
    }
  };

  const handlePublish = () => {
    message.success('SEO Settings published successfully!');
    setTimeout(() => {
      const newSeoData = {
        title: siteTitle,
        image: ogImage ? URL.createObjectURL(ogImage) : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop', // Default tech placeholder
        placement: 'Global SEO',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '2029-12-31',
        status: 'Active',
      };
      navigate('/seo', { state: { newSeoRecord: newSeoData } });
    }, 700);
  };

  const handleDiscard = () => {
    setSiteTitle('WULFARA | B2B Supplier Marketplace Directory');
    setMetaDesc('Wulfara Matrix is the leading global B2B supplier marketplace, connecting verified manufacturers with high-volume buyers through secure logistics networks.');
    setOgImage(null);
    message.info('Changes discarded.');
  };

  const columns = [
    {
      title: 'PAGE ENTITY',
      dataIndex: 'entity',
      key: 'entity',
      render: (entity) => (
        <div className="flex items-center gap-3">
          <div className="text-gray-400">{entity.icon}</div>
          <span className="font-bold text-gray-800 text-sm">{entity.name}</span>
        </div>
      )
    },
    {
      title: 'RELATIVE PATH',
      dataIndex: 'path',
      key: 'path',
      render: (text) => <span className="font-mono text-gray-500 text-xs">{text}</span>
    },
    {
      title: 'META TITLE CONFIGURATION',
      dataIndex: 'metaConfig',
      key: 'metaConfig',
      render: (text) => <span className="text-gray-600 text-sm truncate max-w-[250px] block">{text}</span>
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let colorClass = '';
        if (status === 'OPTIMIZED') colorClass = 'text-green-700 bg-green-100 border-green-200';
        else if (status === 'NEEDS KEYWORDS') colorClass = 'text-yellow-700 bg-yellow-100 border-yellow-200';
        else if (status === 'NEEDS REVIEW') colorClass = 'text-red-700 bg-red-100 border-red-200';
        
        return (
          <span className={`px-2 py-1 text-[10px] font-bold rounded-md border ${colorClass}`}>
            {status}
          </span>
        );
      }
    },
    {
      title: 'INDEXED',
      dataIndex: 'indexed',
      key: 'indexed',
      render: (indexed) => indexed ? 
        <CheckCircle2 size={16} className="text-yellow-500" /> : 
        <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center"><span className="w-2 h-2 bg-gray-300 rounded-full"></span></div>
    },
    {
      title: 'UPDATED',
      dataIndex: 'updated',
      key: 'updated',
      render: (text) => <span className="text-gray-500 text-sm">{text}</span>
    }
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto bg-[#FAFAFA] min-h-screen mt-16">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-[#1a1f36]">SEO Settings</h1>
        <div className="flex gap-4">
          <button onClick={handleDiscard} className="px-5 py-2.5 bg-white border border-gray-200 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Discard Changes
          </button>
          <button onClick={handlePublish} className="flex items-center gap-2 px-5 py-2.5 bg-[#dcb14b] text-gray-900 rounded-md text-sm font-bold hover:bg-[#c9a040] transition-colors shadow-sm">
            <CheckCircle2 size={16} />
            Publish Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width) */}
        <div className="xl:col-span-2 space-y-6">
          
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Globe size={20} className="text-gray-700" />
                Global SEO Settings
              </h2>
              <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Sitemap Active
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Global Site Title</label>
                <Input 
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  className="py-2 px-4 border-gray-300 rounded-lg text-sm text-gray-700"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Meta Description</label>
                  <span className="text-[10px] font-bold text-yellow-600">{metaDesc.length} / 160</span>
                </div>
                <TextArea 
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  rows={4}
                  className="py-3 px-4 border-gray-300 rounded-lg text-sm text-gray-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Target Keywords</label>
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Add keyword..."
                  defaultValue={['B2B', 'logistics', 'supplier marketplace', 'wholesale directory']}
                  className="seo-keywords-select"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Open Graph Image (1200x630)</label>
                  <Upload.Dragger 
                    onChange={handleImageUpload}
                    className="bg-[#5c6e7a] rounded-xl overflow-hidden border-0 relative h-[140px]" 
                    showUploadList={false}
                    accept="image/*"
                  >
                    {ogImage ? (
                      <div className="absolute inset-0 z-0">
                        <img src={URL.createObjectURL(ogImage)} alt="OG Preview" className="w-full h-full object-cover opacity-90" />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity hover:bg-opacity-50">
                          <div className="bg-white px-4 py-2 rounded shadow-sm text-xs font-bold text-gray-700 flex flex-col items-center gap-1">
                            <UploadCloud size={16} />
                            Change Image
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Placeholder image representation */}
                        <div className="absolute inset-0 bg-[#5c6e7a] opacity-80 z-0 flex items-center justify-center">
                          <div className="w-40 h-40 rounded-full border border-white/20"></div>
                          <div className="absolute w-full h-[1px] bg-white/20"></div>
                        </div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                          <div className="bg-white px-4 py-2 rounded shadow-sm text-xs font-bold text-gray-700 flex flex-col items-center gap-1">
                            <UploadCloud size={16} />
                            Upload Image
                          </div>
                        </div>
                      </>
                    )}
                  </Upload.Dragger>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Search Visibility</label>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Index this site</span>
                      <Switch defaultChecked style={{ backgroundColor: '#dcb14b' }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Follow outbound links</span>
                      <Switch defaultChecked style={{ backgroundColor: '#dcb14b' }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          
          {/* Search Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-6">
              <Eye size={16} />
              Search Result Preview
            </h2>

            <div className="bg-white p-4">
              <div className="flex items-center gap-2 text-[12px] text-gray-600 mb-1">
                <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold">W</span>
                <span>https://wulfara.com</span>
                <span className="text-[10px]">▼</span>
              </div>
              <h3 className="text-xl text-[#1a0dab] font-medium leading-tight mb-1 hover:underline cursor-pointer">
                {siteTitle || 'Enter a site title'}
              </h3>
              <p className="text-sm text-[#4d5156] leading-snug mb-3">
                {metaDesc || 'Enter a meta description to see it previewed here.'}
              </p>
              
              {/* Rich snippet mock */}
              <div className="flex gap-8 text-xs text-gray-500 pt-2 border-t border-gray-100">
                <div>
                  <span className="font-bold text-blue-800 mb-1 block">Reviews</span>
                  <span className="flex text-[10px]">★★★★★</span>
                </div>
                <div>
                  <span className="font-bold text-blue-800 mb-1 block">Suppliers</span>
                  <span>12,400+</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 mt-4 text-center">Live simulation of desktop search results.</p>
          </div>

          {/* SEO Health */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Global SEO Health</h2>
              <span className="text-3xl font-black text-[#dcb14b] leading-none">94%</span>
            </div>

            <div className="space-y-5 mb-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
                  <span>Sitemap Status</span>
                  <CheckCircle2 size={14} className="text-yellow-500" />
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full"><div className="h-1 bg-yellow-400 rounded-full w-full"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
                  <span>Core Web Vitals</span>
                  <CheckCircle2 size={14} className="text-yellow-500" />
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full"><div className="h-1 bg-yellow-400 rounded-full w-[92%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
                  <span>Meta Title Health</span>
                  <CheckCircle2 size={14} className="text-yellow-500" />
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full"><div className="h-1 bg-yellow-400 rounded-full w-[85%]"></div></div>
              </div>
            </div>

            <div className="bg-[#fff9e6] border border-[#fde68a] rounded-lg p-4 flex gap-3 mb-6">
              <AlertTriangle size={18} className="text-yellow-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-yellow-800 mb-1">4 Accessibility Issues</h4>
                <p className="text-[10px] text-yellow-700 leading-snug">Missing alt text on images in "Suppliers" category.</p>
              </div>
            </div>

            <button className="w-full py-2.5 border border-gray-200 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              Launch SEO Audit Tool
            </button>
          </div>

        </div>
      </div>

      {/* Page-Level Configuration */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Page-Level Configuration</h2>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              All SEO Statuses
              <Filter size={14} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              <Download size={14} />
              Export Data
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2">
          <Table 
            columns={columns} 
            dataSource={pageData} 
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20'],
              showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} total pages`,
              className: 'mt-6'
            }}
            rowClassName="hover:bg-gray-50 cursor-pointer"
            className="seo-settings-table"
          />
        </div>
      </div>

      {/* Global Styles specific to this page component to match design perfectly */}
      <style jsx global>{`
        .seo-keywords-select .ant-select-selector {
          padding: 8px 12px !important;
          border-radius: 8px !important;
          border-color: #d1d5db !important;
        }
        .seo-keywords-select .ant-select-selection-item {
          background-color: #f3f4f6 !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 4px !important;
          font-size: 12px !important;
        }
        
        .seo-settings-table .ant-table-thead > tr > th {
          background-color: transparent;
          color: #6b7280;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-bottom: 1px solid #f3f4f6;
          padding: 16px 24px;
        }
        .seo-settings-table .ant-table-tbody > tr > td {
          padding: 20px 24px;
          border-bottom: 1px solid #f9fafb;
        }
      `}</style>
    </div>
  );
};

export default SeoSettings;
