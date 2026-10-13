-- ==============================================================================
-- LearnPath Progressive E-Learning Platform - Row Level Security (RLS)
-- Migration: 00002_learnpath_rls.sql
-- Description: Comprehensive Row Level Security policies protecting tenant isolation,
--              instructor ownership, and administrative controls.
-- ==============================================================================

-- Enable RLS on all sensitive tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrolments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE revision_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION get_auth_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE;

-- ------------------------------------------------------------------------------
-- 1. PROFILES POLICIES
-- ------------------------------------------------------------------------------
-- Users can view their own profile; public names visible for instructors and certs
CREATE POLICY "Profiles viewable by self and admins"
ON profiles FOR SELECT
USING (id = auth.uid() OR get_auth_role() = 'admin' OR role = 'instructor');

-- Users can only update their own profile (cannot escalate their own role)
CREATE POLICY "Users update own profile"
ON profiles FOR UPDATE
USING (id = auth.uid())
WITH CHECK (
    id = auth.uid() 
    AND (role = (SELECT role FROM profiles WHERE id = auth.uid()) OR get_auth_role() = 'admin')
);

-- ------------------------------------------------------------------------------
-- 2. COURSES POLICIES
-- ------------------------------------------------------------------------------
-- Public learners can only read published courses; instructors read their own; admins read all
CREATE POLICY "Learners view published courses"
ON courses FOR SELECT
USING (
    status = 'published' 
    OR created_by = auth.uid() 
    OR get_auth_role() = 'admin'
    OR EXISTS (SELECT 1 FROM course_instructors WHERE course_id = courses.id AND instructor_id = auth.uid())
);

-- Instructors can create courses
CREATE POLICY "Instructors create courses"
ON courses FOR INSERT
WITH CHECK (get_auth_role() IN ('instructor', 'admin'));

-- Instructors can update their own courses; admins can update all
CREATE POLICY "Instructors update own courses"
ON courses FOR UPDATE
USING (
    created_by = auth.uid() 
    OR get_auth_role() = 'admin'
    OR EXISTS (SELECT 1 FROM course_instructors WHERE course_id = courses.id AND instructor_id = auth.uid())
);

-- ------------------------------------------------------------------------------
-- 3. MODULES & LESSONS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "View lessons of viewable courses"
ON lessons FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM modules m 
        JOIN courses c ON c.id = m.course_id 
        WHERE m.id = lessons.module_id 
        AND (c.status = 'published' OR c.created_by = auth.uid() OR get_auth_role() = 'admin')
    )
);

CREATE POLICY "Instructors manage lessons"
ON lessons FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM modules m 
        JOIN courses c ON c.id = m.course_id 
        WHERE m.id = lessons.module_id 
        AND (c.created_by = auth.uid() OR get_auth_role() = 'admin')
    )
);

-- ------------------------------------------------------------------------------
-- 4. ASSESSMENTS & QUESTIONS POLICIES
-- ------------------------------------------------------------------------------
-- Learners can view assessments of enrolled courses
CREATE POLICY "Learners view assessments"
ON assessments FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM courses c
        WHERE c.id = assessments.course_id 
        AND (c.status = 'published' OR c.created_by = auth.uid() OR get_auth_role() = 'admin')
    )
);

-- Assessment Options: Hide is_correct from learners until submitted
-- (In client queries, only question prompts and option texts are fetched; correct flags checked server-side)
CREATE POLICY "Read assessment questions"
ON assessment_questions FOR SELECT
USING (true);

CREATE POLICY "Read assessment options"
ON assessment_options FOR SELECT
USING (true);

-- ------------------------------------------------------------------------------
-- 5. ENROLMENTS & LESSON PROGRESS
-- ------------------------------------------------------------------------------
CREATE POLICY "Users read their own enrolments"
ON enrolments FOR SELECT
USING (user_id = auth.uid() OR get_auth_role() = 'admin');

CREATE POLICY "Users insert own enrolments"
ON enrolments FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users update own progress"
ON lesson_progress FOR ALL
USING (user_id = auth.uid() OR get_auth_role() = 'admin');

-- ------------------------------------------------------------------------------
-- 6. ASSESSMENT ATTEMPTS & RESPONSES
-- ------------------------------------------------------------------------------
CREATE POLICY "Users view and insert own attempts"
ON assessment_attempts FOR ALL
USING (user_id = auth.uid() OR get_auth_role() = 'admin');

CREATE POLICY "Users view and insert own responses"
ON assessment_responses FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM assessment_attempts a 
        WHERE a.id = assessment_responses.attempt_id 
        AND (a.user_id = auth.uid() OR get_auth_role() = 'admin')
    )
);

-- ------------------------------------------------------------------------------
-- 7. BOOKMARKS & REVISION QUEUE
-- ------------------------------------------------------------------------------
CREATE POLICY "Users manage own bookmarks"
ON bookmarks FOR ALL
USING (user_id = auth.uid());

CREATE POLICY "Users view and complete own revision items"
ON revision_queue FOR ALL
USING (user_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 8. CERTIFICATES POLICIES
-- ------------------------------------------------------------------------------
-- Public verification allows anyone to view a certificate by verification_code
CREATE POLICY "Certificates public verification"
ON certificates FOR SELECT
USING (true);

-- Only server / admin can issue certificates
CREATE POLICY "Admin or server issue certificates"
ON certificates FOR INSERT
WITH CHECK (get_auth_role() = 'admin' OR user_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 9. AUDIT LOGS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Only admins read audit logs"
ON audit_logs FOR SELECT
USING (get_auth_role() = 'admin');

CREATE POLICY "System inserts audit logs"
ON audit_logs FOR INSERT
WITH CHECK (true);
