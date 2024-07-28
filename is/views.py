from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializer
from rest_framework import generics
from django.contrib.auth import get_user_model

from django.shortcuts import render
from .utils import *
from django.http import JsonResponse
from .models import Summoner

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user


def set_csrf_token(request):
    return JsonResponse({'detail': 'CSRF Cookie set'})


def summoner_info(request, summoner_name, riot_id):
    summoner = Summoner.objects.filter(name=summoner_name)
    # If summoner was already visited, return his info from db
    if summoner:
        return serialize_summoner(summoner.get())
    print("Going to request to API")
    summoner_data = get_summoner_by_name(summoner_name, riot_id)
    # If summoner not found
    if summoner_data is None:
        return JsonResponse({'error': 'Summoner not found'})
    puuid = summoner_data.get('puuid')
    summoner = get_summoner(puuid)
    mastery = get_top_mastery(puuid)
    league = get_league(summoner['id'])
    matches = get_matches(puuid)
    matches_bools = get_wins(matches, puuid)

    matches = parse_matches(matches)
    if summoner is None:
        return JsonResponse({'error': 'Error getting summoner info'})
    result = {
        'summonerName': summoner_name,
        'league': league,
        'summoner': summoner,
        'mastery': mastery,
        'matches': matches_bools,
        'matches_details': matches
    }
    # Now create the summoner as well
    new_summoner = Summoner(
        name=summoner_name,
        league=league,
        summoner=summoner,
        mastery=mastery,
        matches=matches_bools,
        matches_details=matches,
    )
    create_summoner(result, new_summoner)
    return JsonResponse(result)
