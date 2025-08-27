
import type { Content } from "../../models/content/Content";
import type { ApiService } from "./api";



export interface Iapi {
    getInstance(): Promise<ApiService>,
    getAll(): Promise<Content[]>,
    fetchContent(): Promise<Content[]>,
    add(newContent: Content): Promise<void>,
    rateContent(contentId: number, rating: number): Promise<void>,
    filterByCategory(category: "Film" | "Serija"): Promise<Content[]>,

}