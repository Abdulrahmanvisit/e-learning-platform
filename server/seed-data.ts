/**
 * LearnPath Progressive E-Learning Platform - High-Depth Curriculum Seed Data
 * Covers Software Engineering, Artificial Intelligence, Machine Learning,
 * Data Science, Distributed Systems, and Cybersecurity.
 * Includes cohort member directory and innovation projects inspired by the
 * Nigerian Federal Ministry of Innovation, Science and Technology (FMIST) YSI Programme.
 */
import {
  UserProfile,
  Category,
  Course,
  Module,
  LessonDetail,
  Assessment,
  LearningPath,
  TopicMastery,
  CommunityMessage,
  ParticipantCohortMember,
  DirectChatMessage,
  InnovationProject
} from '../src/types/index.ts';

export const SEED_PROFILES: UserProfile[] = [
  {
    id: 'usr-learner-01',
    email: 'abdurrahman.learner@learnpath.edu',
    fullName: 'Abdurrahman Bello',
    role: 'learner',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Software Engineering Scholar & Distributed Systems Researcher. Innovating in progressive learning architectures.',
    learningStreak: 12,
    lastActiveDate: new Date().toISOString().split('T')[0],
    createdAt: '2026-09-01T08:00:00Z',
  },
  {
    id: 'usr-learner-02',
    email: 'amina.yusuf@learnpath.edu',
    fullName: 'Amina Yusuf',
    role: 'learner',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Artificial Intelligence & Neural Architecture Researcher. Specializing in Transformer attention mechanics.',
    learningStreak: 8,
    lastActiveDate: new Date().toISOString().split('T')[0],
    createdAt: '2026-08-15T08:00:00Z',
  },
  {
    id: 'usr-learner-03',
    email: 'chidi.okafor@learnpath.edu',
    fullName: 'Chidi Okafor',
    role: 'learner',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Data Science & Predictive Analytics Scholar. Focus on Bayesian inference and dimensional reduction.',
    learningStreak: 15,
    lastActiveDate: new Date().toISOString().split('T')[0],
    createdAt: '2026-07-01T08:00:00Z',
  },
  {
    id: 'usr-learner-04',
    email: 'zainab.ali@learnpath.edu',
    fullName: 'Zainab Ali',
    role: 'learner',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    bio: 'Machine Learning Operations (MLOps) Engineer. Building real-time inference streaming pipelines.',
    learningStreak: 5,
    lastActiveDate: new Date().toISOString().split('T')[0],
    createdAt: '2026-08-20T08:00:00Z',
  },
  {
    id: 'usr-learner-05',
    email: 'emmanuel.daniels@learnpath.edu',
    fullName: 'Emmanuel Daniels',
    role: 'learner',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'Cybersecurity & Cryptography Specialist. Researching zero-knowledge proofs and OAuth token security.',
    learningStreak: 19,
    lastActiveDate: new Date().toISOString().split('T')[0],
    createdAt: '2026-06-15T08:00:00Z',
  },
];

export const SEED_COHORT_MEMBERS: ParticipantCohortMember[] = [
  {
    id: 'usr-learner-01',
    fullName: 'Abdurrahman Bello',
    email: 'abdurrahman.learner@learnpath.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    specializationTrack: 'Software Engineering & Cloud Architecture',
    institutionOrOrg: 'Ahmadu Bello University (ABU Zaria)',
    stateOfOrigin: 'Kano State',
    statusBadge: 'YSI Innovation Fellow',
    innovationProjectTitle: 'AgriScan: Edge AI Sensor for Cassava & Maize Foliar Disease Classification',
    innovationProjectPitch: 'A low-cost edge computing device utilizing MobileNetV3 to diagnose agricultural foliar diseases offline in rural northern farming clusters.',
    skillsTags: ['TypeScript', 'Distributed Systems', 'Docker', 'PostgreSQL', 'Edge AI'],
    learningStreak: 12,
    completedCoursesCount: 2,
    enrolledCoursesCount: 3,
    isOnline: true,
    bio: 'Building progressive web architectures, distributed consensus engines, and offline-first progressive learning.',
  },
  {
    id: 'usr-learner-02',
    fullName: 'Amina Yusuf',
    email: 'amina.yusuf@learnpath.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    specializationTrack: 'Artificial Intelligence & Deep Learning',
    institutionOrOrg: 'Kaduna State University',
    stateOfOrigin: 'Kaduna State',
    statusBadge: 'Lead AI Researcher',
    innovationProjectTitle: 'AfriLingua: Low-Resource Neural Machine Translation for Indigenous Nigerian Languages',
    innovationProjectPitch: 'A subword Transformer model fine-tuned on indigenous parallel corpora to enable accurate Hausa, Yoruba, and Igbo translation for public health notices.',
    skillsTags: ['PyTorch', 'Transformers', 'Tensor Calculus', 'NLP', 'FastAPI'],
    learningStreak: 8,
    completedCoursesCount: 1,
    enrolledCoursesCount: 2,
    isOnline: true,
    bio: 'Investigating transformer attention mathematics, Rotary Positional Encodings, and multi-head projection layers.',
  },
  {
    id: 'usr-learner-03',
    fullName: 'Chidi Okafor',
    email: 'chidi.okafor@learnpath.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    specializationTrack: 'Data Science & Statistical Computing',
    institutionOrOrg: 'University of Nigeria, Nsukka (UNN)',
    stateOfOrigin: 'Enugu State',
    statusBadge: 'Statistical Analytics Fellow',
    innovationProjectTitle: 'MediPredict: Federated Bayesian Risk Stratification for Maternal Health Clinics',
    innovationProjectPitch: 'Privacy-preserving Bayesian posterior updating across decentralized primary healthcare centers to predict pregnancy complications early.',
    skillsTags: ['Python', 'Bayesian MCMC', 'Pandas', 'ARIMA', 'Scikit-Learn'],
    learningStreak: 15,
    completedCoursesCount: 2,
    enrolledCoursesCount: 2,
    isOnline: false,
    bio: 'Focused on Bayesian inference, statistical hypothesis testing, and dimensional reduction.',
  },
  {
    id: 'usr-learner-04',
    fullName: 'Zainab Ali',
    email: 'zainab.ali@learnpath.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    specializationTrack: 'Machine Learning Engineering & MLOps',
    institutionOrOrg: 'Nile University of Nigeria',
    stateOfOrigin: 'Federal Capital Territory (Abuja)',
    statusBadge: 'MLOps Architect',
    innovationProjectTitle: 'StreamGuard: Real-Time Fraud & Anomaly Detection on Open Banking APIs',
    innovationProjectPitch: 'Sub-5ms inference streaming microservice utilizing Gradient Boosted Trees and Kafka to identify irregular financial transaction graphs.',
    skillsTags: ['MLOps', 'Kafka', 'XGBoost', 'Kubernetes', 'Feature Stores'],
    learningStreak: 5,
    completedCoursesCount: 1,
    enrolledCoursesCount: 3,
    isOnline: true,
    bio: 'Creating production feature stores, drift detection engines, and low-latency microservices.',
  },
  {
    id: 'usr-learner-05',
    fullName: 'Emmanuel Daniels',
    email: 'emmanuel.daniels@learnpath.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    specializationTrack: 'Cybersecurity & Secure Systems',
    institutionOrOrg: 'University of Lagos (UNILAG)',
    stateOfOrigin: 'Lagos State',
    statusBadge: 'Security & PKI Specialist',
    innovationProjectTitle: 'ZeroTrust PKI: Quantum-Resistant Digital Identity Protocol for Academic Records',
    innovationProjectPitch: 'Lattice-based digital signatures on decentralized ledgers to eliminate fake credential forgery and guarantee tamper-proof transcript verification.',
    skillsTags: ['Cryptography', 'AES-GCM', 'PKI', 'OAuth 2.0', 'Rust'],
    learningStreak: 19,
    completedCoursesCount: 3,
    enrolledCoursesCount: 3,
    isOnline: false,
    bio: 'Specialized in public-key infrastructure, digital signatures, and token anti-replay mechanisms.',
  },
  {
    id: 'usr-learner-06',
    fullName: 'Kelechi Nnamdi',
    email: 'kelechi.nnamdi@learnpath.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    specializationTrack: 'IoT & Clean Energy Systems',
    institutionOrOrg: 'Rivers State University',
    stateOfOrigin: 'Rivers State',
    statusBadge: 'CleanTech Innovator',
    innovationProjectTitle: 'SolarGrid-IoT: Distributed Photovoltaic Telemetry & Inverter Health Predictor',
    innovationProjectPitch: 'Cellular-connected telemetry gateway for remote mini-grids that analyzes thermal and voltage signatures to anticipate inverter failure.',
    skillsTags: ['IoT', 'MQTT', 'C++', 'Python', 'Time-Series Forecasting'],
    learningStreak: 11,
    completedCoursesCount: 2,
    enrolledCoursesCount: 2,
    isOnline: true,
    bio: 'Building telemetry hardware and predictive algorithms for sustainable solar micro-grids.',
  },
  {
    id: 'usr-learner-07',
    fullName: 'Fatima Mohammed',
    email: 'fatima.mohammed@learnpath.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1534751516642-a171ed28a1c9?w=150&auto=format&fit=crop&q=80',
    specializationTrack: 'Data Science & Bio-Informatics',
    institutionOrOrg: 'University of Maiduguri',
    stateOfOrigin: 'Borno State',
    statusBadge: 'Bioinformatics Scholar',
    innovationProjectTitle: 'MalariaVision: Deep Learning Microscope Automated Parasitemia Counter',
    innovationProjectPitch: 'Computer vision pipeline detecting Plasmodium falciparum in Giemsa-stained blood smears with 97.4% diagnostic sensitivity.',
    skillsTags: ['Computer Vision', 'PyTorch', 'Data Science', 'Biostatistics', 'OpenCV'],
    learningStreak: 14,
    completedCoursesCount: 1,
    enrolledCoursesCount: 2,
    isOnline: false,
    bio: 'Applying computational statistics and deep learning to neglected tropical disease diagnostics.',
  },
  {
    id: 'usr-learner-08',
    fullName: 'Damilola Adeleke',
    email: 'damilola.adeleke@learnpath.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    specializationTrack: 'Software Engineering & Distributed Systems',
    institutionOrOrg: 'University of Ibadan',
    stateOfOrigin: 'Oyo State',
    statusBadge: 'Backend Systems Fellow',
    innovationProjectTitle: 'TransitFlow: Distributed GTFS Real-Time Bus Fleet Optimization Engine',
    innovationProjectPitch: 'High-throughput event-streaming engine computing optimal bus headway schedules for informal public transport networks.',
    skillsTags: ['Go', 'TypeScript', 'Redis', 'Docker', 'Raft Consensus'],
    learningStreak: 10,
    completedCoursesCount: 2,
    enrolledCoursesCount: 3,
    isOnline: true,
    bio: 'Specializing in concurrent backend engines, transit algorithms, and distributed queue topologies.',
  },
];

