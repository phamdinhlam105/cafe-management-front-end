"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { loginRequest } from "../service/login-service";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = await loginRequest(username, password);

    setLoading(false);
    if (data.error) {
      setError(data.error);
      return;
    }
    else {
      const decoded = jwt.decode(data.accessToken) as { role: string };

      if (decoded.role === "Khách") {
        alert("Hãy liên hệ quản lý để được cấp quyền!");
        return;
      }
    }

    alert(`Xin chào ${data.userName}!`);
    router.push('/order');
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-1">
        <Label htmlFor="username">Tên đăng nhập</Label>
        <Input
          id="username"
          type="text"
          placeholder="Nhập tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Mật khẩu</Label>
        <Input
          id="password"
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
      <Button type="submit" disabled={loading} className={cn("w-full", loading && "opacity-50")}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </form>
  );
}
