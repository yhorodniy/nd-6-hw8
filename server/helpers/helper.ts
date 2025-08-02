import path from "path";
import { NewPost } from "../types/types";
import fsPromises from 'fs/promises';

const newsPostsPath = path.resolve(__dirname, '../data/newsPosts.json');


export const ensureDataFileExists = async (isFilter: boolean = true): Promise<NewPost[]> => {
    const dataDir = path.dirname(newsPostsPath);
    
    try {
        await fsPromises.access(dataDir);
    } catch {
        await fsPromises.mkdir(dataDir, { recursive: true });
    }

    try {
        const data = await fsPromises.readFile(newsPostsPath, 'utf-8');
        if (isFilter) {
            return JSON.parse(data).filter((post: NewPost) => post.isPrivate === false);
        }

        return JSON.parse(data);
    } catch {
        const emptyPosts: NewPost[] = [];
        await fsPromises.writeFile(newsPostsPath, JSON.stringify(emptyPosts, null, 2));
        return emptyPosts;
    }
};

export const saveData = async (posts: NewPost[]): Promise<void> => {
    await fsPromises.writeFile(newsPostsPath, JSON.stringify(posts, null, 2));
}
