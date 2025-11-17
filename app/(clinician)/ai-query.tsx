import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import {
  Button,
  Card,
  TextArea,
  Banner,
  Badge,
  Progress,
} from '@components/ui';
import {
  Brain,
  Bookmark,
  Copy,
  Clock,
  AlertTriangle,
} from 'lucide-react-native';

type ClinicianAIQueryResult = {
  id: string;
  query: string;
  response: string;
  confidence: number;
  sources: string[];
  timestamp: string;
};

const SUGGESTED_QUERIES: string[] = [
  'What are the contraindications for ACE inhibitors?',
  'How to adjust insulin dosage for patients with kidney disease?',
  'Latest guidelines for hypertension management in pregnancy',
  'Best practices for wound care in diabetic patients',
  'Drug interactions between warfarin and common antibiotics',
  'Recommended screening intervals for Type 2 diabetes complications',
];

const RECENT_QUERIES: {
  id: string;
  query: string;
  timestamp: string;
  confidence: number;
}[] = [
  {
    id: '1',
    query: 'Management of atrial fibrillation in elderly patients',
    timestamp: '2025-11-17T10:30:00Z',
    confidence: 0.94,
  },
  {
    id: '2',
    query: 'Contraindications for metformin therapy',
    timestamp: '2025-11-17T09:15:00Z',
    confidence: 0.89,
  },
  {
    id: '3',
    query: 'Beta blocker selection for heart failure patients',
    timestamp: '2025-11-16T16:45:00Z',
    confidence: 0.92,
  },
];

const CHARACTER_LIMIT = 2000;

