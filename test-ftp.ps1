# Test FTP Connection ke Hostinger
# Script untuk test kredensial FTP

$FTP_SERVER = "145.79.14.179"
$FTP_USERNAME = "u239743347.caaip.id"  # Format dari hPanel
$FTP_PASSWORD = "Caaip1`$`$"  # Escape $ dengan backtick

Write-Host "Testing FTP Connection..." -ForegroundColor Cyan
Write-Host "Server: $FTP_SERVER" -ForegroundColor White
Write-Host "Username: $FTP_USERNAME" -ForegroundColor White
Write-Host ""

try {
    $uri = "ftp://$FTP_SERVER/"  # Test root folder dulu
    $ftpRequest = [System.Net.FtpWebRequest]::Create($uri)
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($FTP_USERNAME, $FTP_PASSWORD)
    $ftpRequest.KeepAlive = $false
    
    Write-Host "Connecting..." -ForegroundColor Yellow
    $response = $ftpRequest.GetResponse()
    
    Write-Host "[SUCCESS] Koneksi berhasil!" -ForegroundColor Green
    Write-Host "Status: $($response.StatusDescription)" -ForegroundColor Green
    
    $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
    $files = $reader.ReadToEnd()
    $reader.Close()
    $response.Close()
    
    Write-Host ""
    Write-Host "Isi folder /public_html/:" -ForegroundColor Cyan
    Write-Host $files -ForegroundColor White
    
} catch {
    Write-Host "[ERROR] Koneksi gagal!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Kemungkinan masalah:" -ForegroundColor Yellow
    Write-Host "1. Username salah (coba: u239743347 atau u239743347.caaip.id)" -ForegroundColor White
    Write-Host "2. Password salah (cek di hPanel FTP Accounts)" -ForegroundColor White
    Write-Host "3. Server/IP salah (cek di hPanel)" -ForegroundColor White
    Write-Host "4. Port FTP diblokir firewall" -ForegroundColor White
}

Write-Host ""
Write-Host "Coba variasi credentials:" -ForegroundColor Cyan
Write-Host ""

# Test variasi 1: dengan @ domain
Write-Host "Test 1: Username dengan @caaip.id..." -ForegroundColor Yellow
$TEST_USER1 = "u239743347@caaip.id"
try {
    $uri = "ftp://$FTP_SERVER/public_html/"
    $ftpRequest = [System.Net.FtpWebRequest]::Create($uri)
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($TEST_USER1, $FTP_PASSWORD)
    $ftpRequest.Timeout = 5000
    $response = $ftpRequest.GetResponse()
    Write-Host "[OK] Berhasil dengan: $TEST_USER1" -ForegroundColor Green
    $response.Close()
} catch {
    Write-Host "[FAIL] Gagal dengan: $TEST_USER1" -ForegroundColor Red
}

# Test variasi 2: tanpa domain
Write-Host "Test 2: Username tanpa domain..." -ForegroundColor Yellow
$TEST_USER2 = "u239743347"
try {
    $uri = "ftp://$FTP_SERVER/public_html/"
    $ftpRequest = [System.Net.FtpWebRequest]::Create($uri)
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($TEST_USER2, $FTP_PASSWORD)
    $ftpRequest.Timeout = 5000
    $response = $ftpRequest.GetResponse()
    Write-Host "[OK] Berhasil dengan: $TEST_USER2" -ForegroundColor Green
    $response.Close()
} catch {
    Write-Host "[FAIL] Gagal dengan: $TEST_USER2" -ForegroundColor Red
}

Write-Host ""
