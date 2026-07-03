function ChannelBanner({ banner }) {
    return (
        
            <img
                src={banner}
                alt="Channel Banner"
                className="
                    h-72
                    w-full
                    object-cover

                    sm:h-56

                    lg:h-72
                "
            />
    );
}

export default ChannelBanner;   