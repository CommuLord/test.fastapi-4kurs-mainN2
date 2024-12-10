document.addEventListener('DOMContentLoaded', function() {
    const createUserForm = document.getElementById('create-user-form');
    const updateUserForm = document.getElementById('update-user-form');
    const deleteUserForm = document.getElementById('delete-user-form');
    const userList = document.getElementById('user-list');

    const API_URL = 'http://localhost:8080';

    // Функция для получения всех пользователей
    async function fetchUsers() {
        const response = await fetch('/users/');
        const users = await response.json();
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.username} - ${user.email}`;
            userList.appendChild(li);
        });
    }

    // Функция для создания нового пользователя
    async function createUser(event) {
        event.preventDefault();
        const username = document.getElementById('create-username').value;
        const email = document.getElementById('create-email').value;
        const full_name = document.getElementById('create-full-name').value;
        const password = document.getElementById('create-password').value;

        const response = await fetch('/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, full_name, password })
        });

        if (response.ok) {
            fetchUsers();
            createUserForm.reset();
        } else {
            alert('Failed to create user');
        }
    }

    // Функция для обновления пользователя
    async function updateUser(event) {
        event.preventDefault();
        const user_id = document.getElementById('update-user-id').value;
        const username = document.getElementById('update-username').value;
        const email = document.getElementById('update-email').value;
        const full_name = document.getElementById('update-full-name').value;
        const password = document.getElementById('update-password').value;

        const response = await fetch(`/users/${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, full_name, password })
        });

        if (response.ok) {
            fetchUsers();
            updateUserForm.reset();
        } else {
            alert('Failed to update user');
        }
    }

    // Функция для удаления пользователя
    async function deleteUser(event) {
        event.preventDefault();
        const user_id = document.getElementById('delete-user-id').value;

        const response = await fetch(`/users/${user_id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchUsers();
            deleteUserForm.reset();
        } else {
            alert('Failed to delete user');
        }
    }

    // Инициализация
    fetchUsers();
    createUserForm.addEventListener('submit', createUser);
    updateUserForm.addEventListener('submit', updateUser);
    deleteUserForm.addEventListener('submit', deleteUser);
});
