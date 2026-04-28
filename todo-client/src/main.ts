import './style.css';

// הכתובת הבסיסית של השרת שלך
const baseUrl = "https://my-todo-app-tajo.onrender.com";

const input = document.getElementById('todoInput') as HTMLInputElement;
const btn = document.getElementById('addBtn');
const list = document.getElementById('todoList');

// 1. הצגת משימות (GET ל- /items)
async function fetchItems() {
    const res = await fetch(`${baseUrl}/items`);
    const items = await res.json();
    if (list) {
        list.innerHTML = items.map((item: any) => `
            <li>
                <span class="${item.isComplete ? 'text-done' : ''}">${item.name}</span>
                <div>
                    <button class="status-btn" onclick="toggleComplete(${item.id}, '${item.name}', ${item.isComplete})">
                        ${item.isComplete ? '<span class="done">V</span>' : '<span class="pending">X</span>'}
                    </button>
                    <button class="delete-btn" onclick="deleteItem(${item.id})">מחק</button>
                </div>
            </li>
        `).join('');
    }
}

// 2. הוספת משימה (POST ל- /items)
async function addItem() {
    if (!input || !input.value) return;
    await fetch(`${baseUrl}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input.value, isComplete: false })
    });
    input.value = '';
    fetchItems();
}

// 3. מחיקת משימה (DELETE ל- /items/{id})
(window as any).deleteItem = async (id: number) => {
    await fetch(`${baseUrl}/items/${id}`, { method: 'DELETE' });
    fetchItems();
};

// 4. שינוי סטטוס (PUT ל- /items/{id})
(window as any).toggleComplete = async (id: number, name: string, currentStatus: boolean) => {
    await fetch(`${baseUrl}/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, name: name, isComplete: !currentStatus })
    });
    fetchItems();
};

btn?.addEventListener('click', addItem);
fetchItems();