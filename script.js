/* Основные переменные */
:root {
    --primary: #ffd60a;
    --primary-dark: #ffc300;
    --secondary: #415a77;
    --accent: #9d4edd;
    --danger: #ff6b6b;
    --success: #1a936f;
    --info: #00bbf9;
    --dark: #0d1b2a;
    --darker: #0a141f;
    --light: #e0e1dd;
    --gray: #adb5bd;
}

/* Сброс и базовые стили */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}

body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, var(--darker) 0%, var(--dark) 100%);
    color: var(--light);
    min-height: 100vh;
    line-height: 1.6;
}

.login-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230d1b2a"/><path d="M0,50 Q25,40 50,50 T100,50" stroke="%23ffd60a" fill="none" opacity="0.1"/></svg>');
}

/* Контейнер */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    width: 100%;
}

/* Шапка страницы */
header {
    text-align: center;
    margin-bottom: 40px;
    padding-top: 20px;
}

.login-page header {
    padding-top: 50px;
}

header h1 {
    font-family: 'Roboto Slab', serif;
    font-size: 4rem;
    background: linear-gradient(45deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 10px;
    text-shadow: 0 2px 10px rgba(255, 214, 10, 0.3);
}

.subtitle {
    font-size: 1.2rem;
    color: var(--gray);
    letter-spacing: 2px;
    text-transform: uppercase;
}

/* Карточка входа */
.login-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 40px;
    border: 1px solid var(--secondary);
    backdrop-filter: blur(10px);
    max-width: 600px;
    margin: 40px auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.login-card h2 {
    color: var(--primary);
    margin-bottom: 20px;
    font-size: 2rem;
}

.hint {
    color: var(--gray);
    margin-bottom: 30px;
    font-size: 0.95rem;
    line-height: 1.5;
}

.input-group {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 15px;
    margin-bottom: 25px;
}

/* Улучшенные поля ввода */
.enhanced-input {
    padding: 16px 20px;
    border: 2px solid var(--secondary);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    color: var(--light);
    font-size: 16px;
    transition: all 0.3s;
    width: 100%;
    font-family: 'Roboto', sans-serif;
}

.enhanced-input:focus {
    outline: none;
    border-color: var(--primary);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 4px rgba(255, 214, 10, 0.15);
    transform: translateY(-2px);
}

.enhanced-select {
    padding: 16px 20px;
    border: 2px solid var(--secondary);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    color: var(--light);
    font-size: 16px;
    transition: all 0.3s;
    width: 100%;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 20px center;
    background-size: 20px;
    font-family: 'Roboto', sans-serif;
}

.enhanced-select:focus {
    outline: none;
    border-color: var(--primary);
    background-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 4px rgba(255, 214, 10, 0.15);
}

.enhanced-textarea {
    padding: 16px 20px;
    border: 2px solid var(--secondary);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    color: var(--light);
    font-size: 16px;
    transition: all 0.3s;
    width: 100%;
    min-height: 120px;
    resize: vertical;
    line-height: 1.6;
    font-family: 'Roboto', sans-serif;
}

.enhanced-textarea:focus {
    outline: none;
    border-color: var(--primary);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 4px rgba(255, 214, 10, 0.15);
}

/* Кнопки */
.enhanced-btn {
    padding: 16px 32px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: var(--dark);
    border: none;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 16px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.enhanced-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(255, 214, 10, 0.25);
}

.enhanced-btn:active {
    transform: translateY(-1px);
}

.enhanced-btn.secondary {
    background: linear-gradient(135deg, var(--secondary) 0%, #1b3a4b 100%);
    color: var(--light);
}

.enhanced-btn.secondary:hover {
    box-shadow: 0 12px 25px rgba(65, 90, 119, 0.25);
}

.enhanced-btn.danger {
    background: linear-gradient(135deg, var(--danger) 0%, #e85d04 100%);
    color: white;
}

.enhanced-btn.danger:hover {
    box-shadow: 0 12px 25px rgba(255, 107, 107, 0.25);
}

/* Примеры паролей */
.password-examples {
    margin-top: 30px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border-left: 4px solid var(--primary);
}

.password-examples p {
    margin-bottom: 15px;
    color: var(--primary);
}

.password-examples ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;
}

.password-examples li {
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    font-size: 0.9rem;
}

.password-examples code {
    background: rgba(255, 214, 10, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    color: var(--primary);
    font-family: monospace;
}

/* Сообщение об ошибке */
.error-message {
    color: var(--danger);
    text-align: center;
    padding: 10px;
    background: rgba(255, 107, 107, 0.1);
    border-radius: 8px;
    border: 1px solid var(--danger);
    margin: 15px 0;
    display: none;
}

/* Шапка команды */
.team-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 16px;
    margin-bottom: 30px;
    border: 1px solid var(--secondary);
}

.team-header h1 {
    font-size: 2.5rem;
    color: var(--primary);
    font-family: 'Roboto Slab', serif;
}

.user-info {
    text-align: right;
}

.user-info p {
    margin-bottom: 10px;
    color: var(--gray);
}

.logout-btn {
    padding: 10px 20px;
    background: linear-gradient(135deg, var(--danger) 0%, #e85d04 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
}

.logout-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.25);
}

/* Табы */
.tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    background: rgba(255, 255, 255, 0.03);
    padding: 15px;
    border-radius: 12px;
    border: 1px solid var(--secondary);
    overflow-x: auto;
    scrollbar-width: none;
}