export const SEED_INNOVATION_PROJECTS: InnovationProject[] = [
  {
    id: 'proj-01',
    authorId: 'usr-learner-01',
    authorName: 'Abdurrahman Bello',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorInstitution: 'Ahmadu Bello University (ABU Zaria)',
    title: 'AgriScan: Edge AI Sensor for Cassava & Maize Foliar Disease Classification',
    track: 'AI & Agritech Innovation',
    abstract: 'Field-tested low-power edge computer integrating quantized convolutional neural networks for instantaneous leaf disease detection. Operates 100% offline without cellular coverage, enabling smallholder farmers across northern Nigeria to treat blight early.',
    techStack: ['Python', 'TensorFlow Lite', 'MobileNetV3', 'Raspberry Pi', 'React Native'],
    likesCount: 28,
    likedBy: ['usr-learner-02', 'usr-learner-03', 'usr-learner-04', 'usr-learner-06'],
    status: 'Field Validated',
    createdAt: '2026-09-14T09:00:00Z',
  },
  {
    id: 'proj-02',
    authorId: 'usr-learner-02',
    authorName: 'Amina Yusuf',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    authorInstitution: 'Kaduna State University',
    title: 'AfriLingua: Low-Resource Neural Machine Translation for Indigenous Nigerian Languages',
    track: 'Artificial Intelligence & NLP',
    abstract: 'Subword tokenization and Transformer attention model fine-tuned on indigenous Nigerian parallel text collections. Translates technical and healthcare documents across Hausa, Yoruba, and Igbo with high BLEU scores.',
    techStack: ['PyTorch', 'Transformers', 'FastAPI', 'HuggingFace', 'SentencePiece'],
    likesCount: 34,
    likedBy: ['usr-learner-01', 'usr-learner-03', 'usr-learner-05'],
    status: 'Prototype',
    createdAt: '2026-09-18T11:00:00Z',
  },
  {
    id: 'proj-03',
    authorId: 'usr-learner-03',
    authorName: 'Chidi Okafor',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    authorInstitution: 'University of Nigeria, Nsukka (UNN)',
    title: 'MediPredict: Federated Bayesian Risk Stratification for Maternal Health Clinics',
    track: 'Data Science & HealthTech',
    abstract: 'Federated Bayesian modeling framework allowing local maternal healthcare centers to compute posterior pre-eclampsia risk scores without transmitting sensitive patient records to centralized cloud storage.',
    techStack: ['PyMC3', 'Python', 'NumPy', 'Docker', 'SQLite'],
    likesCount: 22,
    likedBy: ['usr-learner-01', 'usr-learner-07', 'usr-learner-04'],
    status: 'Field Validated',
    createdAt: '2026-09-22T14:30:00Z',
  },
  {
    id: 'proj-04',
    authorId: 'usr-learner-04',
    authorName: 'Zainab Ali',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    authorInstitution: 'Nile University of Nigeria',
    title: 'StreamGuard: Real-Time Fraud & Anomaly Detection on Open Banking APIs',
    track: 'MLOps & FinTech Systems',
    abstract: 'High-throughput event stream pipeline utilizing Kafka and LightGBM model serving. Detects unauthorized credit transfers within 4 milliseconds with an area under ROC curve (AUC) of 0.984.',
    techStack: ['Apache Kafka', 'LightGBM', 'Python', 'FastAPI', 'Redis'],
    likesCount: 19,
    likedBy: ['usr-learner-01', 'usr-learner-08'],
    status: 'In Incubation',
    createdAt: '2026-09-26T10:15:00Z',
  },
  {
    id: 'proj-05',
    authorId: 'usr-learner-05',
    authorName: 'Emmanuel Daniels',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    authorInstitution: 'University of Lagos (UNILAG)',
    title: 'ZeroTrust PKI: Quantum-Resistant Digital Identity Protocol for Academic Records',
    track: 'Cybersecurity & Cryptography',
    abstract: 'Post-quantum cryptographic signature scheme (Dilithium) combined with verifiable distributed timestamping to secure university graduation credentials against forgery.',
    techStack: ['Rust', 'TypeScript', 'WebCrypto', 'PostgreSQL', 'Docker'],
    likesCount: 31,
    likedBy: ['usr-learner-01', 'usr-learner-02', 'usr-learner-03', 'usr-learner-06'],
    status: 'Prototype',
    createdAt: '2026-09-28T16:00:00Z',
  },
  {
    id: 'proj-06',
    authorId: 'usr-learner-06',
    authorName: 'Kelechi Nnamdi',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    authorInstitution: 'Rivers State University',
    title: 'SolarGrid-IoT: Distributed Photovoltaic Telemetry & Inverter Health Predictor',
    track: 'CleanTech & IoT Engineering',
    abstract: 'Solar mini-grid sensor suite analyzing power factor, thermal dissipation, and MPPT tracking efficiency to forecast solar inverter degradation up to 14 days before failure.',
    techStack: ['ESP32', 'C++', 'MQTT', 'Python', 'InfluxDB'],
    likesCount: 26,
    likedBy: ['usr-learner-01', 'usr-learner-04', 'usr-learner-08'],
    status: 'Field Validated',
    createdAt: '2026-10-02T13:20:00Z',
  },
];

export const SEED_DIRECT_MESSAGES: DirectChatMessage[] = [
  {
    id: 'dm-1',
    senderId: 'usr-learner-02',
    receiverId: 'usr-learner-01',
    senderName: 'Amina Yusuf',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'Hi Abdurrahman! I reviewed your AgriScan edge project architecture. For the quantized MobileNet model, are you using INT8 post-training quantization or quantization-aware training (QAT)?',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    read: true,
  },
  {
    id: 'dm-2',
    senderId: 'usr-learner-01',
    receiverId: 'usr-learner-02',
    senderName: 'Abdurrahman Bello',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: 'Hello Amina! We started with post-training INT8 quantization, but to recover accuracy on subtle foliar lesions, we switched to QAT. It retained 98.2% of the unquantized F1-score while cutting latency to 42ms on the edge device!',
    codeSnippet: {
      language: 'python',
      code: '# TensorFlow Quantization-Aware Training setup\nimport tensorflow_model_optimization as tfmot\n\nqat_model = tfmot.quantization.keras.quantize_model(base_model)\nqat_model.compile(optimizer="adam", loss="sparse_categorical_crossentropy")',
    },
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    read: true,
  },
  {
    id: 'dm-3',
    senderId: 'usr-learner-02',
    receiverId: 'usr-learner-01',
    senderName: 'Amina Yusuf',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'That is brilliant! We should definitely highlight that in the final project defense presentation. Are you currently working through the new Transformers & Attention Mechanics module?',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    read: false,
  },
  {
    id: 'dm-4',
    senderId: 'usr-learner-03',
    receiverId: 'usr-learner-01',
    senderName: 'Chidi Okafor',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'Abdurrahman, greetings! When you have a moment, take a look at the Time-Series & Bayesian course. The Stationarity and Dickey-Fuller diagnostics lesson will help us model crop yield trends across seasons!',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    read: true,
  },
];

export const SEED_COMMUNITY_MESSAGES: CommunityMessage[] = [
  {
    id: 'msg-1',
    senderId: 'usr-learner-02',
    senderName: 'Amina Yusuf',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    channelId: 'ai-deep-learning',
    content: 'Key note on Scaled Dot-Product Attention: why do we divide by sqrt(d_k) before taking the softmax? For large dimensions of d_k, the dot products grow large in magnitude, pushing the softmax function into regions where it has vanishing gradients! Dividing by sqrt(d_k) stabilizes the variance of the logits to unit variance.',
    codeSnippet: {
      language: 'python',
      code: 'import numpy as np\n\ndef attention(Q, K, V):\n    d_k = Q.shape[-1]\n    scores = np.matmul(Q, K.T) / np.sqrt(d_k)\n    weights = np.exp(scores - np.max(scores, axis=-1, keepdims=True))\n    weights /= np.sum(weights, axis=-1, keepdims=True)\n    return np.matmul(weights, V)',
    },
    likesCount: 12,
    likedBy: ['usr-learner-01', 'usr-learner-03', 'usr-learner-04', 'usr-learner-07'],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'msg-2',
    senderId: 'usr-learner-01',
    senderName: 'Abdurrahman Bello',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    channelId: 'software-systems',
    content: 'Completed the distributed locking module today! The distinction between optimistic locking (version column) and pessimistic locking (SELECT FOR UPDATE) is critical when scaling high-concurrency registration gateways.',
    codeSnippet: {
      language: 'typescript',
      code: '// Optimistic concurrency lock invariant\nconst updated = await db.execute(\n  `UPDATE enrolments \n   SET progress_percent = $1, version = version + 1 \n   WHERE id = $2 AND version = $3`,\n  [newProgress, enrolmentId, expectedVersion]\n);',
    },
    likesCount: 9,
    likedBy: ['usr-learner-02', 'usr-learner-05'],
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'msg-3',
    senderId: 'usr-learner-03',
    senderName: 'Chidi Okafor',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    channelId: 'data-science',
    content: 'Welcome fellow cohort members! If anyone needs help understanding the Eigenvalue decomposition in the Principal Component Analysis (PCA) lesson or Bayesian updating, feel free to chat with me. The covariance matrix eigenvectors dictate the orthogonal axes of maximum variance!',
    likesCount: 6,
    likedBy: ['usr-learner-01', 'usr-learner-06'],
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'msg-4',
    senderId: 'usr-learner-04',
    senderName: 'Zainab Ali',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    channelId: 'mlops-pipelines',
    content: 'Testing the interactive in-browser IDE for our gradient descent and convex loss implementation. The assertion console gives instant feedback! Make sure to keep your learning streak active today everyone!',
    likesCount: 11,
    likedBy: ['usr-learner-01', 'usr-learner-02', 'usr-learner-03'],
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
];

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'track-software-ai',
    name: 'Software Engineering & Distributed Systems',
    slug: 'software-engineering',
    description: 'Master client-server protocols, relational normalization, ACID transactions, and high-concurrency cloud architectures.',
  },
  {
    id: 'track-ai-ml',
    name: 'Artificial Intelligence & Deep Learning',
    slug: 'ai-deep-learning',
    description: 'Multivariate tensor calculus, neural architectures, Transformers, self-attention mechanics, and generative systems.',
  },
  {
    id: 'track-data-science',
    name: 'Data Science & Statistical Computing',
    slug: 'data-science',
    description: 'Bayesian inference, probability distributions, hypothesis testing, PCA dimensionality reduction, and predictive modeling.',
  },
  {
    id: 'track-mlops',
    name: 'Machine Learning Engineering & MLOps',
    slug: 'ml-engineering',
    description: 'Convex optimization, kernels, gradient boosting, automated feature stores, data drift detection, and high-throughput microservices.',
  },
  {
    id: 'track-cloud-distributed',
    name: 'Cloud Infrastructure & High Availability',
    slug: 'cloud-infrastructure',
    description: 'Distributed consensus protocols (Raft/Paxos), event stream processing, CAP theorem bounds, and fault-tolerant topologies.',
  },
  {
    id: 'track-cybersecurity',
    name: 'Cybersecurity & Cryptographic Protocols',
    slug: 'cybersecurity',
    description: 'Symmetric & asymmetric encryption, public key infrastructure (PKI), digital signatures, and token security.',
  },
];

export const SEED_COURSES: Course[] = [
  {
    id: 'course-1-fullstack',
    title: 'Modern Full-Stack Systems & Distributed Software Engineering',
    slug: 'modern-fullstack-systems',
    description:
      'Rigorous foundation in client-server protocol invariants, strict TypeScript type narrowing, relational normalization (3NF), ACID transactions, and high-concurrency API idempotency.',
    categoryId: 'track-software-ai',
    categoryName: 'Software Engineering & Distributed Systems',
    difficulty: 'Beginner',
    estimatedHours: 16.0,
    thumbnailUrl: '/src/assets/images/course_fullstack_ts_1791813261209.jpg',
    status: 'published',
    passingThresholdPercent: 75,
    createdBy: 'usr-learner-01',
    instructorName: 'Prof. K. Adeyemi, Lead Systems Architect',
    createdAt: '2026-09-10T10:00:00Z',
    modulesCount: 2,
    lessonsCount: 4,
  },
  {
    id: 'course-ai-deep-learning',
    title: 'Artificial Intelligence: Tensor Calculus & Neural Architectures',
    slug: 'ai-tensor-calculus-neural-architectures',
    description:
      'Deep theoretical and mathematical foundations of deep learning: multivariate calculus, backpropagation graphs, convolution invariants, and Transformer self-attention mechanisms.',
    categoryId: 'track-ai-ml',
    categoryName: 'Artificial Intelligence & Deep Learning',
    difficulty: 'Intermediate',
    estimatedHours: 20.0,
    thumbnailUrl: '/src/assets/images/course_agritech_iot_1791814592336.jpg',
    status: 'published',
    passingThresholdPercent: 80,
    createdBy: 'usr-learner-02',
    instructorName: 'Dr. Amina Yusuf, AI Research Faculty',
    createdAt: '2026-09-15T10:00:00Z',
    modulesCount: 2,
    lessonsCount: 4,
  },
  {
    id: 'course-nlp-transformers',
    title: 'Natural Language Processing: Transformer Attention Mechanics & Language Models',
    slug: 'nlp-transformer-attention-llms',
    description:
      'Exhaustive theoretical formulation of modern Transformer architectures: subword tokenization (BPE), Rotary Positional Embeddings (RoPE), Scaled Dot-Product Attention, causal masking, and decoder sampling mathematics.',
    categoryId: 'track-ai-ml',
    categoryName: 'Artificial Intelligence & Deep Learning',
    difficulty: 'Advanced',
    estimatedHours: 22.0,
    thumbnailUrl: '/src/assets/images/hero_learnpath_banner_1791813249400.jpg',
    status: 'published',
    passingThresholdPercent: 80,
    createdBy: 'usr-learner-02',
    instructorName: 'Dr. Amina Yusuf, AI Research Faculty',
    createdAt: '2026-09-16T10:00:00Z',
    modulesCount: 2,
    lessonsCount: 4,
  },
  {
    id: 'course-data-science-stats',
    title: 'Data Science: Inferential Statistics & Dimensionality Reduction',
    slug: 'data-science-inferential-statistics',
    description:
      'Comprehensive data science curriculum covering probability theory, Central Limit Theorem, Bayesian inference, hypothesis testing (p-values, A/B testing), and PCA covariance decomposition.',
    categoryId: 'track-data-science',
    categoryName: 'Data Science & Statistical Computing',
    difficulty: 'Intermediate',
    estimatedHours: 18.0,
    thumbnailUrl: '/src/assets/images/course_clean_energy_iot_1791814603971.jpg',
    status: 'published',
    passingThresholdPercent: 80,
    createdBy: 'usr-learner-03',
    instructorName: 'Dr. Chidi Okafor, Applied Statistics Chair',
    createdAt: '2026-09-18T10:00:00Z',
    modulesCount: 2,
    lessonsCount: 4,
  },
  {
    id: 'course-bayesian-timeseries',
    title: 'Data Science: Bayesian Predictive Modeling & Time-Series Forecasting',
    slug: 'data-science-bayesian-timeseries',
    description:
      'Rigorous mathematical formulation of Bayesian inference (prior-posterior conjugacy, MCMC sampling) and empirical time-series forecasting (weak stationarity, autocorrelation ACF/PACF, ARIMA, and ARCH/GARCH volatility).',
    categoryId: 'track-data-science',
    categoryName: 'Data Science & Statistical Computing',
    difficulty: 'Advanced',
    estimatedHours: 20.0,
    thumbnailUrl: '/src/assets/images/course_data_structures_1791813271935.jpg',
    status: 'published',
    passingThresholdPercent: 80,
    createdBy: 'usr-learner-03',
    instructorName: 'Dr. Chidi Okafor, Applied Statistics Chair',
    createdAt: '2026-09-19T10:00:00Z',
    modulesCount: 2,
    lessonsCount: 4,
  },
  {
    id: 'course-ml-foundations',
    title: 'Machine Learning Foundations: Convex Optimization & Kernel Methods',
    slug: 'ml-foundations-convex-kernels',
    description:
      'Theoretical foundations of machine learning: Empirical Risk Minimization, convex loss surfaces, L1/L2 regularization geometry (Lasso vs Ridge), Support Vector Machines with Mercer kernels, and Shannon entropy decision trees.',
    categoryId: 'track-mlops',
    categoryName: 'Machine Learning Engineering & MLOps',
    difficulty: 'Intermediate',
    estimatedHours: 18.0,
    thumbnailUrl: '/src/assets/images/hero_innovation_lab_1791814582486.jpg',
    status: 'published',
    passingThresholdPercent: 80,
    createdBy: 'usr-learner-04',
    instructorName: 'Engr. Zainab Ali, Principal ML Engineer',
    createdAt: '2026-09-20T10:00:00Z',
    modulesCount: 2,
    lessonsCount: 4,
  },
  {
    id: 'course-mlops-engineering',
    title: 'Machine Learning Engineering: Gradient Boosting & MLOps Pipelines',
    slug: 'ml-gradient-boosting-mlops',
    description:
      'From algorithmic formulation to production: gradient boosted decision trees, bias-variance trade-offs, automated feature stores, data drift detection, and sub-10ms REST model serving.',
    categoryId: 'track-mlops',
    categoryName: 'Machine Learning Engineering & MLOps',
    difficulty: 'Advanced',
    estimatedHours: 22.0,
    thumbnailUrl: '/src/assets/images/course_cloud_devops_1791813282155.jpg',
    status: 'published',
    passingThresholdPercent: 80,
    createdBy: 'usr-learner-04',
    instructorName: 'Engr. Zainab Ali, Principal ML Engineer',
    createdAt: '2026-09-21T10:00:00Z',
    modulesCount: 2,
    lessonsCount: 4,
  },
  {
    id: 'course-4-cloud',
    title: 'Distributed Systems: Consensus Protocols, CAP & Event Streaming',
    slug: 'distributed-systems-consensus-cap',
    description:
      'Rigorous exploration of distributed consensus (Raft leader election and log replication), CAP theorem bounds, event log primitives, and distributed two-phase commit transactions.',
    categoryId: 'track-cloud-distributed',
    categoryName: 'Cloud Infrastructure & High Availability',
    difficulty: 'Advanced',
    estimatedHours: 24.0,
    thumbnailUrl: '/src/assets/images/course_cloud_devops_1791813282155.jpg',
    status: 'published',
    passingThresholdPercent: 80,
    createdBy: 'usr-learner-01',
    instructorName: 'Dr. Tariq Ibrahim, Cloud Systems Fellow',
    createdAt: '2026-09-22T10:00:00Z',
    modulesCount: 2,
    lessonsCount: 4,
  },
  {
    id: 'course-cybersecurity',
    title: 'Cybersecurity: Cryptographic Primitives & PKI Infrastructure',
    slug: 'cybersecurity-cryptographic-primitives-pki',
    description:
      'Mathematical principles of symmetric (AES-GCM) and asymmetric (RSA, ECC) encryption, public-key infrastructure, digital signature verification, and zero-trust token authentication.',
    categoryId: 'track-cybersecurity',
    categoryName: 'Cybersecurity & Cryptographic Protocols',
    difficulty: 'Intermediate',
    estimatedHours: 18.0,
    thumbnailUrl: '/src/assets/images/hero_innovation_lab_1791814582486.jpg',
    status: 'published',
    passingThresholdPercent: 80,
    createdBy: 'usr-learner-05',
    instructorName: 'Dr. E. Daniels, Cryptography Researcher',
    createdAt: '2026-09-25T10:00:00Z',
    modulesCount: 2,
    lessonsCount: 4,
  },
];

export const SEED_COURSE_PREREQUISITES: Record<string, string[]> = {
  'course-nlp-transformers': ['course-ai-deep-learning'],
  'course-ai-deep-learning': ['course-1-fullstack'],
  'course-bayesian-timeseries': ['course-data-science-stats'],
  'course-mlops-engineering': ['course-ml-foundations'],
  'course-ml-foundations': ['course-1-fullstack'],
  'course-4-cloud': ['course-1-fullstack'],
  'course-cybersecurity': ['course-1-fullstack'],
};

export const SEED_MODULES: Module[] = [
  // --- Course 1: Full-Stack Systems ---
  {
    id: 'mod-101',
    courseId: 'course-1-fullstack',
    title: 'Module 1: Protocol Invariants & Type Safety',
    description: 'HTTP idempotency, REST invariants, and TypeScript algebraic data types.',
    sequenceOrder: 1,
  },
  {
    id: 'mod-102',
    courseId: 'course-1-fullstack',
    title: 'Module 2: Relational Invariants & ACID Transactions',
    description: '3NF schema normalization, isolation levels, and transactional integrity.',
    sequenceOrder: 2,
  },

  // --- Course 2: AI & Deep Learning ---
  {
    id: 'mod-ai-1',
    courseId: 'course-ai-deep-learning',
    title: 'Module 1: Multivariate Calculus & Computation Graphs',
    description: 'Matrix calculus, Jacobian tensors, and automatic backpropagation.',
    sequenceOrder: 1,
  },
  {
    id: 'mod-ai-2',
    courseId: 'course-ai-deep-learning',
    title: 'Module 2: Deep Neural Architectures & Attention',
    description: 'Convolutional invariants, residual skips, and self-attention formulations.',
    sequenceOrder: 2,
  },

  // --- Course 3: NLP & Transformers ---
  {
    id: 'mod-nlp-1',
    courseId: 'course-nlp-transformers',
    title: 'Module 1: Subword Tokenization & Positional Geometry',
    description: 'Byte-Pair Encoding (BPE), vocabulary compression, and Rotary Positional Encodings (RoPE).',
    sequenceOrder: 1,
  },
  {
    id: 'mod-nlp-2',
    courseId: 'course-nlp-transformers',
    title: 'Module 2: Multi-Head Self-Attention & Autoregressive Sampling',
    description: 'Query-Key-Value projection tensors, causal masking, and Top-p / temperature decoding mathematics.',
    sequenceOrder: 2,
  },

  // --- Course 4: Data Science & Statistics ---
  {
    id: 'mod-ds-1',
    courseId: 'course-data-science-stats',
    title: 'Module 1: Probability Theory & Inferential Foundations',
    description: 'Probability axioms, Central Limit Theorem, and Bayes rule formulations.',
    sequenceOrder: 1,
  },
  {
    id: 'mod-ds-2',
    courseId: 'course-data-science-stats',
    title: 'Module 2: Hypothesis Testing & Dimensionality Reduction',
    description: 'Student t-test, p-value distributions, covariance matrices, and PCA decomposition.',
    sequenceOrder: 2,
  },

  // --- Course 5: Bayesian Modeling & Time-Series ---
  {
    id: 'mod-bayes-1',
    courseId: 'course-bayesian-timeseries',
    title: 'Module 1: Bayesian Inference & MCMC Sampling',
    description: 'Prior-posterior conjugacy, Beta-Binomial updating, and Markov Chain Monte Carlo algorithms.',
    sequenceOrder: 1,
  },
  {
    id: 'mod-bayes-2',
    courseId: 'course-bayesian-timeseries',
    title: 'Module 2: Time-Series Stationarity & ARIMA Forecasting',
    description: 'Weak stationarity, autocorrelation (ACF/PACF), Dickey-Fuller tests, and ARIMA volatility modeling.',
    sequenceOrder: 2,
  },

  // --- Course 6: Machine Learning Foundations ---
  {
    id: 'mod-mlf-1',
    courseId: 'course-ml-foundations',
    title: 'Module 1: Empirical Risk & Convex Regularization',
    description: 'Loss surfaces, gradient descent convergence bounds, and geometric duality of L1 vs L2 regularization.',
    sequenceOrder: 1,
  },
  {
    id: 'mod-mlf-2',
    courseId: 'course-ml-foundations',
    title: 'Module 2: Margin Optimization & Information Gain',
    description: 'Support Vector Machines, Mercer kernels, and Shannon entropy vs Gini impurity in tree splitting.',
    sequenceOrder: 2,
  },

  // --- Course 7: MLOps Engineering ---
  {
    id: 'mod-ml-1',
    courseId: 'course-mlops-engineering',
    title: 'Module 1: Gradient Boosting Formulations',
    description: 'Algorithmic formulation of XGBoost, LightGBM, and pseudo-residual gradients.',
    sequenceOrder: 1,
  },
  {
    id: 'mod-ml-2',
    courseId: 'course-mlops-engineering',
    title: 'Module 2: MLOps Feature Stores & Drift Monitoring',
    description: 'Population Stability Index (PSI), online feature lookups, and model serving microservices.',
    sequenceOrder: 2,
  },

  // --- Course 8: Cloud Distributed Systems ---
  {
    id: 'mod-cld-1',
    courseId: 'course-4-cloud',
    title: 'Module 1: Consensus Protocols & Leader Election',
    description: 'Raft consensus invariants, term transitions, and log replication.',
    sequenceOrder: 1,
  },
  {
    id: 'mod-cld-2',
    courseId: 'course-4-cloud',
    title: 'Module 2: Distributed State & Partition Tolerance',
    description: 'CAP theorem boundaries, event log ordering, and two-phase commit.',
    sequenceOrder: 2,
  },

  // --- Course 9: Cybersecurity & Cryptography ---
  {
    id: 'mod-sec-1',
    courseId: 'course-cybersecurity',
    title: 'Module 1: Symmetric & Asymmetric Cryptographic Primitives',
    description: 'Galois/Counter Mode (AES-GCM), elliptic curve discrete logarithms, and RSA mathematics.',
    sequenceOrder: 1,
  },
  {
    id: 'mod-sec-2',
    courseId: 'course-cybersecurity',
    title: 'Module 2: PKI Certificates & Token Authentication',
    description: 'X.509 certificate chains, digital signature verification, and cryptographically signed JWTs.',
    sequenceOrder: 2,
  },
];

export const SEED_LESSONS: LessonDetail[] = [
  // Course 1: Full-Stack
  {
    id: 'les-101-1',
    moduleId: 'mod-101',
    courseId: 'course-1-fullstack',
    title: 'Client-Server Protocols & REST Invariants',
    summary: 'Examine RFC 9110 HTTP semantics, safe vs idempotent methods, and status codes.',
    contentMarkdown: `### 1. Architectural Foundations of HTTP
The Hypertext Transfer Protocol (HTTP) serves as the ubiquitous transport layer for modern web applications. Under RFC 9110, methods are classified along two fundamental mathematical axes: **Safety** and **Idempotency**.

#### Safe Methods
A request method is safe if it has read-only semantics. Clients do not request, and cannot expect, any state change on the origin server.
* Safe methods: \`GET\`, \`HEAD\`, \`OPTIONS\`

#### Idempotent Methods
A request method is idempotent if multiple identical requests with that method have the exact same intended effect on the server state as a single request.
* Idempotent methods: \`PUT\`, \`DELETE\`, \`GET\`, \`HEAD\`
* Non-idempotent method: \`POST\`

\`\`\`typescript
// Idempotency token pattern in distributed financial transactions
export async function executeIdempotentPayment(token: string, amount: number) {
  const existing = await cache.get(\`idem:\${token}\`);
  if (existing) return existing; // Deduplicate
  const result = await paymentGateway.charge(amount);
  await cache.set(\`idem:\${token}\`, result, 86400);
  return result;
}
\`\`\``,
    estimatedMinutes: 20,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: [],
    resources: [],
  },
  {
    id: 'les-101-2',
    moduleId: 'mod-101',
    courseId: 'course-1-fullstack',
    title: 'TypeScript Type Narrowing & Algebraic Data Types',
    summary: 'Tagged unions, discriminated type guards, and exhaustive pattern checking in systems engineering.',
    contentMarkdown: `### Exhaustiveness Checking in Domain Models
TypeScript enables compile-time verification of state machine transitions through Discriminated Unions (Algebraic Data Types).

\`\`\`typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function assertUnreachable(x: never): never {
  throw new Error(\`Unhandled union variant: \${JSON.stringify(x)}\`);
}
\`\`\``,
    estimatedMinutes: 25,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-101-1'],
    resources: [],
  },
  {
    id: 'les-102-1',
    moduleId: 'mod-102',
    courseId: 'course-1-fullstack',
    title: 'Database Normalization (3NF) & ACID Guarantees',
    summary: 'Third Normal Form Boyce-Codd variants, functional dependencies, and ACID transaction invariants.',
    contentMarkdown: `### Relational Normalization & Relational Invariants
A relation schema $R$ is in Third Normal Form (3NF) if for every functional dependency $X \\rightarrow Y$, either:
1. $Y \\subseteq X$ (trivial functional dependency),
2. $X$ is a superkey of $R$, or
3. Every attribute in $Y \\setminus X$ is a prime attribute.

#### ACID Properties
* **Atomicity**: All writes commit or roll back completely.
* **Consistency**: Invariants preserved across state changes.
* **Isolation**: Serializable vs Read Committed transactions.
* **Durability**: Write-Ahead Logging (WAL) flushes to disk.`,
    estimatedMinutes: 30,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: ['les-101-2'],
    resources: [],
  },
  {
    id: 'les-102-2',
    moduleId: 'mod-102',
    courseId: 'course-1-fullstack',
    title: 'Concurrent Locking & Optimistic Versioning',
    summary: 'Pessimistic SELECT FOR UPDATE versus optimistic version checks in distributed databases.',
    contentMarkdown: `### Concurrency Control Strategies
When multiple worker nodes compete to update a learner's progression counter, race conditions will occur unless concurrency control is enforced.

#### Optimistic Locking
\`\`\`sql
UPDATE enrolments 
SET progress_percent = :newProgress, version = version + 1 
WHERE id = :enrolmentId AND version = :expectedVersion;
\`\`\``,
    estimatedMinutes: 25,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-102-1'],
    resources: [],
  },

  // Course 2: AI & Deep Learning
  {
    id: 'les-ai-101',
    moduleId: 'mod-ai-1',
    courseId: 'course-ai-deep-learning',
    title: 'Matrix Calculus & Automatic Differentiation Graphs',
    summary: 'Jacobians, chain rule over directed acyclic computation graphs, and vector-Jacobian products.',
    contentMarkdown: `### Automatic Differentiation Over Computation Graphs
Deep learning frameworks represent operations as a Directed Acyclic Graph (DAG) $\\mathcal{G} = (\\mathcal{V}, \\mathcal{E})$. Given a scalar loss $L$:
$$\\frac{\\partial L}{\\partial x} = \\sum_{y \\in \\text{children}(x)} \\frac{\\partial L}{\\partial y} \\frac{\\partial y}{\\partial x}$$

Reverse-mode automatic differentiation executes in time proportional to the forward graph evaluation, regardless of input dimensionality.`,
    estimatedMinutes: 35,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: [],
    resources: [],
  },
  {
    id: 'les-ai-102',
    moduleId: 'mod-ai-1',
    courseId: 'course-ai-deep-learning',
    title: 'Gradient Descent Dynamics & Adaptive Optimizers',
    summary: 'SGD momentum, Adam second-moment estimation, and bias correction formulas.',
    contentMarkdown: `### Mathematical Formulation of Adam
Adam (Adaptive Moment Estimation) tracks moving averages of gradients $m_t$ and squared gradients $v_t$:
$$m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t$$
$$v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2$$

Bias-corrected estimators:
$$\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}$$
$$\\theta_t = \\theta_{t-1} - \\frac{\\alpha}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t$$`,
    estimatedMinutes: 30,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-ai-101'],
    resources: [],
  },
  {
    id: 'les-ai-201',
    moduleId: 'mod-ai-2',
    courseId: 'course-ai-deep-learning',
    title: 'Convolutional Invariants & Residual Skip Connections',
    summary: 'Translation equivariance, receptive field expansion, and ResNet identity mapping gradients.',
    contentMarkdown: `### Identity Mappings in Residual Networks
In deep architectures, vanishing gradients are mitigated by additive skip connections:
$$x_{l+1} = x_l + \\mathcal{F}(x_l, \\mathcal{W}_l)$$
By recursion, for any deeper unit $L$:
$$x_L = x_l + \\sum_{i=l}^{L-1} \\mathcal{F}(x_i, \\mathcal{W}_i)$$
Gradient propagation:
$$\\frac{\\partial \\mathcal{E}}{\\partial x_l} = \\frac{\\partial \\mathcal{E}}{\\partial x_L} \\left( \\mathbf{I} + \\frac{\\partial}{\\partial x_l} \\sum_{i=l}^{L-1} \\mathcal{F}(x_i, \\mathcal{W}_i) \\right)$$
The identity term ensures gradients flow directly back to shallow layers without vanishing!`,
    estimatedMinutes: 35,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: ['les-ai-102'],
    resources: [],
  },
  {
    id: 'les-ai-202',
    moduleId: 'mod-ai-2',
    courseId: 'course-ai-deep-learning',
    title: 'Scaled Dot-Product & Self-Attention Formulation',
    summary: 'The Transformer attention mechanism, Query-Key-Value projection matrices, and softmax temperature scaling.',
    contentMarkdown: `### Scaled Dot-Product Attention Formulation
Given queries $Q \\in \\mathbb{R}^{n \\times d_k}$, keys $K \\in \\mathbb{R}^{m \\times d_k}$, and values $V \\in \\mathbb{R}^{m \\times d_v}$:
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V$$

#### The Scaling Factor $\\frac{1}{\\sqrt{d_k}}$
Assume components of $q$ and $k$ are independent random variables with mean 0 and variance 1. Then their dot product has mean 0 and variance $d_k$. For large dimensions $d_k$, the dot products grow large in magnitude, pushing softmax into saturating regions with vanishing gradients. Dividing by $\\sqrt{d_k}$ normalizes variance to 1.`,
    estimatedMinutes: 40,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-ai-201'],
    resources: [],
  },

  // Course 3: NLP & Transformers (NEW)
  {
    id: 'les-nlp-101',
    moduleId: 'mod-nlp-1',
    courseId: 'course-nlp-transformers',
    title: 'Byte-Pair Encoding (BPE) & Subword Vectorization',
    summary: 'Algorithmic iteration of vocabulary compression, frequency counts, and out-of-vocabulary mitigation.',
    contentMarkdown: `### Algorithmic Mechanics of Byte-Pair Encoding (BPE)
Traditional word-level vocabularies suffer from the Out-of-Vocabulary (OOV) dilemma, while character-level tokenization produces unwieldy sequence lengths. BPE solves this through frequency-driven iterative merges.

#### BPE Iteration Algorithm
1. Initialize vocabulary $\\mathcal{V}$ with all individual byte characters and special end-of-word tokens.
2. Count the frequencies of all adjacent character pairs in the normalized training corpus.
3. Identify the most frequent pair $(c_i, c_j)$ and merge into a single token $c_{new}$.
4. Add $c_{new}$ to $\\mathcal{V}$ and replace all occurrences in the corpus.
5. Repeat until target vocabulary size $|\\mathcal{V}|$ is reached.`,
    estimatedMinutes: 25,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: [],
    resources: [],
  },
  {
    id: 'les-nlp-102',
    moduleId: 'mod-nlp-1',
    courseId: 'course-nlp-transformers',
    title: 'Rotary Positional Embeddings (RoPE) & Attention Geometry',
    summary: 'Encoding relative position into Query and Key vectors via complex orthogonal rotation matrices.',
    contentMarkdown: `### Rotary Positional Embedding (RoPE) Invariant
Unlike additive positional encodings $x_m + p_m$, RoPE (Su et al., 2024) injects relative position directly by rotating $Q$ and $K$ vectors in 2D orthogonal subspaces:
$$\\tilde{q}_m = \\mathbf{R}_{\\Theta, m}^d q_m, \\quad \\tilde{k}_n = \\mathbf{R}_{\\Theta, n}^d k_n$$
Because rotation matrices are orthogonal:
$$\\tilde{q}_m^T \\tilde{k}_n = (\\mathbf{R}_{\\Theta, m}^d q_m)^T (\\mathbf{R}_{\\Theta, n}^d k_n) = q_m^T \\mathbf{R}_{\\Theta, n-m}^d k_n$$
The inner product depends solely on the relative displacement $(n - m)$, enabling long-context generalization!`,
    estimatedMinutes: 30,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-nlp-101'],
    resources: [],
  },
  {
    id: 'les-nlp-201',
    moduleId: 'mod-nlp-2',
    courseId: 'course-nlp-transformers',
    title: 'Multi-Head Projection & Causal Attention Masking',
    summary: 'Projecting queries, keys, and values into parallel subspace representations with lower-triangular causal masks.',
    contentMarkdown: `### Multi-Head Attention Subspaces
Multi-Head Attention allows the model to jointly attend to information from different representation subspaces:
$$\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W^O$$
$$\\text{head}_i = \\text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)$$

#### Causal Masking Invariant
In autoregressive decoder language models, token $i$ must not access tokens $j > i$. This is enforced by adding a causal mask matrix $M$:
$$M_{ij} = \\begin{cases} 0 & \\text{if } j \\le i \\\\ -\\infty & \\text{if } j > i \\end{cases}$$
$$\\text{Softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} + M \\right)$$`,
    estimatedMinutes: 35,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: ['les-nlp-102'],
    resources: [],
  },
  {
    id: 'les-nlp-202',
    moduleId: 'mod-nlp-2',
    courseId: 'course-nlp-transformers',
    title: 'Autoregressive Decoding, Temperature & Top-p (Nucleus) Sampling',
    summary: 'Mathematical formulation of temperature scaling and cumulative probability mass thresholds.',
    contentMarkdown: `### Temperature Scaling & Nucleus (Top-p) Sampling
Given logits $z \\in \\mathbb{R}^{|\\mathcal{V}|}$, the temperature-scaled probability distribution is:
$$p_i = \\frac{\\exp(z_i / T)}{\\sum_{j} \\exp(z_j / T)}$$
* As $T \\to 0$, $p$ approaches an argmax (greedy deterministic decoding).
* As $T \\to \\infty$, $p$ converges to a uniform distribution.

#### Nucleus (Top-p) Selection Invariant
Sort tokens in descending order of probability: $p_{(1)} \\ge p_{(2)} \\ge \\dots \\ge p_{(V)}$. The nucleus $\\mathcal{V}^{(p)}$ is the minimal subset satisfying:
$$\\sum_{i \\in \\mathcal{V}^{(p)}} p_{(i)} \\ge p$$
Probabilities outside this subset are set to zero, and the remaining distribution is renormalized.`,
    estimatedMinutes: 30,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-nlp-201'],
    resources: [],
  },

  // Course 4: Data Science & Inferential Statistics
  {
    id: 'les-ds-101',
    moduleId: 'mod-ds-1',
    courseId: 'course-data-science-stats',
    title: 'Probability Axioms & The Central Limit Theorem',
    summary: 'Kolmogorov probability axioms, random variable distributions, and asymptotic normality proofs.',
    contentMarkdown: `### The Central Limit Theorem (CLT)
Let $X_1, X_2, \\dots, X_n$ be a sequence of independent and identically distributed (i.i.d.) random variables with expected value $\\mu$ and finite variance $\\sigma^2$. The sample mean $\\bar{X}_n = \\frac{1}{n} \\sum_{i=1}^n X_i$ satisfies:
$$\\sqrt{n} \\left( \\bar{X}_n - \\mu \\right) \\xrightarrow{d} \\mathcal{N}(0, \\sigma^2)$$
As sample size $n$ increases, the standardized sample mean converges in distribution to a standard normal distribution regardless of the underlying population shape!`,
    estimatedMinutes: 25,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: [],
    resources: [],
  },
  {
    id: 'les-ds-102',
    moduleId: 'mod-ds-1',
    courseId: 'course-data-science-stats',
    title: 'Bayesian Inference & Conjugate Distributions',
    summary: 'Bayes Theorem, prior belief modeling, likelihood functions, and posterior updating mechanics.',
    contentMarkdown: `### Bayesian Updating Formulation
In the Bayesian paradigm, parameters $\\theta$ are random variables characterized by probability distributions:
$$P(\\theta | \\mathcal{D}) = \\frac{P(\\mathcal{D} | \\theta) P(\\theta)}{P(\\mathcal{D})} = \\frac{P(\\mathcal{D} | \\theta) P(\\theta)}{\\int P(\\mathcal{D} | \\theta') P(\\theta') d\\theta'}$$
$$\\text{Posterior} \\propto \\text{Likelihood} \\times \\text{Prior}$$

#### Conjugate Prior Example: Beta-Binomial
If likelihood is $\\text{Binomial}(n, k)$ and prior is $\\text{Beta}(\\alpha, \\beta)$, the posterior is in the identical family: $\\text{Beta}(\\alpha + k, \\beta + n - k)$.`,
    estimatedMinutes: 30,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-ds-101'],
    resources: [],
  },
  {
    id: 'les-ds-201',
    moduleId: 'mod-ds-2',
    courseId: 'course-data-science-stats',
    title: 'Hypothesis Testing, p-values & False Discovery Rates',
    summary: 'Type I and Type II errors, null hypothesis significance testing, and Benjamini-Hochberg FDR adjustments.',
    contentMarkdown: `### Hypothesis Testing Invariants
* **Type I Error ($\\alpha$)**: Rejecting the null hypothesis $H_0$ when it is actually true.
* **Type II Error ($\\beta$)**: Failing to reject $H_0$ when it is false. Power $= 1 - \\beta$.

#### p-value Definition
The p-value is the probability of observing test statistic $T$ at least as extreme as the observed value $t_{obs}$, under the assumption that the null hypothesis $H_0$ holds:
$$p = P(T \\ge t_{obs} | H_0)$$`,
    estimatedMinutes: 30,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: ['les-ds-102'],
    resources: [],
  },
  {
    id: 'les-ds-202',
    moduleId: 'mod-ds-2',
    courseId: 'course-data-science-stats',
    title: 'Principal Component Analysis (PCA) & Covariance Eigenstructure',
    summary: 'Orthogonal variance maximization, spectral decomposition of covariance matrices, and scree plots.',
    contentMarkdown: `### Mathematical Derivation of PCA
Given centered data matrix $X \\in \\mathbb{R}^{n \\times p}$ with sample covariance matrix $\\mathbf{\\Sigma} = \\frac{1}{n} X^T X$:
We seek unit vector $w_1$ that maximizes the variance of the projected data:
$$\\max_{w} w^T \\mathbf{\\Sigma} w \\quad \\text{subject to } w^T w = 1$$
Forming the Lagrangian:
$$\\mathcal{L}(w, \\lambda) = w^T \\mathbf{\\Sigma} w - \\lambda (w^T w - 1)$$
Taking the derivative with respect to $w$:
$$\\nabla_w \\mathcal{L} = 2 \\mathbf{\\Sigma} w - 2 \\lambda w = 0 \\implies \\mathbf{\\Sigma} w = \\lambda w$$
Thus, the principal directions are precisely the eigenvectors of the covariance matrix!`,
    estimatedMinutes: 35,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-ds-201'],
    resources: [],
  },

  // Course 5: Bayesian Modeling & Time-Series (NEW)
  {
    id: 'les-bayes-101',
    moduleId: 'mod-bayes-1',
    courseId: 'course-bayesian-timeseries',
    title: 'Multivariate Bayesian Inference & Prior Conjugacy',
    summary: 'High-dimensional parameter estimation, Dirichlet-Multinomial distributions, and informative priors.',
    contentMarkdown: `### Multivariate Conjugate Distributions
When estimating categorical probabilities $\\mathbf{\\theta} = (\\theta_1, \\dots, \\theta_K)$ with $\\sum \\theta_k = 1$:
The likelihood is Multinomial:
$$P(\\mathcal{D} | \\mathbf{\\theta}) = \\prod_{k=1}^K \\theta_k^{c_k}$$
The conjugate prior is the Dirichlet distribution:
$$P(\\mathbf{\\theta} | \\mathbf{\\alpha}) = \\frac{1}{\\text{B}(\\mathbf{\\alpha})} \\prod_{k=1}^K \\theta_k^{\\alpha_k - 1}$$
The posterior is updated simply by adding count vectors:
$$P(\\mathbf{\\theta} | \\mathcal{D}, \\mathbf{\\alpha}) = \\text{Dirichlet}(\\mathbf{\\alpha} + \\mathbf{c})$$`,
    estimatedMinutes: 30,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: [],
    resources: [],
  },
  {
    id: 'les-bayes-102',
    moduleId: 'mod-bayes-1',
    courseId: 'course-bayesian-timeseries',
    title: 'Markov Chain Monte Carlo (MCMC) & Metropolis-Hastings',
    summary: 'Sampling intractable posteriors using Markov chains, proposal distributions, and acceptance probabilities.',
    contentMarkdown: `### The Metropolis-Hastings Algorithm
When normalizing denominator $\\int P(\\mathcal{D}|\\theta)P(\\theta)d\\theta$ cannot be solved analytically, MCMC generates samples from target distribution $\\pi(\\theta)$:
1. Propose candidate $\\theta^* \\sim q(\\theta^* | \\theta^{(t)})$.
2. Calculate acceptance ratio $\\alpha$:
$$\\alpha(\\theta^{(t)}, \\theta^*) = \\min\\left( 1, \\frac{\\pi(\\theta^*) q(\\theta^{(t)} | \\theta^*)}{\\pi(\\theta^{(t)}) q(\\theta^* | \\theta^{(t)})} \\right)$$
3. Draw $u \\sim \\text{Uniform}(0, 1)$. If $u \\le \\alpha$, set $\\theta^{(t+1)} = \\theta^*$; else set $\\theta^{(t+1)} = \\theta^{(t)}$.`,
    estimatedMinutes: 35,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-bayes-101'],
    resources: [],
  },
  {
    id: 'les-bayes-201',
    moduleId: 'mod-bayes-2',
    courseId: 'course-bayesian-timeseries',
    title: 'Weak Stationarity, Autocovariance & Augmented Dickey-Fuller Tests',
    summary: 'Strict vs wide-sense stationarity, unit root presence, and differencing orders for empirical time-series.',
    contentMarkdown: `### Mathematical Definition of Weak Stationarity
A stochastic process $\\{X_t\\}$ is weakly (covariance) stationary if:
1. $E[X_t] = \\mu$ for all $t$ (constant mean).
2. $\\text{Var}(X_t) = \\sigma^2 < \\infty$ for all $t$ (finite, constant variance).
3. $\\text{Cov}(X_t, X_{t+k}) = \\gamma(k)$ depends only on lag $k$, not time $t$.

#### The Augmented Dickey-Fuller (ADF) Unit Root Test
$$\\Delta Y_t = \\alpha + \\beta t + \\gamma Y_{t-1} + \\sum_{i=1}^p \\delta_i \\Delta Y_{t-i} + \\epsilon_t$$
Null hypothesis $H_0: \\gamma = 0$ (unit root present, non-stationary). If the p-value is below 0.05, we reject $H_0$ and conclude the series is stationary.`,
    estimatedMinutes: 30,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: ['les-bayes-102'],
    resources: [],
  },
  {
    id: 'les-bayes-202',
    moduleId: 'mod-bayes-2',
    courseId: 'course-bayesian-timeseries',
    title: 'ARIMA Models, PACF Lags & GARCH Volatility Clusters',
    summary: 'Autoregressive Integrated Moving Average formulations, AIC minimization, and conditional heteroskedasticity.',
    contentMarkdown: `### The $\\text{ARIMA}(p, d, q)$ Architecture
An $\\text{ARIMA}(p, d, q)$ model combines autoregressive lags $p$, differencing order $d$, and moving average noise terms $q$:
$$\\left( 1 - \\sum_{i=1}^p \\phi_i L^i \\right) (1 - L)^d X_t = \\left( 1 + \\sum_{j=1}^q \\theta_j L^j \\right) \\epsilon_t$$
where $L$ is the lag operator: $L X_t = X_{t-1}$.

#### Identifying Orders via ACF and PACF
* Autoregressive order $p$ is determined by the lag where the Partial Autocorrelation Function (PACF) cuts off.
* Moving Average order $q$ is determined by where the Autocorrelation Function (ACF) cuts off.`,
    estimatedMinutes: 35,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-bayes-201'],
    resources: [],
  },

  // Course 6: Machine Learning Foundations (NEW)
  {
    id: 'les-mlf-101',
    moduleId: 'mod-mlf-1',
    courseId: 'course-ml-foundations',
    title: 'Convex Optimization, Gradient Descent & Lipschitz Continuity',
    summary: 'Convex function definitions, Hessian positive semi-definiteness, and gradient step convergence bounds.',
    contentMarkdown: `### Convexity & Loss Function Geometry
A function $f: \\mathbb{R}^d \\to \\mathbb{R}$ is convex if for all $x, y \\in \\mathbb{R}^d$ and $\\alpha \\in [0, 1]$:
$$f(\\alpha x + (1-\\alpha) y) \\le \\alpha f(x) + (1-\\alpha) f(y)$$
For twice-differentiable functions, convexity is equivalent to the Hessian matrix $\\nabla^2 f(x)$ being Positive Semi-Definite (PSD):
$$v^T \\nabla^2 f(x) v \\ge 0 \\quad \\forall v \\in \\mathbb{R}^d$$
Every local minimum of a convex function is a global minimum!`,
    estimatedMinutes: 25,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: [],
    resources: [],
  },
  {
    id: 'les-mlf-102',
    moduleId: 'mod-mlf-1',
    courseId: 'course-ml-foundations',
    title: 'Regularization Invariants: L1 (Lasso) vs L2 (Ridge) Geometric Duality',
    summary: 'Sparsity induction in L1 norm rhombuses versus spherical shrinkage in L2 norm balls.',
    contentMarkdown: `### Geometric Duality of L1 and L2 Regularization
Given least squares objective $J(w) = \\frac{1}{2n} \\|Xw - y\\|^2$:

#### Ridge Regularization (L2 Norm)
$$\\min_w J(w) + \\lambda \\|w\\|_2^2 = \\min_w J(w) + \\lambda \\sum_{j=1}^d w_j^2$$
The constraint boundary is a smooth hyper-sphere. The contours of the loss function touch the sphere at non-zero points, shrinking coefficients without zeroing them.

#### Lasso Regularization (L1 Norm)
$$\\min_w J(w) + \\lambda \\|w\\|_1 = \\min_w J(w) + \\lambda \\sum_{j=1}^d |w_j|$$
The constraint boundary is a rhombus (cross-polytope) with sharp corners on the coordinate axes. The loss contours often hit the corners first, forcing coefficients to exactly 0 (feature selection)!`,
    estimatedMinutes: 30,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-mlf-101'],
    resources: [],
  },
  {
    id: 'les-mlf-201',
    moduleId: 'mod-mlf-2',
    courseId: 'course-ml-foundations',
    title: 'Support Vector Machines (SVM), Mercer Kernels & Maximum Margins',
    summary: 'Separating hyperplanes, primal-dual quadratic programming, and reproducing kernel Hilbert spaces.',
    contentMarkdown: `### Maximum Margin Separation
The hard-margin SVM seeks hyperplane $w^T x + b = 0$ that maximizes distance $\\frac{2}{\\|w\\|}$ to the closest data points:
$$\\min_{w, b} \\frac{1}{2} \\|w\\|^2 \\quad \\text{subject to } y_i (w^T x_i + b) \\ge 1 \\quad \\forall i$$
The dual problem depends only on inner products:
$$\\max_{\\alpha} \\sum_{i=1}^n \\alpha_i - \\frac{1}{2} \\sum_{i=1}^n \\sum_{j=1}^n \\alpha_i \\alpha_j y_i y_j \\langle x_i, x_j \\rangle$$

#### Mercer's Theorem & The Kernel Trick
Replace $\\langle x_i, x_j \\rangle$ with kernel $K(x_i, x_j) = \\langle \\phi(x_i), \\phi(x_j) \\rangle$:
* Radial Basis Function (RBF): $K(x, z) = \\exp\\left( -\\gamma \\|x - z\\|^2 \\right)$ (maps into infinite-dimensional Hilbert space!)`,
    estimatedMinutes: 35,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: ['les-mlf-102'],
    resources: [],
  },
  {
    id: 'les-mlf-202',
    moduleId: 'mod-mlf-2',
    courseId: 'course-ml-foundations',
    title: 'Decision Trees: Shannon Entropy, Gini Impurity & Information Gain',
    summary: 'Recursive binary partitioning, splitting metrics, and tree pruning formulations.',
    contentMarkdown: `### Splitting Criteria in CART Algorithms
For node $S$ with class proportions $p_1, \\dots, p_K$:

#### Shannon Entropy
$$H(S) = - \\sum_{k=1}^K p_k \\log_2(p_k)$$

#### Gini Impurity
$$G(S) = 1 - \\sum_{k=1}^K p_k^2 = \\sum_{k=1}^K p_k (1 - p_k)$$

#### Information Gain (IG)
When splitting $S$ into subsets $S_L$ and $S_R$ based on attribute $A$:
$$\\text{IG}(S, A) = H(S) - \\left( \\frac{|S_L|}{|S|} H(S_L) + \\frac{|S_R|}{|S|} H(S_R) \\right)$$
The tree algorithm greedily chooses the attribute threshold that maximizes Information Gain.`,
    estimatedMinutes: 30,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-mlf-201'],
    resources: [],
  },

  // Course 7: MLOps Engineering
  {
    id: 'les-ml-101',
    moduleId: 'mod-ml-1',
    courseId: 'course-mlops-engineering',
    title: 'Gradient Boosting Trees & Pseudo-Residual Formulations',
    summary: 'Mathematical foundations of gradient boosting: loss functions, pseudo-residuals, and shrinkage parameters.',
    contentMarkdown: `### Gradient Boosted Decision Trees (GBDT)
Gradient boosting builds an ensemble model sequentially by fitting base learners $h_m(x)$ to the pseudo-residuals:
$$r_{im} = - \\left[ \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\right]_{F(x) = F_{m-1}(x)}$$
Model update:
$$F_m(x) = F_{m-1}(x) + \\nu \\sum_{j=1}^{J_m} \\gamma_{jm} \\mathbf{1}(x \\in R_{jm})$$
where $\\nu \\in (0, 1]$ is the shrinkage (learning rate) parameter.`,
    estimatedMinutes: 30,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: [],
    resources: [],
  },
  {
    id: 'les-ml-102',
    moduleId: 'mod-ml-1',
    courseId: 'course-mlops-engineering',
    title: 'Bias-Variance Trade-Off & Regularized Trees',
    summary: 'Decomposition of expected prediction error into irreducible error, bias squared, and model variance.',
    contentMarkdown: `### Bias-Variance Decomposition
For target $y = f(x) + \\epsilon$ with $\\epsilon \\sim \\mathcal{N}(0, \\sigma^2)$, the expected MSE of estimator $\\hat{f}(x)$ decomposes as:
$$\\mathbb{E}[(y - \\hat{f}(x))^2] = \\underbrace{\\left( \\mathbb{E}[\\hat{f}(x)] - f(x) \\right)^2}_{\\text{Bias}^2} + \\underbrace{\\mathbb{E}\\left[ \\left( \\hat{f}(x) - \\mathbb{E}[\\hat{f}(x)] \\right)^2 \\right]}_{\\text{Variance}} + \\underbrace{\\sigma^2}_{\\text{Irreducible Error}}$$`,
    estimatedMinutes: 25,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-ml-101'],
    resources: [],
  },
  {
    id: 'les-ml-201',
    moduleId: 'mod-ml-2',
    courseId: 'course-mlops-engineering',
    title: 'Production Feature Stores & Point-in-Time Correctness',
    summary: 'Preventing data leakage via point-in-time joins, dual offline-online storage layers, and Redis caching.',
    contentMarkdown: `### Point-in-Time Correctness in Feature Engineering
When training on historical events with timestamp $t_e$, features must strictly reflect values known at $t \\le t_e$. Offline batch stores (Parquet/Delta) satisfy historical training data, while low-latency in-memory stores (Redis) power sub-5ms real-time inference.`,
    estimatedMinutes: 30,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: ['les-ml-102'],
    resources: [],
  },
  {
    id: 'les-ml-202',
    moduleId: 'mod-ml-2',
    courseId: 'course-mlops-engineering',
    title: 'Distribution Shift Detection & Population Stability Index (PSI)',
    summary: 'Covariate drift, concept drift, and empirical PSI calculation across numerical feature buckets.',
    contentMarkdown: `### Population Stability Index (PSI) Formulation
To detect input covariate drift between baseline distribution $B$ and production target distribution $T$:
$$\\text{PSI} = \\sum_{k=1}^K \\left( T_k - B_k \\right) \\times \\ln\\left( \\frac{T_k}{B_k} \\right)$$
#### Decision Invariant Thresholds:
* $\\text{PSI} < 0.10$: Negligible shift; no intervention required.
* $0.10 \\le \\text{PSI} < 0.25$: Moderate shift; monitor and queue validation test.
* $\\text{PSI} \\ge 0.25$: Significant data drift; trigger automated alert and model retraining.`,
    estimatedMinutes: 30,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-ml-201'],
    resources: [],
  },

  // Course 8: Cloud Distributed Systems
  {
    id: 'les-cld-101',
    moduleId: 'mod-cld-1',
    courseId: 'course-4-cloud',
    title: 'Raft Consensus: Leader Election & Term Invariants',
    summary: 'Split votes, randomized election timeouts, and majority quorum terms in distributed consensus.',
    contentMarkdown: `### Raft Consensus Safety Invariants
Raft ensures state machine replication consistency via a distinguished leader:
* **Election Safety**: At most one leader can be elected in a given term.
* **Leader Append-Only**: A leader never overwrites or truncates its log entries.
* **Log Matching**: If two logs contain an entry with the same index and term, they are identical up to that index.`,
    estimatedMinutes: 30,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: [],
    resources: [],
  },
  {
    id: 'les-cld-102',
    moduleId: 'mod-cld-1',
    courseId: 'course-4-cloud',
    title: 'Raft Consensus: Log Replication & Quorum Commits',
    summary: 'AppendEntries RPCs, commitIndex advancement, and state machine transitions.',
    contentMarkdown: `### Log Replication Quorum Invariant
An entry is considered committed once the leader has replicated it to a strict majority quorum of cluster nodes:
$$\\text{Quorum} = \\lfloor N / 2 \\rfloor + 1$$
This ensures that any subsequent leader election must contain the committed entry in at least one voting node!`,
    estimatedMinutes: 35,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-cld-101'],
    resources: [],
  },
  {
    id: 'les-cld-201',
    moduleId: 'mod-cld-2',
    courseId: 'course-4-cloud',
    title: 'The CAP Theorem & Brewer Conjecture Proofs',
    summary: 'Consistency, Availability, and Partition Tolerance trade-offs under network splits.',
    contentMarkdown: `### Formal Statement of the CAP Theorem
Gilbert and Lynch (2002) proved that in an asynchronous network where messages may be delayed or dropped:
It is impossible for a distributed system to simultaneously provide:
1. **Linearizability (Consistency)**: Every read receives the most recent write.
2. **Availability**: Every non-failing node returns a non-error response.
3. **Partition Tolerance**: System continues to operate despite arbitrary network partitions.`,
    estimatedMinutes: 30,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: ['les-cld-102'],
    resources: [],
  },
  {
    id: 'les-cld-202',
    moduleId: 'mod-cld-2',
    courseId: 'course-4-cloud',
    title: 'Two-Phase Commit (2PC) & Distributed Deadlocks',
    summary: 'Prepare and commit phases, coordinator failure modes, and blocking invariants.',
    contentMarkdown: `### The Two-Phase Commit Protocol (2PC)
* **Phase 1 (Prepare)**: Coordinator sends PREPARE to all participants. Participants execute locally, hold locks, and vote YES or NO.
* **Phase 2 (Commit)**: If all vote YES, coordinator logs COMMIT and notifies participants. If any votes NO or times out, coordinator logs ABORT.`,
    estimatedMinutes: 30,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-cld-201'],
    resources: [],
  },

  // Course 9: Cybersecurity & Cryptography
  {
    id: 'les-sec-101',
    moduleId: 'mod-sec-1',
    courseId: 'course-cybersecurity',
    title: 'Symmetric Cryptography & AES-GCM Authenticated Encryption',
    summary: 'Block cipher modes, Galois Counter Mode (GCM), initialization vectors, and authentication tags.',
    contentMarkdown: `### AES-GCM Authenticated Encryption
Galois/Counter Mode (GCM) combines counter mode encryption with Galois field multiplication to guarantee both confidentiality and authenticity in a single pass.
* Never reuse an Initialization Vector (IV) with the same secret key!`,
    estimatedMinutes: 25,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: [],
    resources: [],
  },
  {
    id: 'les-sec-102',
    moduleId: 'mod-sec-1',
    courseId: 'course-cybersecurity',
    title: 'Asymmetric Cryptography: RSA & Elliptic Curve (ECDSA)',
    summary: 'Discrete logarithm problem, Weierstrass elliptic curves, and trapdoor one-way functions.',
    contentMarkdown: `### Elliptic Curve Cryptography (ECC)
Given curve $y^2 = x^3 + ax + b \\pmod p$, point multiplication $Q = d \\cdot G$ is computationally efficient, but finding private scalar $d$ from public point $Q$ (ECDLP) is intractable.`,
    estimatedMinutes: 30,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-sec-101'],
    resources: [],
  },
  {
    id: 'les-sec-201',
    moduleId: 'mod-sec-2',
    courseId: 'course-cybersecurity',
    title: 'Public Key Infrastructure (PKI) & X.509 Certificate Chains',
    summary: 'Certificate Authorities (CA), trust anchors, CRL/OCSP revocation, and chain validation algorithms.',
    contentMarkdown: `### X.509 Certificate Chain Verification
To verify certificate validity, the client traverses the signature path from subscriber certificate up to a pre-installed root trust anchor:
1. Verify signature on each certificate using parent public key.
2. Check current date falls within validity window.
3. Check certificate revocation lists (CRL) or OCSP stapling.`,
    estimatedMinutes: 30,
    sequenceOrder: 1,
    isPublished: true,
    hasAssessment: false,
    prerequisiteLessonIds: ['les-sec-102'],
    resources: [],
  },
  {
    id: 'les-sec-202',
    moduleId: 'mod-sec-2',
    courseId: 'course-cybersecurity',
    title: 'Cryptographic Tokens, OAuth 2.0 & Replay Mitigation',
    summary: 'JSON Web Tokens (JWT), asymmetric signing (RS256), token expiration, and nonces.',
    contentMarkdown: `### JSON Web Signature (JWS) Invariants
A standard JWT consists of three base64url-encoded parts separated by periods:
$$\\text{Token} = \\text{Base64Url}(\\text{Header}) \\, . \\, \\text{Base64Url}(\\text{Payload}) \\, . \\, \\text{Signature}$$
The receiver verifies the signature using the issuer's public key, preventing token tampering.`,
    estimatedMinutes: 30,
    sequenceOrder: 2,
    isPublished: true,
    hasAssessment: true,
    prerequisiteLessonIds: ['les-sec-201'],
    resources: [],
  },
];

export const SEED_ASSESSMENTS: Assessment[] = [
  // Fullstack Assessment 1
  {
    id: 'asm-101',
    courseId: 'course-1-fullstack',
    moduleId: 'mod-101',
    lessonId: 'les-101-2',
    title: 'Module 1 Assessment: Protocol Invariants & Type Safety',
    description: 'Verify your mastery of HTTP method semantics and TypeScript discriminated unions.',
    passingScorePercent: 75,
    maxAttempts: 3,
    retryDelayMinutes: 0,
    timeLimitMinutes: 15,
    isRequiredForModule: true,
    questions: [
      {
        id: 'q-101-1',
        assessmentId: 'asm-101',
        topicId: 'top-http',
        topicName: 'HTTP Protocols & REST Invariants',
        prompt: 'Under RFC 9110 HTTP semantics, which of the following HTTP methods is defined as idempotent but NOT safe?',
        questionType: 'single_choice',
        points: 10,
        sequenceOrder: 1,
        explanation: 'PUT and DELETE are idempotent because repeating them results in the same server state, but they are NOT safe because they alter state.',
        options: [
          { id: 'opt-1-1', questionId: 'q-101-1', optionText: 'PUT', isCorrect: true, sequenceOrder: 1 },
          { id: 'opt-1-2', questionId: 'q-101-1', optionText: 'POST', isCorrect: false, sequenceOrder: 2 },
          { id: 'opt-1-3', questionId: 'q-101-1', optionText: 'GET', isCorrect: false, sequenceOrder: 3 },
          { id: 'opt-1-4', questionId: 'q-101-1', optionText: 'HEAD', isCorrect: false, sequenceOrder: 4 },
        ],
      },
      {
        id: 'q-101-2',
        assessmentId: 'asm-101',
        topicId: 'top-ts',
        topicName: 'TypeScript Advanced Generics & Narrowing',
        prompt: 'In TypeScript, what is the canonical way to enforce compile-time exhaustiveness checking on a discriminated union?',
        questionType: 'single_choice',
        points: 10,
        sequenceOrder: 2,
        explanation: 'Assigning the default branch value to a variable typed as "never" causes TypeScript to trigger a compile-time error if any union member is unhandled.',
        options: [
          { id: 'opt-2-1', questionId: 'q-101-2', optionText: 'Assign the unhandled case to type never in the default switch block', isCorrect: true, sequenceOrder: 1 },
          { id: 'opt-2-2', questionId: 'q-101-2', optionText: 'Use the any type to bypass validation', isCorrect: false, sequenceOrder: 2 },
          { id: 'opt-2-3', questionId: 'q-101-2', optionText: 'Cast using as unknown as object', isCorrect: false, sequenceOrder: 3 },
          { id: 'opt-2-4', questionId: 'q-101-2', optionText: 'Omit the default switch case entirely', isCorrect: false, sequenceOrder: 4 },
        ],
      },
    ],
  },

  // Fullstack Assessment 2
  {
    id: 'asm-102',
    courseId: 'course-1-fullstack',
    moduleId: 'mod-102',
    lessonId: 'les-102-2',
    title: 'Module 2 Assessment: Relational Invariants & ACID Transactions',
    description: 'Evaluate your understanding of 3NF schema normalization and concurrency locking.',
    passingScorePercent: 75,
    maxAttempts: 3,
    retryDelayMinutes: 0,
    timeLimitMinutes: 15,
    isRequiredForModule: true,
    questions: [
      {
        id: 'q-102-1',
        assessmentId: 'asm-102',
        topicId: 'top-db',
        topicName: 'Database Normalization & ACID Transactions',
        prompt: 'What condition distinguishes a relation in Third Normal Form (3NF) from Second Normal Form (2NF)?',
        questionType: 'single_choice',
        points: 10,
        sequenceOrder: 1,
        explanation: '3NF requires that all non-prime attributes are not transitively dependent on any candidate key.',
        options: [
          { id: 'opt-3-1', questionId: 'q-102-1', optionText: 'No non-prime attribute is transitively dependent on the primary key', isCorrect: true, sequenceOrder: 1 },
          { id: 'opt-3-2', questionId: 'q-102-1', optionText: 'All columns must contain arrays of JSON', isCorrect: false, sequenceOrder: 2 },
          { id: 'opt-3-3', questionId: 'q-102-1', optionText: 'The table must have at least five foreign keys', isCorrect: false, sequenceOrder: 3 },
          { id: 'opt-3-4', questionId: 'q-102-1', optionText: 'Every attribute must be a composite index', isCorrect: false, sequenceOrder: 4 },
        ],
      },
    ],
  },

  // AI Assessment 1
  {
    id: 'asm-ai-1',
    courseId: 'course-ai-deep-learning',
    moduleId: 'mod-ai-1',
    lessonId: 'les-ai-102',
    title: 'Module 1 Assessment: Calculus & Optimization Dynamics',
    description: 'Verify computation graph differentiation and Adam momentum mechanics.',
    passingScorePercent: 80,
    maxAttempts: 3,
    retryDelayMinutes: 0,
    timeLimitMinutes: 20,
    isRequiredForModule: true,
    questions: [
      {
        id: 'q-ai-1',
        assessmentId: 'asm-ai-1',
        topicId: 'top-ai-calc',
        topicName: 'Multivariate Calculus & Computation Graphs',
        prompt: 'Why does Adam optimizer perform bias correction on the first and second moment estimators?',
        questionType: 'single_choice',
        points: 10,
        sequenceOrder: 1,
        explanation: 'Because m_0 and v_0 are initialized to zero, exponential moving averages are biased toward zero in initial steps. Dividing by (1 - beta^t) corrects this bias.',
        options: [
          { id: 'opt-ai-1-1', questionId: 'q-ai-1', optionText: 'To counteract initialization bias toward zero during early training steps', isCorrect: true, sequenceOrder: 1 },
          { id: 'opt-ai-1-2', questionId: 'q-ai-1', optionText: 'To convert gradients from float32 to integer format', isCorrect: false, sequenceOrder: 2 },
          { id: 'opt-ai-1-3', questionId: 'q-ai-1', optionText: 'To prevent matrix multiplications from overflowing RAM', isCorrect: false, sequenceOrder: 3 },
          { id: 'opt-ai-1-4', questionId: 'q-ai-1', optionText: 'To bypass the need for backpropagation', isCorrect: false, sequenceOrder: 4 },
        ],
      },
    ],
  },

  // AI Assessment 2
  {
    id: 'asm-ai-2',
    courseId: 'course-ai-deep-learning',
    moduleId: 'mod-ai-2',
    lessonId: 'les-ai-202',
    title: 'Module 2 Assessment: Attention & Architectures',
    description: 'Examine your grasp of Scaled Dot-Product Attention variance normalization.',
    passingScorePercent: 80,
    maxAttempts: 3,
    retryDelayMinutes: 0,
    timeLimitMinutes: 20,
    isRequiredForModule: true,
    questions: [
      {
        id: 'q-ai-2',
        assessmentId: 'asm-ai-2',
        topicId: 'top-ai-att',
        topicName: 'Scaled Dot-Product & Self-Attention Formulation',
        prompt: 'In the Scaled Dot-Product Attention formula, what is the primary mathematical reason for dividing the dot products by sqrt(d_k)?',
        questionType: 'single_choice',
        points: 10,
        sequenceOrder: 1,
        explanation: 'For large d_k, dot products grow large in magnitude, pushing softmax into flat regions where gradients vanish. Dividing by sqrt(d_k) stabilizes the variance to 1.',
        options: [
          { id: 'opt-ai-2-1', questionId: 'q-ai-2', optionText: 'To stabilize the variance of logits to 1 and prevent vanishing softmax gradients', isCorrect: true, sequenceOrder: 1 },
          { id: 'opt-ai-2-2', questionId: 'q-ai-2', optionText: 'To invert the sequence order of the input tokens', isCorrect: false, sequenceOrder: 2 },
          { id: 'opt-ai-2-3', questionId: 'q-ai-2', optionText: 'To enforce causal autoregressive token masking', isCorrect: false, sequenceOrder: 3 },
          { id: 'opt-ai-2-4', questionId: 'q-ai-2', optionText: 'To round logits to the nearest integer', isCorrect: false, sequenceOrder: 4 },
        ],
      },
    ],
  },

  // NLP Assessment
  {
    id: 'asm-nlp-1',
    courseId: 'course-nlp-transformers',
    moduleId: 'mod-nlp-2',
    lessonId: 'les-nlp-202',
    title: 'Module Assessment: Transformers & Attention Mathematical Invariants',
    description: 'Test your understanding of RoPE relative rotations and nucleus sampling.',
    passingScorePercent: 80,
    maxAttempts: 3,
    retryDelayMinutes: 0,
    timeLimitMinutes: 20,
    isRequiredForModule: true,
    questions: [
      {
        id: 'q-nlp-1',
        assessmentId: 'asm-nlp-1',
        topicId: 'top-nlp-rope',
        topicName: 'Rotary Position Embeddings & Attention Geometry',
        prompt: 'How does Rotary Position Embedding (RoPE) encode relative position between query token m and key token n?',
        questionType: 'single_choice',
        points: 10,
        sequenceOrder: 1,
        explanation: 'RoPE applies an orthogonal rotation matrix parameterized by position, such that the inner product depends exclusively on the relative displacement (n - m).',
        options: [
          { id: 'opt-nlp-1-1', questionId: 'q-nlp-1', optionText: 'By rotating vectors in orthogonal 2D subspaces such that their inner product depends only on (n - m)', isCorrect: true, sequenceOrder: 1 },
          { id: 'opt-nlp-1-2', questionId: 'q-nlp-1', optionText: 'By adding static sinusoidal vectors directly to token word embeddings', isCorrect: false, sequenceOrder: 2 },
          { id: 'opt-nlp-1-3', questionId: 'q-nlp-1', optionText: 'By randomizing token positions in the vocabulary table', isCorrect: false, sequenceOrder: 3 },
          { id: 'opt-nlp-1-4', questionId: 'q-nlp-1', optionText: 'By truncating all sentences to a maximum length of 128 tokens', isCorrect: false, sequenceOrder: 4 },
        ],
      },
    ],
  },

  // Data Science Assessment
  {
    id: 'asm-ds-1',
    courseId: 'course-data-science-stats',
    moduleId: 'mod-ds-2',
    lessonId: 'les-ds-202',
    title: 'Module 2 Assessment: Statistical Inference & Dimensionality Reduction',
    description: 'Test your understanding of PCA covariance eigenvectors and hypothesis testing.',
    passingScorePercent: 80,
    maxAttempts: 3,
    retryDelayMinutes: 0,
    timeLimitMinutes: 20,
    isRequiredForModule: true,
    questions: [
      {
        id: 'q-ds-1',
        assessmentId: 'asm-ds-1',
        topicId: 'top-ds-pca',
        topicName: 'Principal Component Analysis (PCA) & Covariance Eigenstructure',
        prompt: 'In Principal Component Analysis (PCA), what do the eigenvectors of the sample covariance matrix represent geometrically?',
        questionType: 'single_choice',
        points: 10,
        sequenceOrder: 1,
        explanation: 'The eigenvectors define the orthogonal axes of maximum variance of the centered data cloud.',
        options: [
          { id: 'opt-ds-1-1', questionId: 'q-ds-1', optionText: 'The orthogonal axes of maximum variance of the centered data', isCorrect: true, sequenceOrder: 1 },
          { id: 'opt-ds-1-2', questionId: 'q-ds-1', optionText: 'The clusters of outlier data points', isCorrect: false, sequenceOrder: 2 },
          { id: 'opt-ds-1-3', questionId: 'q-ds-1', optionText: 'The standard error of the sample mean', isCorrect: false, sequenceOrder: 3 },
          { id: 'opt-ds-1-4', questionId: 'q-ds-1', optionText: 'The residuals of an ordinary least squares regression', isCorrect: false, sequenceOrder: 4 },
        ],
      },
    ],
  },

  // Bayesian Assessment
  {
    id: 'asm-bayes-1',
    courseId: 'course-bayesian-timeseries',
    moduleId: 'mod-bayes-2',
    lessonId: 'les-bayes-202',
    title: 'Module Assessment: Bayesian Formulations & Stationarity Diagnostics',
    description: 'Examine your knowledge of weak stationarity, ADF testing, and MCMC sampling.',
    passingScorePercent: 80,
    maxAttempts: 3,
    retryDelayMinutes: 0,
    timeLimitMinutes: 20,
    isRequiredForModule: true,
    questions: [
      {
        id: 'q-bayes-1',
        assessmentId: 'asm-bayes-1',
        topicId: 'top-bayes-stat',
        topicName: 'Weak Stationarity & Dickey-Fuller Tests',
        prompt: 'What does a p-value below 0.05 in an Augmented Dickey-Fuller (ADF) test indicate about a time-series?',
        questionType: 'single_choice',
        points: 10,
        sequenceOrder: 1,
        explanation: 'The null hypothesis of ADF is that a unit root exists (non-stationary). Rejecting the null indicates the series is stationary.',
        options: [
          { id: 'opt-b-1-1', questionId: 'q-bayes-1', optionText: 'The null hypothesis of a unit root is rejected, indicating the series is stationary', isCorrect: true, sequenceOrder: 1 },
          { id: 'opt-b-1-2', questionId: 'q-bayes-1', optionText: 'The series has an explosive exponential unit root', isCorrect: false, sequenceOrder: 2 },
          { id: 'opt-b-1-3', questionId: 'q-bayes-1', optionText: 'The data must be differenced at order d = 5', isCorrect: false, sequenceOrder: 3 },
          { id: 'opt-b-1-4', questionId: 'q-bayes-1', optionText: 'The sample size is insufficient for analysis', isCorrect: false, sequenceOrder: 4 },
        ],
      },
    ],
  },

  // ML Foundations Assessment
  {
    id: 'asm-mlf-1',
    courseId: 'course-ml-foundations',
    moduleId: 'mod-mlf-2',
    lessonId: 'les-mlf-202',
    title: 'Module Assessment: Convex Optimization, Kernels & Information Gain',
    description: 'Verify your understanding of L1 vs L2 regularization geometry and SVM kernels.',
    passingScorePercent: 80,
    maxAttempts: 3,
    retryDelayMinutes: 0,
    timeLimitMinutes: 20,
    isRequiredForModule: true,
    questions: [
      {
        id: 'q-mlf-1',
        assessmentId: 'asm-mlf-1',
        topicId: 'top-mlf-reg',
        topicName: 'Regularization Invariants: L1 vs L2 Duality',
        prompt: 'Why does L1 (Lasso) regularization induce exact sparsity in parameter weights while L2 (Ridge) does not?',
        questionType: 'single_choice',
        points: 10,
        sequenceOrder: 1,
        explanation: 'The L1 constraint region is a polyhedron with sharp corners on the coordinate axes, where loss contours frequently make first contact.',
        options: [
          { id: 'opt-mlf-1-1', questionId: 'q-mlf-1', optionText: 'The L1 constraint ball has sharp corners on the coordinate axes where loss contours touch first', isCorrect: true, sequenceOrder: 1 },
          { id: 'opt-mlf-1-2', questionId: 'q-mlf-1', optionText: 'Because L1 penalties are calculated using complex numbers', isCorrect: false, sequenceOrder: 2 },
          { id: 'opt-mlf-1-3', questionId: 'q-mlf-1', optionText: 'L2 regularization divides all parameters by zero', isCorrect: false, sequenceOrder: 3 },
          { id: 'opt-mlf-1-4', questionId: 'q-mlf-1', optionText: 'L1 regularization only works on binary classification datasets', isCorrect: false, sequenceOrder: 4 },
        ],
      },
    ],
  },

  // MLOps Assessment
  {
    id: 'asm-ml-1',
    courseId: 'course-mlops-engineering',
    moduleId: 'mod-ml-1',
    lessonId: 'les-ml-102',
    title: 'Module 1 Assessment: Gradient Boosting Formulations',
    description: 'Test your understanding of pseudo-residuals and loss minimization.',
    passingScorePercent: 80,
    maxAttempts: 3,
    retryDelayMinutes: 0,
    timeLimitMinutes: 20,
    isRequiredForModule: true,
    questions: [
      {
        id: 'q-ml-1',
        assessmentId: 'asm-ml-1',
        topicId: 'top-ml-boost',
        topicName: 'Gradient Boosting Formulations',
        prompt: 'In Gradient Boosting regression, what target value is each successive decision tree fitted to predict?',
        questionType: 'single_choice',
        points: 10,
        sequenceOrder: 1,
        explanation: 'Each successive tree in gradient boosting is trained on the negative gradient (pseudo-residuals) of the loss function with respect to current predictions.',
        options: [
          { id: 'opt-ml-1-1', questionId: 'q-ml-1', optionText: 'The negative gradient (pseudo-residuals) of the loss function', isCorrect: true, sequenceOrder: 1 },
          { id: 'opt-ml-1-2', questionId: 'q-ml-1', optionText: 'The original ground truth labels y directly', isCorrect: false, sequenceOrder: 2 },
          { id: 'opt-ml-1-3', questionId: 'q-ml-1', optionText: 'The average of all previous trees predictions', isCorrect: false, sequenceOrder: 3 },
          { id: 'opt-ml-1-4', questionId: 'q-ml-1', optionText: 'Random noise vectors', isCorrect: false, sequenceOrder: 4 },
        ],
      },
    ],
  },
  {
    id: 'asm-ml-2',
    courseId: 'course-mlops-engineering',
    moduleId: 'mod-ml-2',
    lessonId: 'les-ml-202',
    title: 'Module 2 Assessment: MLOps Production Systems',
    description: 'Examine feature drift metrics (PSI), dynamic batching, and canary deployment invariants.',
    passingScorePercent: 80,
    maxAttempts: 3,
    retryDelayMinutes: 0,
    timeLimitMinutes: 20,
    isRequiredForModule: true,
    questions: [
      {
        id: 'q-ml-2',
        assessmentId: 'asm-ml-2',
        topicId: 'top-ml-ops',
        topicName: 'MLOps Drift & Model Serving',
        prompt: 'If the Population Stability Index (PSI) of a critical input feature rises to 0.32 in production, what action is recommended?',
        questionType: 'single_choice',
        points: 10,
        sequenceOrder: 1,
        explanation: 'A PSI of 0.25 or greater indicates significant distribution shift (data drift). Automated alerts should fire, traffic should fall back to safe baselines, and model retraining is required.',
        options: [
          { id: 'opt-ml-2-1', questionId: 'q-ml-2', optionText: 'No action; PSI >= 0.25 indicates optimal distribution consistency', isCorrect: false, sequenceOrder: 1 },
          { id: 'opt-ml-2-2', questionId: 'q-ml-2', optionText: 'Alert engineers of severe data drift, inspect inputs, and initiate model retraining', isCorrect: true, sequenceOrder: 2 },
          { id: 'opt-ml-2-3', questionId: 'q-ml-2', optionText: 'Increase GPU clock speeds to compensate', isCorrect: false, sequenceOrder: 3 },
          { id: 'opt-ml-2-4', questionId: 'q-ml-2', optionText: 'Delete the online feature store', isCorrect: false, sequenceOrder: 4 },
        ],
      },
    ],
  },
];

export const SEED_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-ai',
    title: 'Artificial Intelligence & Neural Architectures Specialization',
    slug: 'ai-specialization-track',
    description:
      'Rigorous career path from multivariate tensor calculus and backpropagation graphs to subword tokenization, Rotary Positional Embeddings, and Transformer attention mechanics.',
    level: 'Comprehensive',
    thumbnailUrl: '/src/assets/images/hero_learnpath_banner_1791813249400.jpg',
    isPublished: true,
    courses: [
      { courseId: 'course-ai-deep-learning', sequenceOrder: 1 },
      { courseId: 'course-nlp-transformers', sequenceOrder: 2 },
    ],
  },
  {
    id: 'path-data-science',
    title: 'Data Science & Statistical Computing Specialization',
    slug: 'data-science-specialization-track',
    description:
      'Comprehensive data science journey: probability foundations, Central Limit Theorem, hypothesis testing, PCA covariance matrices, Bayesian MCMC, and ARIMA time-series.',
    level: 'Comprehensive',
    thumbnailUrl: '/src/assets/images/course_clean_energy_iot_1791814603971.jpg',
    isPublished: true,
    courses: [
      { courseId: 'course-data-science-stats', sequenceOrder: 1 },
      { courseId: 'course-bayesian-timeseries', sequenceOrder: 2 },
    ],
  },
  {
    id: 'path-ml-engineering',
    title: 'Machine Learning Engineering & MLOps Specialization',
    slug: 'ml-engineering-specialization-track',
    description:
      'From convex loss minimization and geometric L1/L2 regularization to Support Vector Machines, Gradient Boosted Decision Trees, and production MLOps drift pipelines.',
    level: 'Comprehensive',
    thumbnailUrl: '/src/assets/images/course_cloud_devops_1791813282155.jpg',
    isPublished: true,
    courses: [
      { courseId: 'course-ml-foundations', sequenceOrder: 1 },
      { courseId: 'course-mlops-engineering', sequenceOrder: 2 },
    ],
  },
  {
    id: 'path-software-systems',
    title: 'Software Engineering & Distributed Systems Track',
    slug: 'software-systems-track',
    description:
      'From foundational client-server contracts and 3NF normalization to distributed Raft consensus, event streaming, and cryptographic security primitives.',
    level: 'Comprehensive',
    thumbnailUrl: '/src/assets/images/course_fullstack_ts_1791813261209.jpg',
    isPublished: true,
    courses: [
      { courseId: 'course-1-fullstack', sequenceOrder: 1 },
      { courseId: 'course-4-cloud', sequenceOrder: 2 },
      { courseId: 'course-cybersecurity', sequenceOrder: 3 },
    ],
  },
];

export const SEED_TOPIC_MASTERIES: Record<string, TopicMastery[]> = {
  'usr-learner-01': [
    {
      topicId: 'top-http',
      topicName: 'HTTP Protocols & REST Invariants',
      masteryScore: 85,
      evidenceCount: 3,
      lastEvaluatedAt: new Date().toISOString(),
    },
    {
      topicId: 'top-ts',
      topicName: 'TypeScript Advanced Generics & Narrowing',
      masteryScore: 75,
      evidenceCount: 2,
      lastEvaluatedAt: new Date().toISOString(),
    },
  ],
};
