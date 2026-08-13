import { AuthCard, RegisterForm } from "../components/auth";
import AuthLayout from "../layouts/AuthLayout.jsx";
function RegisterPage() {
    return (
        <>
            <AuthLayout>
                <AuthCard
                    title="Welcome Back"
                    subtitle="The next evolution of entertainment awaits."
                >
                    <RegisterForm />
                </AuthCard>
            </AuthLayout>
        </>
    )
}
export default RegisterPage;