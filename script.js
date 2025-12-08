// ============= КОНФИГУРАЦИЯ ПАРОЛЕЙ И ГРУПП =============

// Зашифрованные пароли (реальные пароли защищены)
const PASSWORD_CONFIG = {
    // Младшие группы (mal = младшие)
    'mal1_view': { hash: 'a1b2c3d4e5', group: 'mal1', access: 'view', name: 'Молодша група 1' },
    'mal2_view': { hash: 'f6g7h8i9j0', group: 'mal2', access: 'view', name: 'Молодша група 2' },
    'mal3_view': { hash: 'k1l2m3n4o5', group: 'mal3', access: 'view', name: 'Молодша група 3 (Розвідка)' },
    
    // Младшие группы - командиры и заместители
    'mal1_kam': { hash: 'p6q7r8s9t0', group: 'mal1', access: 'edit', role: 'kam', name: 'Молодша група 1' },
    'mal1_zam': { hash: 'u1v2w3x4y5', group: 'mal1', access: 'edit', role: 'zam', name: 'Молодша група 1' },
    'mal2_kam': { hash: 'z6a7b8c9d0', group: 'mal2', access: 'edit', role: 'kam', name: 'Молодша група 2' },
    'mal2_zam': { hash: 'e1f2g3h4i5', group: 'mal2', access: 'edit', role: 'zam', name: 'Молодша група 2' },
    'mal3_kam': { hash: 'j6k7l8m9n0', group: 'mal3', access: 'edit', role: 'kam', name: 'Молодша група 3' },
    'mal3_zam': { hash: 'o1p2q3r4s5', group: 'mal3', access: 'edit', role: 'zam', name: 'Молодша група 3' },
    
    // Старшие группы (str = старшие)
    'str1_view': { hash: 't6u7v8w9x0', group: 'str1', access: 'view', name: 'Старша група 1' },
    'str2_view': { hash: 'y1z2a3b4c5', group: 'str2', access: 'view', name: 'Старша група 2' },
    'str3_view': { hash: 'd6e7f8g9h0', group: 'str3', access: 'view', name: 'Старша група 3 (Розвідка)' },
    
    // Старшие группы - командиры и заместители
    'str1_kam': { hash: 'i1j2k3l4m5', group: 'str1', access: 'edit', role: 'kam', name: 'Старша група 1' },
    'str1_zam': { hash: 'n6o7p8q9r0', group: 'str1', access: 'edit', role: 'zam', name: 'Старша група 1' },
    'str2_kam': { hash: 's1t2u3v4w5', group: 'str2', access: 'edit', role: 'kam', name: 'Старша група 2' },
    'str2_zam': { hash: 'x6y7z8a9b0', group: 'str2', access: 'edit', role: 'zam', name: 'Старша група 2' },
    'str3_kam': { hash: 'c1d2e3f4g5', group: 'str3', access: 'edit', role: 'kam', name: 'Старша група 3' },
    'str3_zam': { hash: 'h6i7j8k9l0', group: 'str3', access: 'edit', role: 'zam', name: 'Старша група 3' },
    
    // Администратор
    'admin_full': { hash: 'm1n2o3p4q5', access: 'admin', name: 'Адміністратор' },
    
    // Родители (родительский доступ к просмотру объявлений)
    'parents_view': { hash: 'r6s7t8u9v0', access: 'parents', name: 'Батьки' }
};

// Функция для создания хэша пароля (упрощенная версия)
function hashPassword(password) {
    // В реальном проекте здесь должно быть настоящее шифрование
    // Это упрощенная демо-версия
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = ((hash << 5) - hash) + password.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(10, '0');
}

// Проверка пароля
function checkPasswordAccess(inputPassword) {
    const inputHash = hashPassword(inputPassword);
    
    // Проверяем все конфигурации паролей
    for (const [key, config] of Object.entries(PASSWORD_CONFIG)) {
        if (config.hash === inputHash) {
            return {
                access: true,
                group: config.group,
                accessLevel: config.access,
                role: config.role || 'viewer',
                name: config.name,
                configKey: key
            };
        }
    }
    
    // Проверяем родительский доступ (специальная логика для Rod5kabXXX)
    if (inputPassword.startsWith('Rod5kab')) {
        return {
            access: true,
            accessLevel: 'parents',
            role: 'parent',
            name: 'Батьки',
            configKey: 'parents_view'
        };
    }
    
    return { access: false };
}

