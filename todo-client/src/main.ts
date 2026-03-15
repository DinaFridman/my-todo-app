import './style.css';

const apiUrl = "http://localhost:5102/items";

const input = document.getElementById('todoInput') as HTMLInputElement;
const btn = document.getElementById('addBtn');
const list = document.getElementById('todoList');

// 1. פונקציה שמציגה את המשימות עם ה-V וה-X
async function fetchItems() {
    const res = await fetch(apiUrl);
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

// 2. פונקציה להוספת משימה
async function addItem() {
    if (!input || !input.value) return;
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input.value, isComplete: false })
    });
    input.value = '';
    fetchItems();
}

// 3. פונקציה למחיקת משימה
(window as any).deleteItem = async (id: number) => {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchItems();
};

// 4. פונקציה לשינוי סטטוס (V/X)
(window as any).toggleComplete = async (id: number, name: string, currentStatus: boolean) => {
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, name: name, isComplete: !currentStatus })
    });
    fetchItems();
};

btn?.addEventListener('click', addItem);
fetchItems();