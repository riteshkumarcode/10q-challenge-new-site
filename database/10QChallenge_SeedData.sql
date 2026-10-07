-- ============================================================================
-- 10Q CHALLENGE SEED DATA & MIGRATION SCRIPT
-- ============================================================================

USE [10QChallengeDb];
GO

SET NOCOUNT ON;

-- 1. ROLES
IF NOT EXISTS (SELECT 1 FROM dbo.Roles WHERE Name = 'SuperAdmin')
    INSERT INTO dbo.Roles (Name, Description) VALUES 
    ('SuperAdmin', 'Full administrative control over the entire platform'),
    ('Admin', 'Operations, faculty, course and support administrator'),
    ('CourseManager', 'Academic curriculum, videos and test series manager'),
    ('ContentManager', 'Blog author and SEO editor'),
    ('Mentor', 'Doubt solver and 1-on-1 student mentor'),
    ('Student', 'Enrolled student learner');

-- 2. USERS
-- Admin Password hash for "Admin@10Q#2026" (BCrypt/PBKDF2)
DECLARE @AdminId UNIQUEIDENTIFIER = '11111111-1111-1111-1111-111111111111';
DECLARE @StudentId UNIQUEIDENTIFIER = '22222222-2222-2222-2222-222222222222';

IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE Email = 'admin@10qchallenge.in')
BEGIN
    INSERT INTO dbo.Users (Id, FullName, Email, PhoneNumber, PasswordHash, IsEmailVerified, IsPhoneVerified, IsActive, CreatedAtUtc)
    VALUES (@AdminId, 'Ritesh (10Q Lead Admin)', 'admin@10qchallenge.in', '+919876543210', '$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1, 1, 1, SYSUTCDATETIME());

    INSERT INTO dbo.UserRoles (UserId, RoleId) VALUES (@AdminId, 1), (@AdminId, 2);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE Email = 'student@10qchallenge.in')
