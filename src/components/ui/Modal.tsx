import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '@theme/index';
import { X } from 'lucide-react-native';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const { theme } = useTheme();

  const getModalWidth = () => {
    switch (size) {
      case 'sm':
        return '80%';
      case 'md':
        return '90%';
      case 'lg':
        return '95%';
      case 'full':
        return '100%';
      default:
        return '90%';
    }
  };

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={[
              styles.modalContainer,
              {
                width: getModalWidth(),
                backgroundColor: theme.colors.surface.bg,
                borderRadius: theme.borderRadius.xl,
                maxHeight: size === 'full' ? '100%' : '90%',
              },
            ]}
          >
            <View
              style={[
                styles.header,
                {
                  borderBottomWidth: theme.borderWidth.hairline,
                  borderBottomColor: theme.colors.surface.border,
                  paddingHorizontal: theme.spacing[4],
                  paddingVertical: theme.spacing[3],
                },
              ]}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.lg,
                  fontFamily: theme.typography.fontFamily.semibold,
                  color: theme.colors.text.primary,
                  flex: 1,
                }}
              >
                {title}
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={{
                  padding: theme.spacing[1],
                }}
              >
                <X size={24} color={theme.colors.text.muted} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.content}
              contentContainerStyle={{
                padding: theme.spacing[4],
              }}
            >
              {children}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    maxWidth: 600,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
});
