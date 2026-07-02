import VideoCard from "../components/video/VideoCard";
import VideoGrid from "../components/video/VideoGrid";
const HomePage = () => {
    const mockVideos =[
  {
    id: "1",
    title: "Producing a Hit in 24 Hours: Complete Studio Session",
    thumbnail: "https://picsum.photos/800/450?random=1",
    duration: "14:22",
    channelName: "AudioGenius Studio",
    channelAvatar: "https://i.pravatar.cc/100?img=12",
    views: "1.2M",
  },

  {
    id: "2",
    title: "Future of Tech: The 2026 Ultimate Developer Guide",
    thumbnail: "https://picsum.photos/800/450?random=2",
    duration: "18:05",
    channelName: "Silicon Vision",
    channelAvatar: "https://i.pravatar.cc/100?img=32",
    views: "845K",
  },

  {
    id: "3",
    title: "Building a Modern React Application from Scratch",
    thumbnail: "https://picsum.photos/800/450?random=3",
    duration: "22:15",
    channelName: "Frontend Mastery",
    channelAvatar: "https://i.pravatar.cc/100?img=20",
    views: "2.1M",
  },

  {
    id: "4",
    title: "The Complete Node.js Backend Architecture Guide",
    thumbnail: "https://picsum.photos/800/450?random=4",
    duration: "31:44",
    channelName: "Backend Hub",
    channelAvatar: "https://i.pravatar.cc/100?img=25",
    views: "980K",
  },

  {
    id: "5",
    title: "Master MongoDB Aggregation Pipelines",
    thumbnail: "https://picsum.photos/800/450?random=5",
    duration: "17:30",
    channelName: "Database World",
    channelAvatar: "https://i.pravatar.cc/100?img=45",
    views: "523K",
  },

  {
    id: "6",
    title: "UI Design Principles Every Developer Should Know",
    thumbnail: "https://picsum.photos/800/450?random=6",
    duration: "11:08",
    channelName: "DesignCraft",
    channelAvatar: "https://i.pravatar.cc/100?img=14",
    views: "1.8M",
  },

  {
    id: "7",
    title: "Scaling Applications to Millions of Users",
    thumbnail: "https://picsum.photos/800/450?random=7",
    duration: "26:11",
    channelName: "System Design Pro",
    channelAvatar: "https://i.pravatar.cc/100?img=18",
    views: "742K",
  },

  {
    id: "8",
    title: "JavaScript Interview Questions You Must Know",
    thumbnail: "https://picsum.photos/800/450?random=8",
    duration: "19:47",
    channelName: "Code Career",
    channelAvatar: "https://i.pravatar.cc/100?img=29",
    views: "3.4M",
  },

  {
    id: "9",
    title: "Building Reusable React Components",
    thumbnail: "https://picsum.photos/800/450?random=9",
    duration: "13:52",
    channelName: "React Simplified",
    channelAvatar: "https://i.pravatar.cc/100?img=36",
    views: "1.5M",
  },

  {
    id: "10",
    title: "Understanding Authentication & JWT",
    thumbnail: "https://picsum.photos/800/450?random=10",
    duration: "21:18",
    channelName: "Secure Coding",
    channelAvatar: "https://i.pravatar.cc/100?img=41",
    views: "679K",
  },

  {
    id: "11",
    title: "Deploy MERN Applications Like a Pro",
    thumbnail: "https://picsum.photos/800/450?random=11",
    duration: "15:49",
    channelName: "Cloud Builders",
    channelAvatar: "https://i.pravatar.cc/100?img=11",
    views: "924K",
  },

  {
    id: "12",
    title: "State Management with Zustand Explained",
    thumbnail: "https://picsum.photos/800/450?random=12",
    duration: "16:33",
    channelName: "Frontend Mastery",
    channelAvatar: "https://i.pravatar.cc/100?img=20",
    views: "1.1M",
  },
]
  return (
   <section className="space-y-6">
      <VideoGrid videos={mockVideos} />
    </section>
  );
};

export default HomePage;