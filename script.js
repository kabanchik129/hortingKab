// Конфигурация системы
const CONFIG = {
    adminPassword: 'kyka7',
    teams: {
        1: { name: '1-ша команда (молодша)', type: 'mal', color: 'mal1' },
        2: { name: '2-га команда (молодша)', type: 'mal', color: 'mal2' },
        3: { name: '3-тя команда (розвідка)', type: 'mal', color: 'mal3' },
        4: { name: '4-та команда (старша)', type: 'str', color: 'str4' },
        5: { name: '5-та команда (старша)', type: 'str', color: 'str5' },
        6: { name: '6-та команда (старша)', type: 'str', color: 'str6' }
    },
    trainingDays: ['понеділок', 'середа', 'субота']
};

// Инициализация хранилища
function initStorage() {
    if (!localStorage.getItem('horting_teams')) {
        const defaultTeams = {};
        Object.keys(CONFIG.teams).forEach(teamId => {
            defaultTeams[teamId] = {
                members: [],
                notifications: [],
                tasks: [],
                absences: []
            };
        });
        localStorage.setItem('horting_teams', JSON.stringify(defaultTeams));
        localStorage.setItem('horting_admin_notifications', JSON.stringify([]));
        localStorage.setItem('horting_global_notifications', JSON.stringify([]));
    }
}

// Парсинг пароля
function parsePassword(password) {
    if (password === CONFIG.adminPassword) {
        return { role: 'admin', teamId: null, isCommander: true };
    }

    const regex = /^(mal|str)([1-6])kab(\d{3})(?:_(kam|zam))?$/;
    const match = password.match(regex);
    
    if (!match) return null;
    
    const [, type, teamId, kab, role] = match;
    const teamNum = parseInt(teamId);
    
    // Проверяем соответствие типа и номера команды
    const teamConfig = CONFIG.teams[teamNum];
    if (!teamConfig || teamConfig.type !== type) return null;
    
    return {
        role: role || 'soldier',
        teamId: teamNum,
        teamType: type,
        isCommander: role === 'kam',
        isDeputy: role === 'zam',
        kabNumber: kab
    };
}

// Авторизация
function login() {
    const password = document.getElementById('passwordInput').value.trim();
    const errorEl = document.getElementById('errorMessage');
    
    if (!password) {
        errorEl.textContent = 'Введіть пароль';
        return;
    }
    
    const userData = parsePassword(password);
    
    if (!userData) {
        errorEl.textContent = 'Невірний формат пароля. Приклад: mal1kab123_kam';
        return;
    }
    
    // Сохраняем данные пользователя в sessionStorage
    sessionStorage.setItem('horting_user', JSON.stringify(userData));
    sessionStorage.setItem('horting_login_time', Date.now());
    
    // Перенаправляем в зависимости от роли
    if (userData.role === 'admin') {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'team.html';
    }
}

// Проверка авторизации
function checkAuth(requiredRole = null) {
    const userData = JSON.parse(sessionStorage.getItem('horting_user'));
    const loginTime = parseInt(sessionStorage.getItem('horting_login_time')) || 0;
    
    // Сессия истекает через 8 часов
    if (!userData || Date.now() - loginTime > 8 * 60 * 60 * 1000) {
        sessionStorage.clear();
        window.location.href = 'index.html';
        return null;
    }
    
    if (requiredRole && userData.role !== requiredRole) {
        window.location.href = 'index.html';
        return null;
    }
    
    return userData;
}

// Выход
function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// Форматирование даты
function formatDate(date) {
    return new Date(date).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Управление данными команд
class TeamManager {
    static getTeams() {
        return JSON.parse(localStorage.getItem('horting_teams') || '{}');
    }
    
    static saveTeams(teams) {
        localStorage.setItem('horting_teams', JSON.stringify(teams));
    }
    
    static getTeam(teamId) {
        const teams = this.getTeams();
        return teams[teamId] || { members: [], notifications: [], tasks: [], absences: [] };
    }
    
    static saveTeam(teamId, data) {
        const teams = this.getTeams();
        teams[teamId] = data;
        this.saveTeams(teams);
    }
    
    // Добавление члена команды
    static addMember(teamId, member) {
        const team = this.getTeam(teamId);
        member.id = Date.now().toString(); // Простой ID
        team.members.push(member);
        this.saveTeam(teamId, team);
        return member;
    }
    
    // Удаление члена команды
    static removeMember(teamId, memberId) {
        const team = this.getTeam(teamId);
        team.members = team.members.filter(m => m.id !== memberId);
        this.saveTeam(teamId, team);
    }
    
    // Добавление уведомления команды
    static addTeamNotification(teamId, notification, author) {
        const team = this.getTeam(teamId);
        notification.id = Date.now().toString();
        notification.date = new Date().toISOString();
        notification.author = author;
        team.notifications.push(notification);
        this.saveTeam(teamId, team);
    }
    
    // Добавление общего уведомления
    static addGlobalNotification(notification, author) {
        const notifications = JSON.parse(localStorage.getItem('horting_global_notifications') || '[]');
        notification.id = Date.now().toString();
        notification.date = new Date().toISOString();
        notification.author = author;
        notifications.push(notification);
        localStorage.setItem('horting_global_notifications', JSON.stringify(notifications));
    }
    
    // Добавление уведомления админу
    static addAdminNotification(notification) {
        const notifications = JSON.parse(localStorage.getItem('horting_admin_notifications') || '[]');
        notification.id = Date.now().toString();
        notification.date = new Date().toISOString();
        notifications.push(notification);
        localStorage.setItem('horting_admin_notifications', JSON.stringify(notifications));
    }
    
    // Добавление отсутствия
    static addAbsence(teamId, absence) {
        const team = this.getTeam(teamId);
        absence.id = Date.now().toString();
        absence.dateAdded = new Date().toISOString();
        team.absences.push(absence);
        this.saveTeam(teamId, team);
    }
    
    // Очистка старых отсутствий
    static cleanOldAbsences() {
        const teams = this.getTeams();
        const now = new Date();
        
        Object.keys(teams).forEach(teamId => {
            teams[teamId].absences = teams[teamId].absences.filter(absence => {
                const absenceDate = new Date(absence.date + 'T23:59:59');
                return absenceDate > now;
            });
        });
        
        this.saveTeams(teams);
    }
    
    // Добавление задачи
    static addTask(teamId, task) {
        const team = this.getTeam(teamId);
        task.id = Date.now().toString();
        task.date = new Date().toISOString();
        task.completed = false;
        team.tasks.push(task);
        this.saveTeam(teamId, team);
    }
}

// Инициализация при загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStorage);
} else {
    initStorage();
}

// Очистка старых данных при запуске
TeamManager.cleanOldAbsences();

// Привязка событий для страницы входа
if (document.getElementById('loginBtn')) {
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('passwordInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });
}