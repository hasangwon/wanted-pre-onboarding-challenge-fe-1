import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Detail from "../components/Detail";
import List from "../components/List";

export interface TodoType {
  [key: string]: string;
}

export class LocalStorage {
  constructor() {}

  static getItem(key: string) {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  }
}

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("Content-Type", "application/json");
if (typeof window !== "undefined") requestHeaders.set("Authorization", localStorage?.getItem("Authorization") || "no token");

const Home = () => {
  const router = useRouter();
  const [todo, setTodo] = useState({ title: "", content: "" });
  const [todoList, setTodoList] = useState([]);
  const [update, setUpdate] = useState(0);
  const [selecting, setSelecting] = useState(0);

  const userLogout = () => {
    localStorage.removeItem("Authorization");
    router.push("/");
  };

  const handleData = (e: any) => {
    const { value, name } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  useEffect(() => {
    fetch("http://localhost:8080/todos", {
      method: "GET",
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data.data);
      });
  }, [update]);

  const addTodo = (e: any) => {
    e.preventDefault();

    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({
        title: todo.title,
        content: todo.content,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        // console.log(res);
      });
    setUpdate(update + 1);
    setTodo({ title: "", content: "" });
  };

  const deleteTodo = (e: any, id: string) => {
    e.preventDefault();

    fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
      headers: requestHeaders,
    }).then((res) => {
      // console.log(res);
    });
    setUpdate(update + 1);
  };

  const updateTodo = (e: any, id: string, title: string, content: string) => {
    e.preventDefault();

    fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify({
        title: todo.title,
        content: todo.content,
      }),
    }).then((res) => {
      // console.log(res);
    });
    setUpdate(update + 1);
    setTodo({ title: "", content: "" });
  };

  const goBack = () => {
    if (selecting > 0) setSelecting(selecting - 1);
    else {
      alert("가장 이전 글입니다");
    }
  };

  console.log(todoList);
  return (
    <div className="w-screen h-screen">
      <div className="h-8 text-[1rem] flex flex-row justify-end">
        <Link href="/">
          <a className="text-white border mr-1 p-1 bg-green-600 rounded-md">Home</a>
        </Link>
        {LocalStorage?.getItem("Authorization") ? (
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
      </div>
      <div className="flex w-full border-2 border-green-200 justify-center">
        {LocalStorage?.getItem("Authorization") ? (
          <>
            <List handleData={handleData} todo={todo} todoList={todoList} addTodo={addTodo} setSelecting={setSelecting} deleteTodo={deleteTodo} />
            <Detail selecting={selecting} todoList={todoList} updateTodo={updateTodo} todo={todo} deleteTodo={deleteTodo} goBack={goBack} />
          </>
        ) : (
          <div className="text-[3rem]">로그인 하세요</div>
        )}
      </div>
    </div>
  );
};

export default Home;
