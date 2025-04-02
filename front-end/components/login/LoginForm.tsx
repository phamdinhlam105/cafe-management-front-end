"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { loginRequest } from "../service/login-service";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function LoginForm() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = await loginRequest(user.username, user.password);

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-1">
        <Label htmlFor="username">Tên đăng nhập</Label>
        <Input
          name="username"
          id="username"
          type="text"
          placeholder="Nhập tên đăng nhập"
          value={user.username}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Mật khẩu</Label>
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Nhập mật khẩu"
          value={user.password}
          onChange={handleInputChange}
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
