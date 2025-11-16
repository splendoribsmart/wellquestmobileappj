import {
  mockCategories,
  mockContentTypes,
  mockEducationalContent,
  mockBookmarks,
  Category,
  ContentType,
  EducationalContent,
} from '@mocks/healthLibraryData';

export type { Category, ContentType, EducationalContent };

export interface ContentFilters {
  searchTerm?: string;
  categoryId?: string;
  contentTypeId?: string;
  difficulty?: string;
  showBookmarkedOnly?: boolean;
}

const contentViews: Record<string, number> = {};

export const contentService = {
  async getCategories(): Promise<Category[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockCategories]);
      }, 100);
    });
  },

  async getContentTypes(): Promise<ContentType[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockContentTypes]);
      }, 100);
    });
  },

  async getContent(filters: ContentFilters = {}): Promise<EducationalContent[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let content = mockEducationalContent.map((item) => ({
          ...item,
          categories: mockCategories.find((cat) => cat.id === item.category_id),
          content_types: mockContentTypes.find((type) => type.id === item.content_type_id),
          is_bookmarked: mockBookmarks.has(item.id),
          views: contentViews[item.id] || item.views,
        }));

        if (filters.categoryId && filters.categoryId !== 'all') {
          content = content.filter((item) => item.category_id === filters.categoryId);
        }

        if (filters.contentTypeId && filters.contentTypeId !== 'all') {
          content = content.filter((item) => item.content_type_id === filters.contentTypeId);
        }

        if (filters.difficulty && filters.difficulty !== 'all') {
          content = content.filter((item) => item.difficulty === filters.difficulty);
        }

        if (filters.searchTerm) {
          const searchLower = filters.searchTerm.toLowerCase();
          content = content.filter(
            (item) =>
              item.title.toLowerCase().includes(searchLower) ||
              item.description.toLowerCase().includes(searchLower) ||
              item.tags?.some((t: { tag: string }) => t.tag.toLowerCase().includes(searchLower))
          );
        }

        resolve(content as EducationalContent[]);
      }, 150);
    });
  },

  async getCategoryCounts(): Promise<Record<string, number>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const counts: Record<string, number> = {};
        mockEducationalContent.forEach((item) => {
          if (item.category_id) {
            counts[item.category_id] = (counts[item.category_id] || 0) + 1;
          }
        });
        resolve(counts);
      }, 100);
    });
  },

  async getContentTypeCounts(): Promise<Record<string, number>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const counts: Record<string, number> = {};
        mockEducationalContent.forEach((item) => {
          if (item.content_type_id) {
            counts[item.content_type_id] = (counts[item.content_type_id] || 0) + 1;
          }
        });
        resolve(counts);
      }, 100);
    });
  },

  async getUserBookmarks(userId: string): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Array.from(mockBookmarks));
      }, 100);
    });
  },

  async toggleBookmark(userId: string, contentId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (mockBookmarks.has(contentId)) {
          mockBookmarks.delete(contentId);
        } else {
          mockBookmarks.add(contentId);
        }
        resolve(true);
      }, 100);
    });
  },

  async incrementViews(contentId: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentViews = contentViews[contentId] ||
          mockEducationalContent.find(item => item.id === contentId)?.views || 0;
        contentViews[contentId] = currentViews + 1;
        resolve();
      }, 50);
    });
  },
};
