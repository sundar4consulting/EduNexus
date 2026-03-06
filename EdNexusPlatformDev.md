# ═══════════════════════════════════════════════════════════════
# EDUNEXUS — AI-Powered EdTech Platform
# Master Development Prompt v2.0
# Target: Engineering College Students across India
# Model: Subscription-based SaaS Portal
# ═══════════════════════════════════════════════════════════════

## 🏗️ PROJECT OVERVIEW

Build "EduNexus" — a full-stack, subscription-based EdTech platform
designed for engineering college students across India, with deep
specialization in AI/ML skill building. The platform combines
structured learning, gamification, industry mentorship, and
placement preparation into a single unified ecosystem.

---

## 🎯 TARGET AUDIENCE

| Segment              | Description                                                |
|----------------------|------------------------------------------------------------|
| Primary Users        | Engineering students (B.Tech/B.E.) across all branches     |
| Secondary Users      | Faculty, Training & Placement Officers (TPOs), HoDs        |
| Institutional Buyers | Engineering colleges, deemed universities, autonomous inst. |
| Industry Partners    | Companies for hiring, mentorship, sponsorship              |
| Content Creators     | Subject matter experts, FAANG engineers, researchers        |

---

## 💰 SUBSCRIPTION TIERS

### Tier 1: Explorer (Free Forever)
- Access to 20 foundational courses
- 5 coding challenges per week
- Community forum (read-only for premium threads)
- Basic profile + digital badge (1)
- Limited quiz attempts (3/day)
- View-only access to events calendar

### Tier 2: Pro Student (₹299/month or ₹2,499/year)
- All Explorer features +
- Full course library (200+ courses)
- Unlimited coding challenges & labs
- AI-powered study plan generator
- Resume builder with ATS scoring
- Mock interview simulator (text-based)
- 10 Karma bonus points/month
- Priority community support
- Certificate of completion (digital, verifiable)
- Job board access (apply to 10 jobs/month)

### Tier 3: Elite (₹599/month or ₹4,999/year)
- All Pro features +
- Live 1-on-1 mentorship sessions (2/month, 30 min each)
- Video mock interviews with AI feedback
- Company-specific interview prep tracks (TCS, Infosys, Google, etc.)
- Hackathon priority registration + team matching
- Physical certificate (shipped) + LinkedIn badge
- Unlimited job applications
- Early access to new courses
- Exclusive industry webinars
- 25 Karma bonus points/month

### Tier 4: Institution (Custom Pricing — per college)
- Admin dashboard for TPO/HoD
- Bulk student onboarding (CSV/API)
- Custom branded portal (white-label lite)
- Analytics: student progress, placement readiness scores
- Faculty accounts with content upload privileges
- Dedicated account manager
- API access for LMS integration (Moodle, Canvas)
- Custom course creation tools
- Placement drive management module

---

## 📚 CORE FEATURE MODULES

### MODULE 1: Structured Learning Paths

Design learning paths as directed acyclic graphs (DAGs) where each
node is a course/module and edges represent prerequisites.

**Learning Path Categories:**
1. **Foundation Track** — Engineering Mathematics, Data Structures,
   Algorithms, OOP, DBMS, OS, Computer Networks
2. **AI/ML Specialization** — Python for AI, Statistics & Probability,
   Linear Algebra, ML Fundamentals, Deep Learning, NLP, Computer Vision,
   Reinforcement Learning, MLOps, Generative AI & LLMs
3. **Full-Stack Development** — HTML/CSS/JS, React, Node.js, Databases,
   DevOps, System Design
4. **Data Engineering** — SQL mastery, ETL pipelines, Spark, Kafka,
   Airflow, Data Warehousing, Cloud (AWS/GCP/Azure)
5. **Cybersecurity** — Network Security, Ethical Hacking, Cryptography,
   SOC Operations, Cloud Security
6. **Competitive Programming** — C++ STL, Problem Solving patterns,
   Contest strategies, DP, Graphs, Number Theory
7. **Placement Preparation** — Aptitude, Verbal, Technical MCQs,
   Group Discussion, HR Interview, System Design
8. **Research & Innovation** — Research methodology, Paper writing,
   LaTeX, Patent filing, Literature surveys

**Learning Path Data Model:**
```
LearningPath {
  id, title, slug, description, difficulty_level,
  estimated_hours, category, tags[],
  nodes: [
    { course_id, position_x, position_y, is_milestone },
  ],
  edges: [
    { from_course_id, to_course_id, type: "prerequisite"|"recommended" }
  ],
  created_by, is_published, enrolled_count,
  completion_rate, avg_rating
}
```

**Course Data Model:**
```
Course {
  id, title, slug, description, thumbnail_url,
  instructor_id, category, tags[], difficulty,
  estimated_hours, tier_required: "free"|"pro"|"elite",
  modules: [
    {
      id, title, order,
      lessons: [
        {
          id, title, type: "video"|"article"|"interactive"|"lab",
          content_url, duration_minutes, order,
          resources: [{ title, url, type }]
        }
      ]
    }
  ],
  prerequisites: [course_id],
  learning_outcomes: string[],
  is_published, enrolled_count, avg_rating,
  reviews: [{ user_id, rating, comment, created_at }]
}
```

### MODULE 2: Interactive Gamified Learning Mode

**2a. Karma Points System**
A reputation/motivation system inspired by StackOverflow + Duolingo.

| Action                          | Karma Points |
|---------------------------------|--------------|
| Complete a lesson               | +5           |
| Complete a course               | +50          |
| Complete a learning path        | +200         |
| Daily login streak (per day)    | +2           |
| 7-day streak bonus              | +20          |
| 30-day streak bonus             | +100         |
| Quiz score > 80%                | +10          |
| Quiz perfect score (100%)       | +25          |
| Win a coding challenge          | +30          |
| Hackathon participation         | +50          |
| Hackathon top 3 finish          | +150         |
| Help in community (accepted)    | +15          |
| Refer a friend (who signs up)   | +25          |
| Submit an assignment            | +10          |
| Publish a blog post             | +20          |
| Get upvoted (community)         | +2 per vote  |
| Report a bug (verified)         | +30          |

**Karma Levels:**
```
0–99       → Beginner        (🟢 Green badge)
100–499    → Learner         (🔵 Blue badge)
500–1499   → Achiever        (🟣 Purple badge)
1500–4999  → Expert          (🟠 Orange badge)
5000–9999  → Master          (🔴 Red badge)
10000+     → Legend          (🏆 Gold badge)
```

