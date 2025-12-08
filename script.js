// ============= СИСТЕМА ПАРОЛЕЙ =============

// Прямая проверка паролей (без шифрования для простоты)
const VALID_PASSWORDS = {
    // Младшие группы (просмотр)
    'mal1kab747': { type: 'junior', group: 'mal1', access: 'view', role: 'viewer', name: 'Молодша група 1' },
    'mal2kab353': { type: 'junior', group: 'mal2', access: 'view', role: 'viewer', name: 'Молодша група 2' },
    'mal3kab539': { type: 'junior', group: 'mal3', access: 'view', role: 'viewer', name: 'Молодша група 3 (Розвідка)' },
    
    // Младшие группы (редактирование - командиры)
    'mal1kab747_kam': { type: 'junior', group: 'mal1', access: 'edit', role: 'commander', name: 'Молодша група 1' },
    'mal1kab747_zam': { type: 'junior', group: 'mal1', access: 'edit', role: 'deputy', name: 'Молодша група 1' },
    'mal2kab353_kam': { type: 'junior', group: 'mal2', access: 'edit', role: 'commander', name: 'Молодша група 2' },
    'mal2kab353_zam': { type: 'junior', group: 'mal2', access: 'edit', role: 'deputy', name: 'Молодша група 2' },
    'mal3kab539_kam': { type: 'junior', group: 'mal3', access: 'edit', role: 'commander', name: 'Молодша група 3' },
    'mal3kab539_zam': { type: 'junior', group: 'mal3', access: 'edit', role: 'deputy', name: 'Молодша група 3' },
    
    // Старшие группы (просмотр)
    'str1kab023': { type: 'senior', group: 'str1', access: 'view', role: 'viewer', name: 'Старша група 1' },
    'str2kab138': { type: 'senior', group: 'str2', access: 'view', role: 'viewer', name: 'Старша група 2' },
    'str3kab846': { type: 'senior', group: 'str3', access: 'view', role: 'viewer', name: 'Старша група 3 (Розвідка)' },
    
    // Старшие группы (редактирование - командиры)
    'str1kab023_kam': { type: 'senior', group: 'str1', access: 'edit', role: 'commander', name: 'Старша група 1' },
    'str1kab023_zam': { type: 'senior', group: 'str1', access: 'edit', role: 'deputy', name: 'Старша група 1' },
    'str2kab138_kam': { type: 'senior', group: 'str2', access: 'edit', role: 'commander', name: 'Старша група 2' },
    'str2kab138_zam': { type: 'senior', group: 'str2', access: 'edit', role: 'deputy', name: 'Старша група 2' },
    'str3kab846_kam': { type: 'senior', group: 'str3', access: 'edit', role: 'commander', name: 'Старша група 3' },
    'str3kab846_zam': { type: 'senior', group: 'str3', access: 'edit', role: 'deputy', name: 'Старша група 3' },
    
    // Администратор
    'kyk4kab934': { type: 'admin', group: 'all', access: 'admin', role: 'admin', name: 'Адміністратор' },
    
    // Родители (любой пароль начинающийся с Rod5kab)
    'Rod5kab': { type: 'parent', group: 'all', access: 'view', role: 'parent', name: 'Батьки' }
};

function checkPassword(password) {
    password = password.trim();
    
    // 1. Проверка пароля родителей (Rod5kabXXX)
    if (password.startsWith('Rod5kab') && password.length >= 8) {
        return {
            valid: true,
            type: 'parent',
            group: 'all',
            access: 'view',
            role: 'parent',
            displayName: 'Батьки'
        };
    }
    
    // 2. Проверка точного совпадения пароля
    const userData = VALID_PASSWORDS[password];
    if (userData) {
        return {
            valid: true,
            type: userData.type,
            group: userData.group,
            access: userData.access,
            role: userData.role,
            displayName: userData.name
        };
    }
    
    // 3. Пароль не найден
    return { valid: false };
}

// ============= СИСТЕМА ХРАНЕНИЯ ДАННЫХ =============

