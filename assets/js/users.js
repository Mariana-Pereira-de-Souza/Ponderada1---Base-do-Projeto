document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const addUserBtn = document.getElementById('addUserBtn');
    const userModal = document.getElementById('userModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancelBtn');
    const userForm = document.getElementById('userForm');
    const modalTitle = document.getElementById('modalTitle');
    const userIdInput = document.getElementById('userId');
    const searchInput = document.getElementById('searchUser');
    
    // Event Listeners
    if (addUserBtn) addUserBtn.addEventListener('click', openAddUserModal);
    if (closeModal) closeModal.addEventListener('click', closeUserModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeUserModal);
    if (userForm) userForm.addEventListener('submit', handleUserFormSubmit);
    if (searchInput) searchInput.addEventListener('input', searchUsers);
    
    // Delegate events for user actions
    const usersTable = document.querySelector('.data-table tbody');
    if (usersTable) {
        usersTable.addEventListener('click', function(e) {
            const userRow = e.target.closest('tr');
            if (!userRow) return;
            
            const userId = userRow.dataset.id;
            
            if (e.target.closest('.edit-user')) {
                openEditUserModal(userId);
            } else if (e.target.closest('.delete-user')) {
                confirmDeleteUser(userId);
            }
        });
    }
    
    // Functions
    function openAddUserModal() {
        modalTitle.textContent = 'Novo Usuário';
        userForm.reset();
        userIdInput.value = '';
        document.getElementById('password').required = true;
        userModal.style.display = 'block';
    }
    
    function openEditUserModal(userId) {
        modalTitle.textContent = 'Editar Usuário';
        document.getElementById('password').required = false;
        
        // Fetch user data
        fetch(`/api/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                userIdInput.value = user.id;
                document.getElementById('name').value = user.name;
                document.getElementById('email').value = user.email;
                document.getElementById('role').value = user.role;
                document.getElementById('active').value = user.active.toString();
                
                userModal.style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching user:', error);
                alert('Erro ao carregar dados do usuário');
            });
    }
    
    function closeUserModal() {
        userModal.style.display = 'none';
    }
    
    function handleUserFormSubmit(e) {
        e.preventDefault();
        
        const userId = userIdInput.value;
        const isEditing = !!userId;
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            role: document.getElementById('role').value,
            active: document.getElementById('active').value === 'true'
        };
        
        // Adicionar senha apenas se fornecida
        const password = document.getElementById('password').value;
        if (password) {
            formData.password = password;
        }
        
        const url = isEditing ? `/api/users/${userId}` : '/api/users';
        const method = isEditing ? 'PUT' : 'POST';
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar usuário');
            }
            return response.json();
        })
        .then(data => {
            closeUserModal();
            alert(isEditing ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
            // Reload users
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Erro ao salvar usuário');
        });
    }
    
    function confirmDeleteUser(userId) {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            fetch(`/api/users/${userId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir usuário');
                }
                return response.json();
            })
            .then(data => {
                alert('Usuário excluído com sucesso!');
                // Remove user row from DOM
                const userRow = document.querySelector(`tr[data-id="${userId}"]`);
                if (userRow) {
                    userRow.remove();
                }
                
                // Check if there are no users left
                if (document.querySelector('.data-table tbody').children.length === 0) {
                    window.location.reload(); // Reload to show empty state
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao excluir usuário');
            });
        }
    }
    
    function searchUsers() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.data-table tbody tr');
        
        rows.forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const email = row.cells[1].textContent.toLowerCase();
            
            if (name.includes(searchTerm) || email.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
});