import ImageUpload from "../common/ImageUpload";

function ThumbnailSelector({
    preview,
    onChange,
    error,
}) {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold text-foreground">
                    Thumbnail
                </h2>

                <p className="mt-1 text-sm text-muted">
                    Upload a custom thumbnail to attract more viewers.
                </p>
            </div>

            <ImageUpload
                id="thumbnail"
                label="Upload Thumbnail"
                preview={preview}
                variant="thumbnail"
                onChange={onChange}
                error={error}
            />
        </div>
    );
}

export default ThumbnailSelector;