.tabs::-webkit-scrollbar {
    display: none;
}

.tab-btn {
    padding: 12px 24px;
    background: transparent;
    border: 1px solid var(--secondary);
    color: var(--gray);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    white-space: nowrap;
    flex-shrink: 0;
}

.tab-btn:hover {
    background: rgba(255, 214, 10, 0.1);
    border-color: var(--primary);
    color: var(--primary);
}

.tab-btn.active {
    background: var(--primary);
    color: var(--dark);
    border-color: var(--primary);
}

/* Секции */
.section {
    margin-bottom: 40px;
    animation: fadeIn 0.5s ease;
}

.section h3 {
    color: var(--primary);
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-family: 'Roboto Slab', serif;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(255, 214, 10, 0.3);
}

/* Улучшенные карточки */
.enhanced-card {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.1));
    border-radius: 16px;
    padding: 25px;
    border: 1px solid var(--secondary);
    transition: all 0.3s;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
}

.enhanced-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 214, 10, 0.1),
        transparent
    );
    transition: left 0.7s ease;
}

.enhanced-card:hover::before {
    left: 100%;
}

.enhanced-card:hover {
    border-color: var(--primary);
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

/* Строки формы */
.form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
}

/* Бейджи ролей */
.role-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    background: var(--secondary);
    color: white;
}

.role-kam {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: var(--dark);
}

.role-zam {
    background: linear-gradient(135deg, var(--accent) 0%, #7b2cbf 100%);
}

/* Индикатор режима просмотра */
.view-mode-indicator {
    background: linear-gradient(135deg, var(--accent) 0%, #7b2cbf 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-left: 15px;
}

.back-to-admin {
    margin-left: 15px;
    padding: 10px 20px;
    background: linear-gradient(135deg, var(--accent) 0%, #7b2cbf 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
}

.back-to-admin:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(157, 78, 221, 0.25);
}

/* Навигация админа */
.admin-nav {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    background: rgba(255, 255, 255, 0.03);
    padding: 15px;
    border-radius: 12px;
    border: 1px solid var(--secondary);
    overflow-x: auto;
}

.admin-nav-btn {
    padding: 12px 24px;
    background: transparent;
    border: 1px solid var(--secondary);
    color: var(--gray);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    white-space: nowrap;
    flex-shrink: 0;
}

.admin-nav-btn:hover {
    background: rgba(255, 214, 10, 0.1);
    border-color: var(--primary);
    color: var(--primary);
}

.admin-nav-btn.active {
    background: var(--primary);
    color: var(--dark);
    border-color: var(--primary);
}

/* Карточки команд */
.teams-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
    margin-top: 20px;
}

.team-card {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.1));
    border-radius: 16px;
    padding: 25px;
    border: 1px solid var(--secondary);
    transition: all 0.3s;
}