BEGIN
    INSERT INTO dbo.Users (Id, FullName, Email, PhoneNumber, PasswordHash, IsEmailVerified, IsPhoneVerified, IsActive, CreatedAtUtc)
    VALUES (@StudentId, 'Aarav Sharma', 'student@10qchallenge.in', '+919812345678', '$2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1, 1, 1, SYSUTCDATETIME());

    INSERT INTO dbo.UserRoles (UserId, RoleId) VALUES (@StudentId, 6);

    INSERT INTO dbo.StudentProfiles (UserId, TargetExam, TargetYear, CurrentClass, State, City, ReferralCode)
    VALUES (@StudentId, 'BITSAT', 2026, 'Class 12', 'Maharashtra', 'Mumbai', '10QSTUDENT');
END

-- 3. FACULTY PROFILES
IF NOT EXISTS (SELECT 1 FROM dbo.FacultyProfiles WHERE FullName = 'Ritesh Sir')
BEGIN
    INSERT INTO dbo.FacultyProfiles (FullName, Designation, AlmaMater, Bio, PhotoUrl, DisplayOrder)
    VALUES 
    ('Ritesh Sir', 'Lead Mentor & Founder', 'BITS Pilani Alum', 'Ranker mentor with 7+ years of coaching experience guiding 10,000+ students into top BITS Pilani & IIT campuses.', '/site/assets/img/instructor/instructor-01.jpg', 1),
    ('Dr. K. S. Verma', 'Senior Physics Faculty', 'IIT Kanpur', 'Ex-Allen HOD, author of premier competitive physics problem sets with deep insights into BITSAT speed techniques.', '/site/assets/img/instructor/instructor-02.jpg', 2),
    ('Prof. Ananya Sen', 'Mathematics & Speed Strategist', 'ISI Kolkata', 'Specialist in rapid algebra, calculus, and logical reasoning shortcuts for time-pressured engineering exams.', '/site/assets/img/instructor/instructor-03.jpg', 3);
END

-- 4. EXAMS
IF NOT EXISTS (SELECT 1 FROM dbo.Exams WHERE Slug = 'bitsat')
BEGIN
    INSERT INTO dbo.Exams (Name, Slug, Description, HeroHeading, HeroSubheading, IconUrl, BannerUrl, DisplayOrder, IsActive)
    VALUES 
    ('BITSAT', 'bitsat', 'Birla Institute of Technology and Science Admission Test for Pilani, Goa, and Hyderabad campuses.', 'Crack BITSAT 2026 with 350+ Strategy', 'Master high-speed accuracy, exclusive bonus question tactics, and complete syllabus mastery with BITS Pilani alumni.', '/site/assets/img/category/category-01.svg', '/site/assets/img/banner/banner1.png', 1, 1),
    ('JEE', 'jee', 'Joint Entrance Examination (Main & Advanced) for premier IITs, NITs, and IIITs.', 'Target Top 1% in JEE Main & Advanced', 'Comprehensive concept clarity, high-yield question banks, and exhaustive test series.', '/site/assets/img/category/category-02.svg', '/site/assets/img/banner/banner2.png', 2, 1),
    ('COMEDK', 'comedk', 'Undergraduate Entrance Test for top Karnataka engineering institutions.', 'Ace COMEDK UGET 2026', 'Target RVCE, BMSCE, and MSRIT with focused speed practice and past year pattern mocks.', '/site/assets/img/category/category-03.svg', '/site/assets/img/banner/banner-bg-01.png', 3, 1),
    ('MET', 'met', 'Manipal Entrance Test for engineering admissions at MAHE Manipal, Bengaluru, and Jaipur.', 'Secure Your Dream Branch at Manipal', 'High-speed mock papers and chapter-wise formula drill boosters.', '/site/assets/img/category/category-04.svg', '/site/assets/img/banner/banner-bg-02.png', 4, 1),
    ('VITEEE', 'viteee', 'Vellore Institute of Technology Engineering Entrance Exam.', 'Crack VITEEE 2026 with Rank < 1000', 'Master VITEEE speed techniques, English aptitude, and high-frequency problem sets.', '/site/assets/img/category/category-05.svg', '/site/assets/img/banner/banner-book.png', 5, 1);
END

-- 5. COURSES
DECLARE @BitsatId INT = (SELECT Id FROM dbo.Exams WHERE Slug = 'bitsat');
DECLARE @JeeId INT = (SELECT Id FROM dbo.Exams WHERE Slug = 'jee');
DECLARE @ComedkId INT = (SELECT Id FROM dbo.Exams WHERE Slug = 'comedk');

IF NOT EXISTS (SELECT 1 FROM dbo.Courses WHERE Slug = 'bitsat-champions-2026')
BEGIN
    INSERT INTO dbo.Courses (ExamId, Title, Slug, ShortDescription, FullDescriptionHtml, Price, OriginalPrice, DiscountPercent, ValidityDays, EnrolledStudentCount, ThumbnailUrl, BannerUrl, TrailerVimeoId, IsFeatured, IsShowInIndex, IsMentorship, IsTestSeries, IsPublished, DisplayOrder)
    VALUES 
    (@BitsatId, 'BITSAT Champions Full Prep Course 2026', 'bitsat-champions-2026', 'The ultimate end-to-end BITSAT preparation package: HD video lectures, chapter notes, 30+ full mock tests, speed mastery, and 1-on-1 mentorship.', 
    '<h3>The Most Comprehensive BITSAT 2026 Program</h3><p>Engineered specifically for serious BITSAT aspirants aiming for BITS Pilani Computer Science and top branches. Learn the exact speed-solving shortcuts, bonus question strategies, and time management hacks developed by top rankers.</p><ul><li>Complete Video Lectures covering Physics, Chemistry, Mathematics, English Proficiency, and Logical Reasoning.</li><li>30+ Full Length CBT Mock Tests mirroring the exact BITSAT testing interface.</li><li>Detailed step-by-step video solutions and formula books for rapid revision.</li><li>Dedicated doubt clearance portal with 24-hour response SLA.</li></ul>', 
    4999.00, 9999.00, 50.00, 365, 1420, '/site/assets/img/course/course-01.jpg', '/site/assets/img/course/course-details-bg.jpg', '76979871', 1, 1, 0, 0, 1, 1),

    (@BitsatId, 'BITSAT 2026 Speed & Accuracy Test Series', 'bitsat-test-series-2026', '35 Full-Length Computer-Based Mock Tests with instant analytics, percentile prediction, and bonus question simulation.', 
    '<h3>Master Time Management for BITSAT</h3><p>Practice in an authentic simulation of the BITSAT exam portal with 130 core questions + 12 unlockable bonus questions.</p>', 
    1499.00, 2999.00, 50.00, 180, 2890, '/site/assets/img/course/course-02.jpg', '/site/assets/img/course/course-details-bg.jpg', '76979871', 1, 1, 0, 1, 1, 2),

    (@BitsatId, '1-on-1 Elite BITSAT Mentorship Program', 'bitsat-elite-mentorship', 'Personalized strategy roadmap, weekly progress calls, score optimization sessions, and direct guidance from BITS Pilani seniors.', 
    '<h3>Your Personal Guide to BITS Pilani</h3><p>Get paired with top BITS Pilani rankers who analyze your mock test patterns, fix weaknesses, and build your customized score-boosting timetable.</p>', 
    3499.00, 6999.00, 50.00, 180, 480, '/site/assets/img/course/course-03.jpg', '/site/assets/img/course/course-details-bg.jpg', '76979871', 1, 1, 1, 0, 1, 3),

    (@JeeId, 'JEE Main High-Yield Crash Batch 2026', 'jee-main-crash-batch', 'Target 99+ Percentile with targeted chapter sprints, top 500 must-solve problems, and full-length NTA pattern tests.', 
    '<h3>Intensive Problem-Solving for JEE Main</h3><p>Crisp formula revisions and problem-solving masterclasses covering the most frequently tested topics.</p>', 
    3999.00, 7999.00, 50.00, 240, 930, '/site/assets/img/course/course-04.jpg', '/site/assets/img/course/course-details-bg.jpg', '76979871', 1, 1, 0, 0, 1, 4),

    (@ComedkId, 'COMEDK & MET High Yield Booster 2026', 'comedk-met-booster', 'Specialized speed test series and shortcut tricks tailored for RVCE, BMSCE, and Manipal aspirants.', 
    '<h3>Maximize Your Score in South India Premier Entrances</h3><p>Targeted shortcut modules and 20 full-length practice tests.</p>', 
    1999.00, 3999.00, 50.00, 180, 640, '/site/assets/img/course/course-05.jpg', '/site/assets/img/course/course-details-bg.jpg', '76979871', 0, 1, 0, 1, 1, 5);
END

-- 6. COURSE FAQS
DECLARE @Course1Id INT = (SELECT Id FROM dbo.Courses WHERE Slug = 'bitsat-champions-2026');
IF NOT EXISTS (SELECT 1 FROM dbo.CourseFaqs WHERE CourseId = @Course1Id)
BEGIN
    INSERT INTO dbo.CourseFaqs (CourseId, Question, AnswerHtml, DisplayOrder)
    VALUES 
    (@Course1Id, 'Is this course updated for the BITSAT 2026 pattern?', '<p>Yes, all lectures, mock tests, and questions strictly follow the latest 130 questions format (+12 Bonus questions) with negative marking rules.</p>', 1),
    (@Course1Id, 'Can I access the video lectures on both mobile and laptop?', '<p>Yes, the 10Q Challenge classroom is fully responsive and accessible seamlessly across laptops, tablets, and smartphones.</p>', 2),
    (@Course1Id, 'How does the Doubt Clearance system work?', '<p>Students can click "Raise Doubt" directly on any video lecture or test question. Our mentors and faculty answer with complete step-by-step explanations within 24 hours.</p>', 3),
    (@Course1Id, 'How long is the course validity?', '<p>The course remains active until the final session of BITSAT 2026 examinations.</p>', 4);
END

-- 7. SUBJECTS, CHAPTERS, LESSONS
IF NOT EXISTS (SELECT 1 FROM dbo.Subjects WHERE CourseId = @Course1Id AND Name = 'Physics')
BEGIN
    -- Subjects
    INSERT INTO dbo.Subjects (CourseId, Name, Code, DisplayOrder) VALUES
    (@Course1Id, 'Physics', 'PHY', 1),
    (@Course1Id, 'Chemistry', 'CHEM', 2),
    (@Course1Id, 'Mathematics', 'MATH', 3),
    (@Course1Id, 'English & Logical Reasoning', 'ELR', 4);

    DECLARE @PhyId INT = (SELECT Id FROM dbo.Subjects WHERE CourseId = @Course1Id AND Name = 'Physics');
    DECLARE @MathId INT = (SELECT Id FROM dbo.Subjects WHERE CourseId = @Course1Id AND Name = 'Mathematics');

    -- Chapters
    INSERT INTO dbo.Chapters (SubjectId, Name, Description, DisplayOrder) VALUES
    (@PhyId, 'Electrostatics & Capacitance', 'Electric charges, Coulomb law, electric field, potential, Gauss law, and capacitor circuits.', 1),
    (@PhyId, 'Current Electricity & Magnetism', 'Ohm law, Kirchhoff laws, magnetic force, Biot-Savart law, and electromagnetic induction.', 2),
    (@MathId, 'Calculus & Functions', 'Limits, continuity, differentiability, maxima-minima, and definite integrals.', 1),
    (@MathId, 'Vectors & 3D Geometry', 'Dot/cross products, lines in 3D, and planes in coordinate geometry.', 2);

    DECLARE @Chap1Id INT = (SELECT Id FROM dbo.Chapters WHERE SubjectId = @PhyId AND Name = 'Electrostatics & Capacitance');

    -- Lessons
    INSERT INTO dbo.Lessons (ChapterId, Title, BriefDescription, LessonType, VimeoVideoId, DurationSeconds, IsFreePreview, DisplayOrder) VALUES
    (@Chap1Id, 'Coulomb Law & Superposition Principle', 'Understanding electric forces, vector form of Coulomb law, and equilibrium problems.', 'Video', '76979871', 2700, 1, 1),
    (@Chap1Id, 'Electric Field Intensity & Dipoles', 'Field calculations for rings, lines, sheets, and electric dipole torque/potential.', 'Video', '76979871', 3120, 0, 2),
    (@Chap1Id, 'Gauss Law Applications & Flux Mastery', 'Symmetry considerations, spherical conductors, and non-conducting charge distributions.', 'Video', '76979871', 2940, 0, 3),
    (@Chap1Id, 'Electrostatics Comprehensive Formula Notes', 'High-yield formula summary and rapid memory cheatsheet for BITSAT.', 'Document', NULL, 0, 1, 4);

    DECLARE @Lesson4Id INT = (SELECT Id FROM dbo.Lessons WHERE ChapterId = @Chap1Id AND Title = 'Electrostatics Comprehensive Formula Notes');
    INSERT INTO dbo.LessonResources (LessonId, Title, ResourceUrl, ResourceType) VALUES
    (@Lesson4Id, 'Electrostatics_BITSAT_Formula_Cheatsheet.pdf', '/assets/docs/electrostatics-cheatsheet.pdf', 'PDF');
END


-- ============================================================================
-- 8. EXTENDED QUESTION BANK (TRANSFERRED FROM LEGACY SYSTEM & CBT DATA)
-- ============================================================================

DECLARE @BitsatCourseId INT = (SELECT TOP 1 Id FROM dbo.Courses WHERE Slug = 'bitsat-champions-2026');
DECLARE @DefaultPhyId INT = (SELECT TOP 1 Id FROM dbo.Subjects WHERE Name = 'Physics' AND CourseId = @BitsatCourseId);
DECLARE @DefaultChemId INT = (SELECT TOP 1 Id FROM dbo.Subjects WHERE Name = 'Chemistry' AND CourseId = @BitsatCourseId);
DECLARE @DefaultMathId INT = (SELECT TOP 1 Id FROM dbo.Subjects WHERE Name = 'Mathematics' AND CourseId = @BitsatCourseId);
DECLARE @DefaultElrId INT = (SELECT TOP 1 Id FROM dbo.Subjects WHERE Name = 'English & Logical Reasoning' AND CourseId = @BitsatCourseId);

IF @DefaultPhyId IS NULL SET @DefaultPhyId = 1;
IF @DefaultChemId IS NULL SET @DefaultChemId = 1;
IF @DefaultMathId IS NULL SET @DefaultMathId = 1;
IF @DefaultElrId IS NULL SET @DefaultElrId = 1;


IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%A particle executes simple har%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>A particle executes simple harmonic motion with amplitude $A$ and time period $T$. What is the minimum time taken by the particle to travel from the mean position to $x = \frac{A}{\sqrt{2}}$?</p>', N'$\frac{T}{4}$', N'$\frac{T}{8}$', N'$\frac{T}{6}$', N'$\frac{T}{12}$', 'B', NULL, 2, N'<p>Displacement equation: $x = A\sin(\omega t)$. At $x = \frac{A}{\sqrt{2}}$, $\sin(\omega t) = \frac{1}{\sqrt{2}} \implies \omega t = \frac{\pi}{4}$. Since $\omega = \frac{2\pi}{T}$, we get $\frac{2\pi}{T} t = \frac{\pi}{4} \implies t = \frac{T}{8}$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Evaluate the definite integral%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultMathId, 1, N'<p>Evaluate the definite integral: $I = \int_{0}^{\pi/2} \frac{\sin^3 x}{\sin^3 x + \cos^3 x} dx$.</p>', N'$\pi$', N'$\frac{\pi}{2}$', N'$\frac{\pi}{4}$', N'$0$', 'C', NULL, 2, N'<p>Using Kings Property: $I = \int_{0}^{\pi/2} \frac{\cos^3 x}{\cos^3 x + \sin^3 x} dx$. Adding both equations: $2I = \int_{0}^{\pi/2} 1 dx = \frac{\pi}{2} \implies I = \frac{\pi}{4}$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%For a first order reaction, th%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>For a first order reaction, the time required for 99.9% completion is approximately how many times the half-life period ($t_{1/2}$)?</p>', N'5 times', N'10 times', N'3 times', N'7 times', 'B', NULL, 2, N'<p>For 99.9% completion, remaining concentration is 0.1% = $10^{-3} [A]_0$. $t_{99.9\%} = \frac{2.303}{k} \log(10^3) = \frac{3 \times 2.303}{k}$. Since $t_{1/2} = \frac{0.693}{k} = \frac{2.303 \times 0.3010}{k}$, we get $t_{99.9\%} \approx 10 \times t_{1/2}$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Two resistors of resistances $%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 2, N'<p>Two resistors of resistances $R_1 = 6\,\Omega$ and $R_2 = 12\,\Omega$ are connected in parallel across a $24\,\text{V}$ battery. Calculate the total current (in Amperes) drawn from the battery.</p>', NULL, NULL, NULL, NULL, '6', 6, 2, N'<p>Equivalent resistance $R_{eq} = \frac{R_1 R_2}{R_1 + R_2} = \frac{6 \times 12}{6 + 12} = 4\,\Omega$. Current $I = \frac{V}{R_{eq}} = \frac{24}{4} = 6\,\text{A}$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Find the next number in the gi%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultElrId, 1, N'<p>Find the next number in the given series: $3, 7, 15, 31, 63, \,?$</p>', N'127', N'125', N'120', N'131', 'A', NULL, 2, N'<p>Pattern: $x_{n} = 2x_{n-1} + 1$. Next term = $2(63) + 1 = 127$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Two point charges $+q$ and $-q%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>Two point charges $+q$ and $-q$ are placed at distance $d$ apart. What is the electric field magnitude at the midpoint between them?</p>', N'Zero', N'$\frac{8kq}{d^2}$', N'$\frac{4kq}{d^2}$', N'$\frac{2kq}{d^2}$', 'B', NULL, 2, N'<p>At the midpoint $r = d/2$. Fields due to $+q$ and $-q$ point in the same direction: $E = \frac{kq}{(d/2)^2} + \frac{kq}{(d/2)^2} = \frac{4kq}{d^2} + \frac{4kq}{d^2} = \frac{8kq}{d^2}$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%A parallel plate capacitor of %')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>A parallel plate capacitor of capacitance $C$ is charged to potential $V$. If a dielectric slab of dielectric constant $K=4$ is inserted while disconnected from the battery, the new stored energy is:</p>', N'$4U$', N'$\frac{U}{4}$', N'$2U$', N'$U$', 'B', NULL, 2, N'<p>When disconnected from battery, charge $Q$ remains conserved. $U = \frac{Q^2}{2C}$. With dielectric, $C'' = KC = 4C$, so $U'' = \frac{Q^2}{2(4C)} = \frac{U}{4}$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Calculate the equivalent resis%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 2, N'<p>Calculate the equivalent resistance (in $\Omega$) between terminals A and B of an infinite ladder network of $1\,\Omega$ resistors.</p>', NULL, NULL, NULL, NULL, '1.618', 1.618, 2, N'<p>Let equivalent resistance be $R$. Then $R = 1 + \frac{1 \cdot R}{1 + R} \implies R^2 - R - 1 = 0 \implies R = \frac{1+\sqrt{5}}{2} \approx 1.618\,\Omega$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The metallurgical process in w%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>The metallurgical process in which a metal is obtained in a fused (molten) state is called:</p>', N'Smelting', N'Roasting', N'Calcination', N'Froth Floatation', 'A', NULL, 2, N'<p>Smelting is a metallurgical thermal reduction process where roasted or calcined ore is heated above the melting point of the metal with a suitable reducing agent and flux.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The inherited traits of an org%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultElrId, 1, N'<p>The inherited traits of an organism are primarily encoded and controlled by:</p>', N'DNA molecules (Genes)', N'RNA molecules', N'Free Nucleotides', N'Enzymes', 'A', NULL, 2, N'<p>Inherited genetic traits are coded in the precise sequence of nucleotide base pairs within deoxyribonucleic acid (DNA) genes.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%What are the number of moles o%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>What are the number of moles of $\text{CO}_2$ which contains $16\,\text{g}$ of oxygen?</p>', N'$0.5\text{ mole}$', N'$0.25\text{ mole}$', N'$1.0\text{ mole}$', N'$2.0\text{ moles}$', 'A', NULL, 2, N'<p>$1\text{ mole of }\text{CO}_2$ contains $32\,\text{g}$ of oxygen. Hence, $16\,\text{g}$ of oxygen corresponds to $\frac{16}{32} = 0.5\text{ mole of }\text{CO}_2$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%What is the national capital o%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultElrId, 1, N'<p>What is the national capital of the Republic of India?</p>', N'New Delhi', N'Mumbai', N'Kolkata', N'Bengaluru', 'A', NULL, 2, N'<p>New Delhi is the official national capital and seat of the Government of India.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The heat energy produced when %')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>The heat energy produced when the human body metabolizes $1\,\text{gram}$ of fat is approximately:</p>', N'$37\text{ kJ to }39\text{ kJ}$ ($9\text{ kcal}$)', N'$17\text{ kJ}$ ($4\text{ kcal}$)', N'$1\text{ kJ}$', N'$4.2\text{ kJ}$', 'A', NULL, 2, N'<p>Complete physiological oxidation of $1\,\text{g}$ of lipid/fat yields roughly $37-39\,\text{kJ}$ ($9\,\text{kcal}$) of energy, more than double that of carbohydrates or proteins ($17\,\text{kJ/g}$).</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The nucleus of a neutral hydro%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>The nucleus of a neutral hydrogen atom ($^1\text{H}$, Protium) consists of:</p>', N'1 proton only', N'1 proton and 1 neutron', N'1 neutron only', N'1 electron only', 'A', NULL, 2, N'<p>The predominant isotope of hydrogen, protium ($^1_1\text{H}$), has an atomic number of 1 and mass number of 1, meaning its nucleus contains 1 single proton and zero neutrons.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The most electronegative eleme%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>The most electronegative element in the periodic table is:</p>', N'Fluorine (F)', N'Chlorine (Cl)', N'Oxygen (O)', N'Nitrogen (N)', 'A', NULL, 2, N'<p>Fluorine has the highest Pauling electronegativity value of $3.98$, owing to its small atomic radius and high effective nuclear charge.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%At a given absolute temperatur%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>At a given absolute temperature $T$, the molecules of which of the following gases possess the highest root-mean-square speed ($v_{rms}$)?</p>', N'$\text{H}_2$ (Hydrogen, $M=2$)', N'$\text{CH}_4$ (Methane, $M=16$)', N'$\text{N}_2$ (Nitrogen, $M=28$)', N'$\text{O}_2$ (Oxygen, $M=32$)', 'A', NULL, 2, N'<p>$v_{rms} = \sqrt{\frac{3RT}{M}}$. Since rms speed is inversely proportional to the square root of molar mass $\sqrt{M}$, Hydrogen ($M = 2\,\text{g/mol}$) has the highest speed.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The subatomic exchange particl%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>The subatomic exchange particles responsible for holding protons and neutrons together in the nucleus are:</p>', N'Pi-Mesons (Pions)', N'Positrons', N'Photons', N'Gravitons', 'A', NULL, 2, N'<p>According to Yukawa theory of strong nuclear interaction, the exchange of virtual pi-mesons ($\pi$-mesons) mediates the short-range attractive nuclear force between nucleons.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Which metal can be economicall%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>Which metal can be economically used to recover metallic copper from an aqueous solution of copper sulphate ($\text{CuSO}_4$)?</p>', N'Iron (Fe)', N'Silver (Ag)', N'Gold (Au)', N'Mercury (Hg)', 'A', NULL, 2, N'<p>Iron has a lower standard reduction potential ($E^\circ = -0.44\,\text{V}$) than Copper ($E^\circ = +0.34\,\text{V}$) and spontaneously displaces copper: $\text{Fe} + \text{CuSO}_4 \rightarrow \text{FeSO}_4 + \text{Cu}\downarrow$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The number of moles of solute %')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>The number of moles of solute dissolved per kilogram ($1000\,\text{g}$) of solvent is defined as:</p>', N'Molality ($m$)', N'Molarity ($M$)', N'Normality ($N$)', N'Formality', 'A', NULL, 2, N'<p>Molality ($m$) is mass-based and hence independent of temperature changes.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The transition metal widely us%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>The transition metal widely used as a heterogeneous catalyst in the industrial hydrogenation of vegetable oils is:</p>', N'Finely divided Nickel (Ni)', N'Lead (Pb)', N'Tin (Sn)', N'Zinc (Zn)', 'A', NULL, 2, N'<p>Finely divided Nickel catalyst (Sabatier-Senderens reaction) facilitates the addition of hydrogen across unsaturated $C=C$ bonds at $473\,\text{K}$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The primary physiological buff%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>The primary physiological buffer system regulating the pH of human blood plasma is:</p>', N'$\text{H}_2\text{CO}_3 - \text{HCO}_3^-$ (Carbonic acid - Bicarbonate)', N'$\text{NaH}_2\text{PO}_4 - \text{Na}_2\text{HPO}_4$', N'$\text{CH}_3\text{COOH} - \text{CH}_3\text{COONa}$', N'$\text{HCl} - \text{NaCl}$', 'A', NULL, 2, N'<p>The bicarbonate buffer system maintaining $\text{pH} \approx 7.40$ is governed by $\text{CO}_2 + \text{H}_2\text{O} \rightleftharpoons \text{H}_2\text{CO}_3 \rightleftharpoons \text{H}^+ + \text{HCO}_3^-$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%An octane rating of zero ($0$)%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>An octane rating of zero ($0$) is standardly assigned to which hydrocarbon?</p>', N'$n$-heptane', N'Iso-octane ($2,2,4$-trimethylpentane)', N'Neopentane', N'Toluene', 'A', NULL, 2, N'<p>In anti-knock rating standards, straight-chain $n$-heptane knocks severely and is assigned Octane Number $= 0$, whereas highly branched $2,2,4$-trimethylpentane is assigned $100$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The most commonly used commerc%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>The most commonly used commercial bleaching and water disinfecting agent is:</p>', N'Chlorine ($\text{Cl}_2$)', N'Carbon Dioxide ($\text{CO}_2$)', N'Nitrogen Dioxide ($\text{NO}_2$)', N'Argon ($\text{Ar}$)', 'A', NULL, 2, N'<p>Chlorine hydrolyzes in water to form nascent oxygen and hypochlorous acid ($\text{HOCl}$), which bleaches organic dyes and disinfects microbial pathogens.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The most abundant noble (rare)%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>The most abundant noble (rare) gas present in the Earth atmosphere by volume is:</p>', N'Argon (Ar)', N'Helium (He)', N'Neon (Ne)', N'Krypton (Kr)', 'A', NULL, 2, N'<p>Argon makes up approximately $0.934\%$ of the Earths atmosphere by volume, far surpassing helium and neon.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The atomic nucleus of all mult%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>The atomic nucleus of all multi-electron elements consists of:</p>', N'Protons and Neutrons (Nucleons)', N'Protons and Electrons', N'Neutrons and Electrons', N'Positrons and Neutrinos', 'A', NULL, 2, N'<p>The atomic nucleus consists of positively charged protons and electrically neutral neutrons, collectively called nucleons.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The thorium-bearing mineral or%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>The thorium-bearing mineral ore found in rich abundance along the coastal beach sands of Kerala and Odisha is:</p>', N'Monazite sand', N'Bauxite', N'Hematite', N'Pitchblende', 'A', NULL, 2, N'<p>Monazite is a reddish-brown phosphate mineral containing thorium, lanthanum, and cerium, abundant on Indias southwestern coastline.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The amount of heat required to%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>The amount of heat required to raise the temperature of an entire body of mass $m$ by $1\,\text{K}$ is termed its:</p>', N'Heat Capacity (Thermal Capacity)', N'Specific Heat Capacity', N'Water Equivalent', N'Latent Heat of Fusion', 'A', NULL, 2, N'<p>Heat capacity $C = ms = \frac{\Delta Q}{\Delta T}$ is the heat required for the whole body per Kelvin, whereas specific heat capacity is per unit mass ($1\,\text{kg}$).</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The repeating monomer unit of %')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultChemId, 1, N'<p>The repeating monomer unit of Polyethylene (Polythene) is:</p>', N'Ethene (Ethylene, $\text{CH}_2=\text{CH}_2$)', N'Propene', N'Vinyl chloride', N'Tetrafluoroethene', 'A', NULL, 2, N'<p>Addition polymerization of ethene monomers under high pressure/Ziegler-Natta catalyst forms polyethylene: $n(\text{CH}_2=\text{CH}_2) \rightarrow (-\text{CH}_2-\text{CH}_2-)_n$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Stars appear to rise in the ea%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>Stars appear to rise in the east and set in the west because:</p>', N'The Earth rotates on its axis from West to East', N'The Earth rotates on its axis from East to West', N'The entire celestial sphere rotates westward', N'The Sun exerts a westward gravitational torque', 'A', NULL, 2, N'<p>Because Earth completes a counterclockwise axial rotation from West to East every 24 hours, celestial bodies appear to move East to West in the observer reference frame.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The absorption of liquid ink i%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>The absorption of liquid ink into blotting paper is primarily governed by:</p>', N'Capillary Action', N'Viscous Shear Flow', N'Diffusion of Vapor', N'Centrifugal Force', 'A', NULL, 2, N'<p>Pores in cellulose fibers act as micro-capillaries. Surface tension and adhesion draw the liquid upward against gravity ($h = \frac{2T\cos\theta}{\rho g r}$).</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Which of the following terms d%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultElrId, 1, N'<p>Which of the following terms does NOT belong to the discipline of Physics?</p>', N'Stock Dividend', N'Latent Heat', N'Refractive Index', N'Nuclear Fission', 'A', NULL, 2, N'<p>Stock Dividend is a corporate finance/equity term, whereas Latent Heat, Refractive Index, and Nuclear Fission are foundational physics concepts.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Large step-up and step-down el%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>Large step-up and step-down electrical transformers heat up during continuous duty due to:</p>', N'Joule heating ($I^2R$) and Eddy current hysteresis in iron cores', N'Dielectric breakdown of air', N'Nuclear decay of copper windings', N'Mechanical friction of iron laminations', 'A', NULL, 2, N'<p>Transformer losses arise from resistive winding heating ($I^2R$) and continuous magnetic domain reversal (hysteresis + eddy currents) inside the core.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Metallic elements are excellen%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>Metallic elements are excellent conductors of electricity because:</p>', N'They possess a high density of free conduction electrons', N'Their nuclei are lightly packed', N'They have low melting temperatures', N'Their atoms carry positive net charges', 'A', NULL, 2, N'<p>Metals have overlapping valence and conduction bands, providing high density of delocalized free electrons that drift under an applied electric field.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%A Light Year is a fundamental %')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>A Light Year is a fundamental unit of:</p>', N'Astronomical Distance', N'Time Duration', N'Luminous Intensity', N'Light Speed', 'A', NULL, 2, N'<p>One Light Year ($1\,\text{ly}$) is the distance traversed by a photon in vacuum in 1 Julian year: $d = c \times t \approx 9.46 \times 10^{15}\,\text{m}$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Nuclear radii and subatomic di%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>Nuclear radii and subatomic distances are conventionally measured in:</p>', N'Fermi (Femtometer, $1\,\text{fm} = 10^{-15}\,\text{m}$)', N'Angstrom ($1\,\text{\AA} = 10^{-10}\,\text{m}$)', N'Nanometer ($10^{-9}\,\text{m}$)', N'Micrometer ($10^{-6}\,\text{m}$)', 'A', NULL, 2, N'<p>Nuclear radii follow $R = R_0 A^{1/3}$ where $R_0 \approx 1.2\,\text{fm}$ ($10^{-15}\,\text{m}$).</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%In electronics, a rectifier ci%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>In electronics, a rectifier circuit composed of p-n junction diodes is used to convert:</p>', N'Alternating Current (AC) to Direct Current (DC)', N'Direct Current (DC) to Alternating Current (AC)', N'Low AC voltage to High AC voltage', N'Analog signal to Digital signal', 'A', NULL, 2, N'<p>Diodes conduct in only one direction (forward bias), converting bidirectional AC waveforms into unidirectional pulsating DC.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%It requires less applied force%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>It requires less applied force to roll a heavy stone up an inclined sloping ramp than to lift it vertically because:</p>', N'Force is exerted against only a component of weight ($mg\sin\theta$)', N'The gravitational acceleration $g$ decreases on slopes', N'Rolling friction exceeds gravitational force', N'The net work done becomes zero', 'A', NULL, 2, N'<p>On a frictionless inclined plane of angle $\theta$, the component of gravity parallel to the incline is $mg\sin\theta < mg$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Radiocarbon ($^{14}\text{C}$) %')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>Radiocarbon ($^{14}\text{C}$) used in carbon dating is continuously generated in the Earth upper atmosphere by:</p>', N'Cosmic-ray neutron bombardment of atmospheric nitrogen ($^{14}\text{N}$)', N'Solar proton capture by oxygen', N'Radioactive radon gas emission from rocks', N'Lightning ionization of carbon dioxide', 'A', NULL, 2, N'<p>Thermal cosmic neutrons collide with stable nitrogen: $^1_0\text{n} + ^{14}_7\text{N} \rightarrow ^{14}_6\text{C} + ^1_1\text{p}$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%A liquid siphon will completel%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>A liquid siphon will completely fail to operate if:</p>', N'The apparatus is placed in a vacuum or crest height exceeds the barometric height', N'The two tube limbs are of unequal length', N'The siphon tube is curved', N'The liquid has high surface tension', 'A', NULL, 2, N'<p>Siphoning relies on ambient atmospheric pressure to push liquid over the crest. In a vacuum, or if height exceeds barometric height, liquid vaporizes and flow ceases.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Identify the SCALAR quantity a%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>Identify the SCALAR quantity among the following physical quantities:</p>', N'Pressure (Hydrostatic)', N'Velocity', N'Acceleration', N'Force Vector', 'A', NULL, 2, N'<p>Hydrostatic pressure transmits isotropically in all directions at a given depth and is characterized completely by a single scalar magnitude.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Planets do NOT twinkle in the %')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>Planets do NOT twinkle in the night sky like distant stars because:</p>', N'They are closer to Earth and act as extended sources of light averaging out atmospheric fluctuation', N'Planets emit constant coherent light', N'Light from planets does not pass through the atmosphere', N'Planets are strictly stationary relative to Earth', 'A', NULL, 2, N'<p>Stars are point sources whose apparent position easily shifts due to atmospheric turbulence. Planets are extended disks consisting of countless points whose intensity variations cancel out on average.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Pascal ($\text{Pa}$) is the st%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>Pascal ($\text{Pa}$) is the standard SI derived unit of:</p>', N'Pressure and Mechanical Stress ($\text{N/m}^2$)', N'Work and Energy', N'Power', N'Viscosity', 'A', NULL, 2, N'<p>$1\,\text{Pascal} = 1\,\text{Newton per square meter} = 1\,\text{N}\cdot\text{m}^{-2}$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%The optical mirage observed ov%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>The optical mirage observed over hot desert sands and paved highways is primarily caused by:</p>', N'Total Internal Reflection (TIR) in heated air layers of varying refractive index', N'Specular reflection from ground minerals', N'Light diffraction around particulate dust', N'Atmospheric polarization', 'A', NULL, 2, N'<p>Air closest to the sun-baked ground is hot and less dense ($n$ lower). Light rays from the sky bending away from the normal undergo Total Internal Reflection when the angle of incidence exceeds the critical angle.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%In the base-2 binary numbering%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>In the base-2 binary numbering system, the decimal integer value $4_{10}$ is represented as:</p>', N'$100_2$', N'$101_2$', N'$110_2$', N'$011_2$', 'A', NULL, 2, N'<p>$4_{10} = 1\times 2^2 + 0\times 2^1 + 0\times 2^0 = 100_2$.</p>', 3, 1, 1);
END

