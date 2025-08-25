
import type { Content } from "./api";



export interface Iapi {
    getAllContent(title: string, category: string ): Promise<Content[]>,
    fetchContent(): Promise<Content[]>,
    addContent(newContent: Omit<Content, "id" | "prosecnaOcena"> & { description?: string; trivia?: string; }): Promise<Content>,
    rateContent(contentId: number, rating: number): Promise<Content>
}