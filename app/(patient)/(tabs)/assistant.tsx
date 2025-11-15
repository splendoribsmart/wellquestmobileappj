import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Button, Input, Avatar, Badge } from '@components/ui';
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
  content: `Hi! I'm your health assistant. I'm here to help you manage your health journey.\n\nHere's how I can help:\n• Answer questions about your health conditions\n• Provide guidance on tracking symptoms\n• Offer tips for medication management\n• Help you prepare for appointments\n\nWhat would you like to know?`,
  timestamp: new Date(),
  suggestions: [
    'How should I track my blood sugar?',
    'What should I ask before my next appointment?',
    'Tips for managing my medications',
    'Help with tracking symptoms',
  ],
};

function generateBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
    return `⚠️ If this feels urgent or severe, please contact your local emergency services or your clinician immediately.\n\nFor non-emergency concerns, I'm here to help with general health guidance and tracking.`;
  }

  if (lowerMessage.includes('blood sugar') || lowerMessage.includes('glucose')) {
    return `Here's some guidance on blood sugar management:\n\n• Target blood sugar levels vary by individual - consult your doctor\n• Track readings before and after meals\n• Note any patterns or unusual readings\n• Keep a log of what you eat and your activity\n\nRemember to discuss your specific targets with your healthcare provider.`;
  }

  if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
    return `Medication management tips:\n\n• Take medications as prescribed by your doctor\n• Use the Reminders tab to set up medication alerts\n• Keep a list of all your medications\n• Note any side effects and report them to your doctor\n• Never stop or change medications without consulting your healthcare provider`;
  }

  if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
    return `Healthy eating tips:\n\n• Focus on whole foods: vegetables, fruits, lean proteins\n• Stay hydrated throughout the day\n• Watch portion sizes\n• Limit processed foods and added sugars\n• Consider keeping a food diary\n\nFor personalized dietary advice, consult with a registered dietitian or your healthcare provider.`;
  }

  if (lowerMessage.includes('exercise') || lowerMessage.includes('activity')) {
    return `Physical activity guidance:\n\n• Start slowly and gradually increase activity\n• Aim for at least 150 minutes of moderate activity per week\n• Include both cardio and strength training\n• Listen to your body and rest when needed\n• Always consult your doctor before starting a new exercise program`;
  }

  if (lowerMessage.includes('symptom') || lowerMessage.includes('feel') || lowerMessage.includes('pain')) {
    return `Symptom tracking advice:\n\n• Use the Symptoms tab to log what you're experiencing\n• Note the severity, time, and any triggers\n• Track patterns over time\n• Share this information with your healthcare provider\n\nIf symptoms are severe or concerning, contact your doctor right away.`;
  }

  if (lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
    return `Preparing for appointments:\n\n• Write down your questions beforehand\n• Bring a list of current medications\n• Note any new symptoms or concerns\n• Consider bringing a family member or friend\n• Ask for clarification if you don't understand something\n\nUse the Reminders tab to set appointment notifications.`;
  }

  return `I'm here to help with your health questions. Here are some topics I can assist with:\n\n• Blood sugar and diabetes management\n• Medication reminders and safety\n• Diet and nutrition tips\n• Exercise and physical activity\n• Symptom tracking\n• Appointment preparation\n\nWhat specific topic would you like to explore?`;
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
    <View testID="screen-patient-assistant" style={{ flex: 1, backgroundColor: colors.background }}>
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
                <View style={styles.messageRow}>
                  {message.sender === 'bot' && (
                    <Avatar
                      initials="AI"
                      size="sm"
                    />
                  )}
                  <View style={styles.messageContent}>
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
                  {message.sender === 'user' && (
                    <Avatar
                      initials="JD"
                      size="sm"
                    />
                  )}
                </View>
              </View>

              {message.suggestions && message.suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  {message.suggestions.map((suggestion, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSuggestionPress(suggestion)}
                      activeOpacity={0.7}
                    >
                      <Badge variant="info" size="md">
                        {suggestion}
                      </Badge>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}

          {isTyping && (
            <View style={styles.botMessageWrapper}>
              <View style={styles.messageRow}>
                <Avatar
                  initials="AI"
                  size="sm"
                />
                <View style={styles.messageContent}>
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
              </View>
            </View>
          )}
        </ScrollView>

        <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <View style={styles.inputWrapper}>
            <Input
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Ask a question about your health..."
              multiline
              maxLength={500}
              onSubmitEditing={handleSendMessage}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: inputMessage.trim() ? colors.primary : colors.border,
              },
            ]}
            onPress={handleSendMessage}
            disabled={!inputMessage.trim()}
            activeOpacity={0.7}
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
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  messageContent: {
    flex: 1,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flex: 1,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});
