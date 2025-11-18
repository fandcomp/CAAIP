# Test struktur folder FTP Hostinger

$FTP_SERVER = "145.79.14.179"
$FTP_USERNAME = "u239743347.caaip.id"
$FTP_PASSWORD = "Caaip1`$`$"

Write-Host "Testing FTP Directory Structure..." -ForegroundColor Cyan
Write-Host ""

# Test beberapa path
$testPaths = @(
    "/",
    "/public_html",
    "/domains/caaip.id/public_html",
    "/home/u239743347/public_html"
)

foreach ($path in $testPaths) {
    Write-Host "Testing path: $path" -ForegroundColor Yellow
    
    try {
        $uri = "ftp://$FTP_SERVER$path"
        $ftpRequest = [System.Net.FtpWebRequest]::Create($uri)
        $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
        $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($FTP_USERNAME, $FTP_PASSWORD)
        $ftpRequest.KeepAlive = $false
        
        $response = $ftpRequest.GetResponse()
        $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
        $files = $reader.ReadToEnd()
        $reader.Close()
        $response.Close()
        
        Write-Host "[OK] Path exists!" -ForegroundColor Green
        Write-Host "Contents:" -ForegroundColor White
        Write-Host $files
        Write-Host ""
        
    } catch {
        Write-Host "[FAIL] Path not accessible" -ForegroundColor Red
        Write-Host ""
    }
}
