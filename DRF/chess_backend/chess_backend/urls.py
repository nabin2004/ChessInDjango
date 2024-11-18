
from django.contrib import admin
from django.urls import path, include
<<<<<<< HEAD
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
=======
from django.contrib.auth.views import LogoutView
>>>>>>> ca6e09ce353d964e02a5666b7370d4ecb1743012

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('game.urls')),  
<<<<<<< HEAD
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
=======
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("auth/logout/", LogoutView.as_view()),
    path("auth/logout/", LogoutView.as_view()),
>>>>>>> ca6e09ce353d964e02a5666b7370d4ecb1743012
]
