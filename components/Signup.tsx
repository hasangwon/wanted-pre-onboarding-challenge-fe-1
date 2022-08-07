import { UserType } from "./Login";

const Signup = ({ user, handleData, isValid, setIsLogin }: UserType) => {
  const signupUser = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:8080/users/create", {
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
        if (res.message === "계정이 성공적으로 생성되었습니다") {
          alert("회원가입 성공!");
          setIsLogin(true);
        } else {
          alert(res.details);
        }
      });
  };

  return (
    <div className="flex flex-col  w-full h-full justify-center items-center">
      <div className="text-[2rem] my-2">회원가입</div>
      <form onSubmit={(e) => signupUser(e)} className="flex flex-col items-center w-[20rem]">
        <input type="text" name="email" className="w-full border my-2 p-1 rounded-md text-center" placeholder="이메일" value={user.email} onChange={(e) => handleData(e)} />
        <input type="password" name="pw" autoComplete="off" className="w-full border my-2 p-1 rounded-md text-center" placeholder="비밀번호" value={user.pw} onChange={(e) => handleData(e)} />
        <input type="submit" value="회원가입" disabled={!isValid} className="w-full text-white border my-2 p-1 bg-green-500 rounded-md disabled:bg-green-200" />
      </form>
    </div>
  );
};

export default Signup;