.team-card:hover {
    border-color: var(--primary);
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

.team-card h3 {
    color: var(--primary);
    margin-bottom: 15px;
    font-family: 'Roboto Slab', serif;
}

.team-card h4 {
    color: var(--light);
    margin: 20px 0 10px 0;
    font-size: 1.1rem;
    opacity: 0.9;
}

.member-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.member-item:last-child {
    border-bottom: none;
}

.notification-item.team {
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    margin-bottom: 10px;
    border-left: 3px solid var(--primary);
}

.absence-item {
    padding: 10px;
    background: rgba(255, 107, 107, 0.1);
    border-radius: 8px;
    margin-bottom: 10px;
    border-left: 3px solid var(--danger);
}

/* Чекбоксы */
.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 15px 0;
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    cursor: pointer;
}

.checkbox-item:hover {
    background: rgba(255, 255, 255, 0.08);
}

.checkbox-item input[type="checkbox"],
.checkbox-item input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: var(--primary);
    cursor: pointer;
}

/* Уведомления */
.notification-badge {
    background: var(--danger);
    color: white;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    margin-left: 8px;
    font-weight: bold;
}

.notification-date {
    color: var(--gray);
    font-size: 0.9rem;
    margin-top: 10px;
    opacity: 0.8;
}

/* Анимации */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Подвал */
footer {
    text-align: center;
    padding: 30px 0;
    color: var(--gray);
    margin-top: 50px;
    border-top: 1px solid var(--secondary);
}

/* Модальные окна (базовый стиль для скрипта) */
.modal-overlay {
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
    animation: fadeIn 0.3s ease;
}

.modal {
    background: linear-gradient(135deg, var(--darker) 0%, var(--dark) 100%);
    border-radius: 20px;
    padding: 30px;
    max-width: 500px;
    width: 100%;
    border: 1px solid rgba(255, 214, 10, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.3s ease 0.1s both;
}

.modal h3 {
    color: var(--primary);
    margin-bottom: 20px;
    text-align: center;
    font-family: 'Roboto Slab', serif;
}

.modal-actions {
    display: flex;
    gap: 15px;
    margin-top: 25px;
}

.modal-actions .enhanced-btn {
    flex: 1;
}

/* Адаптивность */
@media (max-width: 768px) {
    .container {
        padding: 15px;
    }
    
    header h1 {
        font-size: 2.5rem;
    }
    
    .login-card {
        padding: 25px;
        margin: 20px auto;
    }
    
    .input-group {
        grid-template-columns: 1fr;
    }
    
    .tabs {
        flex-wrap: wrap;
    }
    
    .tab-btn {
        flex: 1;
        min-width: 120px;
        text-align: center;
    }
    
    .team-header {
        flex-direction: column;
        text-align: center;
        gap: 20px;
    }
    
    .user-info {
        text-align: center;
    }
    
    .teams-grid {
        grid-template-columns: 1fr;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .admin-nav {
        flex-wrap: wrap;
    }
    
    .admin-nav-btn {
        flex: 1;
        min-width: 140px;
        text-align: center;
    }
    
    .password-examples ul {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    header h1 {
        font-size: 2rem;
    }
    
    .login-card h2 {
        font-size: 1.5rem;
    }
    
    .enhanced-btn {
        padding: 14px 20px;
    }
    
    .tab-btn {
        padding: 10px 16px;
        font-size: 0.9rem;
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
                localStorage.setItem(`horting_team_${i}`, JSON.stringify(defaultTeam));
            }
        }
    },

    getTeam(teamId) {
        const team = localStorage.getItem(`horting_team_${teamId}`);
        return team ? JSON.parse(team) : null;
    },

    getTeams() {
        const teams = {};
        for (let i = 1; i <= 6; i++) {
            teams[i] = this.getTeam(i);
        }
        return teams;
    },

    saveTeam(teamId, teamData) {
        localStorage.setItem(`horting_team_${teamId}`, JSON.stringify(teamData));
    },

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

    removeMember(teamId, memberId) {
        const team = this.getTeam(teamId);
        if (!team) return false;

        team.members = team.members.filter(m => m.id !== memberId);
        this.saveTeam(teamId, team);
        return true;
    },

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
        return true;
    },

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
    password = password.trim().toLowerCase();
    
    // Админский пароль
    if (password === 'kyka7') {
        return {
            role: 'admin',
            teamId: 0,
            isCommander: true,
            isDeputy: true
        };
    }
    
    // Проверка формата пароля
    const pattern = /^(mal|str)([1-6])kab(\d{3})(?:_(kam|zam))?$/;
    const match = password.match(pattern);
    
    if (!match) return null;
    
    const [, teamType, teamNumber, code, role] = match;
    const teamId = parseInt(teamNumber);
    
    return {
        role: 'user',
        teamId: teamId,
        teamType: teamType,
        isCommander: role === 'kam',
        isDeputy: role === 'zam'
    };
}

