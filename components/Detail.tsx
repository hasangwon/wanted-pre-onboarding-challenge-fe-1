import { TodoType } from "../pages";
interface DetailProps {
  selecting: number;
  todoList: TodoType[];
  updateTodo: (e: any, id: string, title: string, content: string) => void;
  todo: { title: string; content: string };
  deleteTodo: (e: any, id: string) => void;
  goBack: () => void;
}

const Detail = ({ selecting, todoList, updateTodo, todo, deleteTodo, goBack }: DetailProps) => {
  return (
    <div className="flex-1 border text-[2rem] flex flex-col">
      <div className="text-center text-green-600 text-[1.5rem] select-none">제목</div>
      <div className="m-2 p-2 border border-green-500">{todoList[selecting]?.title}</div>
      <div className="text-center text-green-600 text-[1.5rem] select-none">내용</div>
      <div className="m-2 p-2 h-full border border-green-500">{todoList[selecting]?.content}</div>
      <div className="w-full flex text-center text-[1rem] text-green-600 select-none">
        <div className="flex-1 m-2 p-1 border border-green-500 inline-block cursor-pointer" onClick={() => goBack()}>
          뒤로
        </div>
        <div
          className="flex-1 m-2 p-1 border border-green-500 inline-block cursor-pointer"
          onClick={(e) => {
            if (!todo.title || !todo.content) {
              alert("왼쪽에 변경 사항을 입력하세요");
            } else {
              updateTodo(e, todoList[selecting].id, todo.title, todo.content);
            }
          }}
        >
          수정
        </div>
        <div className="flex-1 m-2 p-1 border border-green-500 inline-block cursor-pointer" onClick={(e) => deleteTodo(e, todoList[selecting].id)}>
          삭제
        </div>
      </div>
    </div>
  );
};

export default Detail;