**2b. Leaderboards**
- Global leaderboard (all-time + weekly + monthly)
- College-wise leaderboard
- Course-specific leaderboard
- Branch-wise (CSE, ECE, ME, etc.)
- Anti-gaming: rate-limit point accrual, flag suspicious patterns

**2c. Achievements & Badges**
A badge system similar to Xbox achievements:
- "First Steps" — Complete your first lesson
- "Streak Master" — 30-day login streak
- "Quiz Whiz" — Score 100% on 10 quizzes
- "Social Butterfly" — Help 25 people in community
- "Code Warrior" — Solve 100 coding challenges
- "Hackathon Hero" — Win a hackathon
- "Pathfinder" — Complete an entire learning path
- "Night Owl" — Study between 12am–5am for 7 days
- "Early Bird" — Study before 7am for 7 days
- Custom institution badges (TPO can create)

**2d. XP & Level-Up Animations**
- Each action gives XP (separate from Karma)
- Visual progress bar on dashboard with level-up animations
- Sound effects (toggleable) on achievements
- Confetti burst on course completion
- Share achievement cards to LinkedIn/Twitter

### MODULE 3: Quizzes & Assessments

**Quiz Types:**
1. **MCQ (Single/Multiple correct)**
2. **True/False**
3. **Fill in the blanks (code)**
4. **Match the following**
5. **Coding challenges** (with online judge — stdin/stdout)
6. **Subjective (AI-graded)** — short answer evaluated by LLM
7. **Drag & drop** (arrange steps, build flowcharts)
8. **Timed challenges** (speed rounds)

**Quiz Data Model:**
```
Quiz {
  id, title, course_id, module_id (optional),
  type: "practice"|"graded"|"contest"|"mock_test",
  time_limit_minutes, max_attempts,
  passing_score_percent, shuffle_questions, shuffle_options,
  questions: [
    {
      id, type, text, code_snippet, image_url,
      options: [{ id, text, is_correct }],
      correct_answer, explanation,
      difficulty, points, tags[]
    }
  ],
  created_by, is_published
}

QuizAttempt {
  id, quiz_id, user_id, started_at, completed_at,
  score, max_score, percentage, passed,
  answers: [{ question_id, selected_option_ids, answer_text, is_correct, time_spent_seconds }],
  karma_awarded, certificate_id (if applicable)
}
```

**Adaptive Quiz Engine:**
- Questions get harder/easier based on running score
- AI generates personalized question banks from weak topics
- Spaced repetition: revisit incorrectly answered topics after N days

### MODULE 4: Coding Lab & Online Judge

**Features:**
- Browser-based code editor (Monaco Editor)
- Language support: Python, C, C++, Java, JavaScript, Go, Rust
- Real-time compilation & execution (sandboxed Docker containers)
- Test cases: visible (sample) + hidden (evaluation)
- Time & memory limits per problem
- Plagiarism detection (MOSS-style similarity checking)
- AI hint system: progressive hints (costs Karma to unlock)

**Problem Categories:**
Arrays, Strings, Linked Lists, Trees, Graphs, DP, Greedy,
Backtracking, Bit Manipulation, Math, Sorting, Searching,
System Design, SQL queries, API design

**Problem Data Model:**
```
CodingProblem {
  id, title, slug, description_markdown,
  difficulty: "easy"|"medium"|"hard",
  category, tags[], companies[],
  constraints, input_format, output_format,
  examples: [{ input, output, explanation }],
  test_cases: [{ input, expected_output, is_hidden, time_limit_ms, memory_limit_mb }],
  editorial_markdown, hints[],
  submission_count, acceptance_rate,
  created_by
}

Submission {
  id, problem_id, user_id, language, code,
  status: "AC"|"WA"|"TLE"|"MLE"|"RE"|"CE",
  execution_time_ms, memory_used_mb,
  test_cases_passed, total_test_cases,
  submitted_at, karma_awarded
}
```

### MODULE 5: Events, Webinars & Seminars

**Event Types:**
1. **Live Webinars** — Industry experts, FAANG engineers
2. **Workshops** — Hands-on (3–6 hours), build a project
3. **Hackathons** — 24h/48h, team-based, prizes + Karma
4. **Tech Talks** — 1-hour deep-dives on specific topics
5. **Career Fairs** — Virtual booths, company presentations
6. **Code Sprints** — Timed competitive coding events
7. **Paper Reading Groups** — Weekly research paper discussions
8. **Mock Placement Drives** — Simulated company hiring process
9. **Office Hours** — Drop-in mentorship sessions

**Event Data Model:**
```
Event {
  id, title, slug, description, type,
  banner_image_url, start_time, end_time,
  timezone, is_online, venue_or_link,
  max_participants, current_registrations,
  tier_required: "free"|"pro"|"elite",
  speakers: [{ name, title, company, avatar_url, linkedin_url }],
  agenda: [{ time, title, speaker_name }],
  tags[], category,
  registration_deadline, is_recording_available,
  recording_url, karma_award,
  status: "upcoming"|"live"|"completed"|"cancelled",
  created_by
}

EventRegistration {
  id, event_id, user_id, registered_at,
  attended: boolean, feedback_rating, feedback_text,
  certificate_id
}
```

**Calendar Integration:**
- Sync with Google Calendar / Outlook
- Push notifications (email + in-app) 24h and 1h before event
- Timezone-aware display
- "Add to Calendar" button (.ics download)

### MODULE 6: Industry AI Council

A virtual advisory board of AI/ML industry professionals who:
- Review and validate AI/ML course curriculum quarterly
- Provide real-world case studies and datasets
- Offer mentorship slots for Elite subscribers
- Judge hackathons and project showcases
- Write "Industry Insights" blog posts
- Conduct monthly AMA (Ask Me Anything) sessions

**Council Member Profile:**
```
CouncilMember {
  id, name, title, company, bio,
  expertise_areas[], linkedin_url, avatar_url,
  is_active, joined_date,
  mentorship_slots_per_month,
  contributions: [{ type, title, date, url }]
}
```

**Council-Backed Features:**
- "Industry Validated" badge on courses reviewed by council
- Council Q&A forum (Elite only)
- Quarterly "State of AI in India" report
- Student project reviews by council members
- Recommendation letters for top performers

