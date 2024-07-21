from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializer
from rest_framework import generics
from django.contrib.auth import get_user_model

from django.shortcuts import render
from .utils import get_summoner_by_name, get_top_mastery, get_summoner, get_league, get_matches, get_wins
from django.http import JsonResponse

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user


def summoner_info(request, summoner_name, riot_id):
    summoner_data = get_summoner_by_name(summoner_name, riot_id)
    # If summoner not found
    if summoner_data is None:
        return JsonResponse({'error': 'Summoner not found'})
    puuid = summoner_data.get('puuid')
    summoner = get_summoner(puuid)
    mastery = get_top_mastery(puuid)
    league = get_league(summoner['id'])
    matches = get_matches(puuid)
    matches = get_wins(matches, puuid)
    if mastery is None or summoner is None:
        return JsonResponse({'error': 'Error getting summoner info'})
    result = {
        'summonerName': summoner_name,
        'league': league,
        'summoner': summoner,
        'mastery': mastery,
        'matches': matches
    }

    return JsonResponse(result)

