import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetOnboardingStatusQuery } from "../redux/features/listings/listingsApi";
import { useGetMeQuery } from "../redux/features/auth/authApi";
import { logout, setCredentials } from "../redux/features/auth/authSlice";
import { ONBOARDING_ROUTES } from "../utils/onboarding";
import { canAccessAdminPath, getFirstAccessibleAdminRoute } from "../utils/adminAccess";

const PrivateRoute = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const {
        data: meResponse,
        isFetching: isRefreshingMe,
        isError: isMeError,
        error: meError,
    } = useGetMeQuery(undefined, {
        skip: !token,
    });
    const effectiveUser = token ? (meResponse?.data || user) : null;
    const isSupplier = effectiveUser?.role === "supplier";
    const { data, isLoading } = useGetOnboardingStatusQuery(undefined, { skip: !isSupplier });
    const onboarding = data?.data?.onboarding;
    const isOnboardingRoute = ONBOARDING_ROUTES.includes(location.pathname);
    const isUnauthorized = meError?.status === 401;

    useEffect(() => {
        if (meResponse?.data && token) {
            dispatch(setCredentials({ user: meResponse.data, token }));
        }
    }, [dispatch, meResponse, token]);

    useEffect(() => {
        if (!token && user) {
            dispatch(logout());
        }
    }, [dispatch, token, user]);

    useEffect(() => {
        if (token && isMeError && isUnauthorized) {
            dispatch(logout());
        }
    }, [dispatch, isMeError, isUnauthorized, token]);

    if (!token) {
        return <Navigate to="/sign-in" replace state={{ from: location }} />;
    }

    if (isRefreshingMe && !user) {
        return null;
    }

    if (isMeError && isUnauthorized) {
        return <Navigate to="/sign-in" replace state={{ from: location }} />;
    }

    if (!effectiveUser) {
        return <Navigate to="/sign-in" replace state={{ from: location }} />;
    }

    if (effectiveUser.role === "admin" && !canAccessAdminPath(effectiveUser, location.pathname)) {
        return <Navigate to={getFirstAccessibleAdminRoute(effectiveUser)} replace />
    }

    if (isSupplier && !isOnboardingRoute) {
        if (isLoading) {
            return null;
        }

        if (onboarding?.isComplete === false && onboarding?.nextRoute && location.pathname !== onboarding.nextRoute) {
            return <Navigate to={onboarding.nextRoute} replace />
        }
    }

    return <Outlet />
};

export default PrivateRoute;