// ============= СИСТЕМА ХРАНЕНИЯ ДАННЫХ =============

// Инициализация базы данных
function initializeDatabase() {
    if (!localStorage.getItem('horting_database')) {
        const defaultDB = {
            version: '2.0',
            lastUpdated: new Date().toISOString(),
            
            // Младшие группы
            mal1: {
                name: "Молодша група 1",
                type: "junior",
                members: [
                    { позывной: "ВОВК", имя: "Іван Петренко", роль: "Командир", звание: "Молодший сержант" },
                    { позывной: "СОКОЛ", имя: "Олексій Шевченко", роль: "Зам. командира", звание: "Єфрейтор" },
                    { позывной: "РИСЬ", имя: "Максим Бондаренко", роль: "Стрілець", звание: "Рядовий" }
                ],
                tasks: [
                    "Вивчити вірш 'Заповіт'",
                    "Підготувати спорядження до суботи",
                    "Тренування з шифрування"
                ],
                lastUpdated: {
                    members: new Date().toISOString(),
                    tasks: new Date().toISOString()
                }
            },
            
            mal2: {
                name: "Молодша група 2",
                type: "junior",
                members: [
                    { позывной: "БАРС", имя: "Андрій Мельник", роль: "Командир", звание: "Молодший сержант" },
                    { позывной: "ОРЕЛ", імя: "Сергій Кравченко", роль: "Стрілець", звание: "Рядовий" }
                ],
                tasks: [
                    "Тренування з топографії",
                    "Підготувати звіт про стрільби"
                ],
                lastUpdated: {
                    members: new Date().toISOString(),
                    tasks: new Date().toISOString()
                }
            },
            
            mal3: {
                name: "Молодша група 3 (Розвідка)",
                type: "junior",
                members: [
                    { позывной: "ТІНЬ", імя: "Михайло Лисенко", роль: "Командир розвідки", звание: "Сержант" },
                    { позывной: "ПРИВИД", імя: "Віталій Гриценко", роль: "Спстер", звание: "Молодший сержант" }
                ],
                tasks: [
                    "Зняти кроки місцевості",
                    "Зашифрувати повідомлення"
                ],
                lastUpdated: {
                    members: new Date().toISOString(),
                    tasks: new Date().toISOString()
                }
            },
            
            // Старшие группы
            str1: {
                name: "Старша група 1",
                type: "senior",
                members: [
                    { позывной: "ВОЛК", імя: "Дмитро Коваленко", роль: "Командир", звание: "Старший сержант" },
                    { позывной: "МЕДВЕДЬ", імя: "Артем Ткаченко", роль: "Снайпер", звание: "Сержант" }
                ],
                tasks: [
                    "Підготовка до змагань",
                    "Тренування з тактики"
                ],
                lastUpdated: {
                    members: new Date().toISOString(),
                    tasks: new Date().toISOString()
                }
            },
            
            str2: {
                name: "Старша група 2",
                type: "senior",
                members: [
                    { позывной: "ТИГР", імя: "Роман Шевчук", роль: "Командир", звание: "Старший сержант" },
                    { позывной: "ЯГУАР", імя: "Олег Терещенко", роль: "Кулеметник", звание: "Сержант" }
                ],
                tasks: [
                    "Ремонт спорядження",
                    "Заняття з першої допомоги"
                ],
                lastUpdated: {
                    members: new Date().toISOString(),
                    tasks: new Date().toISOString()
                }
            },
            
            str3: {
                name: "Старша група 3 (Розвідка)",
                type: "senior",
                members: [
                    { позывной: "ФЕНІКС", імя: "Богдан Мартиненко", роль: "Керівник розвідки", звание: "Старший сержант" },
                    { позывной: "ХОВАНКА", імя: "Володимир Павленко", роль: "Радіоперехоплення", звание: "Сержант" }
                ],
                tasks: [
                    "Спецзавдання",
                    "Підготувати звіт розвідки"
                ],
                lastUpdated: {
                    members: new Date().toISOString(),
                    tasks: new Date().toISOString()
                }
            },
            
            // Общие объявления (доступны всем)
            announcements: {
                list: [
                    "Загальний збір усіх груп 15 січня о 10:00",
                    "Не забувайте форму та спорядження",
                    "Тренування у суботу о 09:00",
                    "Готуємося до змагань 'Патріот-2025'"
                ],
                lastUpdated: new Date().toISOString(),
                createdBy: "system"
            }
        };
        
        localStorage.setItem('horting_database', JSON.stringify(defaultDB));
    }
    
    return JSON.parse(localStorage.getItem('horting_database'));
}

