import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';
import {
  Button,
  Input,
  TextArea,
  Card,
  Badge,
  Tabs,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Progress,
  Avatar,
  Banner,
  EmptyState,
  ErrorState,
  OfflineBanner,
} from '@components/ui';
import { Heart, Mail, User, Send, Trash2 } from 'lucide-react-native';

export default function UIDemoScreen() {
  const { theme } = useTheme();

  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioChecked, setRadioChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [activeTab, setActiveTab] = useState('tab1');
  const [showBanner, setShowBanner] = useState(true);

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={{ marginBottom: theme.spacing[6] }}>
      <Text
        style={{
          fontSize: theme.typography.fontSize.xl,
          fontFamily: theme.typography.fontFamily.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing[3],
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );

  return (
    <View testID="screen-ui-demo" style={[styles.container, { backgroundColor: theme.colors.surface.alt }]}>
      <ScrollView contentContainerStyle={{ padding: theme.spacing[4] }}>
        <Text
          style={{
            fontSize: theme.typography.fontSize['3xl'],
            fontFamily: theme.typography.fontFamily.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing[6],
          }}
        >
          UI Component Library
        </Text>

        <Section title="Buttons">
          <View style={{ gap: theme.spacing[3] }}>
            <View style={{ flexDirection: 'row', gap: theme.spacing[2], flexWrap: 'wrap' }}>
              <Button onPress={() => {}} variant="primary" size="sm" title="Small Primary" />
              <Button onPress={() => {}} variant="primary" size="md" title="Medium Primary" />
              <Button onPress={() => {}} variant="primary" size="lg" title="Large Primary" />
            </View>
            <View style={{ flexDirection: 'row', gap: theme.spacing[2], flexWrap: 'wrap' }}>
              <Button onPress={() => {}} variant="primary" title="Primary" />
              <Button onPress={() => {}} variant="secondary" title="Secondary" />
              <Button onPress={() => {}} variant="danger" title="Danger" />
            </View>
            <View style={{ flexDirection: 'row', gap: theme.spacing[2], flexWrap: 'wrap' }}>
              <Button onPress={() => {}} variant="ghost" title="Ghost" />
              <Button onPress={() => {}} variant="outline" title="Outline" />
            </View>
            <View style={{ flexDirection: 'row', gap: theme.spacing[2], flexWrap: 'wrap' }}>
              <Button onPress={() => {}} variant="primary" title="With Icon" leftIcon={<Heart size={20} color="#fff" />} />
              <Button onPress={() => {}} variant="primary" isLoading title="Loading" />
              <Button onPress={() => {}} variant="primary" disabled title="Disabled" />
            </View>
          </View>
        </Section>

        <Section title="Inputs">
          <View style={{ gap: theme.spacing[3] }}>
            <Input
              label="Email"
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Enter your email"
              leftIcon={<Mail size={20} color={theme.colors.text.muted} />}
            />
            <Input
              label="With Helper Text"
              value=""
              onChangeText={() => {}}
              placeholder="Enter text"
              helperText="This is helper text to guide the user"
            />
            <Input
              label="With Error"
              value=""
              onChangeText={() => {}}
              placeholder="Enter text"
              errorText="This field is required"
            />
            <Input
              label="Disabled"
              value="Disabled input"
              onChangeText={() => {}}
              isDisabled
            />
          </View>
        </Section>

        <Section title="TextArea">
          <TextArea
            label="Message"
            value={textAreaValue}
            onChangeText={setTextAreaValue}
            placeholder="Enter your message"
            minHeight={120}
          />
        </Section>

        <Section title="Cards">
          <View style={{ gap: theme.spacing[3] }}>
            <Card variant="default">
              <Text style={{ fontSize: theme.typography.fontSize.base, color: theme.colors.text.primary }}>
                Default Card
              </Text>
            </Card>
            <Card variant="bordered">
              <Text style={{ fontSize: theme.typography.fontSize.base, color: theme.colors.text.primary }}>
                Bordered Card
              </Text>
            </Card>
            <Card variant="elevated">
              <Text style={{ fontSize: theme.typography.fontSize.base, color: theme.colors.text.primary }}>
                Elevated Card
              </Text>
            </Card>
            <Card
              variant="bordered"
              header={
                <Text style={{ fontSize: theme.typography.fontSize.lg, fontFamily: theme.typography.fontFamily.semibold, color: theme.colors.text.primary }}>
                  Card with Header & Footer
                </Text>
              }
              footer={
                <View style={{ flexDirection: 'row', gap: theme.spacing[2] }}>
                  <Button onPress={() => {}} variant="primary" size="sm" title="Action" />
                  <Button onPress={() => {}} variant="ghost" size="sm" title="Cancel" />
                </View>
              }
            >
              <Text style={{ fontSize: theme.typography.fontSize.base, color: theme.colors.text.muted }}>
                This card has a header and footer section with actions.
              </Text>
            </Card>
          </View>
        </Section>

        <Section title="Badges">
          <View style={{ flexDirection: 'row', gap: theme.spacing[2], flexWrap: 'wrap' }}>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </View>
          <View style={{ flexDirection: 'row', gap: theme.spacing[2], flexWrap: 'wrap', marginTop: theme.spacing[3] }}>
            <Badge size="sm" variant="primary">Small</Badge>
            <Badge size="md" variant="primary">Medium</Badge>
            <Badge variant="success" icon={<Heart size={12} color="#fff" />}>With Icon</Badge>
          </View>
        </Section>

        <Section title="Tabs">
          <Tabs
            tabs={[
              { key: 'tab1', label: 'Overview' },
              { key: 'tab2', label: 'Details' },
              { key: 'tab3', label: 'Settings' },
            ]}
            activeKey={activeTab}
            onChange={setActiveTab}
          />
          <View style={{ marginTop: theme.spacing[3] }}>
            <Card variant="bordered">
              <Text style={{ fontSize: theme.typography.fontSize.base, color: theme.colors.text.primary }}>
                Active Tab: {activeTab}
              </Text>
            </Card>
          </View>
        </Section>

        <Section title="Form Controls">
          <View style={{ gap: theme.spacing[4] }}>
            <Checkbox
              label="I agree to the terms and conditions"
              checked={checkboxChecked}
              onChange={setCheckboxChecked}
            />
            <Radio
              label="Enable notifications"
              checked={radioChecked}
              onChange={setRadioChecked}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: theme.typography.fontSize.base, color: theme.colors.text.primary }}>
                Dark Mode
              </Text>
              <Switch checked={switchChecked} onChange={setSwitchChecked} />
            </View>
            <View>
              <Text style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.primary, marginBottom: theme.spacing[2] }}>
                Volume: {sliderValue}
              </Text>
              <Slider value={sliderValue} onValueChange={setSliderValue} min={0} max={100} />
            </View>
          </View>
        </Section>

        <Section title="Progress">
          <View style={{ gap: theme.spacing[3] }}>
            <Progress value={25} variant="default" showLabel />
            <Progress value={50} variant="success" showLabel />
            <Progress value={75} variant="warning" showLabel />
            <Progress value={90} variant="danger" showLabel />
          </View>
        </Section>

        <Section title="Avatars">
          <View style={{ flexDirection: 'row', gap: theme.spacing[4], alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar size="sm" initials="SM" />
            <Avatar size="md" initials="MD" />
            <Avatar size="lg" initials="LG" />
            <Avatar size="md" initials="JD" status="online" />
            <Avatar size="md" initials="AS" status="away" />
            <Avatar size="md" initials="OF" status="offline" />
          </View>
        </Section>

        <Section title="Banners">
          <View style={{ gap: theme.spacing[3] }}>
            {showBanner && (
              <Banner
                variant="info"
                title="Information"
                description="This is an informational banner"
                onClose={() => setShowBanner(false)}
              />
            )}
            <Banner
              variant="success"
              title="Success"
              description="Your changes have been saved successfully"
            />
            <Banner
              variant="warning"
              title="Warning"
              description="Your session will expire in 5 minutes"
            />
            <Banner
              variant="danger"
              title="Error"
              description="Failed to save your changes. Please try again."
            />
          </View>
        </Section>

        <Section title="Offline Banner">
          <OfflineBanner onRetry={() => console.log('Retry connection')} />
        </Section>

        <Section title="Empty State">
          <Card variant="bordered">
            <EmptyState
              title="No Data Found"
              description="There are no items to display at this time. Try adding some items to get started."
              actionLabel="Add Item"
              onAction={() => console.log('Add item')}
            />
          </Card>
        </Section>

        <Section title="Error State">
          <Card variant="bordered">
            <ErrorState
              title="Something Went Wrong"
              description="We encountered an error while loading this content. Please try again."
              onRetry={() => console.log('Retry')}
            />
          </Card>
        </Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