function initializeDatabase() {
    const defaultDB = {
        version: '3.0',
        lastUpdated: new Date().toISOString(),
        settings: {
            autoCleanup: true,
            cleanupTime: '23:59'
        },
        
        // Группы (изначально пустые)
        groups: {
            mal1: { name: 'Молодша група 1', type: 'junior', members: [], lastUpdated: null },
            mal2: { name: 'Молодша група 2', type: 'junior', members: [], lastUpdated: null },
            mal3: { name: 'Молодша група 3 (Розвідка)', type: 'junior', members: [], lastUpdated: null },
            str1: { name: 'Старша група 1', type: 'senior', members: [], lastUpdated: null },
            str2: { name: 'Старша група 2', type: 'senior', members: [], lastUpdated: null },
            str3: { name: 'Старша група 3 (Розвідка)', type: 'senior', members: [], lastUpdated: null }
        },
        
        // Объявления
        announcements: {
            global: [],
            group: {
                mal1: [],
                mal2: [],
                mal3: [],
                str1: [],
                str2: [],
                str3: []
            }
        },
        
        // Задачи
        tasks: {
            mal1: [],
            mal2: [],
            mal3: [],
            str1: [],
            str2: [],
            str3: []
        },
        
        // Отсутствующие
        absences: [],
        
        // Сообщения
        messages: []
    };
    
    return defaultDB;
}

function loadDatabase() {
    const saved = localStorage.getItem('horting_database');
    if (!saved) {
        return initializeDatabase();
    }
    
    try {
        return JSON.parse(saved);
    } catch (e) {
        console.error('Помилка завантаження даних:', e);
        return initializeDatabase();
    }
}

function saveDatabase() {
    try {
        database.lastUpdated = new Date().toISOString();
        localStorage.setItem('horting_database', JSON.stringify(database));
    } catch (e) {
        console.error('Помилка збереження даних:', e);
    }
}

// ============= ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =============

let currentUser = null;
let database = loadDatabase();

// ============= ФУНКЦИИ ВХОДА/ВЫХОДА =============

function login() {
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;
    const errorElement = document.getElementById('login-error');
    
    // Проверяем пароль
    const userInfo = checkPassword(password);
    
    if (!userInfo.valid) {
        errorElement.classList.remove('hidden');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Вибрация при ошибке
        if (navigator.vibrate) navigator.vibrate(200);
        return;
    }
    
    // Сохраняем данные пользователя
    currentUser = userInfo;
    
    // Очищаем поле пароля и ошибки
    passwordInput.value = '';
    errorElement.classList.add('hidden');
    
    // Переключаем экраны
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');
    
    // Настраиваем интерфейс
    setupInterface();
    
    // Загружаем данные
    loadData();
    
    // Показываем приветствие
    showNotification(`Вітаємо, ${userInfo.displayName}!`);
}

function logout() {
    if (confirm('Ви впевнені, що хочете вийти?')) {
        currentUser = null;
        document.getElementById('main-screen').classList.remove('active');
        document.getElementById('login-screen').classList.add('active');
        document.getElementById('password').focus();
    }
}

// ============= НАСТРОЙКА ИНТЕРФЕЙСА =============

function setupInterface() {
    if (!currentUser) return;
    
    // Устанавливаем название группы
    document.getElementById('current-group').textContent = currentUser.displayName;
    
    // Устанавливаем роль
    const roleElement = document.getElementById('current-role');
    switch(currentUser.role) {
        case 'commander': roleElement.textContent = 'Командир'; break;
        case 'deputy': roleElement.textContent = 'Заступник'; break;
        case 'admin': roleElement.textContent = 'Адміністратор'; break;
        case 'parent': roleElement.textContent = 'Батьки'; break;
        default: roleElement.textContent = 'Переглядач';
    }
    
    // Устанавливаем уровень доступа
    const accessElement = document.getElementById('current-access');
    switch(currentUser.access) {
        case 'edit': accessElement.textContent = 'Редагування'; break;
        case 'admin': accessElement.textContent = 'Повний доступ'; break;
        default: accessElement.textContent = 'Перегляд';
    }
    
    // Показываем/скрываем кнопки
    const canEdit = currentUser.access === 'edit' || currentUser.access === 'admin';
    const isAdmin = currentUser.access === 'admin';
    const isParent = currentUser.type === 'parent';
    
    // Кнопка админа
    document.getElementById('admin-btn').classList.toggle('hidden', !isAdmin);
    
    // Кнопки редактирования
    document.getElementById('edit-members-btn').classList.toggle('hidden', !canEdit);
    document.getElementById('add-announcement-btn').classList.toggle('hidden', !canEdit);
    document.getElementById('add-task-btn').classList.toggle('hidden', !canEdit);
    
    // Для родителей
    if (isParent) {
        document.querySelector('.members-section').classList.add('hidden');
        document.querySelector('.tasks-section').classList.add('hidden');
        document.querySelector('.absence-section').classList.add('hidden');
        document.getElementById('absence-btn').classList.add('hidden');
        document.getElementById('message-btn').classList.add('hidden');
        document.getElementById('add-announcement-btn').classList.add('hidden');
    }
}

