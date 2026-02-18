exports.handler = async (event) => {
    console.log('Migration event:', JSON.stringify(event, null, 2));

    if (event.triggerSource === 'UserMigration_Authentication') {
        // Здесь логика проверки пользователя в старой системе
        // Если пользователь найден и пароль верный:
        return {
            userAttributes: {
                email: event.userName,
                email_verified: 'true',
                // другие атрибуты пользователя
            },
            finalUserStatus: 'CONFIRMED',
            messageAction: 'SUPPRESS'
        };
    }

    return event;
};
