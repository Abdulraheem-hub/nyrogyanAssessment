# Healthcare API Demo Script for Windows PowerShell

Write-Host "🩺 Healthcare API Demo Script" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green

# API Base URL
$API_URL = "http://localhost:5000"

Write-Host ""
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/health" -Method Get
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "2. Getting all doctors..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/api/doctors" -Method Get
    Write-Host "Found $($response.count) doctors"
    $response.data[0..1] | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Failed to get doctors: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "3. Getting specialties..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/api/doctors/specialties" -Method Get
    $response.data | ConvertTo-Json
} catch {
    Write-Host "❌ Failed to get specialties: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "4. Searching for cardiologists..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/api/doctors?specialty=Cardiologist" -Method Get
    Write-Host "Found $($response.count) cardiologists"
    $response.data | ConvertTo-Json -Depth 2
} catch {
    Write-Host "❌ Failed to search cardiologists: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "5. Searching for available doctors..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/api/doctors?availability=Available" -Method Get
    Write-Host "Found $($response.count) available doctors"
} catch {
    Write-Host "❌ Failed to search available doctors: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "6. Searching by name 'sarah'..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$API_URL/api/doctors?search=sarah" -Method Get
    if ($response.count -gt 0) {
        $response.data | Select-Object name, specialty, availability | ConvertTo-Json
    } else {
        Write-Host "No doctors found with name 'sarah'"
    }
} catch {
    Write-Host "❌ Failed to search by name: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "✅ Demo completed! Check the results above." -ForegroundColor Green
Write-Host "📍 Frontend: http://localhost:5175" -ForegroundColor Cyan
Write-Host "🔧 Backend:  http://localhost:5000" -ForegroundColor Cyan
