import axios from "axios";
import type { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

const Me: NextPage = () => {
  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    (async () => {
      if (code) {
        await axios.get(`http://localhost:8000/token?code=${code}`, {
          withCredentials: true,
        });
      }
    })();

    Router.push("/analytics");
  }, [code]);

  return <div></div>;
};

export default Me;
