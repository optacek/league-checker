import requests
from django.conf import settings
from django.http import JsonResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Summoner

api_key = settings.API_KEY
headers = {
    "X-Riot-Token": api_key
}


def get_summoner_by_name(summoner_name, riot_id):
    url = f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{summoner_name}/{riot_id}"
    response = requests.get(url, headers=headers)
    print("RESPONSE CODE: ", response.status_code)
    if response.status_code != 200:
        return None
    return response.json()


def get_top_mastery(puuid):
    url = f"https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}"
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return None

    array = []

    for champ in response.json()[:3]:
        array.append(get_champ_by_name(champ['championId']))

    return array


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


#

def get_wins(matches, puuid):
    result = []
    b = False
    for match in matches:
        url = f"https://europe.api.riotgames.com/lol/match/v5/matches/{match}"
        response = requests.get(url, headers=headers).json()
        if 'info' not in response.keys():
            return None
        for participant in response['info']['participants']:
            if participant['puuid'] == puuid:
                result.append(participant['win'])
    return result


def get_champ_by_name(id):
    champs = {
        266: 'Aatrox',
        103: 'Ahri',
        84: 'Akali',
        166: 'Akshan',
        12: 'Alistar',
        32: 'Amumu',
        34: 'Anivia',
        1: 'Annie',
        523: 'Aphelios',
        22: 'Ashe',
        136: 'AurelionSol',
        893: 'Aurora',
        268: 'Azir',
        432: 'Bard',
        200: 'Belveth',
        53: 'Blitzcrank',
        63: 'Brand',
        201: 'Braum',
        233: 'Briar',
        51: 'Caitlyn',
        164: 'Camille',
        69: 'Cassiopeia',
        31: 'Chogath',
        42: 'Corki',
        122: 'Darius',
        131: 'Diana',
        119: 'Draven',
        36: 'DrMundo',
        245: 'Ekko',
        60: 'Elise',
        28: 'Evelynn',
        81: 'Ezreal',
        9: 'Fiddlesticks',
        114: 'Fiora',
        105: 'Fizz',
        3: 'Galio',
        41: 'Gangplank',
        86: 'Garen',
        150: 'Gnar',
        79: 'Gragas',
        104: 'Graves',
        887: 'Gwen',
        120: 'Hecarim',
        74: 'Heimerdinger',
        910: 'Hwei',
        420: 'Illaoi',
        39: 'Irelia',
        427: 'Ivern',
        40: 'Janna',
        59: 'JarvanIV',
        24: 'Jax',
        126: 'Jayce',
        202: 'Jhin',
        222: 'Jinx',
        145: 'Kaisa',
        429: 'Kalista',
        43: 'Karma',
        30: 'Karthus',
        38: 'Kassadin',
        55: 'Katarina',
        10: 'Kayle',
        141: 'Kayn',
        85: 'Kennen',
        121: 'Khazix',
        203: 'Kindred',
        240: 'Kled',
        96: 'KogMaw',
        897: 'KSante',
        7: 'Leblanc',
        64: 'LeeSin',
        89: 'Leona',
        876: 'Lillia',
        127: 'Lissandra',
        236: 'Lucian',
        117: 'Lulu',
        99: 'Lux',
        54: 'Malphite',
        90: 'Malzahar',
        57: 'Maokai',
        11: 'MasterYi',
        902: 'Milio',
        21: 'MissFortune',
        62: 'MonkeyKing',
        82: 'Mordekaiser',
        25: 'Morgana',
        950: 'Naafiri',
        267: 'Nami',
        75: 'Nasus',
        111: 'Nautilus',
        518: 'Neeko',
        76: 'Nidalee',
        895: 'Nilah',
        56: 'Nocturne',
        20: 'Nunu',
        2: 'Olaf',
        61: 'Orianna',
        516: 'Ornn',
        80: 'Pantheon',
        78: 'Poppy',
        555: 'Pyke',
        246: 'Qiyana',
        133: 'Quinn',
        497: 'Rakan',
        33: 'Rammus',
        421: 'RekSai',
        526: 'Rell',
        888: 'Renata',
        58: 'Renekton',
        107: 'Rengar',
        92: 'Riven',
        68: 'Rumble',
        13: 'Ryze',
        360: 'Samira',
        113: 'Sejuani',
        235: 'Senna',
        147: 'Seraphine',
        875: 'Sett',
        35: 'Shaco',
        98: 'Shen',
        102: 'Shyvana',
        27: 'Singed',
        14: 'Sion',
        15: 'Sivir',
        72: 'Skarner',
        901: 'Smolder',
        37: 'Sona',
        16: 'Soraka',
        50: 'Swain',
        517: 'Sylas',
        134: 'Syndra',
        223: 'TahmKench',
        163: 'Taliyah',
        91: 'Talon',
        44: 'Taric',
        17: 'Teemo',
        412: 'Thresh',
        18: 'Tristana',
        48: 'Trundle',
        23: 'Tryndamere',
        4: 'TwistedFate',
        29: 'Twitch',
        77: 'Udyr',
        6: 'Urgot',
        110: 'Varus',
        67: 'Vayne',
        45: 'Veigar',
        161: 'Velkoz',
        711: 'Vex',
        254: 'Vi',
        234: 'Viego',
        112: 'Viktor',
        8: 'Vladimir',
        106: 'Volibear',
        19: 'Warwick',
        498: 'Xayah',
        101: 'Xerath',
        5: 'XinZhao',
        157: 'Yasuo',
        777: 'Yone',
        83: 'Yorick',
        350: 'Yuumi',
        154: 'Zac',
        238: 'Zed',
        221: 'Zeri',
        115: 'Ziggs',
        26: 'Zilean',
        142: 'Zoe',
        143: 'Zyra',
    }
    return champs[id]


