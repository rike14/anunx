import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "./Loading";

const CheckAuth = ({ Component, pageProps }) => {
  const { data: session, status } = useSession()
  const router = useRouter();

  useEffect(() => {
    
    if (!session && status === "unauthenticated") {
      router.push('/');
    }
  }, [session]);

  if (session && status === 'authenticated') {
       return <Component {...pageProps} />;
    }

    return (
        <Loading />
    );
}

export default CheckAuth;