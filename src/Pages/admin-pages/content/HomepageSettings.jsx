import React, { useState } from 'react';
import { Rocket, Link as LinkIcon, FileText, HelpCircle, UploadCloud, Trash2, Plus, Save, Eye, Monitor, Smartphone, Search, LayoutGrid } from 'lucide-react';
import { Modal } from 'antd';

const HomepageSettings = () => {
  // State for Hero Section
  const [heroSettings, setHeroSettings] = useState({
    mainHeading: 'Find Suppliers for the Future of Manufacturing',
    introParagraph: 'Access the global network of certified tier-one industrial partners through Wulfara\'s secure matrix system.',
    searchFieldText: 'Search industrial capabilities...'
  });
  const [heroImage, setHeroImage] = useState(null);
  const fileInputRef = React.useRef(null);

  // State for Button Configuration
  const [buttonSettings, setButtonSettings] = useState({
    primaryCTA: 'Browse Suppliers',
    secondaryCTA: 'List Your Company',
    accountLogin: 'Login'
  });

  // State for Mission Statement
  const [missionSettings, setMissionSettings] = useState({
    heading: 'Revolutionizing Industrial Logistics',
    detailedContent: 'Founded in 2042, Wulfara provides the digital scaffolding for neo-industrial enterprises. Our proprietary Matrix technology allows for instantaneous verification of compliance, capacity, and logistical reliability across the orbital and terrestrial supply chains.'
  });

  // State for FAQs
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'How secure is the Wulfara Matrix?', answer: 'We use quantum-resistant encryption across all distributed ledger nodes.' },
    { id: 2, question: 'What industries do you support?', answer: 'Aerospace, Deep-sea extraction, and Advanced Robotics.' }
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' or 'mobile'

  // FAQ Handlers
  const handleAddFaq = () => {
    const newFaq = { id: Date.now(), question: '', answer: '' };
    setFaqs([...faqs, newFaq]);
  };

  const handleRemoveFaq = (idToRemove) => {
    setFaqs(faqs.filter(faq => faq.id !== idToRemove));
  };

  const handleFaqChange = (id, field, value) => {
    setFaqs(faqs.map(faq => faq.id === id ? { ...faq, [field]: value } : faq));
  };

  // General Handlers
  const handleHeroChange = (e) => {
    setHeroSettings({ ...heroSettings, [e.target.name]: e.target.value });
  };

  const handleButtonChange = (e) => {
    setButtonSettings({ ...buttonSettings, [e.target.name]: e.target.value });
  };

  const handleMissionChange = (e) => {
    setMissionSettings({ ...missionSettings, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroImage(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      const allData = { heroSettings, buttonSettings, missionSettings, faqs };
      console.log('Saved Data:', allData);
      alert('Settings saved successfully! Check console for data.');
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-[#FAFAFA] min-h-screen mt-16">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1f36] mb-2">Public Homepage Settings</h1>
          <p className="text-[#697386]">Configure the landing page hero, call-to-actions, and FAQ segments dynamically.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsPreviewVisible(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye size={16} />
            Preview
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-[#d9a05b] text-white rounded-lg text-sm font-medium hover:bg-[#c89250] transition-colors disabled:opacity-70"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <Rocket size={18} />
              </div>
              Hero Section
            </h3>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Primary Section</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Main Heading</label>
              <input
                type="text"
                name="mainHeading"
                value={heroSettings.mainHeading}
                onChange={handleHeroChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Intro Paragraph</label>
              <textarea
                name="introParagraph"
                value={heroSettings.introParagraph}
                onChange={handleHeroChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-24"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Search Field Text</label>
                <input
                  type="text"
                  name="searchFieldText"
                  value={heroSettings.searchFieldText}
                  onChange={handleHeroChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Background Visual</label>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all cursor-pointer h-[42px]"
                >
                  <div className="flex items-center gap-2">
                    <UploadCloud size={16} />
                    <span className="text-xs truncate max-w-[150px]">
                      {heroImage ? heroImage.name : 'Update hero-image.webp'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-green-50 text-green-600 rounded-lg">
              <LinkIcon size={18} />
            </div>
            Button Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Primary CTA</label>
              <input
                type="text"
                name="primaryCTA"
                value={buttonSettings.primaryCTA}
                onChange={handleButtonChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Secondary CTA</label>
              <input
                type="text"
                name="secondaryCTA"
                value={buttonSettings.secondaryCTA}
                onChange={handleButtonChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Account Login</label>
              <input
                type="text"
                name="accountLogin"
                value={buttonSettings.accountLogin}
                onChange={handleButtonChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-gray-100 text-gray-600 rounded-lg">
              <FileText size={18} />
            </div>
            Mission Statement
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Heading</label>
              <input
                type="text"
                name="heading"
                value={missionSettings.heading}
                onChange={handleMissionChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Detailed Content</label>
              <textarea
                name="detailedContent"
                value={missionSettings.detailedContent}
                onChange={handleMissionChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-24"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <HelpCircle size={18} />
              </div>
              Frequently Asked Questions
            </h3>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">{faqs.length} Active Items</span>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg p-4 bg-[#fcfcfc] shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Entry #{index + 1}</span>
                  <button
                    onClick={() => handleRemoveFaq(faq.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded"
                    title="Remove FAQ"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Question</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(faq.id, 'question', e.target.value)}
                      placeholder="e.g. How secure is the platform?"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Answer</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-20 text-gray-600"
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(faq.id, 'answer', e.target.value)}
                      placeholder="e.g. We use industry-standard encryption..."
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={handleAddFaq}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center gap-2 text-gray-500 font-medium hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
            >
              <Plus size={18} />
              Add New FAQ Entry
            </button>
          </div>
        </div>

      </div>

      {/* Live Preview Modal */}
      <Modal
        open={isPreviewVisible}
        onCancel={() => setIsPreviewVisible(false)}
        footer={null}
        width={1200}
        style={{ top: 20 }}
        bodyStyle={{ padding: 0 }}
        closeIcon={null}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <span className="text-sm font-bold text-[#1a1f36] tracking-wider uppercase">Live Preview: Wulfara.com</span>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <button 
              onClick={() => setPreviewMode('desktop')}
              className={`${previewMode === 'desktop' ? 'text-blue-600' : 'hover:text-gray-900'} transition-colors`}
            >
              <Monitor size={20} />
            </button>
            <button 
              onClick={() => setPreviewMode('mobile')}
              className={`${previewMode === 'mobile' ? 'text-blue-600' : 'hover:text-gray-900'} transition-colors`}
            >
              <Smartphone size={20} />
            </button>
          </div>
        </div>

        {/* Modal Content / Website Preview */}
        <div className={`bg-white h-[75vh] overflow-y-auto ${previewMode === 'mobile' ? 'max-w-[375px] mx-auto border-x border-b border-gray-200 shadow-lg' : 'w-full'}`}>
          
          {/* Mock Navbar */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white">
                <LayoutGrid size={18} />
              </div>
              <span className="text-xl font-black tracking-tight text-[#111827]">WULFARA</span>
            </div>
            {previewMode === 'desktop' && (
              <div className="flex gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                <span className="cursor-pointer hover:text-gray-900">Capabilities</span>
                <span className="cursor-pointer hover:text-gray-900">Network</span>
                <span className="cursor-pointer text-blue-700">Partner Login</span>
              </div>
            )}
          </div>

          {/* Hero Section */}
          <div className="px-8 py-20 flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-black text-[#111827] mb-6 leading-[1.1] max-w-3xl">
              {heroSettings.mainHeading}
            </h1>
            <p className="text-gray-500 text-lg mb-10 max-w-2xl">
              {heroSettings.introParagraph}
            </p>

            <div className="w-full max-w-xl relative mb-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder={heroSettings.searchFieldText} 
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div className="flex gap-4 mb-16">
              <button className="px-8 py-3.5 bg-[#1a365d] text-white rounded-lg text-sm font-semibold hover:bg-[#112440] transition-colors">
                {buttonSettings.primaryCTA}
              </button>
              <button className="px-8 py-3.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                {buttonSettings.secondaryCTA}
              </button>
            </div>

            {/* Hero Image */}
            <div className="w-full h-[350px] bg-[#0d1627] rounded-xl overflow-hidden shadow-2xl relative">
              {heroImage ? (
                <img src={URL.createObjectURL(heroImage)} alt="Hero" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                  {/* Placeholder for the complex industrial image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] to-transparent"></div>
                  <div className="w-full h-full bg-[#1e293b] opacity-50 absolute"></div>
                  <span className="relative z-10 text-white font-medium">Hero Image Area</span>
                </div>
              )}
            </div>
          </div>

          {/* Support & Information (FAQ) */}
          <div className="bg-[#fcfcfc] py-20 border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-8">
              <h2 className="text-2xl font-black text-[#111827] mb-8">
                Support & Information
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-white border border-gray-200 rounded-lg p-6 flex justify-between items-center cursor-pointer hover:border-gray-300 transition-colors">
                    <span className="font-semibold text-gray-800 text-sm">{faq.question}</span>
                    <Plus className="text-gray-400" size={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </Modal>

    </div>
  );
};

export default HomepageSettings;