// ============= ЗАГРУЗКА ДАННЫХ =============

function loadData() {
    if (!currentUser) return;
    
    if (currentUser.type === 'parent') {
        loadAnnouncements();
        return;
    }
    
    if (currentUser.access === 'admin') {
        loadAllData();
    } else {
        loadGroupData(currentUser.group);
    }
}

function loadGroupData(groupId) {
    // Участники
    const group = database.groups[groupId];
    if (group) {
        loadMembers(group.members);
        document.getElementById('members-count').textContent = group.members.length;
        document.getElementById('members-updated').textContent = 
            group.lastUpdated ? formatDate(group.lastUpdated) : 'Немає даних';
    }
    
    // Объявления
    loadAnnouncements();
    
    // Задачи
    loadTasks();
    
    // Отсутствующие
    loadAbsences();
}

function loadAllData() {
    const firstGroup = Object.keys(database.groups)[0];
    loadGroupData(firstGroup);
}

function loadMembers(members) {
    const container = document.getElementById('members-list');
    container.innerHTML = '';
    
    if (members.length === 0) {
        container.innerHTML = '<tr><td colspan="4" class="empty-message">Немає учасників</td></tr>';
        return;
    }
    
    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${member.callsign}</strong></td>
            <td>${member.name}</td>
            <td>${member.role}</td>
            <td>${member.rank}</td>
        `;
        container.appendChild(row);
    });
}

function loadAnnouncements() {
    const container = document.getElementById('announcements-list');
    container.innerHTML = '';
    
    let announcements = [];
    
    if (currentUser.type === 'parent') {
        // Для родителей только глобальные объявления
        announcements = database.announcements.global || [];
    } else if (currentUser.group && currentUser.group !== 'all') {
        // Для групп: глобальные + групповые
        const global = database.announcements.global || [];
        const groupAnn = database.announcements.group[currentUser.group] || [];
        announcements = [...global, ...groupAnn];
    } else {
        // Для админа все глобальные
        announcements = database.announcements.global || [];
    }
    
    // Сортируем по дате
    announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    if (announcements.length === 0) {
        container.innerHTML = '<div class="empty-message">Немає оголошень</div>';
        document.getElementById('announcements-updated').textContent = 'Немає даних';
        return;
    }
    
    announcements.forEach((announcement) => {
        const item = document.createElement('div');
        item.className = `announcement-item priority-${announcement.priority}`;
        
        const isExpired = announcement.expiryDate && new Date(announcement.expiryDate + 'T23:59') < new Date();
        if (isExpired) {
            item.style.opacity = '0.6';
        }
        
        item.innerHTML = `
            <div class="announcement-content">
                <div class="announcement-text">
                    <div>${announcement.text}</div>
                    <div class="announcement-meta">
                        <span><i class="fas fa-calendar"></i> ${formatDate(announcement.createdAt)}</span>
                        ${announcement.expiryDate ? 
                            `<span><i class="fas fa-clock"></i> До: ${announcement.expiryDate}</span>` : ''}
                        ${announcement.type === 'group' ? 
                            `<span><i class="fas fa-users"></i> Тільки для групи</span>` : 
                            `<span><i class="fas fa-globe"></i> Загальне</span>`}
                    </div>
                </div>
                ${(currentUser.access === 'edit' || currentUser.access === 'admin') && !isExpired ? `
                    <div class="announcement-actions">
                        <button class="btn-delete" onclick="deleteAnnouncement('${announcement.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        container.appendChild(item);
    });
    
    if (announcements.length > 0) {
        document.getElementById('announcements-updated').textContent = formatDate(announcements[0].createdAt);
    }
}

function loadTasks() {
    const container = document.getElementById('tasks-list');
    container.innerHTML = '';
    
    const tasks = database.tasks[currentUser.group] || [];
    
    // Сортируем по приоритету
    tasks.sort((a, b) => {
        const priorityOrder = { high: 0, normal: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    if (tasks.length === 0) {
        container.innerHTML = '<div class="empty-message">Немає завдань</div>';
        document.getElementById('tasks-updated').textContent = 'Немає даних';
        return;
    }
    
    tasks.forEach((task, index) => {
        const item = document.createElement('div');
        item.className = `task-item priority-${task.priority}`;
        
        const isOverdue = task.deadline && new Date(task.deadline) < new Date();
        if (isOverdue) {
            item.style.borderLeftColor = '#e74c3c';
        }
        
        item.innerHTML = `
            <div class="task-content">
                <div class="task-text">
                    <div>${task.text}</div>
                    <div class="task-meta">
                        <span><i class="fas fa-calendar"></i> ${formatDate(task.createdAt)}</span>
                        ${task.deadline ? 
                            `<span><i class="fas fa-hourglass-end"></i> Термін: ${task.deadline}</span>` : ''}
                        ${task.expiryDate ? 
                            `<span><i class="fas fa-clock"></i> Видалення: ${task.expiryDate}</span>` : ''}
                    </div>
                </div>
                ${(currentUser.access === 'edit' || currentUser.access === 'admin') ? `
                    <div class="task-actions">
                        <button class="btn-delete" onclick="deleteTask(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        container.appendChild(item);
    });
    
    if (tasks.length > 0) {
        document.getElementById('tasks-updated').textContent = formatDate(tasks[0].createdAt);
    }
}

function loadAbsences() {
    const container = document.getElementById('absence-list');
    container.innerHTML = '';
    
    const today = new Date().toISOString().split('T')[0];
    const relevantAbsences = database.absences.filter(absence => 
        absence.date >= today && 
        (currentUser.access === 'admin' || absence.group === currentUser.group)
    );
    
    if (relevantAbsences.length === 0) {
        container.innerHTML = '<div class="empty-message">Всі присутні</div>';
        return;
    }
    
    relevantAbsences.forEach(absence => {
        const item = document.createElement('div');
        item.className = 'absence-item';
        item.innerHTML = `
            <div class="absence-info">
                <div class="absence-details">
                    <div><strong>${absence.callsign}</strong> (${absence.name})</div>
                    <div class="absence-date">${absence.day}, ${absence.date}</div>
                    ${absence.reason ? `<div class="absence-reason">${absence.reason}</div>` : ''}
                </div>
                ${(currentUser.access === 'edit' || currentUser.access === 'admin') ? `
                    <button class="btn-delete" onclick="deleteAbsence('${absence.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </div>
        `;
        container.appendChild(item);
    });
}

// ============= УПРАВЛЕНИЕ УЧАСТНИКАМИ =============

let editMembersCache = [];

function toggleEditMembers() {
    const view = document.getElementById('members-view');
    const edit = document.getElementById('members-edit');
    
    if (edit.classList.contains('hidden')) {
        view.classList.add('hidden');
        edit.classList.remove('hidden');
        loadEditMembers();
    } else {
        view.classList.remove('hidden');
        edit.classList.add('hidden');
        editMembersCache = [];
    }
}

function loadEditMembers() {
    const container = document.getElementById('members-edit-list');
    container.innerHTML = '';
    editMembersCache = [];
    
    const group = database.groups[currentUser.group];
    const members = group ? group.members : [];
    
    if (members.length === 0) {
        addMemberRow();
    } else {
        members.forEach(member => {
            addMemberRow(member);
        });
    }
}

function addMemberRow(member = null) {
    const container = document.getElementById('members-edit-list');
    const index = editMembersCache.length;
    
    const row = document.createElement('div');
    row.className = 'member-edit-row';
    
    if (member) {
        editMembersCache[index] = { ...member };
    } else {
        editMembersCache[index] = { callsign: '', name: '', role: '', rank: '' };
    }
    
    row.innerHTML = `
        <input type="text" placeholder="Позивний" value="${editMembersCache[index].callsign}" 
               oninput="updateMemberField(${index}, 'callsign', this.value)">
        <input type="text" placeholder="Ім'я" value="${editMembersCache[index].name}"
               oninput="updateMemberField(${index}, 'name', this.value)">
        <input type="text" placeholder="Роль" value="${editMembersCache[index].role}"
               oninput="updateMemberField(${index}, 'role', this.value)">
        <input type="text" placeholder="Звання" value="${editMembersCache[index].rank}"
               oninput="updateMemberField(${index}, 'rank', this.value)">
        <button class="btn-delete" onclick="removeMemberRow(${index})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(row);
}

function updateMemberField(index, field, value) {
    if (editMembersCache[index]) {
        editMembersCache[index][field] = value.trim();
    }
}

function removeMemberRow(index) {
    if (editMembersCache.length > 1) {
        editMembersCache.splice(index, 1);
        reloadEditMembers();
    }
}

function reloadEditMembers() {
    const container = document.getElementById('members-edit-list');
    container.innerHTML = '';
    
    editMembersCache.forEach((member, index) => {
        const row = document.createElement('div');
        row.className = 'member-edit-row';
        row.innerHTML = `
            <input type="text" placeholder="Позивний" value="${member.callsign}" 
                   oninput="updateMemberField(${index}, 'callsign', this.value)">
            <input type="text" placeholder="Ім'я" value="${member.name}"
                   oninput="updateMemberField(${index}, 'name', this.value)">
            <input type="text" placeholder="Роль" value="${member.role}"
                   oninput="updateMemberField(${index}, 'role', this.value)">
            <input type="text" placeholder="Звання" value="${member.rank}"
                   oninput="updateMemberField(${index}, 'rank', this.value)">
            <button class="btn-delete" onclick="removeMemberRow(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(row);
    });
}

