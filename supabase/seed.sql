-- ==============================================================================
-- LearnPath Progressive E-Learning Platform - Seed Data
-- File: supabase/seed.sql
-- Description: Realistic initial data including users, categories, learning paths,
--              courses, modules, lessons, prerequisites, and assessments.
-- ==============================================================================

-- 1. SEED PROFILES
INSERT INTO profiles (id, email, full_name, role, bio, learning_streak, last_active_date)
VALUES
('a0000000-0000-0000-0000-000000000001', 'alex.learner@learnpath.edu', 'Alex Vance', 'learner', 'Senior undergraduate aspiring full-stack software engineer.', 6, CURRENT_DATE),
('a0000000-0000-0000-0000-000000000002', 'sarah.instructor@learnpath.edu', 'Dr. Sarah Lin', 'instructor', 'Principal Systems Architect and Educator with 14 years industry experience.', 18, CURRENT_DATE),
('a0000000-0000-0000-0000-000000000003', 'admin@learnpath.edu', 'Elena Rostova', 'admin', 'Lead Academic Director and Platform Administrator.', 42, CURRENT_DATE)
ON CONFLICT (email) DO NOTHING;

-- 2. SEED CATEGORIES
INSERT INTO categories (id, name, slug, description)
VALUES
('c0000000-0000-0000-0000-000000000001', 'Software Architecture', 'software-architecture', 'Full-stack distributed systems, TypeScript, API design, and databases.'),
('c0000000-0000-0000-0000-000000000002', 'Computer Science & Algorithms', 'algorithms-data-structures', 'Core algorithms, tree/graph structures, complexity, and algorithmic reasoning.'),
('c0000000-0000-0000-0000-000000000003', 'Cloud & DevOps Engineering', 'cloud-devops', 'Kubernetes, containerization, observability, and resilient deployment pipelines.')
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED TOPICS
INSERT INTO topics (id, name, category)
VALUES
('t0000000-0000-0000-0000-000000000001', 'HTTP Protocols & REST Invariants', 'Architecture'),
('t0000000-0000-0000-0000-000000000002', 'TypeScript Advanced Generics & Narrowing', 'Language'),
('t0000000-0000-0000-0000-000000000003', 'Database Normalization & ACID Transactions', 'Databases'),
('t0000000-0000-0000-0000-000000000004', 'Asynchronous Message Brokers & Queues', 'Distributed Systems'),
('t0000000-0000-0000-0000-000000000005', 'Binary Search Trees & Balancing', 'Data Structures'),
('t0000000-0000-0000-0000-000000000006', 'Graph Traversal (BFS & DFS)', 'Algorithms')
ON CONFLICT (name) DO NOTHING;
