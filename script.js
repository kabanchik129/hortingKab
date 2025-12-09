// Конфигурация системы
const CONFIG = {
    teams: {
        1: { name: "1-ша команда (молодша)", color: "team-red", type: "mal" },
        2: { name: "2-га команда (молодша)", color: "team-blue", type: "mal" },
        3: { name: "3-тя команда (розвідка)", color: "team-green", type: "mal" },
        4: { name: "4-та команда (старша)", color: "team-yellow", type: "str" },
        5: { name: "5-та команда (старша)", color: "team-purple", type: "str" },
        6: { name: "6-та команда (старша)", color: "team-orange", type: "str" }
    },
    trainingDays: ['вівторок', 'четвер', 'субота'],
    trainingTime: '18:00'
};

// Менеджер команд
const TeamManager = {
    // Инициализация хранилища
    init() {
        // Инициализация хранилища для команд
        for (let i = 1; i <= 6; i++) {
            if (!localStorage.getItem(`horting_team_${i}`)) {
                const defaultTeam = {
                    id: i,
                    name: CONFIG.teams[i].name,
                    members: [],
                    notifications: [],
                    tasks: [],
                    absences: []
                };
                
                // Добавляем тестовых членов команд
                if (i === 1) {
                    defaultTeam.members = [
                        { id: '1', name: 'Петро Коваль', callSign: 'Командир', rank: 'Старшина', role: 'command' },
                        { id: '2', name: 'Іван Сидоренко', callSign: 'Заступник', rank: 'Сержант', role: 'deputy' },
                        { id: '3', name: 'Олексій Мельник', callSign: 'Сокіл', rank: 'Рядовий', role: 'soldier' }
                    ];
                    defaultTeam.notifications = [
                        { id: '1', title: 'Ласкаво просимо!', message: 'Вітаємо в команді 1. Перше заняття завтра о 18:00.', date: new Date().toISOString(), author: 'Командир' }
                    ];
                } else if (i === 4) {
                    defaultTeam.members = [
                        { id: '1', name: 'Михайло Шевченко', callSign: 'Командир', rank: 'Старший лейтенант', role: 'command' },
                        { id: '2', name: 'Андрій Бондар', callSign: 'Заступник', rank: 'Лейтенант', role: 'deputy' },
                        { id: '3', name: 'Дмитро Коваленко', callSign: 'Ведмідь', rank: 'Сержант', role: 'soldier' }
                    ];
                }
                
                localStorage.setItem(`horting_team_${i}`, JSON.stringify(defaultTeam));
            }
        }
        
        // Инициализация глобальных уведомлений
        if (!localStorage.getItem('horting_global_notifications')) {
            const defaultNotifications = [
                {
                    id: '1',
                    title: 'Вітання з початком навчання!',
                    message: 'Ласкаво просимо до гуртка "Хортинг". Бажаємо успіхів у навчанні!',
                    date: new Date().toISOString(),
                    author: 'Адміністратор'
                }
            ];
            localStorage.setItem('horting_global_notifications', JSON.stringify(defaultNotifications));
        }
        
        // Инициализация уведомлений админа
        if (!localStorage.getItem('horting_admin_notifications')) {
            localStorage.setItem('horting_admin_notifications', JSON.stringify([]));
        }
    },

    // Получить команду
    getTeam(teamId) {
        const team = localStorage.getItem(`horting_team_${teamId}`);
        return team ? JSON.parse(team) : null;
    },

    // Получить все команды
    getTeams() {
        const teams = {};
        for (let i = 1; i <= 6; i++) {
            teams[i] = this.getTeam(i);
        }
        return teams;
    },

    // Сохранить команду
    saveTeam(teamId, teamData) {
        localStorage.setItem(`horting_team_${teamId}`, JSON.stringify(teamData));
    },

    // Добавить участника
    addMember(teamId, memberData) {
        const team = this.getTeam(teamId);
        if (!team) return false;

        const newMember = {
            id: Date.now().toString(),
            name: memberData.name,
            callSign: memberData.callSign,
            rank: memberData.rank,
            role: memberData.role || 'soldier',
            dateAdded: new Date().toISOString()
        };

        team.members.push(newMember);
        this.saveTeam(teamId, team);
        return true;
    },

    // Удалить участника
    removeMember(teamId, memberId) {
        const team = this.getTeam(teamId);
        if (!team) return false;

        team.members = team.members.filter(m => m.id !== memberId);
        this.saveTeam(teamId, team);
        return true;
    },

    // Добавить уведомление команды
    addTeamNotification(teamId, notificationData, author = 'Система') {
        const team = this.getTeam(teamId);
        if (!team) return false;

        const newNotification = {
            id: Date.now().toString(),
            title: notificationData.title,
            message: notificationData.message,
            date: new Date().toISOString(),
            author: author
        };

        team.notifications.push(newNotification);
        this.saveTeam(teamId, team);
        return true;
    },

    // Добавить задачу
    addTask(teamId, taskData) {
        const team = this.getTeam(teamId);
        if (!team) return false;

        const newTask = {
            id: Date.now().toString(),
            title: taskData.title,
            description: taskData.description,
            date: new Date().toISOString(),
            completed: false
        };

        team.tasks.push(newTask);
        this.saveTeam(teamId, team);
        return true;
    },

    // Добавить отсутствие
    addAbsence(teamId, absenceData) {
        const team = this.getTeam(teamId);
        if (!team) return false;

        const newAbsence = {
            id: Date.now().toString(),
            memberName: absenceData.memberName,
            date: absenceData.date,
            reason: absenceData.reason,
            reportedDate: new Date().toISOString()
        };

        team.absences.push(newAbsence);
        this.saveTeam(teamId, team);
        
        // Автоматическое удаление через день после даты отсутствия
        const absenceDate = new Date(absenceData.date);
        const deleteDate = new Date(absenceDate);
        deleteDate.setDate(deleteDate.getDate() + 1);
        deleteDate.setHours(23, 59, 0, 0);
        
        const timeUntilDelete = deleteDate.getTime() - Date.now();
        if (timeUntilDelete > 0) {
            setTimeout(() => {
                const currentTeam = this.getTeam(teamId);
                if (currentTeam) {
                    currentTeam.absences = currentTeam.absences.filter(a => a.id !== newAbsence.id);
                    this.saveTeam(teamId, currentTeam);
                }
            }, timeUntilDelete);
        }
        
        return true;
    },

    // Добавить глобальное уведомление
    addGlobalNotification(notificationData, author = 'Адміністратор') {
        const notifications = JSON.parse(localStorage.getItem('horting_global_notifications') || '[]');
        
        const newNotification = {
            id: Date.now().toString(),
            title: notificationData.title,
            message: notificationData.message,
            date: new Date().toISOString(),
            author: author,
            targetTeams: notificationData.targetTeams || null
        };

        notifications.push(newNotification);
        localStorage.setItem('horting_global_notifications', JSON.stringify(notifications));
        return true;
    }
};

