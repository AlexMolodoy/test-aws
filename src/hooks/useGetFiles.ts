import { uploadData, getUrl } from 'aws-amplify/storage';

const uploadFile = async (file: File) => {
    try {
        const fileName = `${Date.now()}-${file.name}`;
        const operation = uploadData({
            key: fileName,
            data: file,
            options: {
                contentType: file.type,
                accessLevel: 'private' // 'guest' for public, 'protected', or 'private'
            }
        });
        const result = await operation.result;
        return result.key;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

const getFileUrl = async (key: string) => {
    try {
        const result = await getUrl({
            key,
            options: { accessLevel: 'private' }
        });
        return result.url.toString();
    } catch (error) {
        console.error('Error getting file URL:', error);
    }
};

export { uploadFile, getFileUrl };