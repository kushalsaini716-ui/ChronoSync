import { useEffect, useState } from "react";
import api from "./services/api";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkSession = async () => {

            try {

                const res = await api.get("/api/auth/me");

                setUser(res.data.user);

            } catch {

                setUser(null);

            } finally {

                setLoading(false);

            }

        };

        checkSession();

    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {user ? (
                <Dashboard
                    user={user}
                    setUser={setUser}
                />
            ) : (
                <Login setUser={setUser} />
            )}
        </>
    );
}

export default App;