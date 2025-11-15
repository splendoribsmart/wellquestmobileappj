import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Send } from 'lucide-react-native';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isBookmarked?: boolean;
  suggestions?: string[];
}

const INITIAL_BOT_MESSAGE: Message = {
  id: '1',
  sender: 'bot',
  content: `Hi! I'm your caregiver assistant. I'm here to support you in caring for your loved one.\n\nHere's how I can help:\n• Provide guidance on caregiving tasks\n• Offer tips for managing medications\n• Help coordinate care with healthcare providers\n• Share self-care advice for caregivers\n• Answer questions about care routines\n\nWhat would you like to know?`,
  timestamp: new Date(),
  suggestions: [
    'How do I track medications?',
    'Tips for managing daily care tasks',
    'How to communicate with doctors',
    'Self-care advice for caregivers',
  ],
};

function generateBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
    return `⚠️ If this is a medical emergency, please call emergency services immediately.\n\nFor urgent but non-emergency concerns, contact your loved one's healthcare provider right away.\n\nI'm here to help with general caregiving guidance and coordination.`;
  }

  if (lowerMessage.includes('medication') || lowerMessage.includes('medicine') || lowerMessage.includes('pills')) {
    return `Medication management tips for caregivers:\n\n• Keep an updated list of all medications, doses, and schedules\n• Use a pill organizer to sort medications by day and time\n• Set reminders on your phone for medication times\n• Keep medications in their original containers\n• Note any side effects and report them to the doctor\n• Never adjust doses without consulting the healthcare provider\n• Keep a record of when medications are refilled\n\nConsider using a medication tracking app or the reminders feature in this app.`;
  }

  if (lowerMessage.includes('doctor') || lowerMessage.includes('appointment') || lowerMessage.includes('communicate') || lowerMessage.includes('healthcare provider')) {
    return `Tips for communicating with healthcare providers:\n\n• Keep a notebook of questions and concerns\n• Write down symptoms, changes, or issues you've noticed\n• Bring a list of current medications to every appointment\n• Ask for clarification if you don't understand something\n• Request written instructions for care tasks\n• Consider recording appointments (with permission) to review later\n• Don't hesitate to call between appointments with concerns\n\nRemember: You are your loved one's advocate. Your observations are valuable.`;
  }

  if (lowerMessage.includes('self-care') || lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('burnout')) {
    return `Self-care is essential for caregivers:\n\n• Take regular breaks, even if they're short\n• Accept help from family and friends when offered\n• Join a caregiver support group\n• Maintain your own health appointments\n• Make time for activities you enjoy\n• Get adequate sleep when possible\n• Consider respite care to get time for yourself\n• Talk to someone about your feelings\n\nRemember: Taking care of yourself isn't selfish—it helps you be a better caregiver.`;
  }

  if (lowerMessage.includes('daily') || lowerMessage.includes('routine') || lowerMessage.includes('schedule') || lowerMessage.includes('organize')) {
    return `Creating manageable daily care routines:\n\n• Establish a consistent daily schedule\n• Break tasks into smaller, manageable steps\n• Prioritize essential tasks first\n• Build in flexibility for unexpected needs\n• Use checklists to stay organized\n• Prepare items the night before\n• Set realistic expectations for what you can accomplish\n\nA predictable routine can reduce stress for both you and your loved one.`;
  }

  if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eating') || lowerMessage.includes('nutrition')) {
    return `Nutrition and meal management tips:\n\n• Plan meals ahead of time when possible\n• Keep healthy, easy-to-prepare foods on hand\n• Consider meal prep or delivery services\n• Note any dietary restrictions or preferences\n• Make mealtimes pleasant and unhurried\n• Stay hydrated throughout the day\n• Watch for changes in appetite or eating habits\n\nIf you notice significant changes in eating patterns, discuss with the healthcare provider.`;
  }

  if (lowerMessage.includes('mobility') || lowerMessage.includes('walking') || lowerMessage.includes('movement') || lowerMessage.includes('transfer')) {
    return `Mobility and safety considerations:\n\n• Ensure pathways are clear of obstacles\n• Use assistive devices as recommended\n• Learn proper techniques for transfers and lifting\n• Install grab bars and safety equipment\n• Keep frequently used items within easy reach\n• Ensure good lighting in all areas\n• Consider a physical therapy consultation for proper techniques\n\nYour safety is important too—always use proper body mechanics.`;
  }

  if (lowerMessage.includes('track') || lowerMessage.includes('record') || lowerMessage.includes('log')) {
    return `Keeping organized care records:\n\n• Maintain a health journal with daily notes\n• Track symptoms, behaviors, and mood changes\n• Record vital signs if monitoring is needed\n• Keep copies of medical records and test results\n• Document care tasks completed\n• Note questions for the next doctor visit\n• Take photos of concerning symptoms or conditions\n\nGood records help healthcare providers make informed decisions.`;
  }

  return `I'm here to help with caregiving questions. Here are some topics I can assist with:\n\n• Medication management\n• Daily care routines and organization\n• Communicating with healthcare providers\n• Nutrition and meal planning\n• Mobility and safety\n• Self-care for caregivers\n• Tracking health information\n\nWhat specific topic would you like to explore?`;
}

export default function AssistantScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([INITIAL_BOT_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: trimmedMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        content: generateBotResponse(trimmedMessage),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <View testID="screen-caregiver-assistant" style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="AI Assistant" onMenuPress={handleMenuPress} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={scrollToBottom}
        >
          {messages.map((message) => (
            <View key={message.id}>
              <View
                style={[
                  styles.messageWrapper,
                  message.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    message.sender === 'user'
                      ? { backgroundColor: colors.primary }
                      : { backgroundColor: theme.colors.surface.alt, borderColor: colors.border },
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      { color: message.sender === 'user' ? colors.onPrimary : colors.text },
                    ]}
                  >
                    {message.content}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.timestamp,
                    { color: colors.textSecondary },
                    message.sender === 'user' ? styles.timestampRight : styles.timestampLeft,
                  ]}
                >
                  {formatTime(message.timestamp)}
                </Text>
              </View>

              {message.suggestions && message.suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  {message.suggestions.map((suggestion, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.suggestionChip, { borderColor: colors.border }]}
                      onPress={() => handleSuggestionPress(suggestion)}
                    >
                      <Text style={[styles.suggestionText, { color: colors.primary }]}>
                        {suggestion}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}

          {isTyping && (
            <View style={styles.botMessageWrapper}>
              <View
                style={[
                  styles.messageBubble,
                  styles.typingBubble,
                  { backgroundColor: theme.colors.surface.alt, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.typingText, { color: colors.textSecondary }]}>...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.surface.alt,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Ask a question about caregiving..."
            placeholderTextColor={colors.textSecondary}
            multiline
            maxLength={500}
            onSubmitEditing={handleSendMessage}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: inputMessage.trim() ? colors.primary : colors.border,
              },
            ]}
            onPress={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send size={20} color={inputMessage.trim() ? colors.onPrimary : colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: '85%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  botMessageWrapper: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  timestampRight: {
    textAlign: 'right',
  },
  timestampLeft: {
    textAlign: 'left',
  },
  typingBubble: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  typingText: {
    fontSize: 20,
    letterSpacing: 2,
  },
  suggestionsContainer: {
    marginTop: 8,
    marginBottom: 8,
    gap: 8,
  },
  suggestionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
