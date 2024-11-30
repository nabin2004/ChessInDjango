from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('game.urls')),  # Game-specific URLs

    # JWT token routes for obtaining and refreshing tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Djoser authentication URLs (registration, login, etc.)
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),

    # Logout URL
    path("auth/logout/", LogoutView.as_view(), name="logout"),
]
