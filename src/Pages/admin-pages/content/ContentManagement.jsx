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
import { Modal, Form, Input, message, Button, Collapse } from 'antd';
import { 
  useGetPagesQuery, 
  useCreatePageMutation, 
  useUpdatePageMutation,
  useGetBannersQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation
} from '../../../redux/features/cms/cmsApi';

const ContentManagement = () => {
  const { data: pagesResponse } = useGetPagesQuery();
  const [createPage] = useCreatePageMutation();
  const [updatePage] = useUpdatePageMutation();

  const faqPage = pagesResponse?.data?.find(p => p.slug === 'faq');
  const policyPage = pagesResponse?.data?.find(p => p.slug === 'policies');
  const helpCenterPage = pagesResponse?.data?.find(p => p.slug === 'help-center');
  
  const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);
  const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);
  const [isHelpCenterModalVisible, setIsHelpCenterModalVisible] = useState(false);
  
  const [faqForm] = Form.useForm();
  const [policyForm] = Form.useForm();
  const [helpCenterForm] = Form.useForm();
  
  // Banners
  const { data: bannersResponse } = useGetBannersQuery();
  const [createBanner] = useCreateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();
  const [isBannerModalVisible, setIsBannerModalVisible] = useState(false);
  const [bannerForm] = Form.useForm();

  const showFaqModal = () => {
    if (faqPage && faqPage.htmlContent) {
      try {
        const parsed = JSON.parse(faqPage.htmlContent);
        faqForm.setFieldsValue({ faqs: parsed });
      } catch {
        faqForm.setFieldsValue({ faqs: [] });
      }
    } else {
      faqForm.setFieldsValue({ faqs: [] });
    }
    setIsFaqModalVisible(true);
  };

  const handleFaqOk = async () => {
    try {
      const values = await faqForm.validateFields();
      const payload = {
        title: 'FAQ',
        slug: 'faq',
        htmlContent: JSON.stringify(values.faqs || [])
      };
      
      if (faqPage) {
        await updatePage({ id: faqPage._id, ...payload }).unwrap();
      } else {
        await createPage(payload).unwrap();
      }
      message.success('FAQs updated successfully!');
      setIsFaqModalVisible(false);
    } catch (err) {
      console.error(err);
      if (err.errorFields) return; // Validation error
      message.error('Failed to update FAQs');
    }
  };

  const showPolicyModal = () => {
    if (policyPage && policyPage.htmlContent) {
      try {
        const parsed = JSON.parse(policyPage.htmlContent);
        policyForm.setFieldsValue(parsed);
      } catch {
        policyForm.resetFields();
      }
    } else {
      policyForm.resetFields();
    }
    setIsPolicyModalVisible(true);
  };

  const handlePolicyOk = async () => {
    try {
      const values = await policyForm.validateFields();
      const payload = {
        title: 'Policies',
        slug: 'policies',
        htmlContent: JSON.stringify(values)
      };
      
      if (policyPage) {
        await updatePage({ id: policyPage._id, ...payload }).unwrap();
      } else {
        await createPage(payload).unwrap();
      }
      message.success('Policies updated successfully!');
      setIsPolicyModalVisible(false);
    } catch (err) {
      console.error(err);
      if (err.errorFields) return;
      message.error('Failed to update Policies');
    }
  };

  const showHelpCenterModal = () => {
    if (helpCenterPage && helpCenterPage.htmlContent) {
      try {
        const parsed = JSON.parse(helpCenterPage.htmlContent);
        helpCenterForm.setFieldsValue({ articles: parsed });
      } catch {
        helpCenterForm.setFieldsValue({ articles: [] });
      }
    } else {
      helpCenterForm.setFieldsValue({ articles: [] });
    }
    setIsHelpCenterModalVisible(true);
  };

  const handleHelpCenterOk = async () => {
    try {
      const values = await helpCenterForm.validateFields();
      const payload = {
        title: 'Help Center',
        slug: 'help-center',
        htmlContent: JSON.stringify(values.articles || [])
      };
      
      if (helpCenterPage) {
        await updatePage({ id: helpCenterPage._id, ...payload }).unwrap();
      } else {
        await createPage(payload).unwrap();
      }
      message.success('Help Center Articles updated successfully!');
      setIsHelpCenterModalVisible(false);
    } catch (err) {
      console.error(err);
      if (err.errorFields) return; // Validation error
      message.error('Failed to update Help Center Articles');
    }
  };

  const showBannerModal = () => {
    bannerForm.resetFields();
    setIsBannerModalVisible(true);
  };

  const handleBannerSubmit = async (values) => {
    try {
      await createBanner({
        title: values.title,
        imageUrl: values.imageUrl,
        linkTarget: values.linkTarget,
        isActive: values.isActive ?? true
      }).unwrap();
      message.success('Banner added successfully!');
      bannerForm.resetFields();
    } catch (err) {
      console.error(err);
      message.error('Failed to add banner');
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      await deleteBanner(id).unwrap();
      message.success('Banner deleted');
    } catch {
      message.error('Failed to delete banner');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[#FAFAFA] min-h-screen mt-16">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1f36] mb-2">Content Management</h1>
          <p className="text-[#697386]">Manage homepage content, FAQs, policies, and static pages.</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Published Pages"
          value="12"
          icon={<FileText size={24} />}
          badgeColor="bg-yellow-50"
          badgeTextColor="text-yellow-600"
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
            title="FAQ"
            description="Common questions and answers structured for easy user consumption and help desk deflection."
            badgeText="Published"
            badgeType="success"
            icon={<HelpCircle size={20} />}
            onEdit={showFaqModal}
          />
          <SectionCard
            title="Banners"
            description="Manage promotional banners and announcements shown across the platform."
            badgeText="Active"
            badgeType="success"
            icon={<ImageIcon size={20} />}
            onEdit={showBannerModal}
          />
          <SectionCard
            title="Help Center Articles"
            description="Comprehensive guides, tutorials, and troubleshooting articles for complex platform features."
            badgeText="Drafts Available"
            badgeType="warning"
            icon={<Book size={20} />}
            onEdit={showHelpCenterModal}
          />
          <SectionCard
            title="Policies"
            description="Legal terms, privacy policy, and cookie consent documentation management."
            badgeText="Published"
            badgeType="success"
            icon={<Gavel size={20} />}
            onEdit={showPolicyModal}
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

      {/* FAQ Modal */}
      <Modal 
        title="Manage Frequently Asked Questions" 
        open={isFaqModalVisible} 
        onOk={handleFaqOk} 
        onCancel={() => setIsFaqModalVisible(false)}
        okText="Publish FAQs"
        okButtonProps={{ style: { backgroundColor: '#d9a05b', borderColor: '#d9a05b' } }}
        width={800}
      >
        <Form form={faqForm} layout="vertical" className="mt-4 max-h-[60vh] overflow-y-auto px-2">
          <Form.List name="faqs">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="border border-gray-200 p-4 rounded-lg mb-4 bg-gray-50 relative">
                    <Button 
                      type="text" 
                      danger 
                      onClick={() => remove(name)} 
                      className="absolute top-2 right-2"
                    >
                      Delete
                    </Button>
                    <Form.Item
                      {...restField}
                      name={[name, 'question']}
                      label="Question"
                      rules={[{ required: true, message: 'Missing question' }]}
                    >
                      <Input placeholder="e.g. How secure is the platform?" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'topic']}
                      label="Topic"
                      rules={[{ required: true, message: 'Missing topic' }]}
                    >
                      <Input placeholder="e.g. General Questions, Suppliers, RFQ Protocols" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'answer']}
                      label="Answer"
                      rules={[{ required: true, message: 'Missing answer' }]}
                    >
                      <Input.TextArea rows={3} placeholder="e.g. We use industry standard encryption..." />
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<Plus size={16} className="inline mr-2" />}>
                    Add FAQ Entry
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      {/* Help Center Modal */}
      <Modal 
        title="Manage Help Center Articles" 
        open={isHelpCenterModalVisible} 
        onOk={handleHelpCenterOk} 
        onCancel={() => setIsHelpCenterModalVisible(false)}
        okText="Publish Articles"
        okButtonProps={{ style: { backgroundColor: '#d9a05b', borderColor: '#d9a05b' } }}
        width={800}
      >
        <Form form={helpCenterForm} layout="vertical" className="mt-4 max-h-[60vh] overflow-y-auto px-2">
          <Form.List name="articles">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="border border-gray-200 p-4 rounded-lg mb-4 bg-gray-50 relative">
                    <Button 
                      type="text" 
                      danger 
                      onClick={() => remove(name)} 
                      className="absolute top-2 right-2"
                    >
                      Delete
                    </Button>
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      label="Article Title"
                      rules={[{ required: true, message: 'Missing title' }]}
                    >
                      <Input placeholder="e.g. How do I reset my password?" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'content']}
                      label="Article Content"
                      rules={[{ required: true, message: 'Missing content' }]}
                    >
                      <Input.TextArea rows={4} placeholder="HTML or text content..." />
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<Plus size={16} className="inline mr-2" />}>
                    Add Help Center Article
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      {/* Policies Modal */}
      <Modal 
        title="Manage Legal Policies" 
        open={isPolicyModalVisible} 
        onOk={handlePolicyOk} 
        onCancel={() => setIsPolicyModalVisible(false)}
        okText="Publish Policies"
        okButtonProps={{ style: { backgroundColor: '#d9a05b', borderColor: '#d9a05b' } }}
        width={900}
      >
        <Form form={policyForm} layout="vertical" className="mt-4 max-h-[65vh] overflow-y-auto px-2">
          <Collapse accordion defaultActiveKey={['terms-of-service']}>
            <Collapse.Panel header={<span className="font-semibold text-gray-700">Terms of Service</span>} key="terms-of-service">
              <Form.Item name="termsOfService" rules={[{ required: true }]}>
                <Input.TextArea rows={6} placeholder="Enter HTML or text..." />
              </Form.Item>
            </Collapse.Panel>

            <Collapse.Panel header={<span className="font-semibold text-gray-700">Privacy Policy</span>} key="privacy-policy">
              <Form.Item name="privacyPolicy" rules={[{ required: true }]}>
                <Input.TextArea rows={6} placeholder="Enter HTML or text..." />
              </Form.Item>
            </Collapse.Panel>

            <Collapse.Panel header={<span className="font-semibold text-gray-700">Supplier Listing Policy</span>} key="supplier-listing-policy">
              <Form.Item name="supplierListingPolicy" rules={[{ required: true }]}>
                <Input.TextArea rows={6} placeholder="Enter HTML or text..." />
              </Form.Item>
            </Collapse.Panel>

            <Collapse.Panel header={<span className="font-semibold text-gray-700">RFQ Policy</span>} key="rfq-policy">
              <Form.Item name="rfqPolicy" rules={[{ required: true }]}>
                <Input.TextArea rows={6} placeholder="Enter HTML or text..." />
              </Form.Item>
            </Collapse.Panel>

            <Collapse.Panel header={<span className="font-semibold text-gray-700">Payment & Subscription Policy</span>} key="payment-subscription-policy">
              <Form.Item name="paymentSubscriptionPolicy" rules={[{ required: true }]}>
                <Input.TextArea rows={6} placeholder="Enter HTML or text..." />
              </Form.Item>
            </Collapse.Panel>

            <Collapse.Panel header={<span className="font-semibold text-gray-700">Cancellation Policy</span>} key="cancellation-policy">
              <Form.Item name="cancellationPolicy" rules={[{ required: true }]}>
                <Input.TextArea rows={6} placeholder="Enter HTML or text..." />
              </Form.Item>
            </Collapse.Panel>
          </Collapse>
        </Form>
      </Modal>

      {/* Banners Modal */}
      <Modal 
        title="Manage Banners" 
        open={isBannerModalVisible} 
        onCancel={() => setIsBannerModalVisible(false)}
        footer={null}
        width={800}
      >
        <div className="mt-4 max-h-[60vh] overflow-y-auto px-2">
          {/* List existing banners */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 border-b pb-2">Active Banners</h3>
            {bannersResponse?.data?.length === 0 ? (
              <p className="text-gray-500 text-sm">No active banners found.</p>
            ) : (
              <div className="space-y-4">
                {bannersResponse?.data?.map(banner => (
                  <div key={banner._id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <img src={banner.imageUrl} alt={banner.title} className="w-24 h-16 object-cover rounded shadow-sm border border-gray-200" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-900">{banner.title}</h4>
                      <p className="text-xs text-gray-500 font-mono mt-1">{banner.linkTarget || 'No link'}</p>
                    </div>
                    <Button type="text" danger onClick={() => handleDeleteBanner(banner._id)}>Delete</Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Add New Banner</h3>
            <Form form={bannerForm} layout="vertical" onFinish={handleBannerSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item name="title" label="Banner Title" rules={[{ required: true, message: 'Please enter title' }]}>
                  <Input placeholder="e.g. Summer Sale" />
                </Form.Item>
                <Form.Item name="linkTarget" label="Link Target (Optional)">
                  <Input placeholder="e.g. /suppliers/featured" />
                </Form.Item>
              </div>
              <Form.Item name="imageUrl" label="Image URL" rules={[{ required: true, message: 'Please enter image URL' }]}>
                <Input placeholder="https://example.com/image.jpg" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#d9a05b', borderColor: '#d9a05b' }}>
                  Create Banner
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContentManagement;
