import Link from "next/link";
import { useRouter } from "next/router";

export class LocalStorage {
  constructor() {}

  static getItem(key: string) {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  }
}
const Home = () => {
  const router = useRouter();

  const userLogout = () => {
    localStorage.removeItem("Authorization");
    router.push("/");
  };

  return (
    <div className="w-screen h-screen text-[1rem] flex flex-row justify-end">
      <div className="h-4">
        <Link href="/">
          <a className="text-white border mr-1 p-1 bg-green-600 rounded-md">Home</a>
        </Link>
        {LocalStorage.getItem("Authorization") ? (
          <Link href="/">
            <a className="text-white border mr-1 p-1 bg-green-600 rounded-md" onClick={userLogout}>
              로그아웃
            </a>
          </Link>
        ) : (
          <Link href="/auth">
            <a className="text-white border mr-1 p-1 bg-green-600 rounded-md">로그인 / 회원가입</a>
          </Link>
        )}
        )
      </div>
    </div>
  );
};

export default Home;
