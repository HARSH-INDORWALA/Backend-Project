import Logo from "../components/common/Logo";
import Footer from "../components/common/Footer";
function AuthLayout({children}) {
    return (
        <>
            <main className="min-h-screen  flex flex-col bg-gradient-to-br from-[#F4F7FA] via-[#DDE5FF] to-[#F4F7FA]">
                <div className="absolute top-4 left-4">
                    <Logo />
                </div>

                <div className="min-h-screen flex items-center justify-center px-4">
                    {children}
                </div>
            </main>
            <Footer/>
        </>
    )
}
export default AuthLayout;