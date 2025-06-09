document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const categoryModal = document.getElementById('categoryModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancelBtn');
    const categoryForm = document.getElementById('categoryForm');
    const modalTitle = document.getElementById('modalTitle');
    const categoryIdInput = document.getElementById('categoryId');
    
    // Event Listeners
    if (addCategoryBtn) addCategoryBtn.addEventListener('click', openAddCategoryModal);
    if (closeModal) closeModal.addEventListener('click', closeCategoryModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeCategoryModal);
    if (categoryForm) categoryForm.addEventListener('submit', handleCategoryFormSubmit);
    
    // Delegate events for category actions
    const categoriesGrid = document.querySelector('.categories-grid');
    if (categoriesGrid) {
        categoriesGrid.addEventListener('click', function(e) {
            const categoryCard = e.target.closest('.category-card');
            if (!categoryCard) return;
            
            const categoryId = categoryCard.dataset.id;
            
            if (e.target.closest('.edit-category')) {
                openEditCategoryModal(categoryId);
            } else if (e.target.closest('.delete-category')) {
                confirmDeleteCategory(categoryId);
            }
        });
    }
    
    // Functions
    function openAddCategoryModal() {
        modalTitle.textContent = 'Nova Categoria';
        categoryForm.reset();
        categoryIdInput.value = '';
        document.getElementById('color').value = '#3498db';
        categoryModal.style.display = 'block';
    }
    
    function openEditCategoryModal(categoryId) {
        modalTitle.textContent = 'Editar Categoria';
        
        // Fetch category data
        fetch(`/api/categories/${categoryId}`)
            .then(response => response.json())
            .then(category => {
                categoryIdInput.value = category.id;
                document.getElementById('name').value = category.name;
                document.getElementById('color').value = category.color;
                document.getElementById('description').value = category.description || '';
                
                categoryModal.style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching category:', error);
                alert('Erro ao carregar dados da categoria');
            });
    }
    
    function closeCategoryModal() {
        categoryModal.style.display = 'none';
    }
    
    function handleCategoryFormSubmit(e) {
        e.preventDefault();
        
        const categoryId = categoryIdInput.value;
        const isEditing = !!categoryId;
        
        const formData = {
            name: document.getElementById('name').value,
            color: document.getElementById('color').value,
            description: document.getElementById('description').value
        };
        
        const url = isEditing ? `/api/categories/${categoryId}` : '/api/categories';
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
                throw new Error('Erro ao salvar categoria');
            }
            return response.json();
        })
        .then(data => {
            closeCategoryModal();
            alert(isEditing ? 'Categoria atualizada com sucesso!' : 'Categoria criada com sucesso!');
            // Reload categories
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Erro ao salvar categoria');
        });
    }
    
    function confirmDeleteCategory(categoryId) {
        if (confirm('Tem certeza que deseja excluir esta categoria?')) {
            fetch(`/api/categories/${categoryId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir categoria');
                }
                return response.json();
            })
            .then(data => {
                alert('Categoria excluída com sucesso!');
                // Remove category card from DOM
                const categoryCard = document.querySelector(`.category-card[data-id="${categoryId}"]`);
                if (categoryCard) {
                    categoryCard.remove();
                }
                
                // Check if there are no categories left
                if (document.querySelector('.categories-grid').children.length === 0) {
                    window.location.reload(); // Reload to show empty state
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao excluir categoria');
            });
        }
    }
});