function saveMembers() {
    // Фильтруем пустые записи
    const members = editMembersCache.filter(member => 
        member.callsign && member.name && member.role && member.rank
    );
    
    // Сохраняем
    database.groups[currentUser.group].members = members;
    database.groups[currentUser.group].lastUpdated = new Date().toISOString();
    saveDatabase();
    
    // Обновляем интерфейс
    loadMembers(members);
    toggleEditMembers();
    
    document.getElementById('members-count').textContent = members.length;
    document.getElementById('members-updated').textContent = formatDate(new Date());
    
    showNotification('Склад групи збережено!');
}

// ============= УПРАВЛЕНИЕ ОБЪЯВЛЕНИЯМИ =============

function showAddAnnouncementModal() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('announcement-expiry').min = today;
    document.getElementById('announcement-modal').classList.remove('hidden');
}

function hideAnnouncementModal() {
    document.getElementById('announcement-modal').classList.add('hidden');
    document.getElementById('announcement-text').value = '';
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function addAnnouncement() {
    const text = document.getElementById('announcement-text').value.trim();
    if (!text) {
        alert('Введіть текст оголошення');
        return;
    }
    
    const announcement = {
        id: generateId(),
        text: text,
        priority: document.getElementById('announcement-priority').value,
        type: document.getElementById('announcement-type').value,
        expiryDate: document.getElementById('announcement-expiry').value || null,
        createdAt: new Date().toISOString(),
        createdBy: currentUser.group
    };
    
    // Сохраняем
    if (announcement.type === 'global') {
        database.announcements.global.push(announcement);
    } else {
        database.announcements.group[currentUser.group].push(announcement);
    }
    
    saveDatabase();
    hideAnnouncementModal();
    loadAnnouncements();
    showNotification('Оголошення додано!');
}

function deleteAnnouncement(announcementId) {
    if (!confirm('Видалити це оголошення?')) return;
    
    // Ищем везде
    let found = false;
    
    // В глобальных
    const globalIndex = database.announcements.global.findIndex(a => a.id === announcementId);
    if (globalIndex !== -1) {
        database.announcements.global.splice(globalIndex, 1);
        found = true;
    }
    
    // В групповых
    if (!found) {
        for (const group in database.announcements.group) {
            const index = database.announcements.group[group].findIndex(a => a.id === announcementId);
            if (index !== -1) {
                database.announcements.group[group].splice(index, 1);
                found = true;
                break;
            }
        }
    }
    
    if (found) {
        saveDatabase();
        loadAnnouncements();
        showNotification('Оголошення видалено');
    }
}

// ============= УПРАВЛЕНИЕ ЗАДАЧАМИ =============

function showAddTaskModal() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('task-deadline').min = today;
    document.getElementById('task-expiry').min = today;
    document.getElementById('task-modal').classList.remove('hidden');
}