IF NOT EXISTS (SELECT 1 FROM dbo.Questions WHERE QuestionTextHtml LIKE '%Light emitted from the surface%')
BEGIN
    INSERT INTO dbo.Questions (SubjectId, QuestionType, QuestionTextHtml, OptionA, OptionB, OptionC, OptionD, CorrectOption, NumericalAnswer, Difficulty, ExplanationHtml, MarksPositive, MarksNegative, IsActive)
    VALUES (@DefaultPhyId, 1, N'<p>Light emitted from the surface of the Sun takes approximately how long to reach the Earth surface?</p>', N'8 minutes 20 seconds ($\approx 500\text{ seconds}$)', N'2 minutes 10 seconds', N'15 minutes', N'1 second', 'A', NULL, 2, N'<p>With average distance $d = 1.496 \times 10^{11}\,\text{m}$ and light speed $c = 3 \times 10^8\,\text{m/s}$, $t = \frac{d}{c} \approx 499\,\text{s} \approx 8\,\text{min } 19\,\text{s}$.</p>', 3, 1, 1);
END

-- 9. BLOG POSTS (100% CONTENT PRESERVED)
IF NOT EXISTS (SELECT 1 FROM dbo.BlogPosts WHERE Slug = 'how-to-score-350-plus-in-bitsat-2026')
BEGIN
    INSERT INTO dbo.BlogPosts (ExamId, Title, Slug, Excerpt, ContentHtml, ThumbnailUrl, BannerUrl, AltTagThumbnail, AltTagBanner, AuthorName, ReadingTimeMinutes, IsPublished, PublishedAtUtc)
    VALUES 
    (@BitsatId, 'How to Score 350+ in BITSAT 2026: Complete Strategy Guide', 'how-to-score-350-plus-in-bitsat-2026', 
    'A step-by-step master roadmap for scoring 350+ in BITSAT 2026. Discover time allocation hacks, bonus question strategies, and subject-wise priorities.',
    '<h2>The Mindset for a 350+ BITSAT Score</h2><p>BITSAT is fundamentally an examination of <strong>speed and accuracy</strong> rather than deep theoretical derivation. While JEE Advanced tests conceptual endurance on tricky multi-concept problems, BITSAT rewards candidates who can solve 130 standard to moderate questions in 180 minutes with minimal errors.</p><h3>1. Time Allocation Breakdown (180 Minutes)</h3><ul><li><strong>Mathematics (40 Questions):</strong> 65 Minutes</li><li><strong>Physics (30 Questions):</strong> 40 Minutes</li><li><strong>Chemistry (30 Questions):</strong> 30 Minutes</li><li><strong>English & Logical Reasoning (30 Questions):</strong> 25 Minutes</li><li><strong>Buffer & Bonus Questions (12 Questions):</strong> 20 Minutes</li></ul><h3>2. The Bonus Question Strategy</h3><p>To unlock the 12 bonus questions (3 Physics, 3 Chemistry, 3 Math, 3 Logical Reasoning), you must attempt all 130 questions. Never guess blindly to unlock bonus questions. Ensure you have at least 115+ confident answers before attempting the remaining questions.</p>',
    '/site/assets/img/blog/blog-1.jpg', '/site/assets/img/blog/blog-detail-image.jpg', 'BITSAT 2026 Strategy Guide', 'BITSAT Strategy Banner', 'Ritesh (Lead BITSAT Mentor)', 8, 1, SYSUTCDATETIME()),

    (@BitsatId, 'BITSAT 2026 High Weightage Chapters & Topic Analysis', 'bitsat-2026-high-weightage-chapters-analysis', 
    'Detailed subject-wise weightage breakdown for BITSAT 2026 across Physics, Chemistry, and Mathematics based on 10-year question trends.',
    '<h2>Subject-Wise High-Yield Chapters</h2><p>Focusing on the highest yield chapters gives you the maximum ROI in the final 60 days before the exam.</p><h3>Physics High Yield</h3><ul><li>Modern Physics & Semiconductors (4-5 Questions)</li><li>Current Electricity & Capacitance (3-4 Questions)</li><li>Heat & Thermodynamics (3 Questions)</li><li>Ray Optics & Wave Optics (3 Questions)</li></ul><h3>Mathematics High Yield</h3><ul><li>Coordinate Geometry & Vectors/3D (8-10 Questions)</li><li>Definite Integrals & Differential Equations (5-6 Questions)</li><li>Matrices & Determinants (3-4 Questions)</li></ul>',
    '/site/assets/img/blog/blog-2.jpg', '/site/assets/img/blog/blog-detail-image.jpg', 'BITSAT High Weightage Chapters', 'BITSAT Analysis Banner', 'Ritesh (Lead BITSAT Mentor)', 6, 1, SYSUTCDATETIME()),

    (@JeeId, 'JEE Main vs BITSAT: Key Differences in Preparation & Strategy', 'jee-main-vs-bitsat-preparation-strategy-differences', 
    'Understand the fundamental differences between JEE Main and BITSAT speed requirements, marking schemes, and revision routines.',
    '<h2>Key Differences at a Glance</h2><p>While the syllabus is largely identical, the test dynamics differ significantly. JEE Main gives 180 minutes for 75 questions (~2.4 minutes per question), whereas BITSAT requires solving 130 questions in 180 minutes (~1.38 minutes per question).</p>',
    '/site/assets/img/blog/blog-3.jpg', '/site/assets/img/blog/blog-detail-image.jpg', 'JEE Main vs BITSAT Comparison', 'JEE vs BITSAT Banner', 'Academic Team', 5, 1, SYSUTCDATETIME());
