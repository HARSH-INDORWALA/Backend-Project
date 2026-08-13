function ChannelTabs({ activeTab, setActiveTab, }) {

    const tabs = ["Home", "Playlists", "About",];

    return (
        <div className=" mt-10 border-b border-border " >
            <div className="flex items-center gap-8 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={` cursor-pointer border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-all
                            ${activeTab === tab
                                ? "border-primary text-primary"
                                : "border-transparent text-muted hover:text-foreground"
                            }
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ChannelTabs;