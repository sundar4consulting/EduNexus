import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding EduNexus database...\n');

  // --- Cleanup existing data (order matters due to FK constraints) ---
  console.log('🧹 Cleaning existing data...');
  await prisma.userBadge.deleteMany();
  await prisma.karmaLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.forumComment.deleteMany();
  await prisma.forumPost.deleteMany();
  await prisma.jobApplication.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.codeSubmission.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.courseModule.deleteMany();
  await prisma.learningPathCourse.deleteMany();
  await prisma.learningPath.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.codingProblem.deleteMany();
  await prisma.job.deleteMany();
  await prisma.event.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.course.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.college.deleteMany();
  console.log('✅ Cleaned existing data\n');

  // --- Colleges ---
  const colleges = await Promise.all([
    prisma.college.create({ data: { name: 'IIT Bombay', code: 'IITB', city: 'Mumbai', state: 'Maharashtra', universityAffiliation: 'IIT' } }),
    prisma.college.create({ data: { name: 'NIT Trichy', code: 'NITT', city: 'Tiruchirappalli', state: 'Tamil Nadu', universityAffiliation: 'NIT' } }),
    prisma.college.create({ data: { name: 'BITS Pilani', code: 'BITS', city: 'Pilani', state: 'Rajasthan', universityAffiliation: 'BITS' } }),
    prisma.college.create({ data: { name: 'VIT Vellore', code: 'VIT', city: 'Vellore', state: 'Tamil Nadu', universityAffiliation: 'VIT University' } }),
  ]);
  console.log(`✅ Created ${colleges.length} colleges`);

  // --- Users ---
  const passwordHash = await bcrypt.hash('password123', 12);
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Admin User', email: 'admin@edunexus.in', passwordHash, role: 'ADMIN',
        karmaPoints: 15000, xp: 25000, level: 42, currentStreak: 120, longestStreak: 120,
        subscriptionTier: 'ELITE', isVerified: true, bio: 'Platform administrator',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Dr. Priya Sharma', email: 'priya@edunexus.in', passwordHash, role: 'FACULTY',
        karmaPoints: 8500, xp: 12000, level: 28, currentStreak: 45, longestStreak: 90,
        subscriptionTier: 'ELITE', isVerified: true, bio: 'Professor of Computer Science, AI/ML Researcher',
        collegeId: colleges[0].id, branch: 'CSE',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Rahul Verma', email: 'rahul@student.in', passwordHash, role: 'STUDENT',
        karmaPoints: 2800, xp: 5600, level: 15, currentStreak: 22, longestStreak: 45,
        subscriptionTier: 'PRO', isVerified: true, bio: 'B.Tech CSE | Aspiring ML Engineer',
        collegeId: colleges[0].id, branch: 'CSE', yearOfStudy: 3,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Ananya Desai', email: 'ananya@student.in', passwordHash, role: 'STUDENT',
        karmaPoints: 5200, xp: 9800, level: 22, currentStreak: 65, longestStreak: 65,
        subscriptionTier: 'ELITE', isVerified: true, bio: 'Full-Stack Developer & Competitive Programmer',
        collegeId: colleges[1].id, branch: 'CSE', yearOfStudy: 4,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Karthik Menon', email: 'karthik@student.in', passwordHash, role: 'STUDENT',
        karmaPoints: 1200, xp: 3200, level: 10, currentStreak: 12, longestStreak: 30,
        subscriptionTier: 'PRO', isVerified: true, bio: 'Data Science Enthusiast',
        collegeId: colleges[2].id, branch: 'ECE', yearOfStudy: 2,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Sneha Patil', email: 'sneha@student.in', passwordHash, role: 'STUDENT',
        karmaPoints: 750, xp: 1800, level: 7, currentStreak: 5, longestStreak: 15,
        subscriptionTier: 'FREE', isVerified: true, bio: 'Learning AI from scratch!',
        collegeId: colleges[3].id, branch: 'IT', yearOfStudy: 2,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Arjun Singh', email: 'arjun@student.in', passwordHash, role: 'STUDENT',
        karmaPoints: 9500, xp: 18000, level: 35, currentStreak: 90, longestStreak: 90,
        subscriptionTier: 'ELITE', isVerified: true, bio: 'Google STEP intern | CP enthusiast | 6★ CodeChef',
        collegeId: colleges[0].id, branch: 'CSE', yearOfStudy: 3,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Meera Iyer', email: 'meera@student.in', passwordHash, role: 'STUDENT',
        karmaPoints: 3500, xp: 7000, level: 18, currentStreak: 30, longestStreak: 45,
        subscriptionTier: 'PRO', isVerified: true, bio: 'NLP Researcher | Building cool stuff',
        collegeId: colleges[1].id, branch: 'CSE', yearOfStudy: 4,
      },
    }),
  ]);
  console.log(`✅ Created ${users.length} users`);

  // --- Courses ---
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: 'Python for AI & Machine Learning', slug: 'python-for-ai-ml',
        description: 'Master Python from basics to advanced, with focus on libraries used in AI/ML — NumPy, Pandas, Matplotlib, Scikit-learn. Build real projects along the way.',
        category: 'AI/ML', difficulty: 'beginner', estimatedHours: 40, tierRequired: 'FREE',
        isPublished: true, enrolledCount: 12500, avgRating: 4.8, instructorId: users[1].id,
        tags: ['python', 'ai', 'ml', 'numpy', 'pandas'], learningOutcomes: ['Write production-quality Python code', 'Use NumPy and Pandas for data manipulation', 'Build ML models with Scikit-learn'],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Data Structures & Algorithms in C++', slug: 'dsa-cpp',
        description: 'Comprehensive DSA course covering arrays, linked lists, trees, graphs, dynamic programming, and more. Includes 300+ practice problems.',
        category: 'Foundation', difficulty: 'intermediate', estimatedHours: 80, tierRequired: 'FREE',
        isPublished: true, enrolledCount: 18200, avgRating: 4.9, instructorId: users[1].id,
        tags: ['dsa', 'cpp', 'algorithms', 'data-structures'], learningOutcomes: ['Master all fundamental data structures', 'Solve complex algorithmic problems', 'Ace technical interviews'],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Deep Learning with PyTorch', slug: 'deep-learning-pytorch',
        description: 'From neural networks to transformers — build state-of-the-art deep learning models using PyTorch. Covers CNNs, RNNs, GANs, and Attention mechanisms.',
        category: 'AI/ML', difficulty: 'advanced', estimatedHours: 60, tierRequired: 'PRO',
        isPublished: true, enrolledCount: 6800, avgRating: 4.7, instructorId: users[1].id,
        tags: ['deep-learning', 'pytorch', 'neural-networks', 'cnn', 'transformers'], learningOutcomes: ['Build neural networks from scratch', 'Implement CNNs and RNNs', 'Train and deploy deep learning models'],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Full-Stack Web Development with React & Node.js', slug: 'fullstack-react-node',
        description: 'Build production-grade web applications from scratch. Learn React 18+, Node.js, Express, PostgreSQL, and deploy to the cloud.',
        category: 'Full-Stack', difficulty: 'intermediate', estimatedHours: 70, tierRequired: 'PRO',
        isPublished: true, enrolledCount: 9400, avgRating: 4.6, instructorId: users[1].id,
        tags: ['react', 'nodejs', 'express', 'postgresql', 'fullstack'], learningOutcomes: ['Build React applications', 'Create REST APIs with Express', 'Deploy full-stack apps'],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Natural Language Processing (NLP) Masterclass', slug: 'nlp-masterclass',
        description: 'Dive deep into NLP — from text preprocessing to large language models. Includes hands-on projects with Hugging Face Transformers.',
        category: 'AI/ML', difficulty: 'advanced', estimatedHours: 50, tierRequired: 'ELITE',
        isPublished: true, enrolledCount: 4200, avgRating: 4.8, instructorId: users[1].id,
        tags: ['nlp', 'transformers', 'huggingface', 'bert', 'gpt'], learningOutcomes: ['Understand NLP fundamentals', 'Fine-tune transformer models', 'Build NLP applications'],
      },
    }),
    prisma.course.create({
      data: {
        title: 'System Design for Interviews', slug: 'system-design-interviews',
        description: 'Learn to design scalable systems like a senior engineer. Covers load balancers, caching, databases, microservices, and real-world case studies.',
        category: 'Placement', difficulty: 'advanced', estimatedHours: 35, tierRequired: 'PRO',
        isPublished: true, enrolledCount: 7800, avgRating: 4.9, instructorId: users[1].id,
        tags: ['system-design', 'interview', 'scalability', 'microservices'], learningOutcomes: ['Design scalable distributed systems', 'Answer system design interview questions', 'Understand trade-offs in architecture'],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Generative AI & Large Language Models', slug: 'gen-ai-llm',
        description: 'Understand and build with Generative AI — LLMs, RAG, fine-tuning, prompt engineering, and building AI-powered applications.',
        category: 'AI/ML', difficulty: 'intermediate', estimatedHours: 45, tierRequired: 'PRO',
        isPublished: true, enrolledCount: 11200, avgRating: 4.7, instructorId: users[1].id,
        tags: ['generative-ai', 'llm', 'rag', 'prompt-engineering', 'openai'], learningOutcomes: ['Understand LLM architectures', 'Build RAG applications', 'Master prompt engineering'],
      },
    }),
    prisma.course.create({
      data: {
        title: 'DevOps & Cloud Engineering', slug: 'devops-cloud',
        description: 'Master Docker, Kubernetes, CI/CD, AWS, Terraform, and monitoring. Deploy and manage applications at scale.',
        category: 'Full-Stack', difficulty: 'intermediate', estimatedHours: 55, tierRequired: 'PRO',
        isPublished: true, enrolledCount: 5600, avgRating: 4.5, instructorId: users[1].id,
        tags: ['devops', 'docker', 'kubernetes', 'aws', 'terraform'], learningOutcomes: ['Containerize applications with Docker', 'Orchestrate with Kubernetes', 'Build CI/CD pipelines'],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Competitive Programming Bootcamp', slug: 'cp-bootcamp',
        description: 'Sharpen your problem-solving skills for competitions. Covers DP, graphs, number theory, segment trees, and contest strategies.',
        category: 'Competitive Programming', difficulty: 'advanced', estimatedHours: 60, tierRequired: 'FREE',
        isPublished: true, enrolledCount: 8900, avgRating: 4.8, instructorId: users[1].id,
        tags: ['competitive-programming', 'dp', 'graphs', 'codeforces'], learningOutcomes: ['Solve complex algorithmic problems', 'Master competitive programming techniques', 'Achieve expert rating on Codeforces'],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Database Management & SQL Mastery', slug: 'dbms-sql',
        description: 'From ER diagrams to advanced SQL queries, normalization, indexing, transactions, and NoSQL. Includes real-world database design projects.',
        category: 'Foundation', difficulty: 'beginner', estimatedHours: 30, tierRequired: 'FREE',
        isPublished: true, enrolledCount: 14000, avgRating: 4.6, instructorId: users[1].id,
        tags: ['sql', 'database', 'postgresql', 'mongodb'], learningOutcomes: ['Write complex SQL queries', 'Design normalized databases', 'Understand indexing and optimization'],
      },
    }),
    prisma.course.create({
      data: {
        title: 'Ethical Hacking & Cybersecurity', slug: 'ethical-hacking',
        description: 'Learn penetration testing, vulnerability assessment, network security, and defensive techniques. Prepare for CEH certification.',
        category: 'Cybersecurity', difficulty: 'intermediate', estimatedHours: 45, tierRequired: 'PRO',
        isPublished: true, enrolledCount: 3800, avgRating: 4.5, instructorId: users[1].id,
        tags: ['cybersecurity', 'ethical-hacking', 'penetration-testing'], learningOutcomes: ['Perform penetration tests', 'Identify and fix vulnerabilities', 'Understand network security'],
      },
    }),
    prisma.course.create({
      data: {
        title: 'MLOps: From Experiment to Production', slug: 'mlops',
        description: 'Bridge the gap between ML research and production. Learn MLflow, DVC, feature stores, model serving, monitoring, and CI/CD for ML.',
        category: 'AI/ML', difficulty: 'advanced', estimatedHours: 40, tierRequired: 'ELITE',
        isPublished: true, enrolledCount: 2900, avgRating: 4.7, instructorId: users[1].id,
        tags: ['mlops', 'mlflow', 'kubeflow', 'model-serving'], learningOutcomes: ['Set up ML pipelines', 'Version datasets and models', 'Deploy ML models to production'],
      },
    }),
  ]);
  console.log(`✅ Created ${courses.length} courses`);

  // --- Course Modules & Lessons (for first course) ---
  const modules = await Promise.all([
    prisma.courseModule.create({ data: { courseId: courses[0].id, title: 'Python Fundamentals', sortOrder: 1 } }),
    prisma.courseModule.create({ data: { courseId: courses[0].id, title: 'Data Structures in Python', sortOrder: 2 } }),
    prisma.courseModule.create({ data: { courseId: courses[0].id, title: 'NumPy & Pandas Deep Dive', sortOrder: 3 } }),
    prisma.courseModule.create({ data: { courseId: courses[0].id, title: 'Data Visualization', sortOrder: 4 } }),
    prisma.courseModule.create({ data: { courseId: courses[0].id, title: 'Machine Learning with Scikit-learn', sortOrder: 5 } }),
  ]);

  const lessons = [];
  const lessonData = [
    { moduleId: modules[0].id, title: 'Introduction to Python', type: 'VIDEO', durationMinutes: 15, sortOrder: 1, isFreePreview: true },
    { moduleId: modules[0].id, title: 'Variables, Types & Operators', type: 'VIDEO', durationMinutes: 25, sortOrder: 2, isFreePreview: true },
    { moduleId: modules[0].id, title: 'Control Flow & Loops', type: 'VIDEO', durationMinutes: 30, sortOrder: 3 },
    { moduleId: modules[0].id, title: 'Functions & Modules', type: 'ARTICLE', durationMinutes: 20, sortOrder: 4 },
    { moduleId: modules[0].id, title: 'Practice: Python Basics Lab', type: 'LAB', durationMinutes: 45, sortOrder: 5 },
    { moduleId: modules[1].id, title: 'Lists, Tuples & Sets', type: 'VIDEO', durationMinutes: 30, sortOrder: 1 },
    { moduleId: modules[1].id, title: 'Dictionaries & HashMaps', type: 'VIDEO', durationMinutes: 25, sortOrder: 2 },
    { moduleId: modules[1].id, title: 'Stacks, Queues & Deques', type: 'ARTICLE', durationMinutes: 20, sortOrder: 3 },
    { moduleId: modules[2].id, title: 'NumPy Arrays & Operations', type: 'VIDEO', durationMinutes: 35, sortOrder: 1 },
    { moduleId: modules[2].id, title: 'Pandas DataFrames', type: 'VIDEO', durationMinutes: 40, sortOrder: 2 },
    { moduleId: modules[2].id, title: 'Data Cleaning & Transformation', type: 'LAB', durationMinutes: 60, sortOrder: 3 },
    { moduleId: modules[3].id, title: 'Matplotlib & Seaborn', type: 'VIDEO', durationMinutes: 35, sortOrder: 1 },
    { moduleId: modules[3].id, title: 'Interactive Visualizations with Plotly', type: 'INTERACTIVE', durationMinutes: 30, sortOrder: 2 },
    { moduleId: modules[4].id, title: 'Linear Regression from Scratch', type: 'VIDEO', durationMinutes: 40, sortOrder: 1 },
    { moduleId: modules[4].id, title: 'Classification Algorithms', type: 'VIDEO', durationMinutes: 45, sortOrder: 2 },
    { moduleId: modules[4].id, title: 'Model Evaluation & Tuning', type: 'LAB', durationMinutes: 60, sortOrder: 3 },
  ];

  for (const l of lessonData) {
    lessons.push(await prisma.lesson.create({ data: l }));
  }
  console.log(`✅ Created ${modules.length} modules and ${lessons.length} lessons`);

  // --- Learning Paths ---
  const paths = await Promise.all([
    prisma.learningPath.create({
      data: {
        title: 'AI/ML Engineer Path', slug: 'ai-ml-engineer',
        description: 'Complete roadmap to becoming an AI/ML Engineer. From Python basics to deploying production ML models.',
        category: 'AI/ML', difficulty: 'intermediate', estimatedHours: 200, isPublished: true, enrolledCount: 8500,
        createdBy: users[0].id,
        pathCourses: {
          create: [
            { courseId: courses[0].id, sortOrder: 1, isMilestone: true },
            { courseId: courses[9].id, sortOrder: 2 },
            { courseId: courses[2].id, sortOrder: 3, isMilestone: true },
            { courseId: courses[4].id, sortOrder: 4 },
            { courseId: courses[11].id, sortOrder: 5, isMilestone: true },
          ],
        },
      },
    }),
    prisma.learningPath.create({
      data: {
        title: 'Full-Stack Developer Path', slug: 'fullstack-developer',
        description: 'Become a complete Full-Stack Developer. Learn frontend, backend, databases, and deployment.',
        category: 'Full-Stack', difficulty: 'intermediate', estimatedHours: 180, isPublished: true, enrolledCount: 6200,
        createdBy: users[0].id,
        pathCourses: {
          create: [
            { courseId: courses[3].id, sortOrder: 1, isMilestone: true },
            { courseId: courses[9].id, sortOrder: 2 },
            { courseId: courses[7].id, sortOrder: 3, isMilestone: true },
            { courseId: courses[5].id, sortOrder: 4 },
          ],
        },
      },
    }),
    prisma.learningPath.create({
      data: {
        title: 'Placement Ready Path', slug: 'placement-ready',
        description: 'Everything you need to crack placements at top companies. DSA, system design, and interview skills.',
        category: 'Placement', difficulty: 'intermediate', estimatedHours: 150, isPublished: true, enrolledCount: 12000,
        createdBy: users[0].id,
        pathCourses: {
          create: [
            { courseId: courses[1].id, sortOrder: 1, isMilestone: true },
            { courseId: courses[9].id, sortOrder: 2 },
            { courseId: courses[5].id, sortOrder: 3, isMilestone: true },
          ],
        },
      },
    }),
    prisma.learningPath.create({
      data: {
        title: 'Competitive Programming Master', slug: 'cp-master',
        description: 'Train to become a competitive programming champion. From basics to advanced techniques.',
        category: 'Competitive Programming', difficulty: 'advanced', estimatedHours: 120, isPublished: true, enrolledCount: 4500,
        createdBy: users[0].id,
        pathCourses: {
          create: [
            { courseId: courses[1].id, sortOrder: 1, isMilestone: true },
            { courseId: courses[8].id, sortOrder: 2, isMilestone: true },
          ],
        },
      },
    }),
  ]);
  console.log(`✅ Created ${paths.length} learning paths`);

  // --- Coding Problems ---
  const problems = await Promise.all([
    prisma.codingProblem.create({
      data: {
        title: 'Two Sum', slug: 'two-sum', difficulty: 'easy', category: 'Arrays',
        descriptionMarkdown: '# Two Sum\n\nGiven an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.\n\nYou may assume each input would have exactly one solution.',
        tags: ['arrays', 'hash-map'], companies: ['Google', 'Amazon', 'Meta'],
        inputFormat: 'First line: n (array size). Second line: n integers. Third line: target.',
        outputFormat: 'Two space-separated indices.',
        examples: [{ input: '4\n2 7 11 15\n9', output: '0 1', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' }],
        submissionCount: 45000, acceptanceRate: 72.5, createdBy: users[0].id,
      },
    }),
    prisma.codingProblem.create({
      data: {
        title: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring', difficulty: 'medium', category: 'Strings',
        descriptionMarkdown: '# Longest Palindromic Substring\n\nGiven a string `s`, return the longest palindromic substring in `s`.',
        tags: ['strings', 'dp'], companies: ['Amazon', 'Microsoft'],
        submissionCount: 28000, acceptanceRate: 45.2, createdBy: users[0].id,
      },
    }),
    prisma.codingProblem.create({
      data: {
        title: 'Merge K Sorted Lists', slug: 'merge-k-sorted-lists', difficulty: 'hard', category: 'Linked Lists',
        descriptionMarkdown: '# Merge K Sorted Lists\n\nMerge k sorted linked lists and return it as one sorted list.',
        tags: ['linked-lists', 'heap', 'divide-and-conquer'], companies: ['Google', 'Meta', 'Apple'],
        submissionCount: 15000, acceptanceRate: 38.8, createdBy: users[0].id,
      },
    }),
    prisma.codingProblem.create({
      data: {
        title: 'Maximum Subarray', slug: 'maximum-subarray', difficulty: 'medium', category: 'DP',
        descriptionMarkdown: '# Maximum Subarray\n\nFind the contiguous subarray which has the largest sum and return its sum.',
        tags: ['arrays', 'dp', 'kadane'], companies: ['Amazon', 'Microsoft', 'Google'],
        submissionCount: 35000, acceptanceRate: 65.1, createdBy: users[0].id,
      },
    }),
    prisma.codingProblem.create({
      data: {
        title: 'Binary Tree Level Order Traversal', slug: 'bt-level-order', difficulty: 'medium', category: 'Trees',
        descriptionMarkdown: '# Binary Tree Level Order Traversal\n\nGiven the root of a binary tree, return the level order traversal of its nodes values.',
        tags: ['trees', 'bfs'], companies: ['Meta', 'Amazon'],
        submissionCount: 22000, acceptanceRate: 58.3, createdBy: users[0].id,
      },
    }),
  ]);
  console.log(`✅ Created ${problems.length} coding problems`);

  // --- Events ---
  const now = new Date();
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'AI Innovation Hackathon 2026', slug: 'ai-hackathon-2026', type: 'hackathon',
        description: 'Build innovative AI solutions in 48 hours. ₹5L prize pool. Open to all engineering students.',
        startTime: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() + 16 * 24 * 60 * 60 * 1000),
        maxParticipants: 500, tierRequired: 'FREE', karmaAward: 50, status: 'UPCOMING',
        speakers: [{ name: 'Dr. Rajesh Kumar', title: 'AI Lead', company: 'Google India' }],
        tags: ['hackathon', 'ai', 'prizes'], createdBy: users[0].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Cracking FAANG Interviews - Masterclass', slug: 'faang-interview-masterclass', type: 'webinar',
        description: 'Learn interview strategies from engineers who have worked at Google, Meta, and Amazon.',
        startTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        maxParticipants: 1000, tierRequired: 'FREE', karmaAward: 10, status: 'UPCOMING',
        speakers: [{ name: 'Anika Jain', title: 'SDE-3', company: 'Google' }, { name: 'Vikram Patel', title: 'Senior Engineer', company: 'Meta' }],
        tags: ['interview', 'faang', 'career'], createdBy: users[0].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Build a RAG ChatBot Workshop', slug: 'rag-chatbot-workshop', type: 'workshop',
        description: 'Hands-on workshop: Build a Retrieval Augmented Generation chatbot using LangChain, OpenAI, and Pinecone.',
        startTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
        maxParticipants: 200, tierRequired: 'PRO', karmaAward: 20, status: 'UPCOMING',
        speakers: [{ name: 'Neha Gupta', title: 'ML Engineer', company: 'OpenAI' }],
        tags: ['rag', 'chatbot', 'langchain', 'workshop'], createdBy: users[0].id,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Weekly Code Sprint #42', slug: 'code-sprint-42', type: 'code_sprint',
        description: 'Solve 5 algorithmic problems in 2 hours. Prizes for top 10!',
        startTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        maxParticipants: 500, tierRequired: 'FREE', karmaAward: 15, status: 'UPCOMING',
        tags: ['coding', 'contest', 'algorithms'], createdBy: users[0].id,
      },
    }),
  ]);
  console.log(`✅ Created ${events.length} events`);

  // --- Jobs ---
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: 'Software Development Engineer (SDE-1)', companyName: 'Google India',
        description: 'Join Google India as an SDE-1. Work on large-scale distributed systems serving billions of users.',
        jobType: 'full-time', location: 'Bangalore',
        requirements: ['B.Tech/B.E. in CS/IT', 'Strong DSA skills', 'Proficiency in C++/Java/Python'],
        branchesEligible: ['CSE', 'IT', 'ECE'],
        applicationDeadline: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        salaryRange: '₹25-45 LPA',
      },
    }),
    prisma.job.create({
      data: {
        title: 'ML Engineer Intern', companyName: 'Microsoft Research',
        description: 'Work on cutting-edge ML research and build production ML systems at Microsoft Research India.',
        jobType: 'internship', location: 'Hyderabad', isRemote: false, salaryRange: '₹80K/month',
        requirements: ['B.Tech 3rd/4th year', 'Experience with PyTorch/TensorFlow', 'Research publication preferred'],
        branchesEligible: ['CSE', 'IT', 'ECE', 'EEE'],
        applicationDeadline: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.job.create({
      data: {
        title: 'Full Stack Developer', companyName: 'Razorpay',
        description: 'Build and scale financial technology platforms used by millions of businesses across India.',
        jobType: 'full-time', location: 'Bangalore', salaryRange: '₹18-30 LPA',
        requirements: ['React, Node.js expertise', 'PostgreSQL/MongoDB', '2+ years experience or exceptional freshers'],
        branchesEligible: ['CSE', 'IT'],
        applicationDeadline: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.job.create({
      data: {
        title: 'Data Analyst Intern', companyName: 'Flipkart',
        description: 'Analyze large datasets to drive business decisions. Work with data engineering and product teams.',
        jobType: 'internship', location: 'Bangalore', isRemote: true, salaryRange: '₹50K/month',
        requirements: ['SQL proficiency', 'Python/R for data analysis', 'Statistics knowledge'],
        branchesEligible: ['CSE', 'IT', 'ECE', 'ME'],
        applicationDeadline: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.job.create({
      data: {
        title: 'DevOps Engineer', companyName: 'Atlassian',
        description: 'Manage cloud infrastructure and CI/CD pipelines for Atlassian\'s suite of products.',
        jobType: 'full-time', location: 'Bangalore', salaryRange: '₹20-35 LPA',
        requirements: ['Docker, Kubernetes', 'AWS/GCP experience', 'CI/CD pipelines'],
        branchesEligible: ['CSE', 'IT'],
        applicationDeadline: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);
  console.log(`✅ Created ${jobs.length} jobs`);

  // --- Badges ---
  const badges = await Promise.all([
    prisma.badge.create({ data: { name: 'First Steps', slug: 'first-steps', description: 'Complete your first lesson', category: 'learning' } }),
    prisma.badge.create({ data: { name: 'Streak Master', slug: 'streak-master', description: '30-day login streak', category: 'engagement' } }),
    prisma.badge.create({ data: { name: 'Quiz Whiz', slug: 'quiz-whiz', description: 'Score 100% on 10 quizzes', category: 'assessment' } }),
    prisma.badge.create({ data: { name: 'Code Warrior', slug: 'code-warrior', description: 'Solve 100 coding challenges', category: 'coding' } }),
    prisma.badge.create({ data: { name: 'Social Butterfly', slug: 'social-butterfly', description: 'Help 25 people in community', category: 'community' } }),
    prisma.badge.create({ data: { name: 'Hackathon Hero', slug: 'hackathon-hero', description: 'Win a hackathon', category: 'events' } }),
    prisma.badge.create({ data: { name: 'Pathfinder', slug: 'pathfinder', description: 'Complete an entire learning path', category: 'learning' } }),
    prisma.badge.create({ data: { name: 'Night Owl', slug: 'night-owl', description: 'Study between 12am-5am for 7 days', category: 'engagement' } }),
    prisma.badge.create({ data: { name: 'Early Bird', slug: 'early-bird', description: 'Study before 7am for 7 days', category: 'engagement' } }),
  ]);

  // Give some badges to users
  await prisma.userBadge.createMany({
    data: [
      { userId: users[6].id, badgeId: badges[0].id },
      { userId: users[6].id, badgeId: badges[1].id },
      { userId: users[6].id, badgeId: badges[3].id },
      { userId: users[6].id, badgeId: badges[5].id },
      { userId: users[3].id, badgeId: badges[0].id },
      { userId: users[3].id, badgeId: badges[1].id },
      { userId: users[3].id, badgeId: badges[6].id },
      { userId: users[2].id, badgeId: badges[0].id },
    ],
  });
  console.log(`✅ Created ${badges.length} badges`);

  // --- Forum Posts ---
  await prisma.forumPost.createMany({
    data: [
      { userId: users[2].id, title: 'How to transition from web dev to ML?', content: 'I have 2 years of React experience and want to move into ML. What should be my learning path?', category: 'Career', tags: ['ml', 'career-change'], upvotes: 42 },
      { userId: users[3].id, title: 'Best resources for Dynamic Programming?', content: 'I am struggling with DP problems. Any recommended resources or strategies?', category: 'DSA', tags: ['dp', 'competitive-programming'], upvotes: 35 },
      { userId: users[6].id, title: 'My Google Interview Experience', content: 'I recently interviewed at Google for SDE-1 role. Here is my detailed experience...', category: 'Interviews', tags: ['google', 'interview', 'experience'], upvotes: 128 },
      { userId: users[4].id, title: 'Setting up a ML project from scratch', content: 'Guide on how to structure your ML project properly with virtual environments, data versioning, and experiment tracking.', category: 'AI/ML', tags: ['mlops', 'project-setup'], upvotes: 56 },
    ],
  });
  console.log('✅ Created forum posts');

  // --- Enrollments ---
  await prisma.enrollment.createMany({
    data: [
      { userId: users[2].id, courseId: courses[0].id, progressPercent: 75 },
      { userId: users[2].id, courseId: courses[1].id, progressPercent: 45 },
      { userId: users[2].id, courseId: courses[6].id, progressPercent: 20 },
      { userId: users[3].id, courseId: courses[1].id, progressPercent: 100, completedAt: new Date() },
      { userId: users[3].id, courseId: courses[3].id, progressPercent: 88 },
      { userId: users[3].id, courseId: courses[5].id, progressPercent: 60 },
      { userId: users[6].id, courseId: courses[1].id, progressPercent: 100, completedAt: new Date() },
      { userId: users[6].id, courseId: courses[8].id, progressPercent: 92 },
      { userId: users[5].id, courseId: courses[0].id, progressPercent: 30 },
    ],
  });
  console.log('✅ Created enrollments');

  console.log('\n🎉 Seed completed successfully!\n');
  console.log('📧 Test accounts:');
  console.log('   Admin:   admin@edunexus.in / password123');
  console.log('   Faculty: priya@edunexus.in / password123');
  console.log('   Student: rahul@student.in / password123');
  console.log('   Student: ananya@student.in / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
