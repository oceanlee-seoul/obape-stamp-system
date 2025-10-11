const Main = () => {
  return (
    <div>
      <h1 className="text-2xl">OSS</h1>
      <div>
        <select name="" id="">
          <option value="all">전체</option>
          <option value="name">이름</option>
          <option value="phone">전화번호</option>
        </select>
        <input type="text" placeholder="검색어 입력" />
        <button>검색</button>
      </div>
    </div>
  );
};

export default Main;
