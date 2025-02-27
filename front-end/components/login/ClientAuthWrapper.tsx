"use client";
import { useEffect, useState } from "react";
import LoginDialog from "@/components/login/LoginDialog";

export default function ClientAuthWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <>
      {!isLoggedIn && <LoginDialog />}
    </>
  );
}
