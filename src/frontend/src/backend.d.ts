import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    body: string;
    createdAt: Time;
    author: string;
    excerpt: string;
    category: string;
}
export interface Nutrition {
    fatGrams: bigint;
    fiberGrams: bigint;
    calories: bigint;
    carbsGrams: bigint;
    proteinGrams: bigint;
}
export interface MenuItem {
    id: bigint;
    name: string;
    description: string;
    category: string;
    priceCents: bigint;
    nutrition: Nutrition;
}
export type Time = bigint;
export interface backendInterface {
    addBlogPost(title: string, excerpt: string, body: string, author: string, category: string): Promise<bigint>;
    addMenuItem(name: string, description: string, priceCents: bigint, category: string, nutrition: Nutrition): Promise<bigint>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllMenuItems(): Promise<Array<MenuItem>>;
    getBlogPostsByCategory(category: string): Promise<Array<BlogPost>>;
    getMenuItemsByCategory(category: string): Promise<Array<MenuItem>>;
    initialize(): Promise<void>;
}
