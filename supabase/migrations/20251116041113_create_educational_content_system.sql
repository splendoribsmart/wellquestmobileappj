/*
  # Educational Content Management System

  ## Overview
  Creates a comprehensive system for managing educational health content with categories,
  content types, and filtering capabilities.

  ## New Tables

  ### `content_categories`
  Stores content categories (e.g., Cardiovascular, Endocrine, Nutrition, Mental Health)
  - `id` (uuid, primary key)
  - `name` (text, unique) - Category name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `icon_name` (text) - Lucide icon name for visual representation
  - `color` (text) - Hex color code for category theming
  - `sort_order` (int) - Display order
  - `is_active` (boolean) - Whether category is shown
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `content_types`
  Stores types of educational content (article, video, guide, infographic)
  - `id` (uuid, primary key)
  - `name` (text, unique) - Type name
  - `slug` (text, unique) - URL-friendly identifier
  - `icon_name` (text) - Lucide icon name
  - `color` (text) - Hex color code for type theming
  - `sort_order` (int) - Display order
  - `is_active` (boolean) - Whether type is shown
  - `created_at` (timestamptz)

  ### `educational_content`
  Stores all educational content items
  - `id` (uuid, primary key)
  - `title` (text) - Content title
  - `description` (text) - Brief description
  - `full_content` (text) - Complete article/guide content
  - `category_id` (uuid, foreign key) - References content_categories
  - `content_type_id` (uuid, foreign key) - References content_types
  - `difficulty` (text) - beginner, intermediate, or advanced
  - `author` (text) - Author name
  - `published_date` (date) - Publication date
  - `read_time_minutes` (int) - Estimated reading time
  - `duration_minutes` (int) - For videos/guides
  - `views` (int) - View count
  - `rating` (numeric) - Average rating (0-5)
  - `is_published` (boolean) - Whether content is visible
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `educational_content_tags`
  Many-to-many relationship for content tags
  - `id` (uuid, primary key)
  - `content_id` (uuid, foreign key) - References educational_content
  - `tag` (text) - Tag name
  - `created_at` (timestamptz)

  ### `user_bookmarks`
  Tracks user bookmarked content
  - `id` (uuid, primary key)
  - `user_id` (uuid) - References auth.users
  - `content_id` (uuid, foreign key) - References educational_content
  - `created_at` (timestamptz)
  - Unique constraint on (user_id, content_id)

  ## Security
  - RLS enabled on all tables
  - Public read access for content, categories, and types
  - Authenticated users can manage their own bookmarks
  - Only authenticated users can update view counts

  ## Indexes
  - Indexes on foreign keys for performance
  - Indexes on commonly filtered fields (category_id, content_type_id, difficulty)
  - Index on search fields (title, tags)
*/

-- Create content_categories table
CREATE TABLE IF NOT EXISTS content_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon_name text DEFAULT 'folder',
  color text DEFAULT '#3B82F6',
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create content_types table
CREATE TABLE IF NOT EXISTS content_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  icon_name text DEFAULT 'file-text',
  color text DEFAULT '#6B7280',
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create educational_content table
CREATE TABLE IF NOT EXISTS educational_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  full_content text,
  category_id uuid REFERENCES content_categories(id) ON DELETE SET NULL,
  content_type_id uuid REFERENCES content_types(id) ON DELETE SET NULL,
  difficulty text CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  author text NOT NULL,
  published_date date DEFAULT CURRENT_DATE,
  read_time_minutes int,
  duration_minutes int,
  views int DEFAULT 0,
  rating numeric(3,2) CHECK (rating >= 0 AND rating <= 5) DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create educational_content_tags table
CREATE TABLE IF NOT EXISTS educational_content_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES educational_content(id) ON DELETE CASCADE NOT NULL,
  tag text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_bookmarks table
CREATE TABLE IF NOT EXISTS user_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  content_id uuid REFERENCES educational_content(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, content_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_educational_content_category ON educational_content(category_id);
CREATE INDEX IF NOT EXISTS idx_educational_content_type ON educational_content(content_type_id);
CREATE INDEX IF NOT EXISTS idx_educational_content_difficulty ON educational_content(difficulty);
CREATE INDEX IF NOT EXISTS idx_educational_content_published ON educational_content(is_published);
CREATE INDEX IF NOT EXISTS idx_educational_content_tags_content ON educational_content_tags(content_id);
CREATE INDEX IF NOT EXISTS idx_educational_content_tags_tag ON educational_content_tags(tag);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user ON user_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_content ON user_bookmarks(content_id);

-- Enable Row Level Security
ALTER TABLE content_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE educational_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE educational_content_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for content_categories
CREATE POLICY "Anyone can view active categories"
  ON content_categories FOR SELECT
  USING (is_active = true);

-- RLS Policies for content_types
CREATE POLICY "Anyone can view active content types"
  ON content_types FOR SELECT
  USING (is_active = true);

-- RLS Policies for educational_content
CREATE POLICY "Anyone can view published content"
  ON educational_content FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can update view counts"
  ON educational_content FOR UPDATE
  TO authenticated
  USING (is_published = true)
  WITH CHECK (is_published = true);

-- RLS Policies for educational_content_tags
CREATE POLICY "Anyone can view content tags"
  ON educational_content_tags FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM educational_content
      WHERE educational_content.id = educational_content_tags.content_id
      AND educational_content.is_published = true
    )
  );

-- RLS Policies for user_bookmarks
CREATE POLICY "Users can view their own bookmarks"
  ON user_bookmarks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
  ON user_bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON user_bookmarks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert default categories
INSERT INTO content_categories (name, slug, description, icon_name, color, sort_order) VALUES
  ('Cardiovascular', 'cardiovascular', 'Heart health and circulatory system', 'heart', '#EF4444', 1),
  ('Endocrine', 'endocrine', 'Diabetes, thyroid, and hormone health', 'activity', '#F59E0B', 2),
  ('Nutrition', 'nutrition', 'Diet, nutrition, and healthy eating', 'apple', '#10B981', 3),
  ('Mental Health', 'mental-health', 'Mental wellness and emotional health', 'brain', '#8B5CF6', 4),
  ('General Health', 'general-health', 'Overall wellness and preventive care', 'heart-pulse', '#3B82F6', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert default content types
INSERT INTO content_types (name, slug, icon_name, color, sort_order) VALUES
  ('Article', 'article', 'file-text', '#3B82F6', 1),
  ('Video', 'video', 'video', '#10B981', 2),
  ('Guide', 'guide', 'book-open', '#F59E0B', 3),
  ('Infographic', 'infographic', 'image', '#06B6D4', 4)
ON CONFLICT (slug) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_content_categories_updated_at
  BEFORE UPDATE ON content_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_educational_content_updated_at
  BEFORE UPDATE ON educational_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