def serialize_summoner(summoner):
    response = {
        "summonerName": summoner.name,
        "league": summoner.league,
        "summoner": summoner.summoner,
        "mastery": summoner.mastery,
        "matches": summoner.matches,
        "matches_details": summoner.matches_details
    }
    return JsonResponse(response)


def create_summoner(dict, summoner):
    result = Summoner()
    for item in dict.keys():
        if not dict[item]:
            if item == 'league':
                result.league = {}
            if item == 'mastery':
                result.mastery = []
            if item == 'matches':
                result.matches = []
            if item == 'matches_details':
                result.matches_details = []

    summoner.save()


def match_info(request, match):
    url = f"https://europe.api.riotgames.com/lol/match/v5/matches/{match}"
    response = requests.get(url, headers=headers).json()
    for participant in response['info']['participants']:
        print(participant['championName'], participant['role'], participant['individualPosition'])
    return JsonResponse(response)


def matches_test(request, summoner_name, riot_id):
    url = f"https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{summoner_name}/{riot_id}"
    puuid = requests.get(url, headers=headers).json().get('puuid')
    matches = get_matches(puuid)
    return parse_matches(matches)


def parse_role(position, role):
    if role == 'CARRY':
        return 'BOTTOM'
    if role == 'NONE':
        pass


def parse_matches(matches):
    result = []  # This is array of Match objects
    # Iterate through all matches and return their details
    for match in matches:
        url = f"https://europe.api.riotgames.com/lol/match/v5/matches/{match}"
        response = requests.get(url, headers=headers).json()
        # new_match = Match()
        blue = {}
        red = {}
        for participant in response['info']['participants']:
            # Add to blue
            if participant['teamId'] == 100:
                target = blue
            else:
                target = red
            position = participant['teamPosition']
            # position = participant['individualPosition'] if participant[
            #                                                  'individualPosition'] != 'UTILITY' else 'SUPPORT'
            # In the match the structure is  match = { blue: {top: { champ : puuid}...}, red ...}
            target[position] = {participant['championName']: participant['puuid']}
        result.append({'blue': blue, 'red': red})
    return result


@csrf_exempt
@require_http_methods(['DELETE'])
def delete_object(request, name):
    try:
        obj = Summoner.objects.get(name=name)
        obj.delete()
        return JsonResponse({'message': 'Success'})
    except Summoner.DoesNotExist:
        return HttpResponseNotFound({'error': 'Something went wrong, try again'})
