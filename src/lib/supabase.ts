import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type Database = {
  public: {
    Tables: {
      content_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon_name: string;
          color: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon_name?: string;
          color?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon_name?: string;
          color?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      content_types: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon_name: string;
          color: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon_name?: string;
          color?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          icon_name?: string;
          color?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      educational_content: {
        Row: {
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
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          full_content?: string | null;
          category_id?: string | null;
          content_type_id?: string | null;
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          author: string;
          published_date?: string;
          read_time_minutes?: number | null;
          duration_minutes?: number | null;
          views?: number;
          rating?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          full_content?: string | null;
          category_id?: string | null;
          content_type_id?: string | null;
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          author?: string;
          published_date?: string;
          read_time_minutes?: number | null;
          duration_minutes?: number | null;
          views?: number;
          rating?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      educational_content_tags: {
        Row: {
          id: string;
          content_id: string;
          tag: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          content_id: string;
          tag: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          content_id?: string;
          tag?: string;
          created_at?: string;
        };
      };
      user_bookmarks: {
        Row: {
          id: string;
          user_id: string;
          content_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
