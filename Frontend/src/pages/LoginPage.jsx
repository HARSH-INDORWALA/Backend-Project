import { AuthCard, LoginForm } from "../components/auth";
import AuthLayout from "../layouts/AuthLayout.jsx";
function LoginPage() {
    return (
        <>
            <AuthLayout>
                <AuthCard
                    title="Welcome Back"
                    subtitle="The next evolution of entertainment awaits."
                >
                    <LoginForm />
                </AuthCard>
            </AuthLayout>
        </>
    )
}
export default LoginPage;