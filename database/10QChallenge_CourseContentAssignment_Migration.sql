-- ============================================================================
-- 10Q CHALLENGE: COURSE MANAGEMENT & CONTENT ASSIGNMENT SYSTEM MIGRATION
-- Safe, Idempotent Database Migration Script (MS SQL Server 2019 / 2022)
-- ============================================================================
-- Purpose:
-- Decouples content into independent Master repositories (Videos, Documents, 
-- Test Series, Live Sessions) and establishes clean Many-to-Many associations 
-- with Courses so that a single content item can belong to multiple courses.
-- ============================================================================

USE [10QChallengeDb];
GO

PRINT 'Starting 10Q Challenge Course Management & Content Assignment migration...';
GO

-- ============================================================================
-- 1. VIDEO MASTER REPOSITORY (CENTRAL VIMEO REPOSITORY)
-- ============================================================================
IF OBJECT_ID('dbo.VideoMaster', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.VideoMaster (
        Id INT IDENTITY(1,1) NOT NULL,
        Title NVARCHAR(250) NOT NULL,
        VimeoVideoId NVARCHAR(100) NOT NULL,
        VideoUrl NVARCHAR(500) NULL,
        Subject NVARCHAR(100) NOT NULL,
        Chapter NVARCHAR(200) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        ThumbnailUrl NVARCHAR(500) NULL,
        DurationMinutes INT NOT NULL DEFAULT 45,
        IsFreePreview BIT NOT NULL DEFAULT 0,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Published', -- 'Draft', 'Published', 'Archived'
        DisplayOrder INT NOT NULL DEFAULT 0,
        CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT PK_VideoMaster PRIMARY KEY CLUSTERED (Id)
    );

    CREATE NONCLUSTERED INDEX IX_VideoMaster_Subject_Chapter ON dbo.VideoMaster(Subject, Chapter);
    CREATE NONCLUSTERED INDEX IX_VideoMaster_VimeoVideoId ON dbo.VideoMaster(VimeoVideoId);
    CREATE NONCLUSTERED INDEX IX_VideoMaster_Status ON dbo.VideoMaster(Status);

    PRINT '✓ Table dbo.VideoMaster created.';
END
ELSE
BEGIN
    PRINT '• Table dbo.VideoMaster already exists.';
END
GO

-- ============================================================================
-- 2. DOCUMENT MASTER REPOSITORY (STUDY MATERIALS, NOTES, CHEATSHEETS)
-- ============================================================================
IF OBJECT_ID('dbo.DocumentMaster', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.DocumentMaster (
        Id INT IDENTITY(1,1) NOT NULL,
        Title NVARCHAR(250) NOT NULL,
        Subject NVARCHAR(100) NOT NULL,
        Chapter NVARCHAR(200) NOT NULL,
        FileType NVARCHAR(20) NOT NULL DEFAULT 'PDF', -- 'PDF', 'DOC', 'DOCX'
        FileUrl NVARCHAR(500) NOT NULL,
        FileSizeBytes NVARCHAR(50) NULL,
        PageCount INT NULL,
        Description NVARCHAR(MAX) NULL,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Published', -- 'Draft', 'Published', 'Archived'
        DisplayOrder INT NOT NULL DEFAULT 0,
        CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT PK_DocumentMaster PRIMARY KEY CLUSTERED (Id)
    );

    CREATE NONCLUSTERED INDEX IX_DocumentMaster_Subject_Chapter ON dbo.DocumentMaster(Subject, Chapter);
    CREATE NONCLUSTERED INDEX IX_DocumentMaster_Status ON dbo.DocumentMaster(Status);

    PRINT '✓ Table dbo.DocumentMaster created.';
END
ELSE
BEGIN
    PRINT '• Table dbo.DocumentMaster already exists.';
END
GO

-- ============================================================================
-- 3. TEST SERIES MASTER REPOSITORY (INDEPENDENT ASSESSMENTS)
-- ============================================================================
IF OBJECT_ID('dbo.TestSeriesMaster', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.TestSeriesMaster (
        Id INT IDENTITY(1,1) NOT NULL,
        Title NVARCHAR(250) NOT NULL,
        ExamTag NVARCHAR(100) NOT NULL, -- 'BITSAT', 'JEE Main', 'COMEDK', 'MET', 'VITEEE'
        TargetYear INT NOT NULL DEFAULT 2026,
        Description NVARCHAR(MAX) NULL,
        DurationMinutes INT NOT NULL DEFAULT 180,
        TotalQuestions INT NOT NULL DEFAULT 130,
        TotalMarks DECIMAL(18,2) NOT NULL DEFAULT 390.00,
        TestPaperId INT NULL, -- Optional link to assessment engine TestPaper
        Price DECIMAL(18,2) NOT NULL DEFAULT 0.00,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Published', -- 'Draft', 'Published', 'Archived'
        CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT PK_TestSeriesMaster PRIMARY KEY CLUSTERED (Id)
    );

    CREATE NONCLUSTERED INDEX IX_TestSeriesMaster_ExamTag_Year ON dbo.TestSeriesMaster(ExamTag, TargetYear);
    CREATE NONCLUSTERED INDEX IX_TestSeriesMaster_Status ON dbo.TestSeriesMaster(Status);

    PRINT '✓ Table dbo.TestSeriesMaster created.';
END
ELSE
BEGIN
    PRINT '• Table dbo.TestSeriesMaster already exists.';
END
GO

-- ============================================================================
-- 4. LIVE SESSION MASTER REPOSITORY (INTERACTIVE CLASSES)
-- ============================================================================
IF OBJECT_ID('dbo.LiveSessionMaster', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.LiveSessionMaster (
        Id INT IDENTITY(1,1) NOT NULL,
        Title NVARCHAR(250) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        SessionDate DATE NOT NULL,
        StartTime TIME(0) NOT NULL,
        EndTime TIME(0) NOT NULL,
        TimeZone NVARCHAR(50) NOT NULL DEFAULT 'IST (UTC+5:30)',
        MeetingUrl NVARCHAR(500) NOT NULL,
        Subject NVARCHAR(100) NULL,
        Chapter NVARCHAR(200) NULL,
        FacultyName NVARCHAR(150) NOT NULL,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Scheduled', -- 'Scheduled', 'Live', 'Completed', 'Cancelled'
        CreatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT PK_LiveSessionMaster PRIMARY KEY CLUSTERED (Id)
    );

    CREATE NONCLUSTERED INDEX IX_LiveSessionMaster_Date ON dbo.LiveSessionMaster(SessionDate);
    CREATE NONCLUSTERED INDEX IX_LiveSessionMaster_Status ON dbo.LiveSessionMaster(Status);

    PRINT '✓ Table dbo.LiveSessionMaster created.';
END
ELSE
BEGIN
    PRINT '• Table dbo.LiveSessionMaster already exists.';
END
GO

-- ============================================================================
-- 5. MANY-TO-MANY RELATIONSHIP 1: COURSE <-> VIDEOS (CourseVideos)
-- ============================================================================
IF OBJECT_ID('dbo.CourseVideos', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.CourseVideos (
        CourseId INT NOT NULL,
        VideoId INT NOT NULL,
        DisplayOrder INT NOT NULL DEFAULT 0,
        AssignedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT PK_CourseVideos PRIMARY KEY CLUSTERED (CourseId, VideoId),
        CONSTRAINT FK_CourseVideos_Courses FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id) ON DELETE CASCADE,
        CONSTRAINT FK_CourseVideos_VideoMaster FOREIGN KEY (VideoId) REFERENCES dbo.VideoMaster(Id) ON DELETE CASCADE
    );

    CREATE NONCLUSTERED INDEX IX_CourseVideos_CourseId ON dbo.CourseVideos(CourseId);
    CREATE NONCLUSTERED INDEX IX_CourseVideos_VideoId ON dbo.CourseVideos(VideoId);

    PRINT '✓ Table dbo.CourseVideos created (Many-to-Many).';
END
ELSE
BEGIN
    PRINT '• Table dbo.CourseVideos already exists.';
END
GO

-- ============================================================================
-- 6. MANY-TO-MANY RELATIONSHIP 2: COURSE <-> DOCUMENTS (CourseDocuments)
-- ============================================================================
IF OBJECT_ID('dbo.CourseDocuments', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.CourseDocuments (
        CourseId INT NOT NULL,
        DocumentId INT NOT NULL,
        DisplayOrder INT NOT NULL DEFAULT 0,
        AssignedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT PK_CourseDocuments PRIMARY KEY CLUSTERED (CourseId, DocumentId),
        CONSTRAINT FK_CourseDocuments_Courses FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id) ON DELETE CASCADE,
        CONSTRAINT FK_CourseDocuments_DocumentMaster FOREIGN KEY (DocumentId) REFERENCES dbo.DocumentMaster(Id) ON DELETE CASCADE
    );

    CREATE NONCLUSTERED INDEX IX_CourseDocuments_CourseId ON dbo.CourseDocuments(CourseId);
    CREATE NONCLUSTERED INDEX IX_CourseDocuments_DocumentId ON dbo.CourseDocuments(DocumentId);

    PRINT '✓ Table dbo.CourseDocuments created (Many-to-Many).';
END
ELSE
BEGIN
    PRINT '• Table dbo.CourseDocuments already exists.';
END
GO

-- ============================================================================
-- 7. MANY-TO-MANY RELATIONSHIP 3: COURSE <-> TEST SERIES (CourseTestSeries)
-- ============================================================================
IF OBJECT_ID('dbo.CourseTestSeries', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.CourseTestSeries (
        CourseId INT NOT NULL,
        TestSeriesId INT NOT NULL,
        DisplayOrder INT NOT NULL DEFAULT 0,
        AssignedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT PK_CourseTestSeries PRIMARY KEY CLUSTERED (CourseId, TestSeriesId),
        CONSTRAINT FK_CourseTestSeries_Courses FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id) ON DELETE CASCADE,
        CONSTRAINT FK_CourseTestSeries_TestSeriesMaster FOREIGN KEY (TestSeriesId) REFERENCES dbo.TestSeriesMaster(Id) ON DELETE CASCADE
    );

    CREATE NONCLUSTERED INDEX IX_CourseTestSeries_CourseId ON dbo.CourseTestSeries(CourseId);
    CREATE NONCLUSTERED INDEX IX_CourseTestSeries_TestSeriesId ON dbo.CourseTestSeries(TestSeriesId);

    PRINT '✓ Table dbo.CourseTestSeries created (Many-to-Many).';
END
ELSE
BEGIN
    PRINT '• Table dbo.CourseTestSeries already exists.';
END
GO

-- ============================================================================
-- 8. MANY-TO-MANY RELATIONSHIP 4: COURSE <-> LIVE SESSIONS (CourseLiveSessions)
-- ============================================================================
IF OBJECT_ID('dbo.CourseLiveSessions', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.CourseLiveSessions (
        CourseId INT NOT NULL,
        LiveSessionId INT NOT NULL,
        DisplayOrder INT NOT NULL DEFAULT 0,
        AssignedAtUtc DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT PK_CourseLiveSessions PRIMARY KEY CLUSTERED (CourseId, LiveSessionId),
        CONSTRAINT FK_CourseLiveSessions_Courses FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id) ON DELETE CASCADE,
        CONSTRAINT FK_CourseLiveSessions_LiveSessionMaster FOREIGN KEY (LiveSessionId) REFERENCES dbo.LiveSessionMaster(Id) ON DELETE CASCADE
    );

    CREATE NONCLUSTERED INDEX IX_CourseLiveSessions_CourseId ON dbo.CourseLiveSessions(CourseId);
    CREATE NONCLUSTERED INDEX IX_CourseLiveSessions_LiveSessionId ON dbo.CourseLiveSessions(LiveSessionId);

    PRINT '✓ Table dbo.CourseLiveSessions created (Many-to-Many).';
END
ELSE
BEGIN
    PRINT '• Table dbo.CourseLiveSessions already exists.';
END
GO

-- ============================================================================
-- 9. POPULATE INITIAL SEED DATA FOR MASTERS (IF EMPTY)
-- ============================================================================

-- VideoMaster Seeds
IF NOT EXISTS (SELECT 1 FROM dbo.VideoMaster)
BEGIN
    INSERT INTO dbo.VideoMaster (Title, VimeoVideoId, VideoUrl, Subject, Chapter, Description, DurationMinutes, IsFreePreview, Status, DisplayOrder)
    VALUES
    (N'Kinematics 1D & 2D Speed Hacks & Projectile Shortcuts', N'76979871', N'https://vimeo.com/76979871', N'Physics', N'Kinematics', N'Solve BITSAT & JEE projectile trajectory in 30 seconds.', 45, 1, N'Published', 1),
    (N'Newton''s Laws of Motion & Friction Constraint Hacks', N'76979871', N'https://vimeo.com/76979871', N'Physics', N'Laws of Motion', N'Pulley systems, pseudo-force tricks, and inclined block friction.', 50, 0, N'Published', 2),
    (N'Work, Energy, Power & Vertical Circular Motion', N'76979871', N'https://vimeo.com/76979871', N'Physics', N'Work, Energy and Power', N'Work-energy theorem shortcuts and tension equations at circle top & bottom.', 42, 0, N'Published', 3),
    (N'Torque, Moment of Inertia & Rolling Dynamics', N'76979871', N'https://vimeo.com/76979871', N'Physics', N'Rotational Motion', N'Instantaneous axis of rotation (IAOR) and pure rolling.', 55, 0, N'Published', 4),
    (N'Matrices & Determinants High-Speed Solving Blueprint', N'76979871', N'https://vimeo.com/76979871', N'Mathematics', N'Matrices & Determinants', N'Cramer''s rule consistency, adjoint properties, and eigenvalue shortcuts.', 52, 1, N'Published', 1),
    (N'Definite Integration & King''s Property Power Session', N'76979871', N'https://vimeo.com/76979871', N'Mathematics', N'Integration & Calculus', N'Solve definite integrals in under 30 seconds using symmetry.', 60, 0, N'Published', 2),
    (N'Chemical Bonding, VSEPR & Hybridization Mnemonics', N'76979871', N'https://vimeo.com/76979871', N'Chemistry', N'Chemical Bonding', N'Molecular orbital theory bond order hacks and dipole moment exceptions.', 46, 1, N'Published', 1);

    PRINT '✓ Seeded dbo.VideoMaster records.';
END
GO

-- DocumentMaster Seeds
IF NOT EXISTS (SELECT 1 FROM dbo.DocumentMaster)
BEGIN
    INSERT INTO dbo.DocumentMaster (Title, Subject, Chapter, FileType, FileUrl, FileSizeBytes, PageCount, Description, Status, DisplayOrder)
    VALUES
    (N'Kinematics & Dynamics Formula Cheatsheet & Short Tricks', N'Physics', N'Kinematics', N'PDF', N'/site/assets/docs/kinematics-shortcuts.pdf', N'2.4 MB', 12, N'High-speed solving formulas with solved BITSAT examples.', N'Published', 1),
    (N'Rotational Motion & Moment of Inertia Table PDF', N'Physics', N'Rotational Motion', N'PDF', N'/site/assets/docs/rotation-notes.pdf', N'1.8 MB', 9, N'Standard bodies radius of gyration, parallel/perpendicular axes theorems.', N'Published', 2),
    (N'Matrices, Determinants & System of Equations Handbook', N'Mathematics', N'Matrices & Determinants', N'PDF', N'/site/assets/docs/calculus-notes.pdf', N'2.1 MB', 11, N'Shortcuts for determinant expansions and inverse of matrices.', N'Published', 1),
    (N'Chemical Bonding & Periodic Trends High-Yield Summary', N'Chemistry', N'Chemical Bonding', N'PDF', N'/site/assets/docs/chemical-bonding.pdf', N'1.9 MB', 10, N'VSEPR geometry diagrams and magnetic character of diatomic molecules.', N'Published', 1);

    PRINT '✓ Seeded dbo.DocumentMaster records.';
END
GO

-- TestSeriesMaster Seeds
IF NOT EXISTS (SELECT 1 FROM dbo.TestSeriesMaster)
BEGIN
    INSERT INTO dbo.TestSeriesMaster (Title, ExamTag, TargetYear, Description, DurationMinutes, TotalQuestions, TotalMarks, Price, Status)
    VALUES
    (N'BITSAT 2026 Full-Length Mock Test 01 (Official CBT Simulator)', N'BITSAT', 2026, N'Full syllabus mock test matching official BITSAT pattern with 130 Qs + 12 Bonus questions.', 180, 130, 390.00, 499.00, N'Published'),
    (N'BITSAT 2026 Speed & Accuracy Diagnostic Test 02', N'BITSAT', 2026, N'Designed by BITSian toppers to diagnose speed bottlenecks under 180-minute countdown.', 180, 130, 390.00, 499.00, N'Published'),
    (N'JEE Main 2026 High-Yield Mock Exam 01', N'JEE Main', 2026, N'Physics, Chemistry, Maths 90 questions with 300 marks NTA compliant interface.', 180, 90, 300.00, 499.00, N'Published'),
    (N'COMEDK 2026 Speed Accelerator Test 01', N'COMEDK', 2026, N'180 questions in 180 minutes with no negative marking format.', 180, 180, 180.00, 399.00, N'Published');

    PRINT '✓ Seeded dbo.TestSeriesMaster records.';
END
GO

-- LiveSessionMaster Seeds
IF NOT EXISTS (SELECT 1 FROM dbo.LiveSessionMaster)
BEGIN
    INSERT INTO dbo.LiveSessionMaster (Title, Description, SessionDate, StartTime, EndTime, TimeZone, MeetingUrl, Subject, Chapter, FacultyName, Status)
    VALUES
    (N'BITSAT 350+ Speed Strategy & Bonus Questions Hacks Live', N'Interactive session with BITS Pilani alumni on unlocking the 12 bonus questions without negative mark traps.', '2026-10-25', '19:00:00', '20:30:00', N'IST (UTC+5:30)', N'https://meet.google.com/qba-10q-live', N'Strategy', N'Bonus Questions Hack', N'Ritesh Sharma (BITS Pilani)', N'Scheduled'),
    (N'Physics Mechanics Doubt Clearing & Rapid Problem Solving', N'Live interactive doubt solving for rotational motion and work-energy numericals.', '2026-10-27', '18:00:00', '19:30:00', N'IST (UTC+5:30)', N'https://meet.google.com/phy-10q-live', N'Physics', N'Rotational Motion', N'Dr. Vivek Agrawal (IIT Delhi)', N'Scheduled'),
    (N'Speed Mathematics: 30-Second Calculus Hacks', N'Solve definite integrals and differential equations with BITS Pilani shortcuts.', '2026-10-31', '20:00:00', '21:30:00', N'IST (UTC+5:30)', N'https://meet.google.com/mat-10q-live', N'Mathematics', N'Integration & Calculus', N'Ritesh Sharma (BITS Pilani)', N'Scheduled');

    PRINT '✓ Seeded dbo.LiveSessionMaster records.';
END
GO

-- Course Content Assignment Sample Seeds (demonstrating multiple-course reuse)
IF EXISTS (SELECT 1 FROM dbo.Courses WHERE Id = 1) AND NOT EXISTS (SELECT 1 FROM dbo.CourseVideos WHERE CourseId = 1)
BEGIN
    -- Assign Video 1 to Course 1 (BITSAT Crash Course)
    INSERT INTO dbo.CourseVideos (CourseId, VideoId, DisplayOrder) VALUES (1, 1, 1), (1, 2, 2), (1, 5, 3), (1, 6, 4);
    INSERT INTO dbo.CourseDocuments (CourseId, DocumentId, DisplayOrder) VALUES (1, 1, 1), (1, 3, 2), (1, 4, 3);
    INSERT INTO dbo.CourseTestSeries (CourseId, TestSeriesId, DisplayOrder) VALUES (1, 1, 1), (1, 2, 2);
    INSERT INTO dbo.CourseLiveSessions (CourseId, LiveSessionId, DisplayOrder) VALUES (1, 1, 1), (1, 2, 2);

    PRINT '✓ Seeded Course 1 content assignments.';
END
GO

PRINT '============================================================================';
PRINT '10Q Challenge Course Content Assignment Migration completed successfully.';
PRINT '============================================================================';
GO
