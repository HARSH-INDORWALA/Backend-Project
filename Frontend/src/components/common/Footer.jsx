function Footer(){
    return (
        <footer className="bg-[#F5F7FA] py-6 flex left-0 right-0 absolute justify-between px-10 text-sm text-[#0A0C10]">
            <p>&copy; 2023 Your Company. All rights reserved.</p>
            <div className="flex gap-6">
                <button className="hover:text-[#0066FF]">Privacy</button>
                <button className="hover:text-[#0066FF]">Terms</button>
                <button className="hover:text-[#0066FF]">Contact</button>
            </div>
        </footer>
    )
}

export default Footer;