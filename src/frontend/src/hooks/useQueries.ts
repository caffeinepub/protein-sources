import { useQuery } from "@tanstack/react-query";
import type { BlogPost, MenuItem } from "../backend.d";
import { useActor } from "./useActor";

export function useAllMenuItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMenuItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMenuItemsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllMenuItems();
      return actor.getMenuItemsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPostsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllBlogPosts();
      return actor.getBlogPostsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}
