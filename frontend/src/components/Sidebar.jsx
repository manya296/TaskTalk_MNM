const Sidebar = ({ setPage }) => {
  return (
    <div className="sidebar">
      <h2>⚡ TaskTalk</h2>

      <button onClick={() => setPage("chat")}>
        Chat Interface
      </button>

      <button onClick={() => setPage("dashboard")}>
        Orders Dashboard
      </button>
    </div>
  );
};

export default Sidebar;