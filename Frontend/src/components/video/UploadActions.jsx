import { Button } from "../common";

function UploadActions({ onCancel, isUploading, isProcessing, disabled = false }) {
    return (
        <div className="flex items-center justify-end gap-4 border-t border-border pt-6">
            <Button
                variant="secondary"
                type="button"
                disabled={isUploading || isProcessing}
                onClick={onCancel}
            >
                Cancel
            </Button>

            <Button
                type="submit"
                disabled={disabled || isUploading || isProcessing}
            >
                {isUploading ? "Uploading..." : isProcessing ? "Processing..." : "Publish"}
            </Button>
        </div>
    );
}

export default UploadActions;