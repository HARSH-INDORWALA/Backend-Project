import Modal from "../common/Modal";
import ProfileForm from "./ProfileForm";

function EditProfileModal({
    isOpen,
    onClose,
    user,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Profile"
        >
            <ProfileForm
                user={user}
            />
        </Modal>
    );
}

export default EditProfileModal;