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
  content: `Hello Dr. Smith! I'm your clinical AI assistant. I'm here to support your clinical decision-making and workflow.\n\nHere's how I can help:\n• Answer clinical questions and evidence-based guidelines\n• Provide drug interaction checks and dosing information\n• Help with differential diagnoses\n• Summarize recent clinical research\n• Assist with documentation and coding\n\nWhat would you like assistance with today?`,
  timestamp: new Date(),
  suggestions: [
    'Check drug interactions for a patient',
    'Latest guidelines for hypertension management',
    'Differential diagnosis for chest pain',
    'ICD-10 codes for diabetes',
  ],
};

function generateBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('drug') || lowerMessage.includes('interaction') || lowerMessage.includes('medication')) {
    return `For comprehensive drug interaction checks:\n\n• Always verify patient's complete medication list\n• Consider over-the-counter medications and supplements\n• Check for food-drug interactions\n• Review patient's renal and hepatic function\n• Consult pharmacist for complex cases\n\nRemember to document any medication changes and counsel patients on potential interactions.`;
  }

  if (lowerMessage.includes('guideline') || lowerMessage.includes('protocol')) {
    return `Clinical guidelines to consider:\n\n• Review current evidence-based recommendations\n• Check for updates from professional societies\n• Consider patient-specific factors and comorbidities\n• Discuss treatment options with the patient\n• Document shared decision-making process\n\nAlways verify guidelines are current and applicable to your patient population.`;
  }

  if (lowerMessage.includes('diagnosis') || lowerMessage.includes('differential')) {
    return `Approach to differential diagnosis:\n\n• Gather comprehensive history and physical exam\n• Consider common conditions first (common things are common)\n• Rule out life-threatening conditions\n• Order appropriate diagnostic tests\n• Reassess as new information becomes available\n• Consider specialist consultation when appropriate\n\nDocument your clinical reasoning and decision-making process.`;
  }

  if (lowerMessage.includes('code') || lowerMessage.includes('icd') || lowerMessage.includes('billing')) {
    return `Documentation and coding tips:\n\n• Use specific ICD-10 codes that reflect patient's condition\n• Document medical necessity for services provided\n• Include appropriate level of detail for complexity\n• Review coding guidelines regularly\n• Consider coding specialist consultation for complex cases\n\nProper documentation supports quality care and appropriate reimbursement.`;
  }

  if (lowerMessage.includes('research') || lowerMessage.includes('study') || lowerMessage.includes('evidence')) {
    return `Evaluating clinical evidence:\n\n• Assess study design and quality\n• Consider sample size and population relevance\n• Review statistical significance and clinical significance\n• Check for conflicts of interest\n• Look for systematic reviews and meta-analyses\n\nIntegrate evidence with clinical expertise and patient values.`;
  }

  if (lowerMessage.includes('patient') || lowerMessage.includes('care plan')) {
    return `Patient care management:\n\n• Develop individualized treatment plans\n• Set realistic, measurable goals with patients\n• Schedule appropriate follow-up\n• Coordinate with care team members\n• Address social determinants of health\n\nPatient-centered care improves outcomes and satisfaction.`;
  }

  return `I'm here to assist with:\n\n• Clinical decision support and guidelines\n• Drug information and interactions\n• Differential diagnosis assistance\n• Documentation and coding guidance\n• Evidence-based medicine reviews\n• Care coordination support\n\nWhat specific clinical question can I help you with?`;
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
    <View testID="screen-clinician-assistant" style={{ flex: 1, backgroundColor: colors.background }}>
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
                      initials="DS"
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
              placeholder="Ask a clinical question..."
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
