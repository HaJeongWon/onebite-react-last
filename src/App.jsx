import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Notfound from "./pages/Notfound";
import { useReducer, useRef } from "react";
import Edit from "./pages/Edit";

const mokData = [
  {
    id: 1,
    createDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기 내용용",
  },
  {
    id: 2,
    createDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 일기 내용용",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

// 1. "/" : 모든 일기를 조회하는 Home 패키지
// 2. "/new" : 새로운 일기를 작성하는 New 패키지
// 3. "/diary" : 일기를 상세히 조회하는 diary 패키지
function App() {
  const [data, dispatch] = useReducer(reducer, mokData);
  const idRef = useRef(3);

  // 새로운 일기 추가
  const onCreate = (createDate, emotionId, content) => {
    //새로운 일기를 추가하는 기능
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    <>
      <button
        onClick={() => {
          onCreate(new Date().getTime(), 1, "hello");
        }}
      >
        일기 추가 테스트
      </button>

      <button
        onClick={() => {
          onUpdate(1, new Date().getTime(), 3, "수정된 일기입니다");
        }}
      >
        일기 수정 테스트
      </button>

      <button
        onClick={() => {
          onDelete(1);
        }}
      >
        읽기 삭제 테스트
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
