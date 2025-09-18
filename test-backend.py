#!/usr/bin/env python3
"""
Simple test script to verify the AsanaSense backend is working
"""

import requests
import json

def test_backend():
    base_url = "http://localhost:8000"
    
    print("🧘 Testing AsanaSense Backend...")
    print("=" * 50)
    
    # Test 1: Health check
    print("1. Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/")
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Make sure it's running on port 8000")
        print("   Run: ./start-backend.sh")
        return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False
    
    # Test 2: API docs
    print("\n2. Testing API documentation...")
    try:
        response = requests.get(f"{base_url}/docs")
        if response.status_code == 200:
            print("✅ API docs accessible")
            print(f"   Visit: {base_url}/docs")
        else:
            print(f"❌ API docs failed: {response.status_code}")
    except Exception as e:
        print(f"❌ API docs error: {e}")
    
    # Test 3: Health endpoint
    print("\n3. Testing detailed health endpoint...")
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✅ Detailed health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Detailed health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Detailed health check error: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 Backend tests completed!")
    print("\nNext steps:")
    print("1. Add your GOOGLE_API_KEY to asana-sense/backend/.env")
    print("2. Start the frontend: ./start-frontend.sh")
    print("3. Open http://localhost:3000 in your browser")
    
    return True

if __name__ == "__main__":
    test_backend()
