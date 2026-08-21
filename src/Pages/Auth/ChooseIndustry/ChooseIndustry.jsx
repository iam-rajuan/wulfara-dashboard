import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowLeft, Check, LayoutGrid } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useGetCategoriesQuery } from '../../../redux/features/categories/categoryApi';
import {
  useGetOnboardingStatusQuery,
  useSaveOnboardingIndustryMutation,
} from '../../../redux/features/listings/listingsApi';
import { appendOnboardingContext, buildOnboardingQueryString } from '../../../utils/onboarding';

const hasRenderableImage = (value) =>
  typeof value === 'string' &&
  value.trim() !== '' &&
  value !== 'no-banner.jpg' &&
  value !== 'no-icon.png';

const sortCategoriesByDisplayOrder = (items = []) =>
  [...items].sort((a, b) => {
    const orderA = Number(a?.displayOrder ?? 0);
    const orderB = Number(b?.displayOrder ?? 0);

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return String(a?.name || '').localeCompare(String(b?.name || ''));
  });

const getIndustryBannerStyle = (bannerUrl) => {
  if (!hasRenderableImage(bannerUrl)) {
    return {
      backgroundImage: 'linear-gradient(135deg, #1b2b3a 0%, #243b53 52%, #D1A635 100%)',
    };
  }

  return {
    backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.22) 0%, rgba(15, 23, 42, 0.12) 40%, rgba(209, 166, 53, 0.18) 100%), url("${bannerUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
};

