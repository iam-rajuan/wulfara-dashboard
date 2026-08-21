import React, { useState } from 'react';
import { Rocket, Link as LinkIcon, FileText, HelpCircle, UploadCloud, Trash2, Plus, Save, Eye, Monitor, Smartphone, Search, LayoutGrid, Compass, CheckCircle2, SlidersHorizontal, List } from 'lucide-react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { useGetPagesQuery, useCreatePageMutation, useUpdatePageMutation } from '../../../redux/features/cms/cmsApi';
import { SUPPLIER_ONBOARDING_URL } from '../../../config/urls';

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
  const [dynamicButtons, setDynamicButtons] = useState([
    { id: 1, label: 'Browse Suppliers', route: '/suppliers', style: 'primary' },
    { id: 2, label: 'List Your Company', route: SUPPLIER_ONBOARDING_URL, style: 'secondary' },
    { id: 3, label: 'Login', route: '/login', style: 'outline' }
  ]);

  // State for Mission Statement
  const [missionSettings, setMissionSettings] = useState({
    heading: 'Revolutionizing Industrial Logistics',
    detailedContent: 'Founded in 2042, Wulfara provides the digital scaffolding for neo-industrial enterprises. Our proprietary Matrix technology allows for instantaneous verification of compliance, capacity, and logistical reliability across the orbital and terrestrial supply chains.'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' or 'mobile'

  // General Handlers
  const handleHeroChange = (e) => {
    setHeroSettings({ ...heroSettings, [e.target.name]: e.target.value });
  };

  const handleButtonChange = (id, field, value) => {
    setDynamicButtons(dynamicButtons.map(btn => btn.id === id ? { ...btn, [field]: value } : btn));
  };

  const handleAddButton = () => {
    if (dynamicButtons.length >= 5) {
      toast.error('Maximum 5 buttons allowed');
      return;
    }
    const newId = dynamicButtons.length ? Math.max(...dynamicButtons.map(b => b.id)) + 1 : 1;
    setDynamicButtons([...dynamicButtons, { id: newId, label: 'New Button', route: '#', style: 'primary' }]);
  };

  const handleRemoveButton = (id) => {
    setDynamicButtons(dynamicButtons.filter(btn => btn.id !== id));
  };

  const handleMissionChange = (e) => {
    setMissionSettings({ ...missionSettings, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroSettings(prev => ({ ...prev, bgImage: reader.result }));
      };
      reader.readAsDataURL(file);
      setHeroImage(file);
    }
  };

  const { data: pagesResponse } = useGetPagesQuery();
  const [createPage] = useCreatePageMutation();
  const [updatePage] = useUpdatePageMutation();

  const homepageData = pagesResponse?.data?.find(p => p.slug === 'homepage');

  React.useEffect(() => {
    if (homepageData && homepageData.htmlContent) {
      try {
        const parsed = JSON.parse(homepageData.htmlContent);
        if (parsed.heroSettings) setHeroSettings(parsed.heroSettings);
        if (parsed.dynamicButtons) {
          setDynamicButtons(parsed.dynamicButtons);
        } else if (parsed.buttonSettings) {
          // Backward compatibility
          setDynamicButtons([
            { id: 1, label: parsed.buttonSettings.primaryCTA || 'Browse Suppliers', route: '/suppliers', style: 'primary' },
            { id: 2, label: parsed.buttonSettings.secondaryCTA || 'List Your Company', route: SUPPLIER_ONBOARDING_URL, style: 'secondary' },
            { id: 3, label: parsed.buttonSettings.accountLogin || 'Login', route: '/login', style: 'outline' }
          ]);
        }
        if (parsed.missionSettings) setMissionSettings(parsed.missionSettings);
      } catch (e) {
        console.error("Failed to parse homepage content", e);
      }
    }
  }, [homepageData]);

  const handleSave = async () => {
    setIsSaving(true);
    const allData = { heroSettings, dynamicButtons, missionSettings };
    
    try {
      if (homepageData) {
        await updatePage({
          id: homepageData._id,
          title: 'Homepage',
          slug: 'homepage',
          htmlContent: JSON.stringify(allData)
        }).unwrap();
      } else {
        await createPage({
          title: 'Homepage',
          slug: 'homepage',
          htmlContent: JSON.stringify(allData)
        }).unwrap();
      }
      toast.success('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
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

        {/* Dynamic Button Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <div className="p-1.5 bg-green-50 text-green-600 rounded-lg">
                <LinkIcon size={18} />
              </div>
              Action Buttons
            </h3>
            <button
              onClick={handleAddButton}
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              <Plus size={16} /> Add Button
            </button>
          </div>

          <div className="space-y-4">
            {dynamicButtons.map((btn) => (
              <div key={btn.id} className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="w-full md:w-1/3">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Label</label>
                  <input
                    type="text"
                    value={btn.label}
                    onChange={(e) => handleButtonChange(btn.id, 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Route / Link</label>
                  <input
                    type="text"
                    value={btn.route}
                    onChange={(e) => handleButtonChange(btn.id, 'route', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Style</label>
                  <select
                    value={btn.style}
                    onChange={(e) => handleButtonChange(btn.id, 'style', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm bg-white"
                  >
                    <option value="primary">Primary (Yellow/Solid)</option>
                    <option value="secondary">Secondary (Yellow/Outline)</option>
                    <option value="outline">Outline (White/Outline)</option>
                  </select>
                </div>
                <div className="w-full md:w-auto mt-4 md:mt-5 flex justify-end">
                  <button
                    onClick={() => handleRemoveButton(btn.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove Button"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            {dynamicButtons.length === 0 && (
              <div className="text-center py-6 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                No buttons configured. Click "Add Button" to create one.
              </div>
            )}
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
              <div className="flex gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-widest items-center">
                <span className="cursor-pointer hover:text-gray-900">Capabilities</span>
                <span className="cursor-pointer hover:text-gray-900">Network</span>
                <span className="cursor-pointer text-blue-700">{dynamicButtons.find(b => b.style === 'outline')?.label || 'Login'}</span>
              </div>
            )}
          </div>

          {/* Hero Section (Matching Frontend, Responsive via previewMode) */}
          <section className={`relative flex items-center bg-[#1b2b3a] text-white overflow-hidden ${previewMode === 'mobile' ? 'min-h-[500px] py-16' : 'min-h-[699px] lg:h-[699px] py-16 lg:py-0'}`}>
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
              {heroSettings.bgImage ? (
                <img src={heroSettings.bgImage} alt="Hero Background" className="w-full h-full object-cover opacity-25" />
              ) : (
                <div className="w-full h-full bg-[#1e293b] opacity-25"></div>
              )}
              {/* Navy/slate dark overlay tint */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1b2b3a]/95 via-[#1b2b3a]/85 to-[#1b2b3a]/95"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
              {/* Main Title */}
              <h1
                style={{ fontFamily: "'Inter', sans-serif" }}
                className={`font-extrabold tracking-[-1.8px] text-white mb-6 leading-tight text-center mx-auto ${
                  previewMode === 'mobile' 
                    ? 'text-4xl px-2' 
                    : 'text-4xl sm:text-6xl md:text-[72px] md:leading-[72px] max-w-4xl'
                }`}
              >
                {heroSettings.mainHeading || 'Find Suppliers for the Future of Manufacturing'}
              </h1>

              {/* Subtitle */}
              <p className={`text-slate-300 mx-auto mb-10 leading-relaxed font-light ${
                previewMode === 'mobile'
                  ? 'text-sm max-w-sm px-4'
                  : 'text-sm sm:text-base md:text-lg max-w-2xl'
              }`}>
                {heroSettings.introParagraph || 'Access the global network of certified tier-one industrial partners...'}
              </p>

              {/* Search Bar Container */}
              <div className={`flex items-center bg-white rounded shadow-2xl border border-slate-200/80 mb-8 mx-4 sm:mx-0 ${
                previewMode === 'mobile'
                  ? 'w-full max-w-[340px] p-1.5'
                  : 'w-full max-w-4xl p-1.5 sm:p-2'
              }`}>
                <div className="relative flex-grow flex items-center min-w-0">
                  <Search className={`text-slate-400 flex-shrink-0 ${previewMode === 'mobile' ? 'h-4 w-4 ml-2 mr-2' : 'h-4 w-4 sm:h-5 sm:w-5 ml-2 sm:ml-3 mr-2 sm:mr-3'}`} />
                  <input
                    type="text"
                    readOnly
                    placeholder={heroSettings.searchFieldText || 'Search industrial capabilities...'}
                    className={`w-full bg-transparent pr-2 text-slate-800 placeholder-slate-400 outline-none min-w-0 ${
                      previewMode === 'mobile' ? 'py-2 text-xs' : 'py-2 sm:py-3 text-xs sm:text-sm'
                    }`}
                  />
                  <SlidersHorizontal className={`text-slate-400 flex-shrink-0 ${previewMode === 'mobile' ? 'h-4 w-4 mx-2' : 'h-4 w-4 sm:h-5 sm:w-5 mx-2 sm:mx-3'}`} />
                </div>
                <button
                  className={`rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 font-bold shadow-md transition-all flex-shrink-0 ${
                    previewMode === 'mobile' ? 'px-4 py-2.5 text-xs' : 'px-4 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm'
                  }`}
                >
                  Search
                </button>
              </div>

              {/* Quick Link White Cards */}
              <div className={`flex justify-center mx-auto mb-12 ${
                previewMode === 'mobile' ? 'flex-wrap max-w-[340px] gap-2 px-2' : 'flex-wrap max-w-5xl gap-3 w-full'
              }`}>
                {['Free Search', 'Request Quotes', 'Global Suppliers', 'Matchmaking'].map((link, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center rounded bg-white font-semibold text-slate-700 shadow-sm border border-slate-200/80 ${
                      previewMode === 'mobile' ? 'px-2.5 py-1.5 text-[10px] gap-1.5' : 'px-4 py-2.5 text-xs sm:text-[13px] gap-2'
                    }`}
                  >
                    <CheckCircle2 className={`${previewMode === 'mobile' ? 'h-3 w-3' : 'h-4 w-4'} text-[#dca12f] flex-shrink-0`} />
                    <span>{link}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className={`flex items-center justify-center ${
                previewMode === 'mobile' ? 'flex-col w-full px-4 gap-3' : 'flex-col sm:flex-row w-full sm:w-auto gap-4'
              }`}>
                {dynamicButtons.map((btn) => {
                  if (btn.style === 'primary') {
                    return (
                      <div key={btn.id} className={`flex items-center justify-center gap-2 rounded bg-[#dca12f] hover:bg-[#c99126] text-slate-950 font-bold shadow-md transition-all ${
                        previewMode === 'mobile' ? 'w-full py-3 text-xs' : 'w-full sm:w-auto px-8 py-3.5 text-sm'
                      }`}>
                        <Compass className={`${previewMode === 'mobile' ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-slate-950`} />
                        <span>{btn.label}</span>
                      </div>
                    );
                  }
                  if (btn.style === 'secondary') {
                    return (
                      <div key={btn.id} className={`flex items-center justify-center gap-2 rounded border border-[#dca12f] bg-transparent text-[#dca12f] font-bold transition-all ${
                        previewMode === 'mobile' ? 'w-full py-3 text-xs' : 'w-full sm:w-auto px-8 py-3.5 text-sm'
                      }`}>
                        <List className={`${previewMode === 'mobile' ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-[#dca12f]`} />
                        <span>{btn.label}</span>
                      </div>
                    );
                  }
                  return (
                    <div key={btn.id} className={`flex items-center justify-center rounded border border-slate-600 bg-transparent text-white font-bold transition-all ${
                      previewMode === 'mobile' ? 'w-full py-3 text-xs' : 'w-full sm:w-auto px-10 py-3.5 text-sm'
                    }`}>
                      {btn.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        </div>
      </Modal>

    </div>
  );
};

export default HomepageSettings;
