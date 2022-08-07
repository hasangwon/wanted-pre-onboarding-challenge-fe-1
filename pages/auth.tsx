import { useState } from "react";
import { useRouter } from "next/router";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Auth = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({ email: "", pw: "" });
  const isValid = user.email.includes("@") && user.email.includes(".") && user.pw.length >= 8;

  const handleData = (e: any) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const userLogout = () => {
    localStorage.removeItem("Authorization");
    router.push("/");
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="text-center">
        <div className="w-[10rem] inline-block text-white border my-2 p-1 bg-green-500 rounded-md" onClick={() => setIsLogin(true)}>
          로그인
        </div>
        <div className="w-[10rem] inline-block text-white border my-2 p-1 bg-green-500 rounded-md" onClick={() => setIsLogin(false)}>
          회원가입
        </div>
        {isLogin ? <Login user={user} handleData={handleData} isValid={isValid} /> : <Signup user={user} handleData={handleData} isValid={isValid} setIsLogin={setIsLogin} />}
      </div>
    </div>
  );
};

export default Auth;
