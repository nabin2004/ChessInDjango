from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'games', views.GameViewSet)
router.register(r'chats', views.ChatViewSet)
router.register(r'moves', views.MoveViewSet)
router.register(r'player_stats', views.PlayerStatsViewSet)

urlpatterns = router.urls
