export const ONBOARDING_ROUTES = [
  "/choose-industry",
  "/company-info",
  "/subscription",
  "/listed",
];

export const buildOnboardingQueryString = (searchParams) => {
  const params = new URLSearchParams();
  ["supplierId", "mode", "session_id", "intent", "cancelled"].forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      params.set(key, value);
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

export const appendOnboardingContext = (path, searchParams) => `${path}${buildOnboardingQueryString(searchParams)}`;

export const getPostAuthPath = (searchParams) => {
  if (searchParams.get("session_id")) {
    return appendOnboardingContext("/listed", searchParams);
  }

  if (searchParams.get("cancelled")) {
    return appendOnboardingContext("/subscription", searchParams);
  }

  return "/dashboard";
};
