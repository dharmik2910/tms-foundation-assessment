from django.http import JsonResponse

def health_check(request):
    return JsonResponse({
        "status": "healthy",
        "message": "TMS API is running"
    })

def programs(request):
    return JsonResponse({
        "programs": [
            {
                "id": 1,
                "title": "Youth Leadership Program",
                "description": "Leadership development initiative"
            },
            {
                "id": 2,
                "title": "Education Support Program",
                "description": "Scholarship and mentoring support"
            },
            {
                "id": 3,
                "title": "Skill Development",
                "description": "Training and career readiness program"
            }
        ]
    })