
from django.urls import path
from .views import CustomTokenObtainPairView, UserProfileView, summoner_info, set_csrf_token
from .utils import match_info, matches_test, delete_object
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('summoner/<str:summoner_name>/<str:riot_id>', summoner_info, name='summoner_info'),
    path('match/<str:match>', match_info, name='match_info'),
    path('test/<str:summoner_name>/<str:riot_id>', matches_test, name='matches_test'),
    path('objects/<str:name>', delete_object, name='delete_object'),
    path('set-csrf-token', set_csrf_token, name='set_csrf_token'),
]