// Глобальные переменные
let currentUser = null;
let database = initializeDatabase();

// ============= ОСНОВНЫЕ ФУНКЦИИ =============

function checkPassword() {
    const passwordInput = document.getElementById('password-input');
    const errorElement = document.getElementById('error-message');
    const password = passwordInput.value.trim();
    
    // Очищаем ошибки
    errorElement.style.display = 'none';
    errorElement.textContent = '';
    
    if (!password) {
        showError('Будь ласка, введіть пароль');
        return;
    }
    
    // Проверяем доступ
    const accessInfo = checkPasswordAccess(password);
    
    if (!accessInfo.access) {
        showError('Невірний пароль. Спробуйте ще раз.');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Вибрация при ошибке
        if (navigator.vibrate) navigator.vibrate(200);
        return;
    }
    
    // Сохраняем информацию о пользователе
    currentUser = accessInfo;
    
    // Прячем экран входа
    document.getElementById('login-screen').classList.add('hidden');
    
    // Настраиваем интерфейс в зависимости от доступа
    setupInterfaceForUser();
    
    // Показываем основной контент
    document.getElementById('main-content').classList.remove('hidden');
    
    // Загружаем данные
    loadDataForUser();
    
    // Очищаем поле пароля
    passwordInput.value = '';
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.classList.remove('pulse');
    setTimeout(() => errorElement.classList.add('pulse'), 10);
}

function setupInterfaceForUser() {
    const teamName = document.getElementById('team-name');
    const accessLevel = document.getElementById('user-access-level');
    const userRole = document.getElementById('user-role');
    const adminBtn = document.getElementById('admin-btn');
    
    // Устанавливаем название группы/доступа
    teamName.textContent = currentUser.name;
    
    // Устанавливаем уровень доступа
    let accessText = '';
    let roleText = '';
    
    switch(currentUser.accessLevel) {
        case 'view':
            accessText = 'Перегляд';
            roleText = 'Переглядач';
            break;
        case 'edit':
            accessText = 'Редагування';
            roleText = currentUser.role === 'kam' ? 'Командир' : 'Заступник';
            break;
        case 'admin':
            accessText = 'Адміністратор';
            roleText = 'Повний доступ';
            break;
        case 'parents':
            accessText = 'Батьки';
            roleText = 'Перегляд оголошень';
            break;
    }
    
    // Устанавливаем цвет бейджа в зависимости от уровня доступа
    accessLevel.textContent = accessText;
    accessLevel.className = 'access-badge-small';
    
    if (currentUser.accessLevel === 'admin') {
        accessLevel.style.background = 'linear-gradient(90deg, #FF9800, #FF5722)';
        accessLevel.style.color = 'white';
    } else if (currentUser.accessLevel === 'edit') {
        accessLevel.style.background = 'linear-gradient(90deg, #2196F3, #1976D2)';
        accessLevel.style.color = 'white';
    } else if (currentUser.accessLevel === 'parents') {
        accessLevel.style.background = 'linear-gradient(90deg, #9C27B0, #7B1FA2)';
        accessLevel.style.color = 'white';
    } else {
        accessLevel.style.background = 'linear-gradient(90deg, #4CAF50, #2E7D32)';
        accessLevel.style.color = 'white';
    }
    
    // Устанавливаем роль
    userRole.textContent = roleText;
    
    // Показываем/скрываем кнопку админ-панели
    adminBtn.classList.toggle('hidden', currentUser.accessLevel !== 'admin');
    
    // Настраиваем кнопки редактирования
    const canEdit = currentUser.accessLevel === 'edit' || currentUser.accessLevel === 'admin';
    const isParent = currentUser.accessLevel === 'parents';
    
    // Для родителей показываем только объявления
    if (isParent) {
        document.querySelector('.members-card').classList.add('hidden');
        document.querySelector('.tasks-card').classList.add('hidden');
        document.querySelector('.announcements-card').style.gridColumn = '1 / -1';
    } else {
        document.querySelector('.members-card').classList.remove('hidden');
        document.querySelector('.tasks-card').classList.remove('hidden');
        document.querySelector('.announcements-card').style.gridColumn = '';
    }
    
    // Кнопки редактирования
    document.getElementById('edit-members-btn').classList.toggle('hidden', !canEdit);
    document.getElementById('edit-announcements-btn').classList.toggle('hidden', !canEdit);
    document.getElementById('edit-tasks-btn').classList.toggle('hidden', !canEdit);
    
    // Для администратора - кнопка редактирования объявлений всегда видна
    if (currentUser.accessLevel === 'admin') {
        document.getElementById('edit-announcements-btn').classList.remove('hidden');
    }
}

