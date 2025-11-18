# Script Upload Manual ke Hostinger via FTP
# Ganti nilai dibawah dengan info FTP Anda

$FTP_SERVER = "145.79.14.179"  # FTP IP dari hPanel
$FTP_USERNAME = "u239743347.caaip.id"   # FTP username dari hPanel
$FTP_PASSWORD = "Caaip1`$`$"   # Escape $ dengan backtick
$REMOTE_DIR = ""      # Root directory (public_html akan dibuat otomatis)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Upload CAAIP ke Hostinger via FTP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Cek folder dist
if (-not (Test-Path "dist")) {
    Write-Host "[ERROR] Folder dist tidak ada!" -ForegroundColor Red
    Write-Host "   Jalankan: npm run build" -ForegroundColor Yellow
    exit 1
}

Write-Host "[OK] Folder dist ditemukan" -ForegroundColor Green
Write-Host "Menghitung file..." -ForegroundColor Yellow

$fileCount = (Get-ChildItem -Path "dist" -Recurse -File | Measure-Object).Count
Write-Host "   Total file: $fileCount" -ForegroundColor White
Write-Host ""

Write-Host "Mulai upload ke:" -ForegroundColor Cyan
Write-Host "   Server: $FTP_SERVER" -ForegroundColor White
Write-Host "   User: $FTP_USERNAME" -ForegroundColor White
Write-Host "   Remote: / (root FTP directory)" -ForegroundColor White
Write-Host ""

# Fungsi upload FTP
function Upload-FTP {
    param(
        [string]$LocalPath,
        [string]$RemotePath,
        [string]$Server,
        [string]$Username,
        [string]$Password
    )
    
    try {
        $uri = "ftp://$Server$RemotePath"
        $ftpRequest = [System.Net.FtpWebRequest]::Create($uri)
        $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($Username, $Password)
        $ftpRequest.UseBinary = $true
        $ftpRequest.KeepAlive = $false
        
        $fileContent = [System.IO.File]::ReadAllBytes($LocalPath)
        $ftpRequest.ContentLength = $fileContent.Length
        
        $requestStream = $ftpRequest.GetRequestStream()
        $requestStream.Write($fileContent, 0, $fileContent.Length)
        $requestStream.Close()
        
        $response = $ftpRequest.GetResponse()
        $response.Close()
        
        return $true
    }
    catch {
        Write-Host "   [ERROR]: $_" -ForegroundColor Red
        return $false
    }
}

# Fungsi buat folder FTP
function Create-FTPDirectory {
    param(
        [string]$RemotePath,
        [string]$Server,
        [string]$Username,
        [string]$Password
    )
    
    try {
        $uri = "ftp://$Server$RemotePath"
        $ftpRequest = [System.Net.FtpWebRequest]::Create($uri)
        $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($Username, $Password)
        $ftpRequest.KeepAlive = $false
        
        $response = $ftpRequest.GetResponse()
        $response.Close()
        return $true
    }
    catch {
        # Folder mungkin sudah ada, skip error
        return $false
    }
}

# Upload semua file
$uploadedCount = 0
$errorCount = 0

Get-ChildItem -Path "dist" -Recurse -File | ForEach-Object {
    $localFile = $_.FullName
    $relativePath = $_.FullName.Substring((Resolve-Path "dist").Path.Length)
    $relativePath = $relativePath.Replace("\", "/")
    $remoteFile = $relativePath  # Langsung tanpa prefix, upload ke root FTP
    
    # Buat folder jika perlu
    $remoteFolder = [System.IO.Path]::GetDirectoryName($remoteFile).Replace("\", "/")
    if ($remoteFolder -and $remoteFolder -ne ".") {
        Create-FTPDirectory -RemotePath $remoteFolder -Server $FTP_SERVER -Username $FTP_USERNAME -Password $FTP_PASSWORD | Out-Null
    }
    
    # Upload file
    Write-Host ">> Uploading: $relativePath" -ForegroundColor Gray
    
    if (Upload-FTP -LocalPath $localFile -RemotePath $remoteFile -Server $FTP_SERVER -Username $FTP_USERNAME -Password $FTP_PASSWORD) {
        $uploadedCount++
    } else {
        $errorCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Upload Selesai!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[OK] Berhasil: $uploadedCount file" -ForegroundColor Green
if ($errorCount -gt 0) {
    Write-Host "[ERROR] Gagal: $errorCount file" -ForegroundColor Red
}
Write-Host ""
Write-Host "Cek website: https://caaip.co.id" -ForegroundColor Cyan
Write-Host ""
