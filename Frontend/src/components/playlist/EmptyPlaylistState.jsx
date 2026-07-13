import Button from "../common/Button";

const EmptyPlaylistState = ({
  title = "No playlists yet",
  description = "Create your first playlist to save videos and watch them later.",
  buttonText = "Create Playlist",
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 py-16 text-center">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>

      <p className="mt-3 max-w-md text-sm text-muted">{description}</p>

      {buttonText && (
        <Button className="mt-6" onClick={onAction}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyPlaylistState;