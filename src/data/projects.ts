export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tech: string;
  image: string;
  alt: string;
  // When set, the work image links out to this URL instead of opening a modal.
  link?: string;
  // Detailed write-up shown in the modal. Some are placeholders until the
  // full descriptions are provided.
  description?: string[];
}

export const projects: Project[] = [
  {
    id: "movement-based-fitness",
    number: "01",
    title: "Movement Based Fitness",
    subtitle: "Online Fitness Coaching Website",
    tech: "Nuxt 4, Vue, Google Sheets API, Lead-Capture Forms, SSR + SEO, WhatsApp/Call Integration",
    image: "/MyWork/MovementBasedFitness.webp",
    alt: "Movement Based Fitness Coaching Website",
    link: "https://www.movementbasedfitness.com/",
  },
  {
    id: "akasaki",
    number: "02",
    title: "Akasaki",
    subtitle: "GST Invoicing & Inventory Web App",
    tech: "Next.js, TypeScript, Supabase, PostgreSQL, RLS, RPCs, PDF Export",
    image: "/MyWork/Akasaki.webp",
    alt: "Akasaki GST Invoicing",
    description: [
      "Built a production invoicing platform for a retail telecom store with per-IMEI inventory tracking, GST-compliant tax invoices (CGST/SGST/HSN summary), and an in-browser PDF export — replacing the shop's manual paper workflow.",
      "Designed atomic PostgreSQL RPCs with row-level security for invoice creation, parallel invoice copies, and dual cash/online numbering series, enforcing single-payment-type and stock-state invariants at the database layer.",
    ],
  },
  {
    id: "plant-leaf-disease",
    number: "03",
    title: "Plant Leaf Disease",
    subtitle: "CNN Image Classifier",
    tech: "Python, TensorFlow, Keras, CNN, Data Augmentation",
    image: "/MyWork/Plant_Disease.webp",
    alt: "Plant Leaf Disease Detection",
    description: [
      "Trained a custom 3-layer CNN (TensorFlow/Keras) on 12,206 PlantVillage images across 10 classes, reaching 90.33% test accuracy and 0.90 macro F1; used dropout, augmentation, early stopping, and LR scheduling against overfitting.",
      "Evaluated via a 10×10 confusion matrix and per-class precision/recall, benchmarking against HOG+SVM and MobileNetV2 transfer-learning baselines.",
    ],
  },
  {
    id: "growsphere",
    number: "04",
    title: "GrowSphere",
    subtitle: "IoT Monitoring App",
    tech: "Flutter, Supabase, PostgreSQL, Time-Series Data",
    image: "/MyWork/Growsphere.webp",
    alt: "GrowSphere IoT Dashboard",
    description: [
      "An IoT companion app for monitoring and controlling a mushroom-growing environment. It pairs with grow-room sensors and actuators over Bluetooth & Wi-Fi to give cultivators full control of their farm from their phone.",
      "After a guided permissions/onboarding flow, the Farm Overview shows live humidity and temperature readings with at-a-glance status indicators (Low / High) and a remote pump toggle to control humidity actively. The Trends screen visualizes weekly and monthly humidity and temperature data as charts with average/min/max breakdowns, and Settings handles device connection, farm reset, and account management.",
      "Key features: BLE/Wi-Fi IoT device pairing, live environmental readings, remote pump control, weekly/monthly trend charts, farm setup & management.",
      "Domain: IoT / smart agriculture.",
    ],
  },
  {
    id: "heart-rate-monitor",
    number: "05",
    title: "Heart Rate Monitor",
    subtitle: "Health Tracking Mobile App",
    tech: "Flutter, Supabase, PostgreSQL, Time-Series Data",
    image: "/MyWork/Heart_Rate_Monitor.webp",
    alt: "Heart Rate Monitor App",
    description: [
      "A mobile companion app for a custom-built wearable heart rate monitor, powered by an ESP32 microcontroller and MAX30102 optical sensor. The app turns raw sensor data into a clean, real-time health dashboard.",
      'The Live Feed screen streams live BPM with rhythm classification (e.g. "Normal Rhythm"), a real-time PPG waveform, and SpO₂ (blood oxygen) readings, with simple Start/Stop monitoring controls. Users set custom safety thresholds via High and Low BPM Limit sliders, and the app pushes an Alerts feed that logs every threshold breach with severity levels (Caution / Danger), timestamps, and filtering tabs.',
      "Key features: Real-time BPM + PPG waveform, SpO₂ tracking, configurable high/low heart-rate thresholds, categorized alert notifications, dark health-focused UI.",
      "Hardware: ESP32 + MAX30102.",
    ],
  },
  {
    id: "moodtune",
    number: "06",
    title: "MoodTune",
    subtitle: "AI Mood-Based Music Recommendation System",
    tech: "Python, scikit-learn, NLTK, Streamlit, NLP Emotion Classifier, TF-IDF",
    image: "/MyWork/MoodTune.webp",
    alt: "MoodTune AI Mood-Based Music Recommendation System",
    description: [
      "Built an NLP emotion classifier benchmarking 8 supervised models (Linear SVM, Logistic Regression, Random Forest, Gradient Boosting, Naive Bayes, KNN) on a 20,000-sentence dataset with TF-IDF features (5,000-dim, bigrams); LinearSVC reached 90.7% accuracy and 0.91 weighted F1 on a stratified 80/20 split.",
      "Engineered a content-based recommender ranking 279K+ English and Hindi tracks by Euclidean distance to mood centroids in Spotify (valence, energy) feature space; evaluated via confusion matrix and per-class precision/recall, and shipped an end-to-end Streamlit app with real-time bilingual recommendations.",
    ],
  },
];