### MODULE 7: AI-Powered Features

**7a. Personalized Study Plan Generator**
- Input: student's branch, year, target (placement/higher studies/startup),
  available hours/week, current skill level (assessed via diagnostic test)
- Output: Week-by-week study plan with courses, practice problems,
  milestones, and buffer weeks
- Adapts based on progress and quiz performance

**7b. Smart Course Recommendations**
- Collaborative filtering (students like you also took X)
- Content-based filtering (based on topics you've studied)
- Hybrid model with cold-start handling for new users

**7c. AI Code Review**
- After coding challenge submission, AI provides:
  - Code quality feedback
  - Time/space complexity analysis
  - Alternative approaches
  - Best practices suggestions

**7d. AI Mock Interviewer**
- Text-based for Pro, Video-based for Elite
- Asks behavioral + technical questions
- Evaluates responses using rubrics
- Provides detailed feedback with scores

**7e. AI-Generated Quizzes**
- Generate quiz from any course content
- Difficulty-adjustable
- Explanation generation for each answer

**7f. Doubt Resolution Bot**
- RAG-based chatbot trained on course content
- Escalates to human mentor if confidence < threshold
- Tracks common doubts for curriculum improvement

### MODULE 8: Community & Social Features

**Forums:**
- Course-specific discussion boards
- General Q&A (StackOverflow-style with upvotes)
- Study groups (create/join)
- College-specific channels
- Branch-specific channels

**Social Features:**
- Student profiles with portfolio
- Follow other students
- Activity feed
- Direct messaging (Pro+)
- Study buddy matching algorithm
- Peer code review system

**Content Creation:**
- Student blog posts (earn Karma)
- Tutorial contributions
- Solution writeups for coding problems
- Project showcases

### MODULE 9: Placement & Career Module

**Resume Builder:**
- ATS-friendly templates (5+ designs)
- Auto-populate from profile & achievements
- AI suggestions for bullet points
- Multiple export formats (PDF, DOCX)
- Version history

**Job Board:**
```
Job {
  id, title, company_name, company_logo_url,
  description, requirements[], nice_to_have[],
  job_type: "full-time"|"internship"|"contract",
  location, is_remote, salary_range,
  experience_required, branches_eligible[],
  application_deadline, posted_at,
  apply_url or in_platform_apply,
  status: "active"|"closed"|"filled"
}
```

**Mock Placement Drive:**
- Simulates real company hiring process
- Round 1: Online test (aptitude + technical MCQ)
- Round 2: Coding round (2–3 problems, timed)
- Round 3: Technical interview (AI-simulated)
- Round 4: HR interview (AI-simulated)
- Detailed scorecard after each round
- Company-specific tracks (TCS NQT, Infosys InfyTQ, etc.)

### MODULE 10: Institution Dashboard (B2B)

**TPO Dashboard:**
- Student progress heatmap
- Placement readiness scores
- Batch analytics (year-wise, branch-wise)
- Company visit scheduler
- Communication tools (bulk announcements)
- Export reports (PDF, Excel)

**Faculty Dashboard:**
- Upload supplementary content
- Create custom quizzes for their class
- Track student engagement
- Grade assignments
- Discussion moderation

**College Branding:**
- Custom logo + colors
- Custom domain (college.edunexus.in)
- College-specific events
- Alumni network integration

### MODULE 11: Certificates & Credentials

**Certificate Types:**
1. Course completion certificate
2. Learning path completion certificate
3. Quiz/assessment certificate (score > 80%)
4. Hackathon participation/winner certificate
5. Event attendance certificate
6. Monthly top performer certificate

**Certificate Features:**
- Unique verification ID + QR code
- Publicly verifiable URL (edunexus.in/verify/CERT-XXXX)
- Blockchain-anchored hash (optional, for premium)
- LinkedIn integration (one-click add)
- Shareable social card image
- Physical certificate shipping (Elite tier)

**Certificate Data Model:**
```
Certificate {
  id, verification_code, user_id,
  type, title, description,
  course_id (optional), event_id (optional),
  issued_at, expires_at (optional),
  metadata: { score, rank, hours_spent },
  template_id, pdf_url, image_url,
  blockchain_tx_hash (optional),
  is_revoked
}
```

### MODULE 12: Notifications & Engagement

**Notification Channels:**
- In-app (bell icon, real-time via WebSocket)
- Email (transactional + digest)
- Push notifications (mobile PWA)
- SMS (for critical: payment, event reminders)
- WhatsApp (optional integration)

**Engagement Triggers:**
- "You're on a 5-day streak! Don't break it!"
- "New course in your interest area"
- "Your peer just completed X — catch up!"
- "Hackathon registration closing in 24h"
- "Weekly progress report"
- "You're 80% through — finish strong!"
- "New jobs matching your profile"

**Notification Preferences:**
- Per-channel toggle (in-app, email, push)
- Quiet hours setting
- Digest frequency (daily/weekly/none)

### MODULE 13: Analytics & Reporting

**Student Analytics:**
- Time spent per day/week/month (chart)
- Course completion rate
- Quiz performance trends
- Strength/weakness radar chart
- Karma progression graph
- Streak calendar (GitHub-style contribution grid)
- Skill radar (Spider/Radar chart)
- Peer comparison (anonymized percentile)

**Platform Analytics (Admin):**
- DAU/WAU/MAU
- Course engagement metrics
- Revenue dashboard (MRR, churn, LTV)
- Conversion funnel (free → pro → elite)
- Content performance rankings
- Support ticket metrics

### MODULE 14: Payments & Billing

**Payment Integration:**
- Razorpay (primary — UPI, cards, net banking, wallets)
- Stripe (international cards)
- College bulk purchase (invoice-based)

**Billing Features:**
- Auto-renewal with grace period
- Promo codes & coupons
- Referral credits
- Student discount verification (college email)
- GST-compliant invoicing
- Refund policy (7-day money-back)

**Revenue Model:**
```
Subscription {
  id, user_id, plan: "pro"|"elite",
  billing_cycle: "monthly"|"annual",
  amount, currency, tax,
  payment_gateway, transaction_id,
  started_at, current_period_end,
  status: "active"|"cancelled"|"past_due"|"paused",
  cancel_reason, auto_renew
}
```

---

## 🛠️ TECHNICAL ARCHITECTURE

### Frontend
- **Framework:** Next.js 15 (App Router, RSC)
- **Styling:** Tailwind CSS 4 + shadcn/ui components
- **State:** Zustand (global) + React Query (server state)
- **Editor:** Monaco Editor (coding lab)
- **Charts:** Recharts or Chart.js
- **Animations:** Framer Motion
- **Real-time:** Socket.IO client
- **PWA:** next-pwa for offline + push notifications

### Backend
- **Runtime:** Node.js 22 + Express.js (or Fastify)
- **API:** REST + WebSocket (Socket.IO)
- **Auth:** JWT (access + refresh tokens) + OAuth (Google, GitHub)
- **Validation:** Zod
- **File Upload:** Multer + S3/Cloudinary
- **Email:** Nodemailer + SendGrid/Resend
- **Queue:** BullMQ + Redis (for async jobs)
- **Rate Limiting:** express-rate-limit + Redis

### Database
- **Primary:** PostgreSQL 16 (users, courses, subscriptions, etc.)
- **Cache:** Redis 7 (sessions, leaderboards, rate limits)
- **Search:** Meilisearch or Elasticsearch (course/job search)
- **File Storage:** AWS S3 / Cloudflare R2
- **ORM:** Prisma or Drizzle

### Code Execution Engine
- **Sandboxed Docker containers** (per submission)
- **Language support:** Python, C, C++, Java, JS, Go, Rust
- **Judge:** Custom judge or Judge0 API
- **Security:** seccomp profiles, resource limits, network isolation

### AI/ML Services
- **LLM:** OpenAI GPT-4o / Anthropic Claude (for AI features)
- **Embeddings:** OpenAI ada-002 (for RAG)
- **Vector DB:** Pinecone or Qdrant (for doubt bot)
- **Recommendations:** Custom collaborative filtering model

### DevOps
- **Containerization:** Docker + Docker Compose
- **Orchestration:** Kubernetes (production) or Railway/Render
- **CI/CD:** GitHub Actions
- **Monitoring:** Grafana + Prometheus
- **Logging:** Pino + ELK stack or Loki
- **CDN:** Cloudflare

---

## 🗄️ DATABASE SCHEMA (PostgreSQL — Key Tables)

```sql
-- Users & Auth
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'student', -- student, faculty, tpo, admin
  college_id UUID REFERENCES colleges(id),
  branch VARCHAR(100),
  year_of_study INT,
  karma_points INT DEFAULT 0,
  xp INT DEFAULT 0,
  level INT DEFAULT 1,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_active_date DATE,
  subscription_tier VARCHAR(20) DEFAULT 'free',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Colleges (for B2B)
CREATE TABLE colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(500) NOT NULL,
  code VARCHAR(50) UNIQUE, -- AICTE code
  city VARCHAR(100),
  state VARCHAR(100),
  university_affiliation VARCHAR(500),
  logo_url TEXT,
  custom_domain VARCHAR(255),
  subscription_plan VARCHAR(50),
  max_students INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning Paths
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100),
  difficulty VARCHAR(20),
  estimated_hours INT,
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  enrolled_count INT DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  instructor_id UUID REFERENCES users(id),
  category VARCHAR(100),
  difficulty VARCHAR(20),
  estimated_hours INT,
  tier_required VARCHAR(20) DEFAULT 'free',
  is_published BOOLEAN DEFAULT FALSE,
  enrolled_count INT DEFAULT 0,
  avg_rating DECIMAL(3,2) DEFAULT 0,
  tags TEXT[],
  learning_outcomes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Modules & Lessons
CREATE TABLE course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  type VARCHAR(20) NOT NULL, -- video, article, interactive, lab
  content_url TEXT,
  content_markdown TEXT,
  duration_minutes INT,
  sort_order INT NOT NULL,
  is_free_preview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments & Progress
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  progress_percent INT DEFAULT 0,
  UNIQUE(user_id, course_id)
);

CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  lesson_id UUID REFERENCES lessons(id),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  time_spent_seconds INT DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);

-- Quizzes & Attempts
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  course_id UUID REFERENCES courses(id),
  module_id UUID REFERENCES course_modules(id),
  type VARCHAR(20) DEFAULT 'practice',
  time_limit_minutes INT,
  max_attempts INT DEFAULT 3,
  passing_score_percent INT DEFAULT 60,
  shuffle_questions BOOLEAN DEFAULT TRUE,
  is_published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  text TEXT NOT NULL,
  code_snippet TEXT,
  image_url TEXT,
  options JSONB, -- [{id, text, is_correct}]
  correct_answer TEXT,
  explanation TEXT,
  difficulty VARCHAR(20),
  points INT DEFAULT 10,
  sort_order INT,
  tags TEXT[]
);

CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id),
  user_id UUID REFERENCES users(id),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  score INT DEFAULT 0,
  max_score INT,
  percentage DECIMAL(5,2),
  passed BOOLEAN,
  answers JSONB, -- [{question_id, selected, is_correct, time_spent}]
  karma_awarded INT DEFAULT 0
);

-- Coding Problems & Submissions
CREATE TABLE coding_problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description_markdown TEXT NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  companies TEXT[],
  constraints TEXT,
  input_format TEXT,
  output_format TEXT,
  examples JSONB,
  test_cases JSONB, -- [{input, expected_output, is_hidden, time_limit_ms}]
  editorial_markdown TEXT,
  hints TEXT[],
  submission_count INT DEFAULT 0,
  acceptance_rate DECIMAL(5,2) DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE code_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id UUID REFERENCES coding_problems(id),
  user_id UUID REFERENCES users(id),
  language VARCHAR(20) NOT NULL,
  code TEXT NOT NULL,
  status VARCHAR(10) NOT NULL, -- AC, WA, TLE, MLE, RE, CE
  execution_time_ms INT,
  memory_used_mb DECIMAL(10,2),
  test_cases_passed INT,
  total_test_cases INT,
  ai_feedback TEXT,
  karma_awarded INT DEFAULT 0,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  type VARCHAR(30) NOT NULL,
  banner_image_url TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  is_online BOOLEAN DEFAULT TRUE,
  venue_or_link TEXT,
  max_participants INT,
  current_registrations INT DEFAULT 0,
  tier_required VARCHAR(20) DEFAULT 'free',
  speakers JSONB,
  agenda JSONB,
  tags TEXT[],
  recording_url TEXT,
  karma_award INT DEFAULT 10,
  status# filepath: /Users/2205287/Library/CloudStorage/OneDrive-Cognizant/Apps/Education/EDUNEXUS_MASTER_PROMPT.md

# ═══════════════════════════════════════════════════════════════
# EDUNEXUS — AI-Powered EdTech Platform
# Master Development Prompt v2.0
# Target: Engineering College Students across India
# Model: Subscription-based SaaS Portal
# ═══════════════════════════════════════════════════════════════

## 🏗️ PROJECT OVERVIEW

Build "EduNexus" — a full-stack, subscription-based EdTech platform
designed for engineering college students across India, with deep
specialization in AI/ML skill building. The platform combines
structured learning, gamification, industry mentorship, and
placement preparation into a single unified ecosystem.

---

## 🎯 TARGET AUDIENCE

| Segment              | Description                                                |
|----------------------|------------------------------------------------------------|
| Primary Users        | Engineering students (B.Tech/B.E.) across all branches     |
| Secondary Users      | Faculty, Training & Placement Officers (TPOs), HoDs        |
| Institutional Buyers | Engineering colleges, deemed universities, autonomous inst. |
| Industry Partners    | Companies for hiring, mentorship, sponsorship              |
| Content Creators     | Subject matter experts, FAANG engineers, researchers        |

---

## 💰 SUBSCRIPTION TIERS

### Tier 1: Explorer (Free Forever)
- Access to 20 foundational courses
- 5 coding challenges per week
- Community forum (read-only for premium threads)
- Basic profile + digital badge (1)
- Limited quiz attempts (3/day)
- View-only access to events calendar

### Tier 2: Pro Student (₹299/month or ₹2,499/year)
- All Explorer features +
- Full course library (200+ courses)
- Unlimited coding challenges & labs
- AI-powered study plan generator
- Resume builder with ATS scoring
- Mock interview simulator (text-based)
- 10 Karma bonus points/month
- Priority community support
- Certificate of completion (digital, verifiable)
- Job board access (apply to 10 jobs/month)

### Tier 3: Elite (₹599/month or ₹4,999/year)
- All Pro features +
- Live 1-on-1 mentorship sessions (2/month, 30 min each)
- Video mock interviews with AI feedback
- Company-specific interview prep tracks (TCS, Infosys, Google, etc.)
- Hackathon priority registration + team matching
- Physical certificate (shipped) + LinkedIn badge
- Unlimited job applications
- Early access to new courses
- Exclusive industry webinars
- 25 Karma bonus points/month

### Tier 4: Institution (Custom Pricing — per college)
- Admin dashboard for TPO/HoD
- Bulk student onboarding (CSV/API)
- Custom branded portal (white-label lite)
- Analytics: student progress, placement readiness scores
- Faculty accounts with content upload privileges
- Dedicated account manager
- API access for LMS integration (Moodle, Canvas)
- Custom course creation tools
- Placement drive management module

---

## 📚 CORE FEATURE MODULES

### MODULE 1: Structured Learning Paths

Design learning paths as directed acyclic graphs (DAGs) where each
node is a course/module and edges represent prerequisites.

**Learning Path Categories:**
1. **Foundation Track** — Engineering Mathematics, Data Structures,
   Algorithms, OOP, DBMS, OS, Computer Networks
2. **AI/ML Specialization** — Python for AI, Statistics & Probability,
   Linear Algebra, ML Fundamentals, Deep Learning, NLP, Computer Vision,
   Reinforcement Learning, MLOps, Generative AI & LLMs
3. **Full-Stack Development** — HTML/CSS/JS, React, Node.js, Databases,
   DevOps, System Design
4. **Data Engineering** — SQL mastery, ETL pipelines, Spark, Kafka,
   Airflow, Data Warehousing, Cloud (AWS/GCP/Azure)
5. **Cybersecurity** — Network Security, Ethical Hacking, Cryptography,
   SOC Operations, Cloud Security
6. **Competitive Programming** — C++ STL, Problem Solving patterns,
   Contest strategies, DP, Graphs, Number Theory
7. **Placement Preparation** — Aptitude, Verbal, Technical MCQs,
   Group Discussion, HR Interview, System Design
8. **Research & Innovation** — Research methodology, Paper writing,
   LaTeX, Patent filing, Literature surveys

**Learning Path Data Model:**
```
LearningPath {
  id, title, slug, description, difficulty_level,
  estimated_hours, category, tags[],
  nodes: [
    { course_id, position_x, position_y, is_milestone },
  ],
  edges: [
    { from_course_id, to_course_id, type: "prerequisite"|"recommended" }
  ],
  created_by, is_published, enrolled_count,
  completion_rate, avg_rating
}
```

**Course Data Model:**
```
Course {
  id, title, slug, description, thumbnail_url,
  instructor_id, category, tags[], difficulty,
  estimated_hours, tier_required: "free"|"pro"|"elite",
  modules: [
    {
      id, title, order,
      lessons: [
        {
          id, title, type: "video"|"article"|"interactive"|"lab",
          content_url, duration_minutes, order,
          resources: [{ title, url, type }]
        }
      ]
    }
  ],
  prerequisites: [course_id],
  learning_outcomes: string[],
  is_published, enrolled_count, avg_rating,
  reviews: [{ user_id, rating, comment, created_at }]
}
```

### MODULE 2: Interactive Gamified Learning Mode

**2a. Karma Points System**
A reputation/motivation system inspired by StackOverflow + Duolingo.

| Action                          | Karma Points |
|---------------------------------|--------------|
| Complete a lesson               | +5           |
| Complete a course               | +50          |
| Complete a learning path        | +200         |
| Daily login streak (per day)    | +2           |
| 7-day streak bonus              | +20          |
| 30-day streak bonus             | +100         |
| Quiz score > 80%                | +10          |
| Quiz perfect score (100%)       | +25          |
| Win a coding challenge          | +30          |
| Hackathon participation         | +50          |
| Hackathon top 3 finish          | +150         |
| Help in community (accepted)    | +15          |
| Refer a friend (who signs up)   | +25          |
| Submit an assignment            | +10          |
| Publish a blog post             | +20          |
| Get upvoted (community)         | +2 per vote  |
| Report a bug (verified)         | +30          |

**Karma Levels:**
```
0–99       → Beginner        (🟢 Green badge)
100–499    → Learner         (🔵 Blue badge)
500–1499   → Achiever        (🟣 Purple badge)
1500–4999  → Expert          (🟠 Orange badge)
5000–9999  → Master          (🔴 Red badge)
10000+     → Legend          (🏆 Gold badge)
```

**2b. Leaderboards**
- Global leaderboard (all-time + weekly + monthly)
- College-wise leaderboard
- Course-specific leaderboard
- Branch-wise (CSE, ECE, ME, etc.)
- Anti-gaming: rate-limit point accrual, flag suspicious patterns

**2c. Achievements & Badges**
A badge system similar to Xbox achievements:
- "First Steps" — Complete your first lesson
- "Streak Master" — 30-day login streak
- "Quiz Whiz" — Score 100% on 10 quizzes
- "Social Butterfly" — Help 25 people in community
- "Code Warrior" — Solve 100 coding challenges
- "Hackathon Hero" — Win a hackathon
- "Pathfinder" — Complete an entire learning path
- "Night Owl" — Study between 12am–5am for 7 days
- "Early Bird" — Study before 7am for 7 days
- Custom institution badges (TPO can create)

**2d. XP & Level-Up Animations**
- Each action gives XP (separate from Karma)
- Visual progress bar on dashboard with level-up animations
- Sound effects (toggleable) on achievements
- Confetti burst on course completion
- Share achievement cards to LinkedIn/Twitter

### MODULE 3: Quizzes & Assessments

**Quiz Types:**
1. **MCQ (Single/Multiple correct)**
2. **True/False**
3. **Fill in the blanks (code)**
4. **Match the following**
5. **Coding challenges** (with online judge — stdin/stdout)
6. **Subjective (AI-graded)** — short answer evaluated by LLM
7. **Drag & drop** (arrange steps, build flowcharts)
8. **Timed challenges** (speed rounds)

**Quiz Data Model:**
```
Quiz {
  id, title, course_id, module_id (optional),
  type: "practice"|"graded"|"contest"|"mock_test",
  time_limit_minutes, max_attempts,
  passing_score_percent, shuffle_questions, shuffle_options,
  questions: [
    {
      id, type, text, code_snippet, image_url,
      options: [{ id, text, is_correct }],
      correct_answer, explanation,
      difficulty, points, tags[]
    }
  ],
  created_by, is_published
}

QuizAttempt {
  id, quiz_id, user_id, started_at, completed_at,
  score, max_score, percentage, passed,
  answers: [{ question_id, selected_option_ids, answer_text, is_correct, time_spent_seconds }],
  karma_awarded, certificate_id (if applicable)
}
```

**Adaptive Quiz Engine:**
- Questions get harder/easier based on running score
- AI generates personalized question banks from weak topics
- Spaced repetition: revisit incorrectly answered topics after N days

### MODULE 4: Coding Lab & Online Judge

**Features:**
- Browser-based code editor (Monaco Editor)
- Language support: Python, C, C++, Java, JavaScript, Go, Rust
- Real-time compilation & execution (sandboxed Docker containers)
- Test cases: visible (sample) + hidden (evaluation)
- Time & memory limits per problem
- Plagiarism detection (MOSS-style similarity checking)
- AI hint system: progressive hints (costs Karma to unlock)

**Problem Categories:**
Arrays, Strings, Linked Lists, Trees, Graphs, DP, Greedy,
Backtracking, Bit Manipulation, Math, Sorting, Searching,
System Design, SQL queries, API design

**Problem Data Model:**
```
CodingProblem {
  id, title, slug, description_markdown,
  difficulty: "easy"|"medium"|"hard",
  category, tags[], companies[],
  constraints, input_format, output_format,
  examples: [{ input, output, explanation }],
  test_cases: [{ input, expected_output, is_hidden, time_limit_ms, memory_limit_mb }],
  editorial_markdown, hints[],
  submission_count, acceptance_rate,
  created_by
}

Submission {
  id, problem_id, user_id, language, code,
  status: "AC"|"WA"|"TLE"|"MLE"|"RE"|"CE",
  execution_time_ms, memory_used_mb,
  test_cases_passed, total_test_cases,
  submitted_at, karma_awarded
}
```

### MODULE 5: Events, Webinars & Seminars

**Event Types:**
1. **Live Webinars** — Industry experts, FAANG engineers
2. **Workshops** — Hands-on (3–6 hours), build a project
3. **Hackathons** — 24h/48h, team-based, prizes + Karma
4. **Tech Talks** — 1-hour deep-dives on specific topics
5. **Career Fairs** — Virtual booths, company presentations
6. **Code Sprints** — Timed competitive coding events
7. **Paper Reading Groups** — Weekly research paper discussions
8. **Mock Placement Drives** — Simulated company hiring process
9. **Office Hours** — Drop-in mentorship sessions

**Event Data Model:**
```
Event {
  id, title, slug, description, type,
  banner_image_url, start_time, end_time,
  timezone, is_online, venue_or_link,
  max_participants, current_registrations,
  tier_required: "free"|"pro"|"elite",
  speakers: [{ name, title, company, avatar_url, linkedin_url }],
  agenda: [{ time, title, speaker_name }],
  tags[], category,
  registration_deadline, is_recording_available,
  recording_url, karma_award,
  status: "upcoming"|"live"|"completed"|"cancelled",
  created_by
}

EventRegistration {
  id, event_id, user_id, registered_at,
  attended: boolean, feedback_rating, feedback_text,
  certificate_id
}
```

**Calendar Integration:**
- Sync with Google Calendar / Outlook
- Push notifications (email + in-app) 24h and 1h before event
- Timezone-aware display
- "Add to Calendar" button (.ics download)

### MODULE 6: Industry AI Council

A virtual advisory board of AI/ML industry professionals who:
- Review and validate AI/ML course curriculum quarterly
- Provide real-world case studies and datasets
- Offer mentorship slots for Elite subscribers
- Judge hackathons and project showcases
- Write "Industry Insights" blog posts
- Conduct monthly AMA (Ask Me Anything) sessions

**Council Member Profile:**
```
CouncilMember {
  id, name, title, company, bio,
  expertise_areas[], linkedin_url, avatar_url,
  is_active, joined_date,
  mentorship_slots_per_month,
  contributions: [{ type, title, date, url }]
}
```

**Council-Backed Features:**
- "Industry Validated" badge on courses reviewed by council
- Council Q&A forum (Elite only)
- Quarterly "State of AI in India" report
- Student project reviews by council members
- Recommendation letters for top performers

### MODULE 7: AI-Powered Features

**7a. Personalized Study Plan Generator**
- Input: student's branch, year, target (placement/higher studies/startup),
  available hours/week, current skill level (assessed via diagnostic test)
- Output: Week-by-week study plan with courses, practice problems,
  milestones, and buffer weeks
- Adapts based on progress and quiz performance

**7b. Smart Course Recommendations**
- Collaborative filtering (students like you also took X)
- Content-based filtering (based on topics you've studied)
- Hybrid model with cold-start handling for new users

**7c. AI Code Review**
- After coding challenge submission, AI provides:
  - Code quality feedback
  - Time/space complexity analysis
  - Alternative approaches
  - Best practices suggestions

**7d. AI Mock Interviewer**
- Text-based for Pro, Video-based for Elite
- Asks behavioral + technical questions
- Evaluates responses using rubrics
- Provides detailed feedback with scores

**7e. AI-Generated Quizzes**
- Generate quiz from any course content
- Difficulty-adjustable
- Explanation generation for each answer

**7f. Doubt Resolution Bot**
- RAG-based chatbot trained on course content
- Escalates to human mentor if confidence < threshold
- Tracks common doubts for curriculum improvement

### MODULE 8: Community & Social Features

**Forums:**
- Course-specific discussion boards
- General Q&A (StackOverflow-style with upvotes)
- Study groups (create/join)
- College-specific channels
- Branch-specific channels

**Social Features:**
- Student profiles with portfolio
- Follow other students
- Activity feed
- Direct messaging (Pro+)
- Study buddy matching algorithm
- Peer code review system

**Content Creation:**
- Student blog posts (earn Karma)
- Tutorial contributions
- Solution writeups for coding problems
- Project showcases

### MODULE 9: Placement & Career Module

**Resume Builder:**
- ATS-friendly templates (5+ designs)
- Auto-populate from profile & achievements
- AI suggestions for bullet points
- Multiple export formats (PDF, DOCX)
- Version history

**Job Board:**
```
Job {
  id, title, company_name, company_logo_url,
  description, requirements[], nice_to_have[],
  job_type: "full-time"|"internship"|"contract",
  location, is_remote, salary_range,
  experience_required, branches_eligible[],
  application_deadline, posted_at,
  apply_url or in_platform_apply,
  status: "active"|"closed"|"filled"
}
```

**Mock Placement Drive:**
- Simulates real company hiring process
- Round 1: Online test (aptitude + technical MCQ)
- Round 2: Coding round (2–3 problems, timed)
- Round 3: Technical interview (AI-simulated)
- Round 4: HR interview (AI-simulated)
- Detailed scorecard after each round
- Company-specific tracks (TCS NQT, Infosys InfyTQ, etc.)

### MODULE 10: Institution Dashboard (B2B)

**TPO Dashboard:**
- Student progress heatmap
- Placement readiness scores
- Batch analytics (year-wise, branch-wise)
- Company visit scheduler
- Communication tools (bulk announcements)
- Export reports (PDF, Excel)

**Faculty Dashboard:**
- Upload supplementary content
- Create custom quizzes for their class
- Track student engagement
- Grade assignments
- Discussion moderation

**College Branding:**
- Custom logo + colors
- Custom domain (college.edunexus.in)
- College-specific events
- Alumni network integration

### MODULE 11: Certificates & Credentials

**Certificate Types:**
1. Course completion certificate
2. Learning path completion certificate
3. Quiz/assessment certificate (score > 80%)
4. Hackathon participation/winner certificate
5. Event attendance certificate
6. Monthly top performer certificate

**Certificate Features:**
- Unique verification ID + QR code
- Publicly verifiable URL (edunexus.in/verify/CERT-XXXX)
- Blockchain-anchored hash (optional, for premium)
- LinkedIn integration (one-click add)
- Shareable social card image
- Physical certificate shipping (Elite tier)

**Certificate Data Model:**
```
Certificate {
  id, verification_code, user_id,
  type, title, description,
  course_id (optional), event_id (optional),
  issued_at, expires_at (optional),
  metadata: { score, rank, hours_spent },
  template_id, pdf_url, image_url,
  blockchain_tx_hash (optional),
  is_revoked
}
```

### MODULE 12: Notifications & Engagement

**Notification Channels:**
- In-app (bell icon, real-time via WebSocket)
- Email (transactional + digest)
- Push notifications (mobile PWA)
- SMS (for critical: payment, event reminders)
- WhatsApp (optional integration)

**Engagement Triggers:**
- "You're on a 5-day streak! Don't break it!"
- "New course in your interest area"
- "Your peer just completed X — catch up!"
- "Hackathon registration closing in 24h"
- "Weekly progress report"
- "You're 80% through — finish strong!"
- "New jobs matching your profile"

**Notification Preferences:**
- Per-channel toggle (in-app, email, push)
- Quiet hours setting
- Digest frequency (daily/weekly/none)

### MODULE 13: Analytics & Reporting

**Student Analytics:**
- Time spent per day/week/month (chart)
- Course completion rate
- Quiz performance trends
- Strength/weakness radar chart
- Karma progression graph
- Streak calendar (GitHub-style contribution grid)
- Skill radar (Spider/Radar chart)
- Peer comparison (anonymized percentile)

**Platform Analytics (Admin):**
- DAU/WAU/MAU
- Course engagement metrics
- Revenue dashboard (MRR, churn, LTV)
- Conversion funnel (free → pro → elite)
- Content performance rankings
- Support ticket metrics

### MODULE 14: Payments & Billing

**Payment Integration:**
- Razorpay (primary — UPI, cards, net banking, wallets)
- Stripe (international cards)
- College bulk purchase (invoice-based)

**Billing Features:**
- Auto-renewal with grace period
- Promo codes & coupons
- Referral credits
- Student discount verification (college email)
- GST-compliant invoicing
- Refund policy (7-day money-back)

**Revenue Model:**
```
Subscription {
  id, user_id, plan: "pro"|"elite",
  billing_cycle: "monthly"|"annual",
  amount, currency, tax,
  payment_gateway, transaction_id,
  started_at, current_period_end,
  status: "active"|"cancelled"|"past_due"|"paused",
  cancel_reason, auto_renew
}
```

---

## 🛠️ TECHNICAL ARCHITECTURE

### Frontend
- **Framework:** Next.js 15 (App Router, RSC)
- **Styling:** Tailwind CSS 4 + shadcn/ui components
- **State:** Zustand (global) + React Query (server state)
- **Editor:** Monaco Editor (coding lab)
- **Charts:** Recharts or Chart.js
- **Animations:** Framer Motion
- **Real-time:** Socket.IO client
- **PWA:** next-pwa for offline + push notifications

### Backend
- **Runtime:** Node.js 22 + Express.js (or Fastify)
- **API:** REST + WebSocket (Socket.IO)
- **Auth:** JWT (access + refresh tokens) + OAuth (Google, GitHub)
- **Validation:** Zod
- **File Upload:** Multer + S3/Cloudinary
- **Email:** Nodemailer + SendGrid/Resend
- **Queue:** BullMQ + Redis (for async jobs)
- **Rate Limiting:** express-rate-limit + Redis

### Database
- **Primary:** PostgreSQL 16 (users, courses, subscriptions, etc.)
- **Cache:** Redis 7 (sessions, leaderboards, rate limits)
- **Search:** Meilisearch or Elasticsearch (course/job search)
- **File Storage:** AWS S3 / Cloudflare R2
- **ORM:** Prisma or Drizzle

### Code Execution Engine
- **Sandboxed Docker containers** (per submission)
- **Language support:** Python, C, C++, Java, JS, Go, Rust
- **Judge:** Custom judge or Judge0 API
- **Security:** seccomp profiles, resource limits, network isolation

### AI/ML Services
- **LLM:** OpenAI GPT-4o / Anthropic Claude (for AI features)
- **Embeddings:** OpenAI ada-002 (for RAG)
- **Vector DB:** Pinecone or Qdrant (for doubt bot)
- **Recommendations:** Custom collaborative filtering model

### DevOps
- **Containerization:** Docker + Docker Compose
- **Orchestration:** Kubernetes (production) or Railway/Render
- **CI/CD:** GitHub Actions
- **Monitoring:** Grafana + Prometheus
- **Logging:** Pino + ELK stack or Loki
- **CDN:** Cloudflare

---

## 🗄️ DATABASE SCHEMA (PostgreSQL — Key Tables)

```sql
-- Users & Auth
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'student', -- student, faculty, tpo, admin
  college_id UUID REFERENCES colleges(id),
  branch VARCHAR(100),
  year_of_study INT,
  karma_points INT DEFAULT 0,
  xp INT DEFAULT 0,
  level INT DEFAULT 1,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_active_date DATE,
  subscription_tier VARCHAR(20) DEFAULT 'free',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Colleges (for B2B)
CREATE TABLE colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(500) NOT NULL,
  code VARCHAR(50) UNIQUE, -- AICTE code
  city VARCHAR(100),
  state VARCHAR(100),
  university_affiliation VARCHAR(500),
  logo_url TEXT,
  custom_domain VARCHAR(255),
  subscription_plan VARCHAR(50),
  max_students INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning Paths
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100),
  difficulty VARCHAR(20),
  estimated_hours INT,
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  enrolled_count INT DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  instructor_id UUID REFERENCES users(id),
  category VARCHAR(100),
  difficulty VARCHAR(20),
  estimated_hours INT,
  tier_required VARCHAR(20) DEFAULT 'free',
  is_published BOOLEAN DEFAULT FALSE,
  enrolled_count INT DEFAULT 0,
  avg_rating DECIMAL(3,2) DEFAULT 0,
  tags TEXT[],
  learning_outcomes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Modules & Lessons
