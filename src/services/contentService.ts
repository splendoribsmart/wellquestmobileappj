import { supabase } from './supabase';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_name: string;
  color: string;
  sort_order: number;
}

export interface ContentType {
  id: string;
  name: string;
  slug: string;
  icon_name: string;
  color: string;
  sort_order: number;
}

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  full_content: string | null;
  category_id: string | null;
  content_type_id: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  author: string;
  published_date: string;
  read_time_minutes: number | null;
  duration_minutes: number | null;
  views: number;
  rating: number;
  categories?: Category;
  content_types?: ContentType;
  tags?: Array<{ tag: string }>;
  is_bookmarked?: boolean;
}

export interface ContentFilters {
  searchTerm?: string;
  categoryId?: string;
  contentTypeId?: string;
  difficulty?: string;
  showBookmarkedOnly?: boolean;
}

export const contentService = {
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('content_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data || [];
  },

  async getContentTypes(): Promise<ContentType[]> {
    const { data, error } = await supabase
      .from('content_types')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching content types:', error);
      return [];
    }

    return data || [];
  },

  async getContent(filters: ContentFilters = {}): Promise<EducationalContent[]> {
    let query = supabase
      .from('educational_content')
      .select(
        `
        *,
        categories:category_id(id, name, slug, icon_name, color),
        content_types:content_type_id(id, name, slug, icon_name, color),
        tags:educational_content_tags(tag)
      `
      )
      .eq('is_published', true)
      .order('published_date', { ascending: false });

    if (filters.categoryId && filters.categoryId !== 'all') {
      query = query.eq('category_id', filters.categoryId);
    }

    if (filters.contentTypeId && filters.contentTypeId !== 'all') {
      query = query.eq('content_type_id', filters.contentTypeId);
    }

    if (filters.difficulty && filters.difficulty !== 'all') {
      query = query.eq('difficulty', filters.difficulty);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching content:', error);
      return [];
    }

    let content = data || [];

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      content = content.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.tags?.some((t: { tag: string }) => t.tag.toLowerCase().includes(searchLower))
      );
    }

    return content as EducationalContent[];
  },

  async getCategoryCounts(): Promise<Record<string, number>> {
    const { data, error } = await supabase
      .from('educational_content')
      .select('category_id')
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching category counts:', error);
      return {};
    }

    const counts: Record<string, number> = {};
    data?.forEach((item) => {
      if (item.category_id) {
        counts[item.category_id] = (counts[item.category_id] || 0) + 1;
      }
    });

    return counts;
  },

  async getContentTypeCounts(): Promise<Record<string, number>> {
    const { data, error } = await supabase
      .from('educational_content')
      .select('content_type_id')
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching content type counts:', error);
      return {};
    }

    const counts: Record<string, number> = {};
    data?.forEach((item) => {
      if (item.content_type_id) {
        counts[item.content_type_id] = (counts[item.content_type_id] || 0) + 1;
      }
    });

    return counts;
  },

  async getUserBookmarks(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('user_bookmarks')
      .select('content_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching bookmarks:', error);
      return [];
    }

    return data?.map((b) => b.content_id) || [];
  },

  async toggleBookmark(userId: string, contentId: string): Promise<boolean> {
    const { data: existing } = await supabase
      .from('user_bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('content_id', contentId)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('user_bookmarks')
        .delete()
        .eq('id', existing.id);

      if (error) {
        console.error('Error removing bookmark:', error);
        return false;
      }
      return true;
    } else {
      const { error } = await supabase
        .from('user_bookmarks')
        .insert({ user_id: userId, content_id: contentId });

      if (error) {
        console.error('Error adding bookmark:', error);
        return false;
      }
      return true;
    }
  },

  async incrementViews(contentId: string): Promise<void> {
    const { error } = await supabase.rpc('increment_content_views', {
      content_id: contentId,
    });

    if (error) {
      console.error('Error incrementing views:', error);
    }
  },
};
