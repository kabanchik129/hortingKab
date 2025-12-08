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
        
        // Создаем 6 команд с тестовыми данными
        for (let teamId = 1; teamId <= 6; teamId++) {
            const teamType = teamId <= 3 ? 'mal' : 'str';
            let teamName = '';
            
            if (teamId <= 3) {
                teamName = `${teamId}-ша команда (молодша)`;
                if (teamId === 3) teamName = '3-тя команда (розвідка)';
            } else {
                teamName = `${teamId}-та команда (старша)`;
            }
            
            defaultTeams[teamId] = {
                members: [
                    {
                        id: '1',
                        name: 'Командир Командиров',
                        callSign: 'Командир',
                        rank: 'Старший сержант',
                        role: 'command'
                    },
                    {
                        id: '2', 
                        name: 'Заступник Заступників',
                        callSign: 'Заступник',
                        rank: 'Сержант',
                        role: 'deputy'
                    }
                ],
                notifications: [
                    {
                        id: '1',
                        title: 'Ласкаво просимо!',
                        message: 'Це ваша командна сторінка. Тут будуть всі сповіщення та завдання.',
                        date: new Date().toISOString(),
                        author: 'Система'
                    }
                ],
                tasks: [
                    {
                        id: '1',
                        title: 'Знайомство з системою',
                        description: 'Ознайомитися з усіма функціями сайту',
                        date: new Date().toISOString(),
                        completed: false
                    }
                ],
                absences: []
            };
        }
        
        localStorage.setItem('horting_teams', JSON.stringify(defaultTeams));
        localStorage.setItem('horting_admin_notifications', JSON.stringify([
            {
                id: '1',
                date: new Date().toISOString(),
                message: '[ПИТАННЯ] Як додати нового члена команди?',
                fromTeam: '1',
                read: false
            }
        ]));
        localStorage.setItem('horting_global_notifications', JSON.stringify([
            {
                id: '1',
                title: 'Початок роботи системи',
                message: 'Вітаємо у системі Хортинг! Сайт розпочав роботу.',
                date: new Date().toISOString(),
                author: 'Адміністратор'
            }
        ]));
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

// Функция обращения к админу
function sendToAdmin(message, fromTeam = null) {
    const notifications = JSON.parse(localStorage.getItem('horting_admin_notifications') || '[]');
    
    const notification = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        message: message,
        fromTeam: fromTeam,
        read: false
    };
    
    notifications.push(notification);
    localStorage.setItem('horting_admin_notifications', JSON.stringify(notifications));
    
    return notification;
}

// Проверка дней занятий
function isTrainingDay(date = new Date()) {
    const dayNames = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п\'ятниця', 'субота'];
    const currentDay = dayNames[date.getDay()];
    return CONFIG.trainingDays.includes(currentDay);
}

// Получение ближайших занятий
function getNextTrainings(count = 3) {
    const result = [];
    const today = new Date();
    const dayNames = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п\'ятниця', 'субота'];
    
    for (let i = 0; i < 14; i++) { // Проверяем 2 недели вперед
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dayName = dayNames[date.getDay()];
        
        if (CONFIG.trainingDays.includes(dayName)) {
            result.push({
                date: date.toLocaleDateString('uk-UA'),
                day: dayName,
                isToday: i === 0
            });
            
            if (result.length >= count) break;
        }
    }
    
    return result;
}

// Автоматическое удаление старых уведомлений
function cleanOldData() {
    const now = new Date();
    
    // Очистка уведомлений об отсутствии
    const teams = TeamManager.getTeams();
    Object.keys(teams).forEach(teamId => {
        teams[teamId].absences = teams[teamId].absences.filter(absence => {
            const absenceDate = new Date(absence.date + 'T23:59:59');
            return absenceDate > now;
        });
    });
    TeamManager.saveTeams(teams);
    
    // Очистка старых уведомлений админу (старше 30 дней)
    const adminNotifications = JSON.parse(localStorage.getItem('horting_admin_notifications') || '[]');
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const filteredAdmin = adminNotifications.filter(notif => new Date(notif.date) > monthAgo);
    localStorage.setItem('horting_admin_notifications', JSON.stringify(filteredAdmin));
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
cleanOldData();