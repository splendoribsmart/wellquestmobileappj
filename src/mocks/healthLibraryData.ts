export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_name: string;
  color: string;
  sort_order: number;
}

export interface ContentType {
  id: string;
  name: string;
  slug: string;
  icon_name: string;
  color: string;
  sort_order: number;
}

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  full_content: string | null;
  category_id: string | null;
  content_type_id: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  author: string;
  published_date: string;
  read_time_minutes: number | null;
  duration_minutes: number | null;
  views: number;
  rating: number;
  categories?: Category;
  content_types?: ContentType;
  tags?: Array<{ tag: string }>;
  is_bookmarked?: boolean;
}

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Heart Health',
    slug: 'heart-health',
    description: 'Cardiovascular health and wellness',
    icon_name: 'heart',
    color: '#EF4444',
    sort_order: 1,
  },
  {
    id: '2',
    name: 'Nutrition',
    slug: 'nutrition',
    description: 'Healthy eating and dietary guidance',
    icon_name: 'apple',
    color: '#10B981',
    sort_order: 2,
  },
  {
    id: '3',
    name: 'Mental Health',
    slug: 'mental-health',
    description: 'Mental wellness and emotional health',
    icon_name: 'brain',
    color: '#8B5CF6',
    sort_order: 3,
  },
  {
    id: '4',
    name: 'Exercise & Fitness',
    slug: 'exercise-fitness',
    description: 'Physical activity and fitness guidance',
    icon_name: 'activity',
    color: '#F59E0B',
    sort_order: 4,
  },
  {
    id: '5',
    name: 'General Health',
    slug: 'general-health',
    description: 'General health information and tips',
    icon_name: 'heart-pulse',
    color: '#3B82F6',
    sort_order: 5,
  },
];

export const mockContentTypes: ContentType[] = [
  {
    id: '1',
    name: 'Article',
    slug: 'article',
    icon_name: 'file-text',
    color: '#3B82F6',
    sort_order: 1,
  },
  {
    id: '2',
    name: 'Video',
    slug: 'video',
    icon_name: 'video',
    color: '#EF4444',
    sort_order: 2,
  },
  {
    id: '3',
    name: 'Guide',
    slug: 'guide',
    icon_name: 'book-open',
    color: '#10B981',
    sort_order: 3,
  },
  {
    id: '4',
    name: 'Infographic',
    slug: 'infographic',
    icon_name: 'image',
    color: '#F59E0B',
    sort_order: 4,
  },
];