export default function AiQueryScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] =
    useState<ClinicianAIQueryResult | null>(null);

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleClear = () => {
    setQuery('');
  };

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) return;

    setIsLoading(true);

    setTimeout(() => {
      const mockResponse: ClinicianAIQueryResult = {
        id: Math.random().toString(36).substring(7),
        query: trimmedQuery,
        response: generateMockResponse(trimmedQuery),
        confidence: 0.88 + Math.random() * 0.1,
        sources: [
          'Clinical Guidelines 2024',
          'NEJM Evidence Review',
          'UpToDate Clinical Decision Support',
          'AHA/ACC Clinical Practice Guidelines',
        ],
        timestamp: new Date().toISOString(),
      };

      setCurrentResponse(mockResponse);
      setQuery('');
      setIsLoading(false);
    }, 1800);
  };

  const generateMockResponse = (userQuery: string): string => {
    return `For the query: "${userQuery}"\n\nSummary\n\nBased on current clinical evidence and best practice guidelines, the following key considerations apply:\n\n• Primary considerations: Clinical assessment should include a comprehensive evaluation of patient history, current medications, and contraindications. Evidence-based protocols recommend individualized treatment approaches.\n\n• Monitoring requirements: Regular follow-up is essential to assess treatment efficacy and identify potential adverse effects. Laboratory monitoring intervals should be determined based on patient-specific factors and clinical stability.\n\n• Special populations: Dose adjustments may be necessary for patients with renal or hepatic impairment, elderly patients, or those with multiple comorbidities. Careful consideration of drug-drug interactions is crucial.\n\nClinical Recommendations\n\nCurrent guidelines emphasize shared decision-making with patients and caregivers. Treatment plans should be tailored to individual patient needs, preferences, and clinical circumstances. Regular reassessment and modification of therapy may be warranted based on patient response and emerging evidence.\n\nAdditional Considerations\n\nHealthcare providers should remain vigilant for signs of treatment complications and maintain awareness of updated clinical guidelines. Consultation with specialists may be appropriate for complex cases or when standard therapies are ineffective.`;
  };

  const handleSuggestedQuery = (suggestedQuery: string) => {
    setQuery(suggestedQuery);
  };

  const handleRecentQuery = (recentQuery: string) => {
    setQuery(recentQuery);
  };

  const handleBookmark = () => {
    console.log('Bookmark response');
  };

  const handleCopy = () => {
    console.log('Copy response to clipboard');
  };

  const formatTimestamp = (isoTimestamp: string): string => {
    const date = new Date(isoTimestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatResponseDate = (isoTimestamp: string): string => {
    const date = new Date(isoTimestamp);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View
      testID="screen-clinician-ai-query"
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <TopBar title="Clinical Search" onMenuPress={handleMenuPress} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { padding: theme.spacing[4] },
        ]}
      >
        <View style={{ gap: theme.spacing[4] }}>
          <View style={{ gap: theme.spacing[2] }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: theme.spacing[2],
              }}
            >
              <Brain size={24} color={theme.colors.primary.bg} />
              <Text
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontFamily: theme.typography.fontFamily.bold,
                  color: theme.colors.text.primary,
                }}
              >
                Clinical Information Search
              </Text>
            </View>
            <Text
              style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text.muted,
                lineHeight: theme.typography.lineHeight.base,
              }}
            >
              Search evidence-based guidance to support your clinical decisions.
              Information is for reference only.
            </Text>
          </View>

          <Card variant="bordered">
            <View style={{ gap: theme.spacing[3] }}>
              <TextArea
                placeholder="E.g., Search clinical guidelines for Type 2 diabetes management in elderly patients with kidney disease"
                value={query}
                onChangeText={setQuery}
                minHeight={120}
                isDisabled={isLoading}
                maxLength={CHARACTER_LIMIT}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.muted,
                  }}
                >
                  {query.length}/{CHARACTER_LIMIT} characters
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: theme.spacing[2],
                  }}
                >
                  <Button
                    title="Clear"
                    onPress={handleClear}
                    variant="outline"
                    size="sm"
                    disabled={query.trim().length === 0 || isLoading}
                  />
                  <Button
                    title={isLoading ? 'Searching...' : 'Search'}
                    onPress={handleSearch}
                    variant="primary"
                    size="sm"
                    isLoading={isLoading}
                    disabled={query.trim().length === 0 || isLoading}
                  />
                </View>
              </View>
            </View>
          </Card>

          {currentResponse ? (
            <Card variant="bordered">
              <View style={{ gap: theme.spacing[4] }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: theme.spacing[2],
                    }}
                  >
                    <Brain size={20} color={theme.colors.primary.bg} />
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.lg,
                        fontFamily: theme.typography.fontFamily.semibold,
                        color: theme.colors.text.primary,
                      }}
                    >
                      Search Results
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: theme.spacing[2],
                    }}
                  >
                    <TouchableOpacity
                      onPress={handleBookmark}
                      style={styles.actionButton}
                    >
                      <Bookmark size={20} color={theme.colors.text.muted} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleCopy}
                      style={styles.actionButton}
                    >
                      <Copy size={20} color={theme.colors.text.muted} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ gap: theme.spacing[2] }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        fontFamily: theme.typography.fontFamily.medium,
                        color: theme.colors.text.primary,
                      }}
                    >
                      Data Completeness
                    </Text>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        fontFamily: theme.typography.fontFamily.semibold,
                        color: theme.colors.primary.bg,
                      }}
                    >
                      {Math.round(currentResponse.confidence * 100)}%
                    </Text>
                  </View>
                  <Progress
                    value={currentResponse.confidence * 100}
                    variant="default"
                  />
                </View>

                <Banner
                  variant="warning"
                  title="Clinical reference only"
                  description="Information shown here is for reference and does not replace your clinical judgment or local guidelines."
                />

                <View style={{ gap: theme.spacing[3] }}>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.primary,
                      lineHeight: theme.typography.lineHeight.base * 1.5,
                    }}
                  >
                    {currentResponse.response}
                  </Text>
                </View>

                <View style={{ gap: theme.spacing[3] }}>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.semibold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    Sources
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: theme.spacing[2],
                    }}
                  >
                    {currentResponse.sources.map((source, index) => (
                      <Badge key={index} variant="info" size="sm">
                        {source}
                      </Badge>
                    ))}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: theme.spacing[2],
                  }}
                >
                  <Clock size={14} color={theme.colors.text.muted} />
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.muted,
                    }}
                  >
                    Generated at {formatResponseDate(currentResponse.timestamp)}
                  </Text>
                </View>
              </View>
            </Card>
          ) : (
            <Card variant="bordered">
              <View style={{ gap: theme.spacing[3] }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.text.primary,
                  }}
                >
                  Suggested searches
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.muted,
                  }}
                >
                  Try one of these common clinical queries to get started
                </Text>
                <View style={{ gap: theme.spacing[2] }}>
                  {SUGGESTED_QUERIES.map((suggestedQuery, index) => (
                    <Button
                      key={index}
                      title={suggestedQuery}
                      onPress={() => handleSuggestedQuery(suggestedQuery)}
                      variant="outline"
                      size="sm"
                      disabled={isLoading}
                    />
                  ))}
                </View>
              </View>
            </Card>
          )}

          <Card variant="bordered">
            <View style={{ gap: theme.spacing[3] }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.lg,
                  fontFamily: theme.typography.fontFamily.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                Recent searches
              </Text>
              <View style={{ gap: theme.spacing[3] }}>
                {RECENT_QUERIES.map((recentQuery, index) => (
                  <View key={recentQuery.id}>
                    <TouchableOpacity
                      onPress={() => handleRecentQuery(recentQuery.query)}
                      disabled={isLoading}
                      style={{ opacity: isLoading ? 0.5 : 1 }}
                    >
                      <View style={{ gap: theme.spacing[1] }}>
                        <Text
                          style={{
                            fontSize: theme.typography.fontSize.base,
                            color: theme.colors.text.primary,
                          }}
                          numberOfLines={2}
                        >
                          {recentQuery.query}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.text.muted,
                            }}
                          >
                            {formatTimestamp(recentQuery.timestamp)}
                          </Text>
                          <Text
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              fontFamily: theme.typography.fontFamily.medium,
                              color: theme.colors.primary.bg,
                            }}
                          >
                            {Math.round(recentQuery.confidence * 100)}%
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    {index < RECENT_QUERIES.length - 1 && (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: theme.colors.surface.border,
                          marginTop: theme.spacing[3],
                        }}
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </Card>

          <Card variant="bordered">
            <View style={{ gap: theme.spacing[3] }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: theme.spacing[2],
                }}
              >
                <AlertTriangle
                  size={20}
                  color={theme.colors.text.primary}
                />
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.text.primary,
                  }}
                >
                  Search tips
                </Text>
              </View>
              <View style={{ gap: theme.spacing[2] }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: theme.spacing[2],
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.primary,
                    }}
                  >
                    •
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.primary,
                      lineHeight: theme.typography.lineHeight.base * 1.4,
                    }}
                  >
                    Be specific about patient demographics and conditions
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: theme.spacing[2],
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.primary,
                    }}
                  >
                    •
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.primary,
                      lineHeight: theme.typography.lineHeight.base * 1.4,
                    }}
                  >
                    Include comorbidities or organ function when relevant
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: theme.spacing[2],
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.primary,
                    }}
                  >
                    •
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.primary,
                      lineHeight: theme.typography.lineHeight.base * 1.4,
                    }}
                  >
                    Use this as a reference and verify with current guidelines
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: theme.spacing[2],
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.primary,
                    }}
                  >
                    •
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.primary,
                      lineHeight: theme.typography.lineHeight.base * 1.4,
                    }}
                  >
                    Always apply clinical judgment alongside AI-generated
                    information
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  actionButton: {
    padding: 8,
  },
});
