export const ONBOARDING_ROUTES = [
  "/choose-industry",
  "/company-info",
  "/subscription",
  "/cart",
  "/listing-period",
  "/listed",
];

export const buildOnboardingQueryString = (searchParams) => {
  const params = new URLSearchParams();
  const supplierId = searchParams.get("supplierId");
  const mode = searchParams.get("mode");

  if (supplierId) {
    params.set("supplierId", supplierId);
  }

  if (mode) {
    params.set("mode", mode);
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

export const appendOnboardingContext = (path, searchParams) => `${path}${buildOnboardingQueryString(searchParams)}`;
