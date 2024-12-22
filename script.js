const API_URL = 'http://localhost:8000/users';

// Create User
document.getElementById('create-user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        alert(data.message);
        fetchUsers();
    } catch (error) {
        console.error('Error creating user:', error);
    }
});

// Fetch and Display Users
async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        users.forEach(user => {
            const userEl = document.createElement('div');
            userEl.className = 'user';
            userEl.innerHTML = `
                <span>${user.name} - ${user.email}</span>
                <div>
                    <button class="update-btn" onclick="updateUser('${user._id}')">Update</button>
                    <button onclick="deleteUser('${user._id}')">Delete</button>
                </div>
            `;
            userList.appendChild(userEl);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Delete User
async function deleteUser(userId) {
    try {
        await fetch(`${API_URL}/${userId}`, { method: 'DELETE' });
        alert('User deleted successfully');
        fetchUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Update User
function updateUser(userId) {
    const name = prompt('Enter new name:');
    const email = prompt('Enter new email:');
    const password = prompt('Enter new password:');

    fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    }).then(() => {
        alert('User updated successfully');
        fetchUsers();
    }).catch(error => console.error('Error updating user:', error));
}

// Search User by ID
document.getElementById('search-user-btn').addEventListener('click', async () => {
    const userId = document.getElementById('user-id').value;
    try {
        const response = await fetch(`${API_URL}/${userId}`);
        const user = await response.json();

        if (user) {
            alert(`Name: ${user.name}, Email: ${user.email}`);
        } else {
            alert('User not found');
        }
    } catch (error) {
        console.error('Error searching user:', error);
    }
});

// Initial fetch of users
fetchUsers();