END

-- 10. COUPONS
IF NOT EXISTS (SELECT 1 FROM dbo.Coupons WHERE Code = 'EARLYBIRD20')
BEGIN
    INSERT INTO dbo.Coupons (Code, DiscountType, DiscountValue, MinOrderAmount, MaxDiscountAmount, ValidFrom, ExpiresAt, UsageLimit, Description, IsActive)
    VALUES 
    ('EARLYBIRD20', 'Percentage', 20.00, 1000.00, 2000.00, SYSUTCDATETIME(), DATEADD(MONTH, 6, SYSUTCDATETIME()), 500, '20% discount on all full courses', 1),
    ('BITSAT500', 'Flat', 500.00, 1499.00, 500.00, SYSUTCDATETIME(), DATEADD(MONTH, 6, SYSUTCDATETIME()), 1000, 'Flat ₹500 discount on BITSAT preparation packages', 1),
    ('FESTIVE10', 'Percentage', 10.00, 500.00, 1000.00, SYSUTCDATETIME(), DATEADD(MONTH, 6, SYSUTCDATETIME()), 2000, '10% celebratory discount', 1);
END

-- 11. SEO METADATA
IF NOT EXISTS (SELECT 1 FROM dbo.SeoMetadata WHERE Path = '/')
BEGIN
    INSERT INTO dbo.SeoMetadata (Path, Title, Description, Keywords, CanonicalUrl, Robots, OgTitle, OgDescription, OgImageUrl)
    VALUES 
    ('/', '10Q Challenge - Best BITSAT, JEE & Engineering Entrance Preparation', 'Join 10Q Challenge for comprehensive BITSAT 2026 courses, authentic CBT mock test series, speed solving techniques, and 1-on-1 mentorship by BITS Pilani alumni.', 'BITSAT 2026, BITSAT mock tests, BITS Pilani preparation, JEE Main crash course, COMEDK coaching', 'https://10qchallenge.in/', 'index, follow', '10Q Challenge - Premier BITSAT & Engineering Test Prep', 'Master high-speed accuracy, exclusive bonus question tactics, and complete syllabus mastery with BITS Pilani alumni.', 'https://10qchallenge.in/site/assets/img/banner/banner1.png'),
    ('/about', 'About Us | 10Q Challenge', 'Learn about the mission, faculty, and top ranker mentors behind 10Q Challenge dedicated to engineering test preparation.', 'About 10Q Challenge, Ritesh BITS Pilani, engineering entrance coaching', 'https://10qchallenge.in/about', 'index, follow', 'About 10Q Challenge', 'Empowering engineering aspirants to achieve top ranks in BITSAT, JEE, and national entrance exams.', 'https://10qchallenge.in/site/assets/img/about/about-01.jpg'),
    ('/contact', 'Contact Us | 10Q Challenge', 'Get in touch with the 10Q Challenge support team for course inquiries, mentorship enrollment, and student guidance.', 'Contact 10Q Challenge, student support, BITSAT counseling', 'https://10qchallenge.in/contact', 'index, follow', 'Contact 10Q Challenge Support', 'We are here to assist with any questions about our courses and test series.', 'https://10qchallenge.in/site/assets/img/banner/banner2.png'),
    ('/course-all', 'All Engineering Courses & Test Series | 10Q Challenge', 'Browse our complete catalog of BITSAT, JEE, COMEDK, MET, and VITEEE preparation batches, test series, and mentorship programs.', 'BITSAT courses, JEE prep batches, COMEDK test series, engineering entrance courses', 'https://10qchallenge.in/course-all', 'index, follow', 'Explore 10Q Challenge Courses', 'Select your target exam and start your structured preparation today.', 'https://10qchallenge.in/site/assets/img/course/course-01.jpg'),
    ('/blog', 'BITSAT & JEE Preparation Articles & Guides | 10Q Challenge Blog', 'Read expert preparation strategies, high weightage chapter analysis, exam date updates, and speed tricks by top rankers on 10Q Challenge Blog.', 'BITSAT blog, engineering preparation articles, exam tips, BITS Pilani guides', 'https://10qchallenge.in/blog', 'index, follow', '10Q Challenge Blog & Strategy Hub', 'Expert articles and tips for BITSAT and competitive engineering exams.', 'https://10qchallenge.in/site/assets/img/blog/blog-1.jpg');
