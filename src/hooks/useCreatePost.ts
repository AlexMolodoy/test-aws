import { DataStore } from '@aws-amplify/datastore';
import { Post } from '../models';

// Создание записи
const createPost = async (title: string, content: string, userId: string) => {
    try {
        const newPost = await DataStore.save(
            new Post({
                title,
                content,
                userPostsId: userId
            })
        );
        return newPost;
    } catch (error) {
        console.error('Error creating post:', error);
    }
};

// Получение данных с автоматической синхронизацией
const getPosts = async () => {
    try {
        const posts = await DataStore.query(Post);
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

// Подписка на изменения в реальном времени
DataStore.observe(Post).subscribe(msg => {
    console.log('Post changed:', msg.model, msg.opType, msg.element);
});

export { createPost, getPosts };