export const mockEducationalContent: EducationalContent[] = [
  {
    id: '1',
    title: 'Understanding Blood Pressure: A Complete Guide',
    description:
      'Learn about blood pressure, what the numbers mean, and how to maintain healthy levels through lifestyle changes and medication when necessary.',
    full_content:
      'Blood pressure is the force of blood pushing against the walls of your arteries. When your heart beats, it pumps blood into the arteries. Your blood pressure is highest when your heart beats, pumping the blood. This is called systolic pressure. When your heart is at rest, between beats, your blood pressure falls. This is called diastolic pressure.\n\nA blood pressure reading uses these two numbers. Usually, the systolic number comes before or above the diastolic number. A reading of 120/80 or lower is considered normal. High blood pressure is 140/90 or higher.\n\nLifestyle changes can help manage blood pressure: maintaining a healthy weight, eating a balanced diet low in sodium, exercising regularly, limiting alcohol, and managing stress.',
    category_id: '1',
    content_type_id: '3',
    difficulty: 'beginner',
    author: 'Dr. Sarah Mitchell',
    published_date: '2025-01-15',
    read_time_minutes: 8,
    duration_minutes: null,
    views: 1247,
    rating: 4.8,
    tags: [{ tag: 'blood pressure' }, { tag: 'cardiovascular' }, { tag: 'prevention' }],
  },
  {
    id: '2',
    title: 'Heart-Healthy Mediterranean Diet Basics',
    description:
      'Discover the principles of the Mediterranean diet and how it can improve your cardiovascular health with delicious, nutritious meals.',
    full_content:
      'The Mediterranean diet is inspired by the eating habits of countries bordering the Mediterranean Sea. It emphasizes vegetables, fruits, whole grains, beans, nuts, and olive oil as the primary sources of dietary fats.\n\nKey components include: eating primarily plant-based foods, replacing butter with healthy fats like olive oil, using herbs and spices instead of salt, limiting red meat to a few times a month, eating fish and poultry at least twice a week, and enjoying meals with family and friends.\n\nResearch shows this diet can reduce the risk of heart disease, stroke, and type 2 diabetes while promoting healthy weight management.',
    category_id: '2',
    content_type_id: '1',
    difficulty: 'beginner',
    author: 'Chef Maria Rodriguez, RD',
    published_date: '2025-01-10',
    read_time_minutes: 6,
    duration_minutes: null,
    views: 2341,
    rating: 4.9,
    tags: [{ tag: 'diet' }, { tag: 'heart health' }, { tag: 'nutrition' }],
  },
  {
    id: '3',
    title: 'Stress Management Techniques for Better Mental Health',
    description:
      'Practical strategies to manage daily stress, including mindfulness, breathing exercises, and time management techniques.',
    full_content:
      'Chronic stress can significantly impact both physical and mental health. Learning effective stress management techniques is essential for overall wellness.\n\nEffective techniques include: Deep breathing exercises - practice 4-7-8 breathing for immediate calm; Progressive muscle relaxation - systematically tense and relax muscle groups; Mindfulness meditation - focus on the present moment without judgment; Regular exercise - physical activity releases endorphins; Time management - prioritize tasks and set realistic goals.\n\nImplementing even a few of these strategies daily can lead to noticeable improvements in stress levels and overall well-being.',
    category_id: '3',
    content_type_id: '1',
    difficulty: 'beginner',
    author: 'Dr. James Chen, Psychologist',
    published_date: '2025-01-08',
    read_time_minutes: 7,
    duration_minutes: null,
    views: 1876,
    rating: 4.7,
    tags: [{ tag: 'stress' }, { tag: 'mental health' }, { tag: 'mindfulness' }],
  },
  {
    id: '4',
    title: 'Beginner-Friendly Cardio Exercises',
    description:
      'Start your fitness journey with these easy-to-follow cardio exercises that can be done at home without equipment.',
    full_content: null,
    category_id: '4',
    content_type_id: '2',
    difficulty: 'beginner',
    author: 'Mike Thompson, CPT',
    published_date: '2025-01-05',
    read_time_minutes: null,
    duration_minutes: 15,
    views: 3421,
    rating: 4.6,
    tags: [{ tag: 'exercise' }, { tag: 'cardio' }, { tag: 'beginners' }],
  },
  {
    id: '5',
    title: 'Understanding Cholesterol: Good vs Bad',
    description:
      'Learn the difference between HDL and LDL cholesterol, why it matters, and how to maintain healthy cholesterol levels.',
    full_content:
      'Cholesterol is a waxy substance found in your blood. Your body needs cholesterol to build healthy cells, but high levels can increase your risk of heart disease.\n\nThere are two types: LDL (low-density lipoprotein) - often called "bad" cholesterol because it can build up in artery walls; HDL (high-density lipoprotein) - known as "good" cholesterol because it carries cholesterol back to the liver for removal.\n\nHealthy levels: Total cholesterol below 200 mg/dL, LDL below 100 mg/dL, HDL 60 mg/dL or higher. Improve levels through diet (reduce saturated fats, add omega-3s), exercise regularly, maintain healthy weight, and quit smoking.',
    category_id: '1',
    content_type_id: '1',
    difficulty: 'intermediate',
    author: 'Dr. Emily Wong',
    published_date: '2025-01-03',
    read_time_minutes: 10,
    duration_minutes: null,
    views: 1654,
    rating: 4.8,
    tags: [{ tag: 'cholesterol' }, { tag: 'heart health' }, { tag: 'prevention' }],
  },
  {
    id: '6',
    title: 'Sleep Hygiene: 10 Tips for Better Rest',
    description:
      'Improve your sleep quality with evidence-based tips for creating an optimal sleep environment and routine.',
    full_content:
      'Quality sleep is essential for physical and mental health. Poor sleep can affect mood, energy, concentration, and overall health.\n\n10 Tips for Better Sleep: 1) Maintain a consistent sleep schedule, 2) Create a relaxing bedtime routine, 3) Keep your bedroom cool and dark, 4) Limit screen time before bed, 5) Avoid caffeine after 2 PM, 6) Exercise regularly but not close to bedtime, 7) Manage stress through relaxation techniques, 8) Invest in a comfortable mattress, 9) Limit naps to 20-30 minutes, 10) Avoid large meals before bed.\n\nImplementing these habits consistently can dramatically improve sleep quality within a few weeks.',
    category_id: '5',
    content_type_id: '3',
    difficulty: 'beginner',
    author: 'Dr. Rachel Green',
    published_date: '2025-01-01',
    read_time_minutes: 5,
    duration_minutes: null,
    views: 2987,
    rating: 4.9,
    tags: [{ tag: 'sleep' }, { tag: 'wellness' }, { tag: 'habits' }],
  },
  {
    id: '7',
    title: 'Yoga for Beginners: Building Strength and Flexibility',
    description:
      'A gentle introduction to yoga with basic poses and sequences suitable for complete beginners.',
    full_content: null,
    category_id: '4',
    content_type_id: '2',
    difficulty: 'beginner',
    author: 'Lisa Martinez, Yoga Instructor',
    published_date: '2024-12-28',
    read_time_minutes: null,
    duration_minutes: 20,
    views: 4123,
    rating: 4.7,
    tags: [{ tag: 'yoga' }, { tag: 'flexibility' }, { tag: 'beginners' }],
  },
  {
    id: '8',
    title: 'Understanding Anxiety: Symptoms and Coping Strategies',
    description:
      'Recognize the signs of anxiety and learn practical techniques to manage anxious thoughts and feelings.',
    full_content:
      'Anxiety is a normal response to stress, but when it becomes overwhelming or persistent, it can interfere with daily life.\n\nCommon symptoms include: excessive worry, restlessness, difficulty concentrating, muscle tension, sleep problems, and physical symptoms like rapid heartbeat or sweating.\n\nCoping strategies: Practice grounding techniques (5-4-3-2-1 method), challenge negative thoughts, maintain regular sleep schedule, limit caffeine and alcohol, exercise regularly, and connect with supportive people. Cognitive Behavioral Therapy (CBT) is highly effective for anxiety.\n\nSeek professional help if anxiety interferes with work, relationships, or daily activities.',
    category_id: '3',
    content_type_id: '1',
    difficulty: 'intermediate',
    author: 'Dr. Mark Stevens, Clinical Psychologist',
    published_date: '2024-12-25',
    read_time_minutes: 9,
    duration_minutes: null,
    views: 2145,
    rating: 4.8,
    tags: [{ tag: 'anxiety' }, { tag: 'mental health' }, { tag: 'coping' }],
  },
  {
    id: '9',
    title: 'Superfoods for Heart Health',
    description:
      'Explore nutrient-dense foods that support cardiovascular health and how to incorporate them into your diet.',
    full_content: null,
    category_id: '2',
    content_type_id: '4',
    difficulty: 'beginner',
    author: 'Nutritionist Andrea Lee',
    published_date: '2024-12-20',
    read_time_minutes: 3,
    duration_minutes: null,
    views: 1832,
    rating: 4.6,
    tags: [{ tag: 'superfoods' }, { tag: 'heart health' }, { tag: 'nutrition' }],
  },
  {
    id: '10',
    title: 'Advanced HIIT Training Protocols',
    description:
      'High-intensity interval training techniques for experienced athletes looking to maximize cardiovascular fitness.',
    full_content:
      'High-Intensity Interval Training (HIIT) alternates short bursts of intense exercise with recovery periods. This advanced guide covers protocols for experienced athletes.\n\nAdvanced HIIT Protocols: Tabata (20 seconds max effort, 10 seconds rest, 8 rounds), EMOM (Every Minute On the Minute - complete exercise at start of each minute), Ladder intervals (increasing then decreasing work periods), and Complex training (combining strength and cardio).\n\nProgression principles: Gradually increase intensity before duration, ensure adequate recovery between sessions (48-72 hours), monitor heart rate recovery, and periodize training to prevent overtraining.\n\nConsiderations: HIIT is demanding on the cardiovascular and musculoskeletal systems. Proper warm-up, cool-down, and recovery nutrition are essential.',
    category_id: '4',
    content_type_id: '1',
    difficulty: 'advanced',
    author: 'Coach David Martinez',
    published_date: '2024-12-18',
    read_time_minutes: 12,
    duration_minutes: null,
    views: 987,
    rating: 4.9,
    tags: [{ tag: 'HIIT' }, { tag: 'advanced training' }, { tag: 'cardio' }],
  },
  {
    id: '11',
    title: 'Managing Diabetes Through Diet',
    description:
      'Comprehensive nutrition guide for managing blood sugar levels and maintaining a healthy lifestyle with diabetes.',
    full_content:
      'Managing diabetes requires careful attention to diet to maintain stable blood sugar levels and prevent complications.\n\nKey dietary principles: Monitor carbohydrate intake (use glycemic index), eat regular meals at consistent times, include fiber-rich foods (whole grains, vegetables), choose lean proteins, limit saturated fats and added sugars, and stay hydrated.\n\nMeal planning tips: The plate method (half vegetables, quarter protein, quarter carbs), count carbohydrates, space meals 4-5 hours apart, include healthy snacks if needed.\n\nWork with a registered dietitian to create a personalized plan. Regular blood sugar monitoring helps identify how different foods affect your levels.',
    category_id: '2',
    content_type_id: '3',
    difficulty: 'intermediate',
    author: 'Dr. Patricia Kumar, Endocrinologist',
    published_date: '2024-12-15',
    read_time_minutes: 11,
    duration_minutes: null,
    views: 1456,
    rating: 4.8,
    tags: [{ tag: 'diabetes' }, { tag: 'nutrition' }, { tag: 'diet' }],
  },
  {
    id: '12',
    title: 'Preventing Common Running Injuries',
    description:
      'Learn proper running form, training principles, and injury prevention strategies for runners of all levels.',
    full_content: null,
    category_id: '4',
    content_type_id: '2',
    difficulty: 'intermediate',
    author: 'Dr. Kevin Park, Sports Medicine',
    published_date: '2024-12-12',
    read_time_minutes: null,
    duration_minutes: 18,
    views: 2234,
    rating: 4.7,
    tags: [{ tag: 'running' }, { tag: 'injury prevention' }, { tag: 'sports' }],
  },
];

export const mockBookmarks: Set<string> = new Set();
