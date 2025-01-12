import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { Loader2Icon } from 'lucide-react';

interface AdminRouteProps {
    children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
    const { isAdmin, loading } = useAdmin();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2Icon className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};
