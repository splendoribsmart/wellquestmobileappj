import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card, Badge, Button, Input, Switch, EmptyState } from '@components/ui';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { BookOpen, Bookmark, Star, Clock, Eye, X } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

interface EducationalContent {
  id: string;
  title: string;
  description: string;
  category: string;
  contentType: 'article' | 'video' | 'guide' | 'infographic';
  readTime?: number;
  duration?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  author: string;
  publishedDate: string;
  views: number;
  rating: number;
  isBookmarked: boolean;
}

const INITIAL_CONTENT: EducationalContent[] = [
  {
    id: '1',
    title: 'Understanding Your Heart Health',
    description: 'Learn about cardiovascular health, risk factors, and preventive measures to keep your heart healthy.',
    category: 'Cardiovascular',
    contentType: 'article',
    readTime: 8,
    difficulty: 'beginner',
    tags: ['heart', 'prevention', 'lifestyle'],
    author: 'Dr. Sarah Johnson',
    publishedDate: '2024-01-15',
    views: 1523,
    rating: 4.5,
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Managing Diabetes: A Comprehensive Guide',
    description: 'Complete guide to understanding diabetes management, blood sugar monitoring, and lifestyle adjustments.',
    category: 'Endocrine',
    contentType: 'guide',
    readTime: 15,
    difficulty: 'intermediate',
    tags: ['diabetes', 'blood sugar', 'diet'],
    author: 'Dr. Michael Chen',
    publishedDate: '2024-01-20',
    views: 2341,
    rating: 4.8,
    isBookmarked: false,
  },
  {
    id: '3',
    title: 'Nutrition Basics for Better Health',
    description: 'Essential nutrition information to help you make informed dietary choices for optimal health.',
    category: 'Nutrition',
    contentType: 'article',
    readTime: 10,
    difficulty: 'beginner',
    tags: ['nutrition', 'diet', 'wellness'],
    author: 'Emily Rodriguez, RD',
    publishedDate: '2024-01-25',
    views: 1876,
    rating: 4.3,
    isBookmarked: true,
  },
  {
    id: '4',
    title: 'Understanding Blood Pressure',
    description: 'Learn what blood pressure numbers mean, how to monitor them, and steps to maintain healthy levels.',
    category: 'Cardiovascular',
    contentType: 'video',
    duration: 12,
    difficulty: 'beginner',
    tags: ['blood pressure', 'monitoring', 'hypertension'],
    author: 'Dr. Lisa Thompson',
    publishedDate: '2024-02-01',
    views: 3124,
    rating: 4.7,
    isBookmarked: false,
  },
  {
    id: '5',
    title: 'Medication Management Tips',
    description: 'Best practices for organizing, tracking, and taking your medications safely and effectively.',
    category: 'General Health',
    contentType: 'guide',
    readTime: 12,
    difficulty: 'beginner',
    tags: ['medications', 'safety', 'adherence'],
    author: 'James Martinez, PharmD',
    publishedDate: '2024-02-05',
    views: 2567,
    rating: 4.6,
    isBookmarked: true,
  },
  {
    id: '6',
    title: 'Exercise and Heart Health',
    description: 'Discover the connection between physical activity and cardiovascular wellness with practical exercise tips.',
    category: 'Cardiovascular',
    contentType: 'infographic',
    readTime: 5,
    difficulty: 'beginner',
    tags: ['exercise', 'heart health', 'fitness'],
    author: 'Dr. Robert Kim',
    publishedDate: '2024-02-10',
    views: 1945,
    rating: 4.4,
    isBookmarked: false,
  },
  {
    id: '7',
    title: 'Mental Health and Chronic Illness',
    description: 'Understanding the emotional impact of chronic conditions and strategies for maintaining mental wellness.',
    category: 'Mental Health',
    contentType: 'article',
    readTime: 14,
    difficulty: 'intermediate',
    tags: ['mental health', 'coping', 'support'],
    author: 'Dr. Amanda Foster',
    publishedDate: '2024-02-15',
    views: 2198,
    rating: 4.9,
    isBookmarked: false,
  },
  {
    id: '8',
    title: 'Sleep and Health: The Connection',
    description: 'Explore how quality sleep affects your overall health and learn techniques for better rest.',
    category: 'General Health',
    contentType: 'article',
    readTime: 9,
    difficulty: 'beginner',
    tags: ['sleep', 'rest', 'wellness'],
    author: 'Dr. Patricia Lee',
    publishedDate: '2024-02-20',
    views: 1732,
    rating: 4.2,
    isBookmarked: false,
  },
];

