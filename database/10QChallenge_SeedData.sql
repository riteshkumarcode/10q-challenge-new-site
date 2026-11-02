-- ============================================================================
-- 10Q CHALLENGE EDUTECH PLATFORM — FRESH INITIAL SEED SCRIPT
-- Target: Microsoft SQL Server 2022 / Azure SQL
-- Clean fresh state: Only essential Roles and Master Admin account are seeded.
-- ============================================================================

USE [10QChallengeDB];
GO

-- 1. SEED ROLES
SET IDENTITY_INSERT dbo.Roles ON;
INSERT INTO dbo.Roles (RoleId, RoleName) VALUES
(1, 'Admin'),
(2, 'Student'),
(3, 'Faculty');
SET IDENTITY_INSERT dbo.Roles OFF;
GO

-- 2. SEED MASTER ADMIN USER
SET IDENTITY_INSERT dbo.Users ON;
INSERT INTO dbo.Users (UserId, FullName, Email, MobileNumber, PasswordHash, RoleId, TargetExam, IsEmailVerified)
VALUES
(1, 'Harshal Jain', 'admin@10qchallenge.in', '+919999999999', '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW', 1, NULL, 1);
SET IDENTITY_INSERT dbo.Users OFF;
GO

PRINT '10Q Challenge Fresh Seed Script Completed Successfully (No Dummy Courses or Data).';
GO
