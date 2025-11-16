import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card, Badge, Button, Input, Switch, EmptyState, FilterChip } from '@components/ui';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import {
  BookOpen,
  Bookmark,
  Star,
  Clock,
  Eye,
  X,
  Play,
  FileText,
  Video as VideoIcon,
  Image as ImageIcon,
  Heart,
  Activity,
  Apple,
  Brain,
  Stethoscope,
} from 'lucide-react-native';
import {
  contentService,
  EducationalContent,
  Category,
  ContentType,
} from '@services/contentService';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  heart: Heart,
  activity: Activity,
  apple: Apple,
  brain: Brain,
  'heart-pulse': Stethoscope,
  'file-text': FileText,
  video: VideoIcon,
  'book-open': BookOpen,
  image: ImageIcon,
};

export default function HealthLibraryScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

  const [content, setContent] = useState<EducationalContent[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [selectedContentTypeId, setSelectedContentTypeId] = useState<string>('all');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [selectedContent, setSelectedContent] = useState<EducationalContent | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterContent();
  }, [searchTerm, selectedCategoryId, selectedContentTypeId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [categoriesData, typesData, contentData, catCounts, typeCounts] = await Promise.all([
        contentService.getCategories(),
        contentService.getContentTypes(),
        contentService.getContent(),
        contentService.getCategoryCounts(),
        contentService.getContentTypeCounts(),
      ]);

      setCategories(categoriesData);
      setContentTypes(typesData);
      setContent(contentData);
      setCategoryCounts(catCounts);
      setTypeCounts(typeCounts);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContent = async () => {
    const filtered = await contentService.getContent({
      searchTerm,
      categoryId: selectedCategoryId,
      contentTypeId: selectedContentTypeId,
    });
    setContent(filtered);
  };

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const toggleBookmark = (id: string) => {
    setContent((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_bookmarked: !item.is_bookmarked } : item
      )
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategoryId('all');
    setSelectedContentTypeId('all');
    setShowBookmarkedOnly(false);
  };

  const filteredContent = showBookmarkedOnly
    ? content.filter((item) => item.is_bookmarked)
    : content;

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

  const getTypeVariant = (
    contentType: string
  ): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    switch (contentType) {
      case 'Article':
        return 'primary';
      case 'Video':
        return 'success';
      case 'Guide':
        return 'warning';
      case 'Infographic':
        return 'info';
      default:
        return 'neutral';
    }
  };

  const getCategoryIcon = (iconName: string) => {
    const IconComponent = ICON_MAP[iconName] || BookOpen;
    return IconComponent;
  };

  const getContentTypeIcon = (iconName: string) => {
    const IconComponent = ICON_MAP[iconName] || FileText;
    return IconComponent;
  };

  const getTotalCount = () => {
    return Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
  };

  const renderResourceCard = ({ item }: { item: EducationalContent }) => {
    const cardHeader = (
      <View style={styles.cardHeader}>
        <Badge variant={getTypeVariant(item.content_types?.name || '')} size="sm">
          {item.content_types?.name.toUpperCase() || 'CONTENT'}
        </Badge>
        <TouchableOpacity onPress={() => toggleBookmark(item.id)} activeOpacity={0.7}>
          <Bookmark
            size={20}
            color={item.is_bookmarked ? colors.primary : colors.textSecondary}
            fill={item.is_bookmarked ? colors.primary : 'transparent'}
          />
        </TouchableOpacity>
      </View>
    );

    const cardFooter = (
      <Button
        onPress={() => {
          setSelectedContent(item);
          contentService.incrementViews(item.id);
        }}
        variant="primary"
        size="sm"
      >
        {item.content_types?.slug === 'video' ? 'Watch Now' : 'Read More'}
      </Button>
    );

    return (
      <View style={styles.card}>
        <Card header={cardHeader} footer={cardFooter}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.cardDescription, { color: colors.textSecondary }]} numberOfLines={2}>
            {item.description}
          </Text>

          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsRow}>
              {item.tags.slice(0, 3).map((tagObj, index) => (
                <Badge key={index} variant="neutral" size="sm">
                  {tagObj.tag}
                </Badge>
              ))}
            </View>
          )}

          <View style={styles.metadataRow}>
            <View style={styles.metadataItem}>
              <Clock size={14} color={colors.textSecondary} />
              <Text style={[styles.metadataText, { color: colors.textSecondary }]}>
                {item.read_time_minutes
                  ? `${item.read_time_minutes} min`
                  : `${item.duration_minutes} min`}
              </Text>
            </View>

            <View style={styles.metadataItem}>
              <Star
                size={14}
                color={theme.colors.feedback.warning.bg}
                fill={theme.colors.feedback.warning.bg}
              />
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
                  style={[styles.difficultyText, { color: getDifficultyColor(item.difficulty) }]}
                >
                  {item.difficulty}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <TopBar title="Health Library" onMenuPress={handleMenuPress} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading content...
          </Text>
        </View>
      </View>
    );
  }

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

          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            style={styles.filterToggle}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterToggleText, { color: colors.primary }]}>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Text>
          </TouchableOpacity>

          {showFilters && (
            <>
              <View style={styles.filterSection}>
                <Text style={[styles.filterLabel, { color: colors.text }]}>Categories</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipContainer}
                >
                  <FilterChip
                    label="All"
                    isSelected={selectedCategoryId === 'all'}
                    onPress={() => setSelectedCategoryId('all')}
                    count={getTotalCount()}
                  />
                  {categories.map((category) => {
                    const IconComponent = getCategoryIcon(category.icon_name);
                    return (
                      <FilterChip
                        key={category.id}
                        label={category.name}
                        isSelected={selectedCategoryId === category.id}
                        onPress={() => setSelectedCategoryId(category.id)}
                        icon={
                          <IconComponent
                            size={14}
                            color={
                              selectedCategoryId === category.id ? '#FFFFFF' : category.color
                            }
                          />
                        }
                        count={categoryCounts[category.id] || 0}
                      />
                    );
                  })}
                </ScrollView>
              </View>

              <View style={styles.filterSection}>
                <Text style={[styles.filterLabel, { color: colors.text }]}>Content Type</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipContainer}
                >
                  <FilterChip
                    label="All Types"
                    isSelected={selectedContentTypeId === 'all'}
                    onPress={() => setSelectedContentTypeId('all')}
                    count={getTotalCount()}
                  />
                  {contentTypes.map((type) => {
                    const IconComponent = getContentTypeIcon(type.icon_name);
                    return (
                      <FilterChip
                        key={type.id}
                        label={type.name}
                        isSelected={selectedContentTypeId === type.id}
                        onPress={() => setSelectedContentTypeId(type.id)}
                        icon={
                          <IconComponent
                            size={14}
                            color={selectedContentTypeId === type.id ? '#FFFFFF' : type.color}
                          />
                        }
                        count={typeCounts[type.id] || 0}
                      />
                    );
                  })}
                </ScrollView>
              </View>

              <View style={styles.switchRow}>
                <Text style={[styles.switchLabel, { color: colors.text }]}>
                  Show Bookmarked Only
                </Text>
                <Switch checked={showBookmarkedOnly} onChange={setShowBookmarkedOnly} />
              </View>
            </>
          )}

          <View style={styles.resultsHeader}>
            <Text style={[styles.resultsText, { color: colors.textSecondary }]}>
              {filteredContent.length} Result{filteredContent.length !== 1 ? 's' : ''} Found
            </Text>
            {(selectedCategoryId !== 'all' ||
              selectedContentTypeId !== 'all' ||
              searchTerm !== '' ||
              showBookmarkedOnly) && (
              <TouchableOpacity onPress={resetFilters} activeOpacity={0.7}>
                <Text style={[styles.clearFilters, { color: colors.primary }]}>Clear Filters</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {filteredContent.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <EmptyState
              icon={<BookOpen size={48} color={colors.textSecondary} />}
              title="No content found"
              description="Try adjusting your filters or search terms"
              actionLabel="Reset Filters"
              onAction={resetFilters}
            />
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
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {selectedContent?.content_types?.slug === 'video' ? 'Video Details' : 'Article Details'}
            </Text>
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
                <Badge variant={getTypeVariant(selectedContent.content_types?.name || '')} size="sm">
                  {selectedContent.content_types?.name.toUpperCase() || 'CONTENT'}
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
                  Published: {new Date(selectedContent.published_date).toLocaleDateString()}
                </Text>
                <View style={styles.articleStats}>
                  <View style={styles.statItem}>
                    <Eye size={14} color={colors.textSecondary} />
                    <Text style={[styles.statText, { color: colors.textSecondary }]}>
                      {selectedContent.views} views
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Star
                      size={14}
                      color={theme.colors.feedback.warning.bg}
                      fill={theme.colors.feedback.warning.bg}
                    />
                    <Text style={[styles.statText, { color: colors.textSecondary }]}>
                      {selectedContent.rating.toFixed(1)}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Clock size={14} color={colors.textSecondary} />
                    <Text style={[styles.statText, { color: colors.textSecondary }]}>
                      {selectedContent.read_time_minutes
                        ? `${selectedContent.read_time_minutes} min read`
                        : `${selectedContent.duration_minutes} min`}
                    </Text>
                  </View>
                </View>
              </View>

              {selectedContent.tags && selectedContent.tags.length > 0 && (
                <View style={styles.tagsSection}>
                  {selectedContent.tags.map((tagObj, index) => (
                    <Badge key={index} variant="info" size="sm">
                      {tagObj.tag}
                    </Badge>
                  ))}
                </View>
              )}

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              {selectedContent.content_types?.slug === 'video' ? (
                <View style={styles.videoContainer}>
                  <View style={[styles.videoPlaceholder, { backgroundColor: colors.border }]}>
                    <View style={[styles.playButtonContainer, { backgroundColor: colors.primary }]}>
                      <Play size={48} color="#FFFFFF" fill="#FFFFFF" />
                    </View>
                  </View>
                  <View style={styles.videoControls}>
                    <View style={styles.videoControlsRow}>
                      <Text style={[styles.videoControlText, { color: colors.textSecondary }]}>
                        0:00
                      </Text>
                      <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                        <View
                          style={[
                            styles.progressFill,
                            { backgroundColor: colors.primary, width: '0%' },
                          ]}
                        />
                      </View>
                      <Text style={[styles.videoControlText, { color: colors.textSecondary }]}>
                        {selectedContent.duration_minutes}:00
                      </Text>
                    </View>
                  </View>
                  <View style={styles.videoDescription}>
                    <Text style={[styles.videoDescriptionTitle, { color: colors.text }]}>
                      About this video
                    </Text>
                    <Text style={[styles.videoDescriptionText, { color: colors.textSecondary }]}>
                      {selectedContent.description}
                    </Text>
                    {selectedContent.full_content && (
                      <Text
                        style={[
                          styles.videoDescriptionText,
                          { color: colors.textSecondary, marginTop: 12 },
                        ]}
                      >
                        {selectedContent.full_content}
                      </Text>
                    )}
                  </View>
                </View>
              ) : (
                <Text style={[styles.articleBody, { color: colors.text }]}>
                  {selectedContent.full_content || selectedContent.description}
                </Text>
              )}

              <View style={styles.modalActions}>
                <Button
                  onPress={() => toggleBookmark(selectedContent.id)}
                  variant={selectedContent.is_bookmarked ? 'primary' : 'secondary'}
                  size="md"
                >
                  {selectedContent.is_bookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
                <Button onPress={() => setSelectedContent(null)} variant="secondary" size="md">
                  Close
                </Button>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
  },
  filtersSection: {
    padding: 16,
    gap: 16,
  },
  searchInput: {
    marginBottom: 4,
  },
  filterToggle: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  filterToggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterSection: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  chipContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
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
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsText: {
    fontSize: 14,
  },
  clearFilters: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 16,
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
  emptyStateContainer: {
    padding: 32,
    alignItems: 'center',
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
  videoContainer: {
    marginBottom: 24,
  },
  videoPlaceholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  playButtonContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  videoControls: {
    marginTop: 16,
  },
  videoControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  videoControlText: {
    fontSize: 12,
    fontWeight: '500',
    minWidth: 40,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  videoDescription: {
    marginTop: 24,
  },
  videoDescriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  videoDescriptionText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