END

-- 12. REDIRECT RULES
IF NOT EXISTS (SELECT 1 FROM dbo.RedirectRules WHERE SourcePath = '/sign-in')
BEGIN
    INSERT INTO dbo.RedirectRules (SourcePath, TargetPath, StatusCode, IsActive)
    VALUES 
    ('/sign-in', '/login', 301, 1),
    ('/login/sign-in', '/login', 301, 1),
    ('/sign-up', '/register', 301, 1),
    ('/course-list', '/course-all', 301, 1),
    ('/student-index', '/student/dashboard', 301, 1),
    ('/student-course-list', '/student/courses', 301, 1);
END

-- 13. SITE NOTIFICATIONS
IF NOT EXISTS (SELECT 1 FROM dbo.SiteNotifications WHERE Message LIKE '%BITSAT 2026%')
BEGIN
    INSERT INTO dbo.SiteNotifications (Message, LinkUrl, ShowFrom, ShowTo, IsActive)
    VALUES 
    ('🎉 BITSAT 2026 Champions Batch is now LIVE! Use code BITSAT500 for flat ₹500 off.', '/course-detail/bitsat-champions-2026', SYSUTCDATETIME(), DATEADD(MONTH, 3, SYSUTCDATETIME()), 1);
END

PRINT '10Q Challenge Seed Data successfully inserted.';
GO