function loadDataForUser() {
    if (!currentUser) return;
    
    const isParent = currentUser.accessLevel === 'parents';
    const isAdmin = currentUser.accessLevel === 'admin';
    
    // Загружаем общие объявления для всех
    loadAnnouncements();
    
    if (isParent) {
        // Для родителей только объявления
        return;
    }
    
    if (isAdmin) {
        // Для админа показываем первую группу по умолчанию
        loadGroupData('mal1');
    } else if (currentUser.group) {
        // Для обычных пользователей загружаем их группу
        loadGroupData(currentUser.group);
    }
}

function loadGroupData(groupId) {
    const groupData = database[groupId];
    if (!groupData) return;
    
    // Загружаем участников
    loadMembers(groupData.members);
    document.getElementById('members-date').textContent = 
        formatDate(groupData.lastUpdated.members);
    
    // Загружаем задачи
    loadTasks(groupData.tasks);
    document.getElementById('tasks-date').textContent = 
        formatDate(groupData.lastUpdated.tasks);
    
    // Обновляем счетчик участников
    document.getElementById('members-count').textContent = groupData.members.length;
}

function loadMembers(members) {
    const membersList = document.getElementById('members-list');
    const editContainer = document.getElementById('members-edit-list');
    
    // Очищаем таблицу
    membersList.innerHTML = '';
    
    // Заполняем таблицу для просмотра
    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong class="callsign">${member.позывной}</strong></td>
            <td>${member.имя}</td>
            <td>${member.роль}</td>
            <td><span class="rank-badge">${member.звание}</span></td>
        `;
        membersList.appendChild(row);
    });
    
    // Заполняем форму для редактирования
    editContainer.innerHTML = '';
    members.forEach((member, index) => {
        const row = document.createElement('div');
        row.className = 'member-edit-row';
        row.innerHTML = `
            <input type="text" value="${member.позывной}" 
                   placeholder="Позивний" data-index="${index}" data-field="позывной">
            <input type="text" value="${member.имя}" 
                   placeholder="Ім'я" data-index="${index}" data-field="имя">
            <input type="text" value="${member.роль}" 
                   placeholder="Роль" data-index="${index}" data-field="роль">
            <input type="text" value="${member.звание}" 
                   placeholder="Звання" data-index="${index}" data-field="звание">
            <button class="btn-delete" onclick="deleteMember(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        editContainer.appendChild(row);
    });
}

