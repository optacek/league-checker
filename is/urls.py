
from django.urls import path
from .views import CustomTokenObtainPairView, UserProfileView, summoner_info
from .utils import match_info, matches_test
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('summoner/<str:summoner_name>/<str:riot_id>', summoner_info, name='summoner_info'),
    path('match/<str:match>', match_info, name='match_info'),
    path('test/<str:summoner_name>/<str:riot_id>', matches_test, name='matches_test')
]