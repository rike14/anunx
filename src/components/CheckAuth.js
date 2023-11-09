import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "./Loading";

const CheckAuth = ({ Component, pageProps }) => {
    const [ session, loading ] = useSession();
    const router = useRouter();

  useEffect(() => {
    if(loading) return;
    
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, loading]);

    if (session) {
       return <Component {...pageProps} />;
    }

    return (
        <Loading />
    );
}

export default CheckAuth;