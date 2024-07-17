import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "./Loading";

const CheckAuth = ({ Component, pageProps }) => {
  const {data: session} = useSession();
  const router = useRouter();
  const user = pageProps.userId;
  
  useEffect(() => {
    
    if (!session && !user) {
      router.push('/auth/signin');
    }
  }, [session]);

    if (session) {
       return <Component {...pageProps} />;
    }

    return (
        <Loading />
    );
}

export default CheckAuth;