function loadTasks(tasks) {
    const tasksList = document.getElementById('tasks-list');
    
    tasksList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-content">
                <span>${task}</span>
                ${currentUser.accessLevel === 'edit' || currentUser.accessLevel === 'admin' ? 
                    `<button class="task-delete" onclick="deleteTask(${index})">
                        <i class="fas fa-times"></i>
                    </button>` : ''}
            </div>
        `;
        tasksList.appendChild(li);
    });
    
    // Обновляем textarea для редактирования
    document.getElementById('tasks-textarea').value = tasks.join('\n');
}

function loadAnnouncements() {
    const announcementsList = document.getElementById('announcements-list');
    const allAnnouncementsList = document.getElementById('all-announcements-list');
    
    const announcements = database.announcements.list;
    
    // Основной список объявлений
    announcementsList.innerHTML = '';
    announcements.forEach((announcement, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="announcement-content">
                <span>${announcement}</span>
                ${currentUser.accessLevel === 'edit' || currentUser.accessLevel === 'admin' ? 
                    `<button class="announcement-delete" onclick="deleteAnnouncement(${index})">
                        <i class="fas fa-times"></i>
                    </button>` : ''}
            </div>
        `;
        announcementsList.appendChild(li);
    });
    
    // Список для админ-панели
    if (allAnnouncementsList) {
        allAnnouncementsList.innerHTML = '';
        announcements.forEach((announcement, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${announcement}</span>
                <div class="announcement-actions">
                    <button class="btn-delete" onclick="deleteAnnouncementAdmin(${index})">
                        <i class="fas fa-trash"></i> Видалити
                    </button>
                </div>
            `;
            allAnnouncementsList.appendChild(li);
        });
    }
    
    // Обновляем дату
    document.getElementById('announcements-date').textContent = 
        formatDate(database.announcements.lastUpdated);
}

// ============= ФУНКЦИИ РЕДАКТИРОВАНИЯ =============

function toggleEditMode(mode) {
    const viewElement = document.getElementById(`${mode}-view`);
    const editElement = document.getElementById(`${mode}-edit`);
    
    if (editElement.classList.contains('hidden')) {
        // Включаем режим редактирования
        viewElement.classList.add('hidden');
        editElement.classList.remove('hidden');
        
        // Фокус на первое поле
        if (mode === 'announcements') {
            document.getElementById('announcements-textarea').focus();
        } else if (mode === 'tasks') {
            document.getElementById('tasks-textarea').focus();
        }
    } else {
        // Выключаем режим редактирования
        viewElement.classList.remove('hidden');
        editElement.classList.add('hidden');
    }
}

function addMemberRow() {
    const editContainer = document.getElementById('members-edit-list');
    const index = editContainer.children.length;
    
    const row = document.createElement('div');
    row.className = 'member-edit-row';
    row.innerHTML = `
        <input type="text" placeholder="Позивний" data-index="${index}" data-field="позывной">
        <input type="text" placeholder="Ім'я" data-index="${index}" data-field="имя">
        <input type="text" placeholder="Роль" data-index="${index}" data-field="роль">
        <input type="text" placeholder="Звання" data-index="${index}" data-field="звание">
        <button class="btn-delete" onclick="deleteMember(${index})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    editContainer.appendChild(row);
}

function saveMembers() {
    const groupId = currentUser.group;
    if (!groupId) return;
    
    const editRows = document.querySelectorAll('.member-edit-row');
    const members = [];
    
    editRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const member = {};
        
        inputs.forEach(input => {
            const value = input.value.trim();
            if (value) {
                member[input.dataset.field] = value;
            }
        });
        
        if (Object.keys(member).length === 4) {
            members.push(member);
        }
    });
    
    // Сохраняем в базу данных
    database[groupId].members = members;
    database[groupId].lastUpdated.members = new Date().toISOString();
    saveDatabase();
    
    // Обновляем интерфейс
    loadMembers(members);
    toggleEditMode('members');
    
    // Обновляем счетчик
    document.getElementById('members-count').textContent = members.length;
    document.getElementById('members-date').textContent = formatDate(database[groupId].lastUpdated.members);
    
    showNotification('Склад команди успішно збережено!');
}

function deleteMember(index) {
    if (confirm('Видалити цього учасника?')) {
        const rows = document.querySelectorAll('.member-edit-row');
        if (rows.length > 1) {
            rows[index].remove();
            
            // Обновляем индексы
            const newRows = document.querySelectorAll('.member-edit-row');
            newRows.forEach((row, newIndex) => {
                const inputs = row.querySelectorAll('input');
                inputs.forEach(input => {
                    input.dataset.index = newIndex;
                });
                const deleteBtn = row.querySelector('.btn-delete');
                deleteBtn.onclick = () => deleteMember(newIndex);
            });
        }
    }
}

function addTask() {
    const textarea = document.getElementById('tasks-textarea');
    const task = textarea.value.trim();
    
    if (!task) {
        showError('Введіть завдання');
        return;
    }
    
    const tasksList = document.getElementById('tasks-list');
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="task-content">
            <span>${task}</span>
            <button class="task-delete" onclick="this.closest('li').remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    tasksList.appendChild(li);
    
    textarea.value = '';
    textarea.focus();
}

