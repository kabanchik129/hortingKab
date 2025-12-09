// Подключаем серверное хранилище
importScripts('server.js');

// Обновляем TeamManager для работы с ServerStorage
const TeamManager = {
    // Все методы теперь работают с ServerStorage
    getTeam: ServerStorage.getTeam.bind(ServerStorage),
    getTeams: ServerStorage.getTeams.bind(ServerStorage),
    saveTeam: ServerStorage.saveTeam.bind(ServerStorage),
    addMember: ServerStorage.addMember.bind(ServerStorage),
    removeMember: ServerStorage.removeMember.bind(ServerStorage),
    addTeamNotification: ServerStorage.addTeamNotification.bind(ServerStorage),
    addTask: ServerStorage.addTask.bind(ServerStorage),
    addAbsence: ServerStorage.addAbsence.bind(ServerStorage),
    addGlobalNotification: ServerStorage.addGlobalNotification.bind(ServerStorage),
    getGlobalNotifications: ServerStorage.getGlobalNotifications.bind(ServerStorage),
    deleteGlobalNotification: ServerStorage.deleteGlobalNotification.bind(ServerStorage),
    addAdminNotification: ServerStorage.addAdminNotification.bind(ServerStorage),
    getAdminNotifications: ServerStorage.getAdminNotifications.bind(ServerStorage),
    markNotificationAsRead: ServerStorage.markNotificationAsRead.bind(ServerStorage),
    deleteAdminNotification: ServerStorage.deleteAdminNotification.bind(ServerStorage),
    getUnreadCount: ServerStorage.getUnreadCount.bind(ServerStorage)
};

// Остальной код остается таким же, но теперь данные хранятся централизованно
// и доступны всем пользователям...

// В функции sendToAdmin заменяем:
function sendToAdmin(message, fromTeam) {
    if (!message || !fromTeam) return false;
    
    return TeamManager.addAdminNotification({
        message: message,
        fromTeam: fromTeam
    });
}

// В dashboard.html и team.html используем TeamManager для получения данных
// Все изменения автоматически будут видны другим пользователям