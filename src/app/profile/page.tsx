"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login"); // Redirect to login if no user is logged in
    }
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>Name: {user.name || "Guest User"}</p>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