function saveTasks() {
    const groupId = currentUser.group;
    if (!groupId) return;
    
    const tasks = [];
    const taskItems = document.querySelectorAll('#tasks-view li span');
    
    taskItems.forEach(item => {
        tasks.push(item.textContent);
    });
    
    // Сохраняем в базу данных
    database[groupId].tasks = tasks;
    database[groupId].lastUpdated.tasks = new Date().toISOString();
    saveDatabase();
    
    // Обновляем интерфейс
    loadTasks(tasks);
    toggleEditMode('tasks');
    
    document.getElementById('tasks-date').textContent = formatDate(database[groupId].lastUpdated.tasks);
    showNotification('Завдання успішно збережено!');
}

function deleteTask(index) {
    if (confirm('Видалити це завдання?')) {
        const groupId = currentUser.group;
        if (!groupId) return;
        
        database[groupId].tasks.splice(index, 1);
        database[groupId].lastUpdated.tasks = new Date().toISOString();
        saveDatabase();
        
        loadTasks(database[groupId].tasks);
        showNotification('Завдання видалено');
    }
}

function addAnnouncement() {
    const textarea = document.getElementById('announcements-textarea');
    const announcement = textarea.value.trim();
    
    if (!announcement) {
        showError('Введіть оголошення');
        return;
    }
    
    // Добавляем в общий список
    database.announcements.list.push(announcement);
    database.announcements.lastUpdated = new Date().toISOString();
    database.announcements.createdBy = currentUser.accessLevel === 'admin' ? 'admin' : currentUser.group;
    saveDatabase();
    
    // Обновляем интерфейс
    loadAnnouncements();
    document.getElementById('announcements-textarea').value = '';
    
    showNotification('Оголошення додано!');
}

function deleteAnnouncement(index) {
    if (confirm('Видалити це оголошення?')) {
        database.announcements.list.splice(index, 1);
        database.announcements.lastUpdated = new Date().toISOString();
        saveDatabase();
        
        loadAnnouncements();
        showNotification('Оголошення видалено');
    }
}

// ============= АДМИН-ПАНЕЛЬ =============

function openAdminPanel() {
    if (currentUser.accessLevel !== 'admin') return;
    
    document.getElementById('admin-modal').classList.remove('hidden');
    loadAdminData();
}

function closeAdminPanel() {
    document.getElementById('admin-modal').classList.add('hidden');
}

function openAdminTab(tabName) {
    // Скрываем все вкладки
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Убираем активный класс у всех кнопок
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Показываем выбранную вкладку
    document.getElementById(`admin-${tabName}-tab`).classList.remove('hidden');
    
    // Активируем кнопку
    event.target.classList.add('active');
}

function loadAdminData() {
    loadAllGroups();
    loadAllAnnouncements();
    updateBackupInfo();
}

