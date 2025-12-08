// База данных (в реальном проекте это был бы сервер)
let database = {
    // mal1 - Старшая команда 1
    mal1: {
        name: "Старша команда 1",
        passwordBase: "mal1kab", // Базовый пароль для просмотра
        members: [
            { позывной: "ВОЛК", имя: "Іван Петренко", роль: "Командир", звание: "Старший сержант" },
            { позывной: "СОКОЛ", имя: "Олексій Шевченко", роль: "Зам. командира", звание: "Сержант" },
            { позывной: "МЕДВЕДЬ", имя: "Максим Бондаренко", роль: "Снайпер", звание: "Молодший сержант" },
            { позывной: "РИСЬ", имя: "Дмитро Коваленко", роль: "Радист", звание: "Єфрейтор" },
            { позывной: "ЯГУАР", имя: "Артем Ткаченко", роль: "Медик", звание: "Рядовий" }
        ],
        announcements: [
            "Завтра збір о 08:00 біля штабу",
            "Не забудьте форму та берці",
            "Тренування з тактики у середу",
            "Перевірте спорядження до суботи"
        ],
        tasks: [
            "Вивчити топографічні знаки",
            "Підготувати звіт про стрільби",
            "Переглянути матеріали з тактики",
            "Перевірити апаратуру зв'язку"
        ],
        lastUpdated: {
            announcements: "2024-01-15 14:30",
            tasks: "2024-01-15 09:15"
        }
    },
    
    // mal2 - Старшая команда 2
    mal2: {
        name: "Старша команда 2",
        passwordBase: "mal2kab",
        members: [
            { позывной: "ТИГР", имя: "Андрій Мельник", роль: "Командир", звання: "Сержант" },
            { позывной: "ОРЕЛ", имя: "Сергій Кравченко", роль: "Розвідник", звання: "Молодший сержант" },
            { позывной: "БАРС", імя: "Володимир Павленко", роль: "Стрілець", звання: "Єфрейтор" },
            { позывной: "ФЕНІКС", імя: "Євгеній Савенко", роль: "Кулеметник", звання: "Рядовий" }
        ],
        announcements: [
            "Підготовка до змагань",
            "Ремонт спорядження у п'ятницю",
            "Заняття з першої допомоги"
        ],
        tasks: [
            "Підготувати спорядження",
            "Вивчити сигнали взаємодії",
            "Тренування зі зброєю"
        ],
        lastUpdated: {
            announcements: "2024-01-14 16:45",
            tasks: "2024-01-15 10:20"
        }
    },
    
    // mal3 - Разведка
    mal3: {
        name: "Розвідка",
        passwordBase: "mal3kab",
        members: [
            { позывной: "ТІНЬ", імя: "Михайло Лисенко", роль: "Керівник розвідки", звання: "Старший сержант" },
            { позывной: "ПРИВИД", імя: "Віталій Гриценко", роль: "Спстер", звання: "Сержант" },
            { позывной: "ХОВАНКА", імя: "Роман Шевчук", роль: "Радіоперехоплення", звання: "Молодший сержант" },
            { позывной: "НЕВИДИМКА", імя: "Олег Терещенко", роль: "Фотограф", звання: "Єфрейтор" },
            { позывной: "СЛІДОПИТ", імя: "Богдан Мартиненко", роль: "Картограф", звання: "Рядовий" }
        ],
        announcements: [
            "Спецзавдання у суботу",
            "Секретна нарада о 19:00",
            "Перевірка обладнання розвідки"
        ],
        tasks: [
            "Зняти кроки місцевості",
            "Підготувати звіт розвідки",
            "Зашифрувати повідомлення",
            "Передати дані до 18:00"
        ],
        lastUpdated: {
            announcements: "2024-01-15 12:00",
            tasks: "2024-01-15 07:45"
        }
    }
};

// Текущие данные
let currentTeam = null;
let currentAccess = 'view'; // 'view' или 'edit'
let originalAnnouncements = [];
let originalTasks = [];

// Проверка пароля
function checkPassword() {
    const passwordInput = document.getElementById('password-input');
    const errorElement = document.getElementById('error-message');
    const password = passwordInput.value.trim();
    
    // Очищаем предыдущую ошибку
    errorElement.style.display = 'none';
    errorElement.textContent = '';
    
    // Проверяем базовый формат
    const regex = /^mal([1-3])kab(\d{3})(?:_(kam|zam))?$/;
    const match = password.match(regex);
    
    if (!match) {
        showError('Невірний формат пароля. Приклад: mal1kab123 або mal1kab123_kam');
        return;
    }
    
    const teamNum = match[1]; // 1, 2 или 3
    const kabNum = match[2]; // 3 цифры
    const accessType = match[3]; // kam, zam или undefined
    
    const teamKey = `mal${teamNum}`;
    const expectedBase = database[teamKey]?.passwordBase;
    
    // Проверяем базовую часть пароля
    if (!password.startsWith(expectedBase)) {
        showError('Невірний код команди або кабінету');
        return;
    }
    
    // Устанавливаем доступ
    currentTeam = teamKey;
    currentAccess = accessType ? 'edit' : 'view';
    
    // Прячем экран входа и показываем основной контент
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    
    // Загружаем данные команды
    loadTeamData();
    
    // Очищаем поле пароля
    passwordInput.value = '';
}

// Показать ошибку
function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Анимация ошибки
    errorElement.classList.remove('pulse');
    setTimeout(() => errorElement.classList.add('pulse'), 10);
    
    // Вибрация (если поддерживается)
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }
}

