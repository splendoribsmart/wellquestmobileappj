import { supabase } from '@/src/lib/supabase';
import { logger } from '@utils/logger';

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
    try {
      const { data, error } = await supabase
        .from('content_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        logger.error('Error fetching categories', { error });
        throw error;
      }

      return data || [];
    } catch (error) {
      logger.error('Failed to get categories', { error });
      return [];
    }
  },

  async getContentTypes(): Promise<ContentType[]> {
    try {
      const { data, error } = await supabase
        .from('content_types')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        logger.error('Error fetching content types', { error });
        throw error;
      }

      return data || [];
    } catch (error) {
      logger.error('Failed to get content types', { error });
      return [];
    }
  },

  async getContent(filters: ContentFilters = {}): Promise<EducationalContent[]> {
    try {
      let query = supabase
        .from('educational_content')
        .select(
          `
          *,
          categories:content_categories(*),
          content_types(*)
        `
        )
        .eq('is_published', true);

      if (filters.categoryId && filters.categoryId !== 'all') {
        query = query.eq('category_id', filters.categoryId);
      }

      if (filters.contentTypeId && filters.contentTypeId !== 'all') {
        query = query.eq('content_type_id', filters.contentTypeId);
      }

      if (filters.difficulty && filters.difficulty !== 'all') {
        query = query.eq('difficulty', filters.difficulty);
      }

      if (filters.searchTerm) {
        query = query.or(
          `title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`
        );
      }

      query = query.order('published_date', { ascending: false });

      const { data: content, error } = await query;

      if (error) {
        logger.error('Error fetching content', { error });
        throw error;
      }

      if (!content) return [];

      const contentIds = content.map((item) => item.id);

      const { data: tagsData } = await supabase
        .from('educational_content_tags')
        .select('content_id, tag')
        .in('content_id', contentIds);

      const tagsByContent: Record<string, Array<{ tag: string }>> = {};
      tagsData?.forEach((tagItem) => {
        if (!tagsByContent[tagItem.content_id]) {
          tagsByContent[tagItem.content_id] = [];
        }
        tagsByContent[tagItem.content_id].push({ tag: tagItem.tag });
      });

      const enrichedContent = content.map((item) => ({
        ...item,
        tags: tagsByContent[item.id] || [],
        is_bookmarked: false,
      }));

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return enrichedContent.filter(
          (item) =>
            item.title.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower) ||
            item.tags?.some((t: { tag: string }) => t.tag.toLowerCase().includes(searchLower))
        );
      }

      return enrichedContent;
    } catch (error) {
      logger.error('Failed to get content', { error });
      return [];
    }
  },

  async getCategoryCounts(): Promise<Record<string, number>> {
    try {
      const { data, error } = await supabase
        .from('educational_content')
        .select('category_id')
        .eq('is_published', true);

      if (error) {
        logger.error('Error fetching category counts', { error });
        throw error;
      }

      const counts: Record<string, number> = {};
      data?.forEach((item) => {
        if (item.category_id) {
          counts[item.category_id] = (counts[item.category_id] || 0) + 1;
        }
      });

      return counts;
    } catch (error) {
      logger.error('Failed to get category counts', { error });
      return {};
    }
  },

  async getContentTypeCounts(): Promise<Record<string, number>> {
    try {
      const { data, error } = await supabase
        .from('educational_content')
        .select('content_type_id')
        .eq('is_published', true);

      if (error) {
        logger.error('Error fetching content type counts', { error });
        throw error;
      }

      const counts: Record<string, number> = {};
      data?.forEach((item) => {
        if (item.content_type_id) {
          counts[item.content_type_id] = (counts[item.content_type_id] || 0) + 1;
        }
      });

      return counts;
    } catch (error) {
      logger.error('Failed to get content type counts', { error });
      return {};
    }
  },

  async getUserBookmarks(userId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('user_bookmarks')
        .select('content_id')
        .eq('user_id', userId);

      if (error) {
        logger.error('Error fetching user bookmarks', { error });
        throw error;
      }

      return data?.map((item) => item.content_id) || [];
    } catch (error) {
      logger.error('Failed to get user bookmarks', { error });
      return [];
    }
  },

  async toggleBookmark(userId: string, contentId: string): Promise<boolean> {
    try {
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
          logger.error('Error removing bookmark', { error });
          throw error;
        }

        return false;
      } else {
        const { error } = await supabase.from('user_bookmarks').insert({
          user_id: userId,
          content_id: contentId,
        });

        if (error) {
          logger.error('Error adding bookmark', { error });
          throw error;
        }

        return true;
      }
    } catch (error) {
      logger.error('Failed to toggle bookmark', { error });
      return false;
    }
  },

  async incrementViews(contentId: string): Promise<void> {
    try {
      const { data: content } = await supabase
        .from('educational_content')
        .select('views')
        .eq('id', contentId)
        .maybeSingle();

      if (content) {
        const { error } = await supabase
          .from('educational_content')
          .update({ views: content.views + 1 })
          .eq('id', contentId);

        if (error) {
          logger.error('Error incrementing views', { error });
        }
      }
    } catch (error) {
      logger.error('Failed to increment views', { error });
    }
  },
};
