import { Link } from "react-router-dom";

const VideoCard = ({
  id,
  thumbnail,
  duration,
  title,
  channelName,
  channelAvatar,
  views,
}) => {
  return (
    <Link
      to={`/watch/${id}`}
      className="
        group
        block
        overflow-hidden
        rounded-2xl
        bg-surface
        transition-shadow
        shadow-sm
        hover:shadow-md 
        ">
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="
            aspect-video
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />

        <span
          className="
            absolute
            bottom-2
            right-2
            rounded-md
            bg-black/80
            px-2
            py-1
            text-xs
            font-medium
            text-white
          "
        >
          {duration}
        </span>
      </div>

      {/* Info */}
      <div className="mt-3 flex gap-3 p-3">
        <img
          src={channelAvatar}
          alt={channelName}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="min-w-0">
          <h3
            className="
              line-clamp-2
              text-sm
              font-semibold
              text-foreground
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-muted
            "
          >
            {channelName} • {views} views
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;