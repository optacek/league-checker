import requests
from django.conf import settings

api_key = settings.API_KEY
headers = {
    "X-Riot-Token": api_key
}


def get_summoner_by_name(summoner_name, riot_id):
    url = f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{summoner_name}/{riot_id}"
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return None
    return response.json()


def get_top_mastery(puuid):
    url = f"https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}"
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return None
    return response.json()[:3]


def get_summoner(puuid):
    url = f"https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return None
    return response.json()


def get_champions():
    url = "https://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/champion.json"
    response = requests.get(url)
    return response.json()


def get_league(userid):
    url = f"https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userid}"
    response = requests.get(url, headers=headers).json()
    for q in response:
        if q['queueType'] == 'RANKED_SOLO_5x5':
            return q
    return None


def get_matches(puuid):
    url = f"https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&start=0&count=20"
    response = requests.get(url, headers=headers).json()
    return response


def get_wins(matches, puuid):
    result = []
    b = False
    for match in matches:
        url = f"https://europe.api.riotgames.com/lol/match/v5/matches/{match}"
        response = requests.get(url, headers=headers).json()
        for participant in response['info']['participants']:
            if participant['puuid'] == puuid:
                result.append(participant['win'])
    return result