function hideTaskModal() {
    document.getElementById('task-modal').classList.add('hidden');
    document.getElementById('task-text').value = '';
}

function addTask() {
    const text = document.getElementById('task-text').value.trim();
    if (!text) {
        alert('Введіть текст завдання');
        return;
    }
    
    const task = {
        text: text,
        priority: document.getElementById('task-priority').value,
        deadline: document.getElementById('task-deadline').value || null,
        expiryDate: document.getElementById('task-expiry').value || null,
        createdAt: new Date().toISOString()
    };
    
    database.tasks[currentUser.group].push(task);
    saveDatabase();
    hideTaskModal();
    loadTasks();
    showNotification('Завдання додано!');
}

function deleteTask(index) {
    if (!confirm('Видалити це завдання?')) return;
    
    database.tasks[currentUser.group].splice(index, 1);
    saveDatabase();
    loadTasks();
    showNotification('Завдання видалено');
}

// ============= ОТСУТСТВИЕ =============

function showAbsenceModal() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('absence-date').min = today;
    document.getElementById('absence-modal').classList.remove('hidden');
}

function hideAbsenceModal() {
    document.getElementById('absence-modal').classList.add('hidden');
    document.getElementById('absence-callsign').value = '';
    document.getElementById('absence-name').value = '';
    document.getElementById('absence-reason').value = '';
}