// Парсинг пароля
function parsePassword(password) {
    if (!password) return null;
    
    password = password.trim().toLowerCase();
    
    // Админский пароль
    if (password === 'kyka7') {
        return {
            role: 'admin',
            teamId: 0,
            isCommander: true,
            isDeputy: true,
            teamType: 'admin'
        };
    }
    
    // Проверка формата пароля
    const pattern = /^(mal|str)([1-6])kab(\d{3})(?:_(kam|zam))?$/;
    const match = password.match(pattern);
    
    if (!match) return null;
    
    const [, teamType, teamNumber, code, role] = match;
    const teamId = parseInt(teamNumber);
    
    // Проверка существования команды
    if (!CONFIG.teams[teamId]) return null;
    
    return {
        role: 'user',
        teamId: teamId,
        teamType: teamType,
        isCommander: role === 'kam',
        isDeputy: role === 'zam',
        passwordCode: code
    };
}

// Авторизация
function login() {
    const passwordInput = document.getElementById('passwordInput');
    const errorElement = document.getElementById('errorMessage');
    
    if (!passwordInput) return;
    
    const password = passwordInput.value.trim();
    
    // Очистка предыдущей ошибки
    if (errorElement) {
        errorElement.style.display = 'none';
        errorElement.textContent = '';
    }
    
    if (!password) {
        if (errorElement) {
            errorElement.textContent = 'Будь ласка, введіть пароль!';
            errorElement.style.display = 'block';
        }
        passwordInput.focus();
        return;
    }
    
    const userData = parsePassword(password);
    
    if (!userData) {
        if (errorElement) {
            errorElement.textContent = 'Невірний пароль! Перевірте формат.';
            errorElement.style.display = 'block';
        }
        passwordInput.focus();
        passwordInput.select();
        return;
    }
    
    // Сохраняем данные пользователя
    sessionStorage.setItem('horting_user', JSON.stringify(userData));
    
    // Перенаправляем в зависимости от роли
    if (userData.role === 'admin') {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'team.html';
    }
}

