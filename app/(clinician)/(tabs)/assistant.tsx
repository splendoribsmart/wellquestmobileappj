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
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isPinned?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'assistant',
    content: `Hi, I'm your clinical assistant. I can help you draft notes, prep visits, or explain guidelines.`,
    timestamp: new Date(),
  },
  {
    id: '2',
    sender: 'assistant',
    content: `You can ask me to:\n• Summarize a visit in SOAP format\n• Suggest follow-up questions for patients\n• Explain lab results in lay terms for patient education\n• Draft documentation templates\n• Review red flags and escalation protocols`,
    timestamp: new Date(),
  },
];

function generateAssistantResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('emergency') || lowerMessage.includes('red flag') || lowerMessage.includes('urgent')) {
    return `⚠️ Important: Use your clinical judgement and follow your local escalation protocols. This assistant doesn't replace your medical decision-making.\n\nFor red flag assessment:\n• Apply clinical reasoning to the specific case\n• Consider vital signs and patient context\n• Follow your institution's escalation pathways\n• Document your assessment and decision-making\n• When in doubt, consult senior colleagues`;
  }

  if (lowerMessage.includes('summary') || lowerMessage.includes('summarize') || lowerMessage.includes('soap')) {
    return `Here's a framework for visit summaries (SOAP format):\n\n**Subjective:**\n• Chief complaint in patient's words\n• History of present illness\n• Relevant review of systems\n\n**Objective:**\n• Vital signs\n• Physical exam findings\n• Relevant test results\n\n**Assessment:**\n• Problem list with clinical reasoning\n• Differential diagnoses considered\n\n**Plan:**\n• Interventions, prescriptions, referrals\n• Follow-up timeline\n• Safety-netting advice given`;
  }

  if (lowerMessage.includes('follow-up') || lowerMessage.includes('plan') || lowerMessage.includes('next steps')) {
    return `Follow-up planning considerations:\n\n• Set clear timeline based on condition severity\n• Provide specific monitoring instructions\n• Give safety-netting advice: "Return if..."\n• Arrange tests or referrals as needed\n• Confirm patient understanding of plan\n• Document shared decision-making\n\nSample safety-netting:\n"If symptoms worsen, new symptoms develop, or you have concerns, please contact us or seek urgent care."`;
  }

  if (lowerMessage.includes('labs') || lowerMessage.includes('results') || lowerMessage.includes('test')) {
    return `Tips for explaining results to patients:\n\n• Use simple language, avoid jargon\n• Relate numbers to normal ranges in context\n• Explain clinical significance, not just values\n• Address what it means for their care\n• Check patient understanding\n\nExample:\n"Your blood sugar was 180. We like to see it below 130 before meals. This tells us we may need to adjust your medication to better control your diabetes."`;
  }

  if (lowerMessage.includes('education') || lowerMessage.includes('explain to patient') || lowerMessage.includes('patient education')) {
    return `Patient education principles:\n\n• Use teach-back method: "Can you explain back..."\n• Avoid medical jargon; use analogies\n• Focus on what matters to the patient\n• Provide written materials when possible\n• Check health literacy level\n• Allow time for questions\n\nRemember: Understanding ≠ Agreement. Respect patient autonomy while ensuring informed decisions.`;
  }

  if (lowerMessage.includes('documentation') || lowerMessage.includes('note') || lowerMessage.includes('chart')) {
    return `Documentation best practices:\n\n• Be clear, concise, and objective\n• Document clinical reasoning\n• Include patient's own words for subjective\n• Note who was present, interpreter use\n• Record counseling and consent discussions\n• Avoid copy-paste errors\n\n⚠️ Privacy reminder: Never paste identifiable patient information into external AI tools. This assistant is for general guidance only.`;
  }

  if (lowerMessage.includes('diagnosis') || lowerMessage.includes('differential') || lowerMessage.includes('ddx')) {
    return `Differential diagnosis approach:\n\n• Start with patient's presentation and context\n• Consider common diagnoses first (horses, not zebras)\n• Include serious/life-threatening conditions\n• Use framework: VINDICATE, SOAP, or system-based\n• Document your clinical reasoning\n• Revise as new information emerges\n\nAlways consider: What am I most worried about? What can't I miss?`;
  }

  if (lowerMessage.includes('prescription') || lowerMessage.includes('medication') || lowerMessage.includes('drug')) {
    return `Prescribing considerations:\n\n• Verify allergies and interactions\n• Check renal/hepatic function for dose adjustment\n• Consider patient factors: age, pregnancy, comorbidities\n• Provide clear instructions to patient\n• Document indication in chart\n• Consider cost and formulary status\n• Set follow-up for medication effectiveness\n\nAlways use clinical decision support tools and formularies at point of care.`;
  }

  return `I'm here to help with clinical workflows. Here are some areas I can assist with:\n\n• Visit summaries and SOAP notes\n• Patient education strategies\n• Follow-up planning and safety-netting\n• Documentation guidance\n• Explaining results in lay terms\n• Differential diagnosis frameworks\n• Prescribing considerations\n\nWhat would you like help with?`;
}

export default function AssistantScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
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
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: generateAssistantResponse(trimmedMessage),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantResponse]);
      setIsTyping(false);
    }, 1500);
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
      <TopBar title="Assistant" onMenuPress={handleMenuPress} />
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
                  message.sender === 'user' ? styles.userMessageWrapper : styles.assistantMessageWrapper,
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
            </View>
          ))}

          {isTyping && (
            <View style={styles.assistantMessageWrapper}>
              <View
                style={[
                  styles.messageBubble,
                  styles.typingBubble,
                  { backgroundColor: theme.colors.surface.alt, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.typingText, { color: colors.textSecondary }]}>
                  Assistant is thinking...
                </Text>
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
            placeholder="Ask about a case, workflow, or explanation…"
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
  assistantMessageWrapper: {
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
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  typingText: {
    fontSize: 14,
    fontStyle: 'italic',
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