const ChooseIndustry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const supplierId = user?.role === 'admin' ? searchParams.get('supplierId') : undefined;

  const { data: categoriesResponse, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const { data: onboardingResponse, isLoading: isLoadingOnboarding } = useGetOnboardingStatusQuery(supplierId, {
    skip: !user,
  });
  const [saveIndustry, { isLoading: isSaving }] = useSaveOnboardingIndustryMutation();

  const supplier = onboardingResponse?.data?.supplier;
  const categories = useMemo(
    () => sortCategoriesByDisplayOrder(categoriesResponse?.data || []),
    [categoriesResponse?.data]
  );
  const selectedCategoryIds = useMemo(
    () => supplier?.categories?.map((category) => category._id) || [],
    [supplier?.categories]
  );

  const parentCategories = useMemo(
    () => sortCategoriesByDisplayOrder(
      categories.filter((category) => !category.parentCategory && category.status === 'Active')
    ),
    [categories]
  );

  const [selectedParentId, setSelectedParentId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    if (!user) {
      navigate(`/sign-in${buildOnboardingQueryString(searchParams)}`);
    }
  }, [navigate, searchParams, user]);

  useEffect(() => {
    if (!parentCategories.length) {
      return;
    }

    const currentCategory = categories.find((category) => selectedCategoryIds.includes(category._id));
    const parentId = currentCategory?.parentCategory || currentCategory?._id || parentCategories[0]._id;

    setSelectedParentId(parentId);

    if (currentCategory?._id) {
      setSelectedCategoryId(currentCategory._id);
      return;
    }

    const childCategories = sortCategoriesByDisplayOrder(
      categories.filter((category) => category.parentCategory === parentId && category.status === 'Active')
    );
    setSelectedCategoryId(childCategories[0]?._id || parentId);
  }, [categories, parentCategories, selectedCategoryIds]);

  const currentSubCategories = useMemo(() => {
    if (!selectedParentId) {
      return [];
    }

    const children = sortCategoriesByDisplayOrder(
      categories.filter((category) => category.parentCategory === selectedParentId && category.status === 'Active')
    );
    return children.length > 0
      ? children
      : sortCategoriesByDisplayOrder(categories.filter((category) => category._id === selectedParentId));
  }, [categories, selectedParentId]);

  const handleContinue = async () => {
    if (!selectedCategoryId) {
      toast.error('Please select an industry category to continue');
      return;
    }

    try {
      await saveIndustry({
        supplierId,
        categoryIds: [selectedCategoryId],
      }).unwrap();

      navigate(appendOnboardingContext('/company-info', searchParams));
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to save your industry selection');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="flex-1 flex flex-col items-center pt-12 pb-24 px-4 md:px-8 lg:px-12 w-full">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-[40px] font-bold text-black mb-4 leading-tight">
              Choose Your Company
              <br />
              Industry
            </h1>
            <p className="text-gray-500 text-[15px]">
              Select the supplier category that best matches your company so customers can find you easily.
            </p>
          </div>

          {isLoadingCategories || isLoadingOnboarding ? (
            <div className="py-16 text-gray-500">Loading industries...</div>
          ) : parentCategories.length === 0 ? (
            <div className="w-full max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-6 py-5 text-amber-800">
              No active categories are available yet. Create supplier categories in the admin dashboard before onboarding suppliers.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-10">
                {parentCategories.map((industry) => {
                  const isSelected = selectedParentId === industry._id;

                  return (
                    <button
                      key={industry._id}
                      type="button"
                      onClick={() => {
                        setSelectedParentId(industry._id);
                        const childCategories = sortCategoriesByDisplayOrder(
                          categories.filter((category) => category.parentCategory === industry._id && category.status === 'Active')
                        );
                        setSelectedCategoryId(childCategories[0]?._id || industry._id);
                      }}
                      className={`rounded-xl overflow-hidden text-left transition-all duration-200 border-2 ${
                        isSelected
                          ? 'border-[#D1A635] bg-[#FFFBF4] shadow-[0_4px_12px_rgba(209,166,53,0.15)]'
                          : 'border-transparent bg-white hover:border-gray-300 shadow-sm'
                      }`}
                    >
                      <div
                        className="h-[120px] w-full relative overflow-hidden"
                        style={getIndustryBannerStyle(industry.banner)}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center shadow-md z-10">
                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 md:p-5">
                        <h3 className={`font-bold text-[14px] mb-2 uppercase ${isSelected ? 'text-[#D1A635]' : 'text-gray-900'}`}>
                          {industry.name}
                        </h3>
                        <p className="text-gray-500 text-[12px] leading-relaxed line-clamp-3">
                          {industry.description || 'Supplier industry category'}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl overflow-hidden shadow-sm relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#34D399]"></div>

                <div className="p-6 md:p-8 pt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <LayoutGrid className="w-5 h-5 text-[#D1A635]" />
                    <h2 className="text-[20px] font-bold text-black">Select Industry Type</h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {currentSubCategories.map((subCategory) => {
                      const isSubSelected = selectedCategoryId === subCategory._id;
                      return (
                        <button
                          type="button"
                          key={subCategory._id}
                          onClick={() => setSelectedCategoryId(subCategory._id)}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[14px] font-medium transition-colors border ${
                            isSubSelected
                              ? 'border-[#D1A635] bg-[#FFFBF4] text-[#D1A635]'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {isSubSelected && <Check className="w-5 h-5 p-[3px] text-white rounded-full bg-[#D1A635]" strokeWidth={3} />}
                          {subCategory.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-gray-200 bg-[#F9FAFB] py-4 px-6 md:px-12 w-full flex justify-between items-center sticky bottom-0 z-20">
          <button
            type="button"
            onClick={() => {
              dispatch(logout());
              navigate('/sign-in');
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded border border-gray-300 bg-white text-gray-800 font-medium text-[14px] hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={isSaving || parentCategories.length === 0}
            className="flex items-center gap-2 px-6 py-2.5 rounded bg-[#D1A635] hover:bg-[#C2982B] text-black font-bold text-[14px] transition-colors shadow-sm disabled:opacity-60"
          >
            {isSaving ? 'Saving...' : 'Continue'}
            <ArrowRight className="w-4 h-4 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseIndustry;
