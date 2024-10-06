document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');

    profileForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(profileForm);
        const fullName = formData.get('fullName');
        const email = formData.get('email');

        try {
            const response = await fetch('/profile/update', {
                method: 'POST',
                body: JSON.stringify({ fullName, email }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            window.location.href = '/profile';
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    });

    const changePasswordForm = document.getElementById('changePasswordForm');

    changePasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(changePasswordForm);
        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');

        try {
            const response = await fetch('/profile/changePassword', {
                method: 'POST',
                body: JSON.stringify({ currentPassword, newPassword }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to change password');
            }

            window.location.href = '/profile';
        } catch (error) {
            console.error('Error changing password:', error);
        }
    });
});