CREATE TABLE course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  type VARCHAR(20) NOT NULL, -- video, article, interactive, lab
  content_url TEXT,
  content_markdown TEXT,
  duration_minutes INT,
  sort_order INT NOT NULL,
  is_free_preview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments & Progress
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  progress_percent INT DEFAULT 0,
  UNIQUE(user_id, course_id)
);

CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  lesson_id UUID REFERENCES lessons(id),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  time_spent_seconds INT DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);

-- Quizzes & Attempts
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  course_id UUID REFERENCES courses(id),
  module_id UUID REFERENCES course_modules(id),
  type VARCHAR(20) DEFAULT 'practice',
  time_limit_minutes INT,
  max_attempts INT DEFAULT 3,
  passing_score_percent INT DEFAULT 60,
  shuffle_questions BOOLEAN DEFAULT TRUE,
  is_published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  text TEXT NOT NULL,
  code_snippet TEXT,
  image_url TEXT,
  options JSONB, -- [{id, text, is_correct}]
  correct_answer TEXT,
  explanation TEXT,
  difficulty VARCHAR(20),
  points INT DEFAULT 10,
  sort_order INT,
  tags TEXT[]
);

CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id),
  user_id UUID REFERENCES users(id),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  score INT DEFAULT 0,
  max_score INT,
  percentage DECIMAL(5,2),
  passed BOOLEAN,
  answers JSONB, -- [{question_id, selected, is_correct, time_spent}]
  karma_awarded INT DEFAULT 0
);