// Проверка авторизации
function checkAuth(requiredRole = null) {
    const userData = JSON.parse(sessionStorage.getItem('horting_user') || 'null');
    
    if (!userData) {
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
        return null;
    }
    
    if (requiredRole && userData.role !== requiredRole) {
        if (requiredRole === 'admin' && userData.role !== 'admin') {
            window.location.href = 'team.html';
            return null;
        }
        if (requiredRole === 'user' && userData.role === 'admin') {
            window.location.href = 'dashboard.html';
            return null;
        }
    }
    
    return userData;
}

// Выход из системы
function logout() {
    sessionStorage.removeItem('horting_user');
    sessionStorage.removeItem('horting_admin_view');
    sessionStorage.removeItem('horting_view_team');
    window.location.href = 'index.html';
}

// Форматирование даты
function formatDate(dateString) {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        
        return date.toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }) + ' ' + date.toLocaleTimeString('uk-UA', {
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        return '';
    }
}

// Получить название дня недели
function getDayName(dayIndex) {
    const days = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п\'ятниця', 'субота'];
    return days[dayIndex];
}

// Получить ближайшие тренировки
function getNextTrainings(count = 3) {
    const trainings = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dayName = getDayName(date.getDay());
        
        if (CONFIG.trainingDays.includes(dayName)) {
            trainings.push({
                date: date.toLocaleDateString('uk-UA', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }),
                day: dayName,
                time: CONFIG.trainingTime,
                isToday: i === 0,
                fullDate: date
            });
            
            if (trainings.length >= count) break;
        }
    }
    
    return trainings;
}

// Проверка дня тренировки
function isTrainingDay(date) {
    if (!date) return false;
    
    try {
        const checkDate = new Date(date);
        if (isNaN(checkDate.getTime())) return false;
        
        const dayName = getDayName(checkDate.getDay());
        return CONFIG.trainingDays.includes(dayName);
    } catch (e) {
        return false;
    }
}

// Отправка сообщения админу
function sendToAdmin(message, fromTeam) {
    if (!message || !fromTeam) return false;
    
    try {
        const notifications = JSON.parse(localStorage.getItem('horting_admin_notifications') || '[]');
        
        const newNotification = {
            id: Date.now().toString(),
            message: message,
            date: new Date().toISOString(),
            fromTeam: fromTeam,
            read: false
        };
        
        notifications.push(newNotification);
        localStorage.setItem('horting_admin_notifications', JSON.stringify(notifications));
        return true;
    } catch (e) {
        console.error('Error sending to admin:', e);
        return false;
    }
}

