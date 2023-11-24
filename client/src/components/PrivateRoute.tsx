import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function PrivateRoute({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/', { replace: true });
            return;
        }
    }, [isAuthenticated, navigate]);

    return <>{children}</>;
}
