import AuthCard from "../components/auth/AuthCard.jsx";
import RegisterForm from "../components/auth/RegisterForm.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
function RegisterPage (){
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