function getFullContent(id: string): string {
  const contentMap: Record<string, string> = {
    '1': `Your heart is one of the most vital organs in your body, working tirelessly to pump blood and deliver oxygen and nutrients throughout your system. Understanding how to maintain cardiovascular health is essential for long-term wellness and quality of life.

Cardiovascular disease remains one of the leading causes of death worldwide, but many risk factors are within your control. By making informed lifestyle choices and understanding your personal risk factors, you can significantly reduce your chances of developing heart-related conditions.

Key risk factors for heart disease include high blood pressure, high cholesterol, smoking, obesity, physical inactivity, and diabetes. Family history and age also play important roles. Regular check-ups with your healthcare provider can help identify these risk factors early.

Maintaining a heart-healthy lifestyle involves several key components. A balanced diet rich in fruits, vegetables, whole grains, and lean proteins supports cardiovascular health. Regular physical activity, aiming for at least 150 minutes of moderate exercise per week, strengthens your heart and improves circulation.

Managing stress through relaxation techniques, adequate sleep, and social connections also benefits your heart. If you have existing risk factors, working closely with your healthcare team to manage conditions like high blood pressure or diabetes is crucial.

Remember, small, consistent changes in your daily habits can have a profound impact on your heart health over time. It's never too early or too late to start taking care of your cardiovascular system.`,

    '2': `Diabetes is a chronic condition that affects how your body processes blood sugar (glucose). Whether you have type 1, type 2, or gestational diabetes, understanding how to manage your condition is essential for maintaining good health and preventing complications.

Blood sugar monitoring is a cornerstone of diabetes management. Regular testing helps you understand how food, physical activity, medications, and stress affect your glucose levels. Your healthcare team will help you determine how often to test and what your target ranges should be.

Nutrition plays a critical role in diabetes management. Working with a registered dietitian can help you create a meal plan that maintains stable blood sugar levels while providing proper nutrition. Understanding carbohydrate counting, portion sizes, and the glycemic index of foods empowers you to make informed choices.

Physical activity helps your body use insulin more effectively and can lower blood sugar levels. Most people with diabetes benefit from at least 150 minutes of moderate-intensity aerobic activity per week, combined with strength training exercises.

Medication management, whether insulin or oral medications, requires careful attention to timing, dosing, and potential interactions. Never adjust your medications without consulting your healthcare provider.

Regular check-ups are essential for monitoring your overall health and screening for potential complications. Your healthcare team will monitor your A1C levels, check for eye problems, assess kidney function, and examine your feet regularly.

Living with diabetes requires daily attention, but with proper management, most people with diabetes can lead full, active lives. Stay connected with your healthcare team, join support groups if helpful, and remember that you're not alone in this journey.`,

    '3': `Good nutrition is foundational to overall health and wellness. What you eat affects everything from your energy levels and immune function to your risk of chronic diseases and mental health. Understanding basic nutrition principles helps you make informed choices that support your health goals.

Macronutrients - carbohydrates, proteins, and fats - provide the energy and building blocks your body needs. Carbohydrates are your body's primary energy source and should come mainly from whole grains, fruits, and vegetables rather than refined sugars. Proteins support tissue repair and immune function, while healthy fats are essential for hormone production and nutrient absorption.

Micronutrients, including vitamins and minerals, support countless bodily functions. A varied diet rich in colorful fruits and vegetables typically provides adequate micronutrients. However, some people may need supplements based on individual needs and deficiencies.

Hydration is often overlooked but crucial for optimal health. Water supports digestion, temperature regulation, nutrient transport, and countless other functions. Most adults need about 8-10 cups of fluids daily, though individual needs vary.

Portion control matters as much as food quality. Even healthy foods can contribute to weight gain if consumed in excess. Learning to recognize appropriate portion sizes and listening to your body's hunger and fullness cues helps maintain a healthy weight.

Meal planning and preparation can make healthy eating more convenient and sustainable. Taking time to plan meals, shop with a list, and prepare healthy options in advance reduces reliance on less nutritious convenience foods.

Remember, healthy eating is about progress, not perfection. Small, sustainable changes to your eating habits are more effective long-term than drastic, restrictive diets.`,
  };

  return contentMap[id] || `This is the full content for the selected resource. In a real implementation, this would contain comprehensive information about the topic.\n\nThe content would include detailed explanations, practical tips, evidence-based recommendations, and actionable steps you can take to improve your health.\n\nThis placeholder demonstrates how the full article would appear when opened in the modal view. The actual content would be much more extensive and informative, tailored to help you understand and manage your health effectively.\n\nRemember to always consult with your healthcare provider before making significant changes to your health routine or treatment plan.`;
}

