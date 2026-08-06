import { Modal } from "../common";
import ProfileForm from "./ProfileForm";
import useAuthStore from "../../store/authStore.js";
function EditProfileModal({
    isOpen,
    onClose
}) {
    const user = useAuthStore((state) => state.user);
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Profile"
        >
            <ProfileForm
                user={user}
                onClose={onClose}
            />
        </Modal>
    );
}

export default EditProfileModal;