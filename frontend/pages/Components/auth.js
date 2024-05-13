import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Auth({ setToken }) {
    const router = useRouter();

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
            router.push('/');
        } else {
            setToken(accessToken);
        }
    }, []);

    return null; // Since this is a utility component, it doesn't render anything
}
