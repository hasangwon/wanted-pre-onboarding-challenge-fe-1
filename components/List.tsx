import { TodoType } from "../pages";
import Image from "next/image";
// import Star from "../public/images/start.png";
interface ListProps {
  todo: { title: string; content: string };
  todoList: TodoType[];
  addTodo: (e: any) => void;
  handleData: (e: any) => void;
  setSelecting: any;
  deleteTodo: (e: any, id: string) => void;
}

const List = ({ todo, todoList, addTodo, handleData, setSelecting, deleteTodo }: ListProps) => {
  return (
    <div className="flex-1 border text-[1rem] flex flex-col">
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="my-2 text-green-600 text-[1.5rem] select-none">To Do List</div>
        <form onSubmit={(e) => addTodo(e)} className="flex flex-col items-center w-[20rem]">
          <input type="text" name="title" className="w-full border my-2 p-1 rounded-md text-center" placeholder="제목" value={todo.title} onChange={(e) => handleData(e)} />
          <input type="text" name="content" autoComplete="off" className="w-full h-[5rem] border my-2 p-1 rounded-md text-center" placeholder="내용" value={todo.content} onChange={(e) => handleData(e)} />
          <input type="submit" value="추가" className="w-full text-white border my-2 p-1 bg-green-500 rounded-md disabled:bg-green-200" />
        </form>
      </div>
      <div>
        {todoList?.map((doc: TodoType, idx: number) => {
          return (
            <div key={idx} className="border flex justify-between items-center">
              <span className="cursor-pointer hover:text-green-600 w-[85%] inline-block select-none" onClick={() => setSelecting(idx)}>
                - {doc.title}
              </span>
              <span className="mr-2 px-1 bg-green-500 text-white text-[0.9rem] rounded-md" onClick={(e) => deleteTodo(e, doc.id)}>
                삭제
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