function submitAbsence() {
    const callsign = document.getElementById('absence-callsign').value.trim();
    const name = document.getElementById('absence-name').value.trim();
    const date = document.getElementById('absence-date').value;
    
    if (!callsign || !name || !date) {
        alert('Заповніть обов\'язкові поля');
        return;
    }
    
    const absence = {
        id: generateId(),
        callsign: callsign,
        name: name,
        day: document.getElementById('absence-day').value,
        date: date,
        reason: document.getElementById('absence-reason').value.trim(),
        group: currentUser.group,
        createdAt: new Date().toISOString()
    };
    
    database.absences.push(absence);
    saveDatabase();
    hideAbsenceModal();
    loadAbsences();
    showNotification('Повідомлення надіслано!');
}

function deleteAbsence(absenceId) {
    if (!confirm('Видалити це повідомлення?')) return;
    
    const index = database.absences.findIndex(a => a.id === absenceId);
    if (index !== -1) {
        database.absences.splice(index, 1);
        saveDatabase();
        loadAbsences();
        showNotification('Повідомлення видалено');
    }
}

// ============= СООБЩЕНИЯ =============

function showMessageModal() {
    document.getElementById('message-modal').classList.remove('hidden');
}

function hideMessageModal() {
    document.getElementById('message-modal').classList.add('hidden');
    document.getElementById('message-subject').value = '';
    document.getElementById('message-text').value = '';
    document.getElementById('message-from').value = '';
}