export default function HealthLibraryScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

  const [content, setContent] = useState<EducationalContent[]>(INITIAL_CONTENT);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedContentType, setSelectedContentType] = useState('all');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [selectedContent, setSelectedContent] = useState<EducationalContent | null>(null);

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const toggleBookmark = (id: string) => {
    setContent((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedContentType('all');
    setShowBookmarkedOnly(false);
  };

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesContentType = selectedContentType === 'all' || item.contentType === selectedContentType;
    const matchesBookmark = !showBookmarkedOnly || item.isBookmarked;

    return matchesSearch && matchesCategory && matchesContentType && matchesBookmark;
  });

  const categories = ['all', ...Array.from(new Set(content.map((item) => item.category)))];
  const contentTypes = ['all', 'article', 'video', 'guide', 'infographic'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return theme.colors.feedback.success.bg;
      case 'intermediate':
        return theme.colors.feedback.warning.bg;
      case 'advanced':
        return theme.colors.feedback.danger.bg;
      default:
        return colors.textSecondary;
    }
  };

  const getTypeColor = (contentType: string): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    switch (contentType) {
      case 'article':
        return 'primary';
      case 'video':
        return 'success';
      case 'guide':
        return 'warning';
      case 'infographic':
        return 'info';
      default:
        return 'neutral';
    }
  };

  const renderResourceCard = ({ item }: { item: EducationalContent }) => (
    <View style={styles.card}>
      <Card>
      <View style={styles.cardHeader}>
        <Badge variant={getTypeColor(item.contentType) as any} size="sm">
          {item.contentType.toUpperCase()}
        </Badge>
        <TouchableOpacity onPress={() => toggleBookmark(item.id)} activeOpacity={0.7}>
          <Bookmark
            size={20}
            color={item.isBookmarked ? colors.primary : colors.textSecondary}
            fill={item.isBookmarked ? colors.primary : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.cardDescription, { color: colors.textSecondary }]} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.tagsRow}>
        {item.tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="neutral" size="sm">
            {tag}
          </Badge>
        ))}
      </View>

      <View style={styles.metadataRow}>
        <View style={styles.metadataItem}>
          <Clock size={14} color={colors.textSecondary} />
          <Text style={[styles.metadataText, { color: colors.textSecondary }]}>
            {item.readTime ? `${item.readTime} min` : `${item.duration} min`}
          </Text>
        </View>

        <View style={styles.metadataItem}>
          <Star size={14} color={theme.colors.feedback.warning.bg} fill={theme.colors.feedback.warning.bg} />
          <Text style={[styles.metadataText, { color: colors.textSecondary }]}>
            {item.rating.toFixed(1)}
          </Text>
        </View>

        <View style={styles.metadataItem}>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(item.difficulty) + '20' },
            ]}
          >
            <Text
              style={[
                styles.difficultyText,
                { color: getDifficultyColor(item.difficulty) },
              ]}
            >
              {item.difficulty}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardButton}>
        <Button
          onPress={() => setSelectedContent(item)}
          variant="primary"
          size="sm"
        >
          {item.contentType === 'video' ? 'Watch Now' : 'Read More'}
        </Button>
      </View>
      </Card>
    </View>
  );

  return (
    <View testID="screen-patient-health-library" style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Health Library" onMenuPress={handleMenuPress} />

      <ScrollView style={styles.container}>
        <View style={styles.filtersSection}>
          <View style={styles.searchInput}>
            <Input
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search articles, guides, videos..."
            />
          </View>

          <View style={[styles.pickerContainer, { backgroundColor: theme.colors.surface.alt, borderColor: colors.border }]}>
            <Text style={[styles.pickerLabel, { color: colors.textSecondary }]}>Category</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={setSelectedCategory}
              style={[styles.picker, { color: colors.text }]}
            >
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat === 'all' ? 'All Categories' : cat} value={cat} />
              ))}
            </Picker>
          </View>

          <View style={[styles.pickerContainer, { backgroundColor: theme.colors.surface.alt, borderColor: colors.border }]}>
            <Text style={[styles.pickerLabel, { color: colors.textSecondary }]}>Type</Text>
            <Picker
              selectedValue={selectedContentType}
              onValueChange={setSelectedContentType}
              style={[styles.picker, { color: colors.text }]}
            >
              {contentTypes.map((type) => (
                <Picker.Item key={type} label={type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)} value={type} />
              ))}
            </Picker>
          </View>

          <View style={styles.switchRow}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>Show Bookmarked Only</Text>
            <Switch checked={showBookmarkedOnly} onChange={setShowBookmarkedOnly} />
          </View>

          <Text style={[styles.resultsText, { color: colors.textSecondary }]}>
            {filteredContent.length} Result{filteredContent.length !== 1 ? 's' : ''} Found
          </Text>
        </View>

        {filteredContent.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <EmptyState
              icon={<BookOpen size={48} color={colors.textSecondary} />}
              title="No content found"
              description="Try adjusting your filters or search terms"
            />
            <View style={styles.resetButton}>
              <Button onPress={resetFilters} variant="primary" size="md">
                Reset Filters
              </Button>
            </View>
          </View>
        ) : (
          <FlatList
            data={filteredContent}
            renderItem={renderResourceCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </ScrollView>

      <Modal
        visible={selectedContent !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedContent(null)}
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Article Details</Text>
            <TouchableOpacity onPress={() => setSelectedContent(null)} activeOpacity={0.7}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {selectedContent && (
            <ScrollView style={styles.modalContent}>
              <Text style={[styles.articleTitle, { color: colors.text }]}>
                {selectedContent.title}
              </Text>

              <View style={styles.articleMeta}>
                <Badge variant={getTypeColor(selectedContent.contentType) as any} size="sm">
                  {selectedContent.contentType.toUpperCase()}
                </Badge>
                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(selectedContent.difficulty) + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(selectedContent.difficulty) },
                    ]}
                  >
                    {selectedContent.difficulty}
                  </Text>
                </View>
              </View>

              <View style={styles.articleInfo}>
                <Text style={[styles.articleInfoText, { color: colors.textSecondary }]}>
                  By {selectedContent.author}
                </Text>
                <Text style={[styles.articleInfoText, { color: colors.textSecondary }]}>
                  Published: {new Date(selectedContent.publishedDate).toLocaleDateString()}
                </Text>
                <View style={styles.articleStats}>
                  <View style={styles.statItem}>
                    <Eye size={14} color={colors.textSecondary} />
                    <Text style={[styles.statText, { color: colors.textSecondary }]}>
                      {selectedContent.views} views
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Star size={14} color={theme.colors.feedback.warning.bg} fill={theme.colors.feedback.warning.bg} />
                    <Text style={[styles.statText, { color: colors.textSecondary }]}>
                      {selectedContent.rating.toFixed(1)}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Clock size={14} color={colors.textSecondary} />
                    <Text style={[styles.statText, { color: colors.textSecondary }]}>
                      {selectedContent.readTime ? `${selectedContent.readTime} min read` : `${selectedContent.duration} min`}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.tagsSection}>
                {selectedContent.tags.map((tag, index) => (
                  <Badge key={index} variant="info" size="sm">
                    {tag}
                  </Badge>
                ))}
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <Text style={[styles.articleBody, { color: colors.text }]}>
                {getFullContent(selectedContent.id)}
              </Text>

              <View style={styles.modalActions}>
                <View style={styles.actionButton}>
                  <Button
                    onPress={() => toggleBookmark(selectedContent.id)}
                    variant={selectedContent.isBookmarked ? 'primary' : 'secondary'}
                    size="md"
                  >
                    {selectedContent.isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </Button>
                </View>
                <View style={styles.actionButton}>
                  <Button
                    onPress={() => setSelectedContent(null)}
                    variant="secondary"
                    size="md"
                  >
                    Close
                  </Button>
                </View>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersSection: {
    padding: 16,
    gap: 12,
  },
  searchInput: {
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerLabel: {
    fontSize: 12,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  picker: {
    height: 50,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  resultsText: {
    fontSize: 14,
    marginTop: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metadataText: {
    fontSize: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  cardButton: {
    marginTop: 4,
  },
  emptyStateContainer: {
    padding: 32,
    alignItems: 'center',
  },
  resetButton: {
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    lineHeight: 32,
  },
  articleMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  articleInfo: {
    marginBottom: 16,
  },
  articleInfoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  articleStats: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  articleBody: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  modalActions: {
    gap: 12,
    paddingBottom: 24,
  },
  actionButton: {
    width: '100%',
  },
});