// Авторизация
function login() {
    const password = document.getElementById('passwordInput').value.trim();
    const errorElement = document.getElementById('errorMessage');
    
    if (!password) {
        errorElement.textContent = 'Будь ласка, введіть пароль!';
        errorElement.style.display = 'block';
        return;
    }
    
    const userData = parsePassword(password);
    
    if (!userData) {
        errorElement.textContent = 'Невірний пароль! Перевірте формат.';
        errorElement.style.display = 'block';
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
        if (window.location.pathname.includes('index.html')) {
            return null;
        }
        window.location.href = 'index.html';
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

// Функции для тренировок
function getNextTrainings(count = 3) {
    const trainings = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dayName = getDayName(date.getDay());
        
        if (CONFIG.trainingDays.includes(dayName)) {
            trainings.push({
                date: formatDate(date),
                day: dayName,
                time: CONFIG.trainingTime,
                isToday: i === 0
            });
            
            if (trainings.length >= count) break;
        }
    }
    
    return trainings;
}

function getDayName(dayIndex) {
    const days = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п\'ятниця', 'субота'];
    return days[dayIndex];
}

function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Проверка дня тренировки
function isTrainingDay(date) {
    const dayName = getDayName(date.getDay());
    return CONFIG.trainingDays.includes(dayName);
}

// Отправка сообщения админу
function sendToAdmin(message, fromTeam) {
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
}

// Модальное окно
const Modal = {
    show(title, content, buttons = []) {
        return new Promise((resolve) => {
            // Создаем оверлей
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            
            // Создаем модальное окно
            const modal = document.createElement('div');
            modal.className = 'modal';
            
            // Заголовок
            const titleElement = document.createElement('h3');
            titleElement.textContent = title;
            modal.appendChild(titleElement);
            
            // Контент
            const contentElement = document.createElement('div');
            contentElement.innerHTML = content;
            modal.appendChild(contentElement);
            
            // Кнопки
            if (buttons.length > 0) {
                const actions = document.createElement('div');
                actions.className = 'modal-actions';
                
                buttons.forEach(button => {
                    const btn = document.createElement('button');
                    btn.className = `enhanced-btn ${button.class || ''}`;
                    btn.textContent = button.text;
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
        });
    },

    showForm(title, fields) {
        return new Promise((resolve) => {
            let formHTML = '';
            
            fields.forEach(field => {
                formHTML += `
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; color: #e0e1dd;">
                            ${field.label}
                        </label>
                `;
                
                if (field.type === 'textarea') {
                    formHTML += `
                        <textarea class="enhanced-textarea" 
                                  name="${field.name}" 
                                  placeholder="${field.placeholder || ''}"
                                  rows="${field.rows || 3}"
                                  ${field.required ? 'required' : ''}
                                  style="width: 100%;">${field.value || ''}</textarea>
                    `;
                } else if (field.type === 'select') {
                    formHTML += `
                        <select class="enhanced-select" 
                                name="${field.name}" 
                                ${field.required ? 'required' : ''}
                                style="width: 100%;">
                    `;
                    
                    field.options.forEach(option => {
                        formHTML += `<option value="${option.value}">${option.text}</option>`;
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
                    fields.forEach(field => {
                        const input = document.querySelector(`[name="${field.name}"]`);
                        if (input) formData[field.name] = input.value;
                    });
                    resolve(formData);
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

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем хранилище команд
    TeamManager.init();
    
    // Для страницы входа
    if (document.getElementById('loginBtn')) {
        document.getElementById('loginBtn').addEventListener('click', login);
        document.getElementById('passwordInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') login();
        });
        
        // Фокус на поле ввода
        document.getElementById('passwordInput').focus();
        
        // Автоматический вход для тестирования (удалить в продакшене)
        // document.getElementById('passwordInput').value = 'kyka7';
        // login();
    }
});
    }
}