function sendMessage() {
    const subject = document.getElementById('message-subject').value.trim();
    const text = document.getElementById('message-text').value.trim();
    const from = document.getElementById('message-from').value.trim();
    
    if (!subject || !text || !from) {
        alert('Заповніть всі поля');
        return;
    }
    
    const message = {
        id: generateId(),
        to: document.getElementById('message-to').value,
        subject: subject,
        text: text,
        from: from,
        group: currentUser.group,
        createdAt: new Date().toISOString(),
        read: false
    };
    
    database.messages.push(message);
    saveDatabase();
    hideMessageModal();
    showNotification('Повідомлення надіслано!');
}

// ============= АДМИН-ПАНЕЛЬ =============

function showAdminPanel() {
    if (currentUser.access !== 'admin') return;
    
    document.getElementById('admin-panel').classList.remove('hidden');
    loadAdminData();
}

function hideAdminPanel() {
    document.getElementById('admin-panel').classList.add('hidden');
}

function showAdminTab(tabName) {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.add('hidden');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`admin-${tabName}`).classList.remove('hidden');
    event.target.classList.add('active');
}

function loadAdminData() {
    loadAllGroups();
    loadMessages();
    loadSettings();
    updateBackupInfo();
}

function loadAllGroups() {
    const container = document.getElementById('all-groups-container');
    container.innerHTML = '';
    
    for (const [groupId, group] of Object.entries(database.groups)) {
        const card = document.createElement('div');
        card.className = 'group-card';
        card.innerHTML = `
            <h5><i class="fas fa-${group.type === 'junior' ? 'user-graduate' : 'user-tie'}"></i> ${group.name}</h5>
            <div class="group-members">
                ${group.members.map(member => `
                    <div class="group-member">
                        <span><strong>${member.callsign}</strong> - ${member.name}</span>
                        <span>${member.role}</span>
                    </div>
                `).join('')}
                ${group.members.length === 0 ? 
                    '<div class="empty-message">Немає учасників</div>' : ''}
            </div>
            <div class="group-stats">
                <div class="stat">
                    <div class="stat-value">${group.members.length}</div>
                    <div class="stat-label">Учасників</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${database.announcements.group[groupId]?.length || 0}</div>
                    <div class="stat-label">Оголошень</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${database.tasks[groupId]?.length || 0}</div>
                    <div class="stat-label">Завдань</div>
                </div>
            </div>
            <button onclick="manageGroup('${groupId}')" class="btn-primary" style="margin-top: 15px; width: 100%;">
                <i class="fas fa-edit"></i> Керувати групою
            </button>
        `;
        container.appendChild(card);
    }
}

function manageGroup(groupId) {
    currentUser.group = groupId;
    hideAdminPanel();
    loadGroupData(groupId);
    showNotification(`Переключено на групу: ${database.groups[groupId].name}`);
}