// Загрузка данных команды
function loadTeamData() {
    const teamData = database[currentTeam];
    if (!teamData) return;
    
    // Обновляем заголовок
    document.getElementById('team-name').textContent = teamData.name;
    document.getElementById('user-access-level').textContent = 
        `Рівень доступу: ${currentAccess === 'edit' ? 'Редагування' : 'Перегляд'}`;
    
    // Загружаем участников
    loadMembers(teamData.members);
    
    // Загружаем объявления и задачи
    loadAnnouncements(teamData.announcements);
    loadTasks(teamData.tasks);
    
    // Показываем даты обновления
    document.getElementById('announcements-date').textContent = teamData.lastUpdated.announcements;
    document.getElementById('tasks-date').textContent = teamData.lastUpdated.tasks;
    
    // Показываем кнопки редактирования если есть доступ
    const canEdit = currentAccess === 'edit';
    document.getElementById('edit-announcements-btn').classList.toggle('hidden', !canEdit);
    document.getElementById('edit-tasks-btn').classList.toggle('hidden', !canEdit);
}

// Загрузка списка участников
function loadMembers(members) {
    const membersList = document.getElementById('members-list');
    const membersCount = document.getElementById('members-count');
    
    // Очищаем таблицу
    membersList.innerHTML = '';
    
    // Заполняем таблицу
    members.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${member.позывной}</strong></td>
            <td>${member.имя}</td>
            <td>${member.роль}</td>
            <td>${member.звание}</td>
        `;
        membersList.appendChild(row);
    });
    
    // Обновляем счетчик
    membersCount.textContent = members.length;
}

// Загрузка объявлений
function loadAnnouncements(announcements) {
    const announcementsList = document.getElementById('announcements-list');
    const textarea = document.getElementById('announcements-textarea');
    
    // Сохраняем оригинал для отмены
    originalAnnouncements = [...announcements];
    
    // Очищаем список
    announcementsList.innerHTML = '';
    
    // Заполняем список
    announcements.forEach(announcement => {
        const li = document.createElement('li');
        li.textContent = announcement;
        announcementsList.appendChild(li);
    });
    
    // Заполняем textarea (для режима редактирования)
    textarea.value = announcements.join('\n');
}

// Загрузка задач
function loadTasks(tasks) {
    const tasksList = document.getElementById('tasks-list');
    const textarea = document.getElementById('tasks-textarea');
    
    // Сохраняем оригинал
    originalTasks = [...tasks];
    
    // Очищаем список
    tasksList.innerHTML = '';
    
    // Заполняем список
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        tasksList.appendChild(li);
    });
    
    // Заполняем textarea
    textarea.value = tasks.join('\n');
}

// Переключение режима редактирования
function toggleEdit(type) {
    const viewElement = document.getElementById(`${type}-view`);
    const editElement = document.getElementById(`${type}-edit`);
    const textarea = document.getElementById(`${type}-textarea`);
    
    if (editElement.classList.contains('hidden')) {
        // Включаем режим редактирования
        viewElement.classList.add('hidden');
        editElement.classList.remove('hidden');
        textarea.focus();
    } else {
        // Выключаем режим редактирования
        viewElement.classList.remove('hidden');
        editElement.classList.add('hidden');
        
        // Восстанавливаем оригинальные данные
        if (type === 'announcements') {
            textarea.value = originalAnnouncements.join('\n');
        } else {
            textarea.value = originalTasks.join('\n');
        }
    }
}

// Сохранение данных
function saveData(type) {
    const textarea = document.getElementById(`${type}-textarea`);
    const newData = textarea.value.split('\n').filter(line => line.trim() !== '');
    
    if (newData.length === 0) {
        alert('Список не може бути порожнім!');
        return;
    }
    
    // Обновляем базу данных
    database[currentTeam][type] = newData;
    
    // Обновляем дату изменения
    const now = new Date();
    database[currentTeam].lastUpdated[type] = 
        `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')} ` +
        `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    
    // Перезагружаем данные
    if (type === 'announcements') {
        loadAnnouncements(newData);
        document.getElementById('announcements-date').textContent = database[currentTeam].lastUpdated[type];
    } else {
        loadTasks(newData);
        document.getElementById('tasks-date').textContent = database[currentTeam].lastUpdated[type];
    }
    
    // Выходим из режима редактирования
    toggleEdit(type);
    
    // Показываем уведомление
    alert('Дані успішно збережено!');
    
    // В реальном проекте здесь был бы AJAX запрос к серверу
    // saveToServer(currentTeam, type, newData);
}

// Выход из системы
function logout() {
    // Показываем подтверждение
    if (!confirm('Ви впевнені, що хочете вийти?')) return;
    
    // Сбрасываем состояние
    currentTeam = null;
    currentAccess = 'view';
    
    // Показываем экран входа
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('main-content').classList.add('hidden');
    
    // Очищаем поля
    document.getElementById('password-input').value = '';
    document.getElementById('error-message').style.display = 'none';
}

// Обработка нажатия Enter в поле пароля
document.getElementById('password-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Фокус на поле пароля
    document.getElementById('password-input').focus();
    
    // Примеры паролей для быстрого тестирования (можно удалить)
    console.log('Паролі для тестування:');
    console.log('mal1kab101 - перегляд старшої команди 1');
    console.log('mal1kab101_kam - редагування старшої команди 1');
    console.log('mal2kab205 - перегляд старшої команди 2');
    console.log('mal3kab777 - перегляд розвідки');
    console.log('mal3kab777_zam - редагування розвідки');
});