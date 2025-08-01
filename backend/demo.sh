#!/bin/bash

echo "🩺 Healthcare API Demo Script"
echo "=============================="

# API Base URL
API_URL="http://localhost:5000"

echo ""
echo "1. Testing Health Check..."
curl -s "$API_URL/health" | jq '.'

echo ""
echo "2. Getting all doctors..."
curl -s "$API_URL/api/doctors" | jq '.data[0:2]'

echo ""
echo "3. Getting specialties..."
curl -s "$API_URL/api/doctors/specialties" | jq '.'

echo ""
echo "4. Searching for cardiologists..."
curl -s "$API_URL/api/doctors?specialty=Cardiologist" | jq '.data'

echo ""
echo "5. Searching for available doctors..."
curl -s "$API_URL/api/doctors?availability=Available" | jq '.count'

echo ""
echo "6. Searching by name..."
curl -s "$API_URL/api/doctors?search=sarah" | jq '.data'

echo ""
echo "✅ Demo completed! Check the results above."
echo "📍 Frontend: http://localhost:5175"
echo "🔧 Backend:  http://localhost:5000"
