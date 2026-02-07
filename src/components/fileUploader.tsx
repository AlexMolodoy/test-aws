import { useState } from 'react';
import { createPost, uploadFile, getCurrentAuthUser } from '../hooks';

export const FileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        try {
            const fileKey = await uploadFile(file);
            // Сохранить ссылку на файл в DataStore
            const user = await getCurrentAuthUser();
            if (!user) throw new Error('Пользователь не авторизован');

            // Сохранить ссылку на файл в DataStore
            await createPost('Новый пост', `Файл: ${fileKey}`, user.userId);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    if (e.target.files) setFile(e.target.files[0]);
                }}
            />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Загрузка...' : 'Загрузить файл'}
            </button>
        </div>
    );
};