function loadAllGroups() {
    const container = document.getElementById('all-groups-list');
    container.innerHTML = '';
    
    const groups = ['mal1', 'mal2', 'mal3', 'str1', 'str2', 'str3'];
    
    groups.forEach(groupId => {
        const group = database[groupId];
        if (!group) return;
        
        const card = document.createElement('div');
        card.className = 'admin-group-card';
        card.innerHTML = `
            <h4>
                <i class="fas fa-${group.type === 'junior' ? 'user-graduate' : 'user-tie'}"></i>
                ${group.name}
            </h4>
            <div class="group-members-list">
                ${group.members.slice(0, 3).map(member => `
                    <div class="group-member-item">
                        <span><strong>${member.позывной}</strong> - ${member.ім'я}</span>
                        <span class="member-role">${member.роль}</span>
                    </div>
                `).join('')}
                ${group.members.length > 3 ? 
                    `<div class="group-member-item more-members">
                        <span>... та ще ${group.members.length - 3} учасників</span>
                    </div>` : ''}
            </div>
            <div class="group-stats">
                <div class="stat-item">
                    <div class="stat-value">${group.members.length}</div>
                    <div class="stat-label">Учасників</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${group.tasks.length}</div>
                    <div class="stat-label">Завдань</div>
                </div>
            </div>
            <button class="btn-manage" onclick="manageGroup('${groupId}')">
                <i class="fas fa-cog"></i> Керувати групою
            </button>
        `;
        container.appendChild(card);
    });
}

function manageGroup(groupId) {
    // Переключаемся на текущую группу
    currentUser.group = groupId;
    loadGroupData(groupId);
    closeAdminPanel();
    showNotification(`Переключено на групу: ${database[groupId].name}`);
}

function addGlobalAnnouncement() {
    const announcement = prompt('Введіть загальне оголошення:');
    if (announcement && announcement.trim()) {
        database.announcements.list.push(announcement.trim());
        database.announcements.lastUpdated = new Date().toISOString();
        database.announcements.createdBy = 'admin';
        saveDatabase();
        
        loadAnnouncements();
        loadAllAnnouncements();
        showNotification('Загальне оголошення додано!');
    }
}

function deleteAnnouncementAdmin(index) {
    if (confirm('Видалити це оголошення?')) {
        database.announcements.list.splice(index, 1);
        database.announcements.lastUpdated = new Date().toISOString();
        saveDatabase();
        
        loadAnnouncements();
        loadAllAnnouncements();
        showNotification('Оголошення видалено');
    }
}

function exportAllData() {
    const dataStr = JSON.stringify(database, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `horting_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    // Сохраняем дату последнего бэкапа
    localStorage.setItem('last_backup', new Date().toISOString());
    updateBackupInfo();
    
    showNotification('Дані успішно експортовано!');
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
                
                if (confirm('Це перезапише всі поточні дані. Продовжити?')) {
                    database = importedData;
                    saveDatabase();
                    showNotification('Дані успішно імпортовано!');
                    location.reload();
                }
            } catch (error) {
                showError('Помилка при читанні файлу. Перевірте формат.');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function resetAllData() {
    if (confirm('Ця дія видалить всі дані і відновить початкові налаштування. Продовжити?')) {
        localStorage.removeItem('horting_database');
        database = initializeDatabase();
        showNotification('Дані скинуті до початкових налаштувань');
        location.reload();
    }
}

function updateBackupInfo() {
    const lastBackup = localStorage.getItem('last_backup');
    const element = document.getElementById('last-backup');
    
    if (lastBackup) {
        element.textContent = formatDate(lastBackup);
    } else {
        element.textContent = 'Немає';
    }
}

// ============= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =============

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function saveDatabase() {
    database.lastUpdated = new Date().toISOString();
    localStorage.setItem('horting_database', JSON.stringify(database));
}

function showNotification(message) {
    // Создаем временное уведомление
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, #4CAF50, #2E7D32);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function logout() {
    if (confirm('Ви впевнені, що хочете вийти?')) {
        currentUser = null;
        document.getElementById('main-content').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('admin-modal').classList.add('hidden');
        document.getElementById('password-input').focus();
    }
}

// ============= ИНИЦИАЛИЗАЦИЯ =============

document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем базу данных
    database = initializeDatabase();
    
    // Фокус на поле пароля
    document.getElementById('password-input').focus();
    
    // Обработка Enter в поле пароля
    document.getElementById('password-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // Закрытие админ-панели по клику вне окна
    document.getElementById('admin-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeAdminPanel();
        }
    });
    
    // Скрываем админ-панель при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !document.getElementById('admin-modal').classList.contains('hidden')) {
            closeAdminPanel();
        }
    });
    
    // Загружаем данные при первом открытии
    if (localStorage.getItem('auto_login')) {
        // Автоматический вход для тестирования (удалить в продакшене)
        document.getElementById('password-input').value = 'mal1kab747_kam';
        setTimeout(() => checkPassword(), 1000);
    }
});

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .rank-badge {
        background: rgba(255, 152, 0, 0.2);
        color: #FF9800;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.9rem;
        border: 1px solid #FF9800;
    }
    
    .callsign {
        color: #4FC3F7;
        font-weight: bold;
    }
    
    .task-content, .announcement-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 15px;
    }
    
    .task-delete, .announcement-delete {
        background: none;
        border: none;
        color: #ff6b6b;
        cursor: pointer;
        padding: 5px;
        opacity: 0.7;
        transition: opacity 0.3s;
    }
    
    .task-delete:hover, .announcement-delete:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);