-- Coding Problems & Submissions
CREATE TABLE coding_problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description_markdown TEXT NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  companies TEXT[],
  constraints TEXT,
  input_format TEXT,
  output_format TEXT,
  examples JSONB,
  test_cases JSONB, -- [{input, expected_output, is_hidden, time_limit_ms}]
  editorial_markdown TEXT,
  hints TEXT[],
  submission_count INT DEFAULT 0,
  acceptance_rate DECIMAL(5,2) DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE code_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id UUID REFERENCES coding_problems(id),
  user_id UUID REFERENCES users(id),
  language VARCHAR(20) NOT NULL,
  code TEXT NOT NULL,
  status VARCHAR(10) NOT NULL, -- AC, WA, TLE, MLE, RE, CE
  execution_time_ms INT,
  memory_used_mb DECIMAL(10,2),
  test_cases_passed INT,
  total_test_cases INT,
  ai_feedback TEXT,
  karma_awarded INT DEFAULT 0,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  type VARCHAR(30) NOT NULL,
  banner_image_url TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  is_online BOOLEAN DEFAULT TRUE,
  venue_or_link TEXT,
  max_participants INT,
  current_registrations INT DEFAULT 0,
  tier_required VARCHAR(20) DEFAULT 'free',
  speakers JSONB,
  agenda JSONB,
  tags TEXT[],
  recording_url TEXT,
  karma_award INT DEFAULT 10,
  status