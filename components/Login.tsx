import React from "react";
import { useRouter } from "next/router";

export interface UserType {
  user: { email: string; pw: string };
  handleData: (e: any) => void;
  isValid: boolean;
  setIsLogin?: any;
}

const Login = ({ user, handleData, isValid }: UserType) => {
  const router = useRouter();
  const loginUser = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.pw,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message === "성공적으로 로그인 했습니다") {
          alert("로그인 성공!");
          localStorage.setItem("Authorization", res.token);
          router.push("/");
        } else {
          alert(res.details);
        }
      });
  };
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="text-[2rem] my-2">로그인</div>
      <form onSubmit={(e) => loginUser(e)} className="flex flex-col items-center w-[20rem]">
        <input type="text" name="email" className="w-full border my-2 p-1 rounded-md text-center" placeholder="이메일" value={user.email} onChange={(e) => handleData(e)} />
        <input type="password" name="pw" autoComplete="off" className="w-full border my-2 p-1 rounded-md text-center" placeholder="비밀번호" value={user.pw} onChange={(e) => handleData(e)} />
        <input type="submit" value="로그인" disabled={!isValid} className="w-full text-white border my-2 p-1 bg-green-500 rounded-md disabled:bg-green-200" />
      </form>
    </div>
  );
};

export default Login;
