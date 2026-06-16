import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/auth";

function HomePage() {
    const navigate = useNavigate();
    const logoutMutation = useLogout();

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();

            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Home Page</h1>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
export default HomePage;