param(
    [Parameter(Mandatory=$false)]
    [string]$SshHost = $env:HOSTINGER_SSH_HOST,

    [Parameter(Mandatory=$false)]
    [string]$SshUser = $env:HOSTINGER_SSH_USER,

    [Parameter(Mandatory=$false)]
    [int]$SshPort = 65002,

    [Parameter(Mandatory=$false)]
    [string]$Domain = $env:HOSTINGER_DOMAIN,

    [Parameter(Mandatory=$false)]
    [switch]$SetupOnly
)

$ErrorActionPreference = "Stop"

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "   10Q Challenge - Hostinger SSH Git Push Utility     " -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

# Check if 'hostinger' git remote already exists
$existingRemote = git remote get-url hostinger 2>$null

if (-not $existingRemote) {
    if (-not $SshHost) { $SshHost = Read-Host "Enter Hostinger SSH IP / Host (e.g. 145.14.156.10)" }
    if (-not $SshUser) { $SshUser = Read-Host "Enter Hostinger SSH Username (e.g. u123456789)" }
    if (-not $Domain)  { $Domain  = Read-Host "Enter your Hostinger Domain (e.g. 10qchallenge.in)" }

    $remoteBareRepo = "/home/$SshUser/repos/10qchallenge.git"
    $targetWorkTree = "/home/$SshUser/domains/$Domain/public_html"
    $sshRemoteUrl   = "ssh://$SshUser@$SshHost`:$SshPort$remoteBareRepo"

    Write-Host "`n[1/3] Initializing bare Git repository & post-receive hook on Hostinger..." -ForegroundColor Yellow

    $remoteScript = @"
set -e
mkdir -p $remoteBareRepo
mkdir -p $targetWorkTree
cd $remoteBareRepo
if [ ! -f HEAD ]; then
    git init --bare
fi
git symbolic-ref HEAD refs/heads/main

cat > hooks/post-receive << 'EOF'
#!/usr/bin/env bash
set -e
TARGET="$targetWorkTree"
GIT_DIR="$remoteBareRepo"
BRANCH="main"

while read oldrev newrev ref
do
    if [[ \$ref = refs/heads/\$BRANCH ]]; then
        echo "🚀 Deploying \$BRANCH to \$TARGET on Hostinger..."
        git --work-tree=\$TARGET --git-dir=\$GIT_DIR checkout -f \$BRANCH
        cd \$TARGET
        echo "📦 Installing dependencies..."
        npm install --production=false
        echo "🔨 Building Next.js production bundle..."
        npm run build
        mkdir -p tmp
        touch tmp/restart.txt
        echo "✅ Hostinger deployment & Node.js restart triggered!"
    fi
done
EOF

chmod +x hooks/post-receive
echo "✅ Remote bare repo and post-receive hook configured at $remoteBareRepo"
"@

    ssh -p $SshPort "$SshUser@$SshHost" $remoteScript

    Write-Host "`n[2/3] Adding 'hostinger' Git remote locally..." -ForegroundColor Yellow
    git remote add hostinger $sshRemoteUrl
    Write-Host "✅ Added remote: hostinger -> $sshRemoteUrl" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Using existing 'hostinger' remote: $existingRemote" -ForegroundColor Green
}

if ($SetupOnly) {
    Write-Host "`n🎉 Hostinger remote setup complete! Run 'git push hostinger main' anytime to deploy." -ForegroundColor Green
    exit 0
}

Write-Host "`n[3/3] Pushing 'main' branch to Hostinger..." -ForegroundColor Yellow
git push hostinger main
Write-Host "`n🎉 Successfully pushed and deployed to Hostinger!" -ForegroundColor Green
