import "../styles/Navbar.css";

export default function Navbar({ user, onLogout, onNewTask })  {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <h1 className="dash-logo">CHRONOSYNC</h1>

                <div className="user-chip">
                    <span className="status-dot"></span>
                    <span className="username">
                        {user.username}
                    </span>


                    <span className="divider">•</span>

                    <span className="clearance">{user.clearance}</span>
                </div>
            </div>

            <div className="nav-right">
                <button
                    className="new-task-btn"
                    onClick={onNewTask}
                >
                    + New Task
                </button>

                <button
                    className="logout-btn"
                    onClick={onLogout}
                >
                    Log out
                </button>


            </div>
        </nav>
    )
}