// Модальное окно
const Modal = {
    show(title, content, buttons = []) {
        return new Promise((resolve) => {
            // Удаляем существующие модальные окна
            const existingModal = document.querySelector('.modal-overlay');
            if (existingModal) {
                document.body.removeChild(existingModal);
            }
            
            // Создаем оверлей
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                padding: 20px;
            `;
            
            // Создаем модальное окно
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.cssText = `
                background: linear-gradient(135deg, #0a141f 0%, #0d1b2a 100%);
                border-radius: 20px;
                padding: 30px;
                max-width: 500px;
                width: 100%;
                border: 1px solid rgba(255, 214, 10, 0.3);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            `;
            
            // Заголовок
            const titleElement = document.createElement('h3');
            titleElement.textContent = title;
            titleElement.style.cssText = `
                color: #ffd60a;
                margin-bottom: 20px;
                text-align: center;
                font-family: 'Roboto Slab', serif;
            `;
            modal.appendChild(titleElement);
            
            // Контент
            const contentElement = document.createElement('div');
            contentElement.innerHTML = content;
            contentElement.style.cssText = 'color: #e0e1dd; line-height: 1.6;';
            modal.appendChild(contentElement);
            
            // Кнопки
            if (buttons.length > 0) {
                const actions = document.createElement('div');
                actions.className = 'modal-actions';
                actions.style.cssText = 'display: flex; gap: 15px; margin-top: 25px;';
                
                buttons.forEach(button => {
                    const btn = document.createElement('button');
                    btn.className = `enhanced-btn ${button.class || ''}`;
                    btn.textContent = button.text;
                    btn.style.cssText = 'flex: 1;';
                    btn.onclick = () => {
                        document.body.removeChild(overlay);
                        resolve(button.value);
                    };
                    actions.appendChild(btn);
                });
                
                modal.appendChild(actions);
            }
            
            overlay.appendChild(modal);
            document.body.appendChild(overlay);
            
            // Закрытие по клику на оверлей
            overlay.onclick = (e) => {
                if (e.target === overlay) {
                    document.body.removeChild(overlay);
                    resolve(null);
                }
            };
            
            // Закрытие по Escape
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    document.body.removeChild(overlay);
                    document.removeEventListener('keydown', handleEscape);
                    resolve(null);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    },

    showForm(title, fields) {
        return new Promise((resolve) => {
            let formHTML = '';
            
            fields.forEach(field => {
                formHTML += `
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; color: #e0e1dd; font-weight: 500;">
                            ${field.label} ${field.required ? '<span style="color: #ff6b6b;">*</span>' : ''}
                        </label>
                `;
                
                if (field.type === 'textarea') {
                    formHTML += `
                        <textarea class="enhanced-textarea" 
                                  name="${field.name}" 
                                  placeholder="${field.placeholder || ''}"
                                  rows="${field.rows || 4}"
                                  ${field.required ? 'required' : ''}
                                  style="width: 100%; resize: vertical; min-height: 80px;">${field.value || ''}</textarea>
                    `;
                } else if (field.type === 'select') {
                    formHTML += `
                        <select class="enhanced-select" 
                                name="${field.name}" 
                                ${field.required ? 'required' : ''}
                                style="width: 100%;">
                            <option value="">${field.placeholder || 'Оберіть...'}</option>
                    `;
                    
                    field.options.forEach(option => {
                        formHTML += `<option value="${option.value}" ${option.value === field.value ? 'selected' : ''}>${option.text}</option>`;
                    });
                    
                    formHTML += `</select>`;
                } else {
                    formHTML += `
                        <input type="${field.type || 'text'}" 
                               class="enhanced-input" 
                               name="${field.name}" 
                               placeholder="${field.placeholder || ''}"
                               value="${field.value || ''}"
                               ${field.required ? 'required' : ''}
                               style="width: 100%;">
                    `;
                }
                
                formHTML += `</div>`;
            });
            
            this.show(title, formHTML, [
                { text: 'Скасувати', class: 'secondary', value: null },
                { text: 'Зберегти', class: '', value: 'submit' }
            ]).then(result => {
                if (result === 'submit') {
                    const formData = {};
                    let isValid = true;
                    
                    fields.forEach(field => {
                        const input = document.querySelector(`[name="${field.name}"]`);
                        if (input) {
                            const value = input.value.trim();
                            
                            if (field.required && !value) {
                                isValid = false;
                                input.style.borderColor = '#ff6b6b';
                                input.focus();
                            } else {
                                formData[field.name] = value;
                                input.style.borderColor = '';
                            }
                        }
                    });
                    
                    if (isValid) {
                        resolve(formData);
                    } else {
                        this.show('Помилка', '<p style="color: #ff6b6b;">Будь ласка, заповніть всі обов\'язкові поля!</p>', [
                            { text: 'OK', class: '', value: 'ok' }
                        ]).then(() => {
                            this.showForm(title, fields).then(resolve);
                        });
                    }
                } else {
                    resolve(null);
                }
            });
        });
    }
};

// Выход из режима просмотра админа
function exitViewMode() {
    sessionStorage.removeItem('horting_admin_view');
    sessionStorage.removeItem('horting_view_team');
    window.location.href = 'dashboard.html';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем хранилище команд
    TeamManager.init();
    
    // Для страницы входа
    if (document.getElementById('passwordInput')) {
        const passwordInput = document.getElementById('passwordInput');
        const loginBtn = document.getElementById('loginBtn');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', login);
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    login();
                }
            });
            
            // Фокус на поле ввода
            setTimeout(() => {
                passwordInput.focus();
            }, 100);
        }
        
        // Добавляем примеры паролей для быстрого тестирования
        const passwordExamples = [
            'kyka7',           // Админ
            'mal1kab123_kam',  // Командир 1-й
            'str4kab456_zam',  // Заступник 4-й
            'mal2kab777',      // Боец 2-й
            'str5kab555',      // Боец 5-й
            'mal3kab001_kam',  // Командир 3-й
            'str6kab999_zam'   // Заступник 6-й
        ];
        
        // Кнопка для быстрого входа (для тестирования)
        if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
            const testDiv = document.createElement('div');
            testDiv.style.cssText = 'margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px;';
            testDiv.innerHTML = `
                <p style="color: #ffd60a; margin-bottom: 10px; font-size: 14px;">Тестові паролі (для розробки):</p>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${passwordExamples.map(pass => `
                        <button onclick="document.getElementById('passwordInput').value='${pass}'; login();" 
                                style="padding: 8px 12px; background: rgba(255,214,10,0.2); border: 1px solid #ffd60a; border-radius: 6px; color: #ffd60a; font-size: 12px; cursor: pointer;">
                            ${pass}
                        </button>
                    `).join('')}
                </div>
            `;
            document.querySelector('.login-card').appendChild(testDiv);
        }
    }
});
// Функции для работы с устройством
function getDeviceMode() {
    return localStorage.getItem('horting_device') || 'pc';
}

function applyDeviceStyles() {
    const device = getDeviceMode();
    document.body.classList.remove('phone-mode', 'pc-mode');
    document.body.classList.add(device + '-mode');
    
    // Обновляем мета-тег viewport для мобильных устройств
    if (device === 'phone') {
        document.querySelector('meta[name="viewport"]').setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
        document.querySelector('meta[name="viewport"]').setAttribute('content', 
            'width=device-width, initial-scale=1.0');
    }
}

// Инициализация устройства при загрузке других страниц
function initDevice() {
    if (!window.location.pathname.includes('index.html')) {
        applyDeviceStyles();
    }
}

// Экспортируем новые функции
window.getDeviceMode = getDeviceMode;
window.applyDeviceStyles = applyDeviceStyles;
window.initDevice = initDevice;

// Обновляем инициализацию при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем хранилище команд
    TeamManager.init();
    
    // Применяем стили устройства на других страницах
    if (!window.location.pathname.includes('index.html')) {
        initDevice();
    }
    
    // Остальной существующий код...
});

// Экспортируем глобальные функции для использования в других скриптах
window.TeamManager = TeamManager;
window.parsePassword = parsePassword;
window.login = login;
window.checkAuth = checkAuth;
window.logout = logout;
window.formatDate = formatDate;
window.getNextTrainings = getNextTrainings;
window.isTrainingDay = isTrainingDay;
window.sendToAdmin = sendToAdmin;
window.Modal = Modal;
window.exitViewMode = exitViewMode;
window.CONFIG = CONFIG;