function loadMessages() {
    const container = document.getElementById('messages-container');
    container.innerHTML = '';
    
    const messages = database.messages || [];
    
    if (messages.length === 0) {
        container.innerHTML = '<div class="empty-message">Немає повідомлень</div>';
        return;
    }
    
    messages.forEach(message => {
        const item = document.createElement('div');
        item.className = 'message-item';
        if (!message.read) {
            item.style.background = 'rgba(52, 152, 219, 0.1)';
        }
        
        item.innerHTML = `
            <div class="message-header">
                <div class="message-from">
                    <i class="fas fa-user"></i> ${message.from}
                    <small>(${message.group}) → ${message.to === 'admin' ? 'Адміністратору' : 'Командиру'}</small>
                </div>
                <div class="message-time">${formatDate(message.createdAt)}</div>
            </div>
            <div class="message-subject">${message.subject}</div>
            <div class="message-body">${message.text}</div>
            <div style="margin-top: 10px;">
                <button onclick="markMessageRead('${message.id}')" class="btn-secondary" style="padding: 5px 10px; font-size: 0.9rem;">
                    <i class="fas fa-check"></i> Позначити як прочитане
                </button>
                <button onclick="deleteMessage('${message.id}')" class="btn-delete" style="margin-left: 10px;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

function markMessageRead(messageId) {
    const message = database.messages.find(msg => msg.id === messageId);
    if (message) {
        message.read = true;
        saveDatabase();
        loadMessages();
    }
}

function deleteMessage(messageId) {
    if (!confirm('Видалити це повідомлення?')) return;
    
    const index = database.messages.findIndex(msg => msg.id === messageId);
    if (index !== -1) {
        database.messages.splice(index, 1);
        saveDatabase();
        loadMessages();
        showNotification('Повідомлення видалено');
    }
}

function loadSettings() {
    document.getElementById('auto-cleanup').value = database.settings.autoCleanup ? 'enabled' : 'disabled';
    document.getElementById('cleanup-time').value = database.settings.cleanupTime || '23:59';
}

function saveSettings() {
    database.settings.autoCleanup = document.getElementById('auto-cleanup').value === 'enabled';
    database.settings.cleanupTime = document.getElementById('cleanup-time').value;
    saveDatabase();
    showNotification('Налаштування збережено!');
}

function exportData() {
    const dataStr = JSON.stringify(database, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = `horting_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    localStorage.setItem('last_backup', new Date().toISOString());
    updateBackupInfo();
    showNotification('Дані експортовано!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const importedData = JSON.parse(event.target.result);
                
                if (confirm('Це перезапише всі дані. Продовжити?')) {
                    database = importedData;
                    saveDatabase();
                    showNotification('Дані імпортовано!');
                    setTimeout(() => location.reload(), 1000);
                }
            } catch (error) {
                alert('Помилка при читанні файлу');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function resetData() {
    if (confirm('Видалити всі дані?')) {
        localStorage.removeItem('horting_database');
        database = initializeDatabase();
        saveDatabase();
        showNotification('Дані скинуті!');
        setTimeout(() => location.reload(), 1000);
    }
}

function updateBackupInfo() {
    const lastBackup = localStorage.getItem('last_backup');
    document.getElementById('last-backup').textContent = 
        lastBackup ? formatDate(lastBackup) : 'Немає';
    
    const dataSize = JSON.stringify(database).length;
    document.getElementById('data-size').textContent = 
        Math.round(dataSize / 1024) + ' KB';
}

// ============= АВТООЧИСТКА =============

function checkAutoCleanup() {
    if (!database.settings.autoCleanup) return;
    
    const now = new Date();
    const [hours, minutes] = (database.settings.cleanupTime || '23:59').split(':').map(Number);
    const cleanupTime = new Date();
    cleanupTime.setHours(hours, minutes, 0, 0);
    
    if (now.getHours() === cleanupTime.getHours() && 
        now.getMinutes() === cleanupTime.getMinutes()) {
        performCleanup();
    }
}

function performCleanup() {
    const today = new Date().toISOString().split('T')[0];
    let cleaned = 0;
    
    // Отсутствия
    const oldAbsences = database.absences.length;
    database.absences = database.absences.filter(a => a.date >= today);
    cleaned += (oldAbsences - database.absences.length);
    
    // Объявления
    database.announcements.global = database.announcements.global.filter(a => 
        !a.expiryDate || new Date(a.expiryDate + 'T23:59') >= new Date()
    );
    
    for (const group in database.announcements.group) {
        database.announcements.group[group] = database.announcements.group[group].filter(a => 
            !a.expiryDate || new Date(a.expiryDate + 'T23:59') >= new Date()
        );
    }
    
    // Задачи
    for (const group in database.tasks) {
        database.tasks[group] = database.tasks[group].filter(t => 
            !t.expiryDate || new Date(t.expiryDate + 'T23:59') >= new Date()
        );
    }
    
    if (cleaned > 0) {
        saveDatabase();
        if (currentUser) {
            loadAnnouncements();
            loadTasks();
            loadAbsences();
        }
    }
}

// ============= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =============

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        return dateString;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .empty-message {
        text-align: center;
        padding: 40px 20px;
        color: #95a5a6;
        font-style: italic;
    }
`;
document.head.appendChild(style);

// ============= ИНИЦИАЛИЗАЦИЯ =============

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('password').focus();
    
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });
    
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
        }
    });
    
    // Запускаем автоочистку каждую минуту
    setInterval(checkAutoCleanup, 60000);
});