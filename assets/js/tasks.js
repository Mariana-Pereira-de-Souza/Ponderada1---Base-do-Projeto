document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const tasksList = document.querySelector(".tasks-list")
  const addTaskBtn = document.getElementById("addTaskBtn")
  const taskModal = document.getElementById("taskModal")
  const closeModal = document.querySelector(".close-modal")
  const cancelBtn = document.getElementById("cancelBtn")
  const taskForm = document.getElementById("taskForm")
  const modalTitle = document.getElementById("modalTitle")
  const taskIdInput = document.getElementById("taskId")
  const statusFilter = document.getElementById("status")
  const categoryFilter = document.getElementById("category")
  const searchInput = document.getElementById("search")

  // Event Listeners
  if (addTaskBtn) addTaskBtn.addEventListener("click", openAddTaskModal)
  if (closeModal) closeModal.addEventListener("click", closeTaskModal)
  if (cancelBtn) cancelBtn.addEventListener("click", closeTaskModal)
  if (taskForm) taskForm.addEventListener("submit", handleTaskFormSubmit)
  if (statusFilter) statusFilter.addEventListener("change", filterTasks)
  if (categoryFilter) categoryFilter.addEventListener("change", filterTasks)
  if (searchInput) searchInput.addEventListener("input", filterTasks)

  // Delegate events for task actions
  if (tasksList) {
    tasksList.addEventListener("click", (e) => {
      const taskCard = e.target.closest(".task-card")
      if (!taskCard) return

      const taskId = taskCard.dataset.id

      if (e.target.closest(".edit-task")) {
        openEditTaskModal(taskId)
      } else if (e.target.closest(".delete-task")) {
        confirmDeleteTask(taskId)
      } else if (e.target.closest(".toggle-status")) {
        toggleTaskStatus(taskId)
      }
    })
  }

  // Functions
  function openAddTaskModal() {
    modalTitle.textContent = "Nova Tarefa"
    taskForm.reset()
    taskIdInput.value = ""
    taskModal.style.display = "block"
  }

  function openEditTaskModal(taskId) {
    modalTitle.textContent = "Editar Tarefa"

    // Fetch task data
    fetch(`/api/tasks/${taskId}`)
      .then((response) => response.json())
      .then((task) => {
        taskIdInput.value = task.id
        document.getElementById("title").value = task.title
        document.getElementById("description").value = task.description || ""
        document.getElementById("categoryId").value = task.category_id
        document.getElementById("priority").value = task.priority

        // Format date for input (YYYY-MM-DD)
        if (task.due_date) {
          const dueDate = new Date(task.due_date)
          const formattedDate = dueDate.toISOString().split("T")[0]
          document.getElementById("dueDate").value = formattedDate
        }

        taskModal.style.display = "block"
      })
      .catch((error) => {
        console.error("Error fetching task:", error)
        alert("Erro ao carregar dados da tarefa")
      })
  }

  function closeTaskModal() {
    taskModal.style.display = "none"
  }

  function handleTaskFormSubmit(e) {
    e.preventDefault()

    const taskId = taskIdInput.value
    const isEditing = !!taskId

    const formData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      category_id: document.getElementById("categoryId").value,
      priority: document.getElementById("priority").value,
      due_date: document.getElementById("dueDate").value,
    }

    const url = isEditing ? `/api/tasks/${taskId}` : "/api/tasks"
    const method = isEditing ? "PUT" : "POST"

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao salvar tarefa")
        }
        return response.json()
      })
      .then((data) => {
        closeTaskModal()
        alert(isEditing ? "Tarefa atualizada com sucesso!" : "Tarefa criada com sucesso!")
        // Reload tasks
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("Erro ao salvar tarefa")
      })
  }

  function confirmDeleteTask(taskId) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao excluir tarefa")
          }
          return response.json()
        })
        .then((data) => {
          alert("Tarefa excluída com sucesso!")
          // Remove task card from DOM
          const taskCard = document.querySelector(`.task-card[data-id="${taskId}"]`)
          if (taskCard) {
            taskCard.remove()
          }

          // Check if there are no tasks left
          if (tasksList && tasksList.children.length === 0) {
            window.location.reload() // Reload to show empty state
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          alert("Erro ao excluir tarefa")
        })
    }
  }

  function toggleTaskStatus(taskId) {
    const taskCard = document.querySelector(`.task-card[data-id="${taskId}"]`)
    const isCompleted = taskCard.classList.contains("completed")

    fetch(`/api/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: isCompleted ? "pending" : "completed",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar status")
        }
        return response.json()
      })
      .then((data) => {
        // Toggle completed class
        taskCard.classList.toggle("completed")
        alert("Status atualizado com sucesso!")
      })
      .catch((error) => {
        console.error("Error:", error)
        alert("Erro ao atualizar status")
      })
  }

  function filterTasks() {
    const statusValue = statusFilter ? statusFilter.value : "all"
    const categoryValue = categoryFilter ? categoryFilter.value : "all"
    const searchValue = searchInput ? searchInput.value.toLowerCase() : ""

    const taskCards = document.querySelectorAll(".task-card")

    taskCards.forEach((card) => {
      let showCard = true

      // Filter by status
      if (statusValue !== "all") {
        const isCompleted = card.classList.contains("completed")
        if ((statusValue === "completed" && !isCompleted) || (statusValue === "pending" && isCompleted)) {
          showCard = false
        }
      }

      // Filter by category
      if (categoryValue !== "all" && showCard) {
        const categoryBadge = card.querySelector(".category-badge")
        const categoryId = categoryBadge ? categoryBadge.dataset.categoryId : null
        if (categoryId !== categoryValue) {
          showCard = false
        }
      }

      // Filter by search term
      if (searchValue && showCard) {
        const title = card.querySelector("h3").textContent.toLowerCase()
        const description = card.querySelector(".task-description").textContent.toLowerCase()
        if (!title.includes(searchValue) && !description.includes(searchValue)) {
          showCard = false
        }
      }

      // Show or hide card
      card.style.display = showCard ? "block" : "none"
    })
  }
})