from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    # path('', admin.site.urls),
    path('api/v1/', include('v1.urls')),
    path('', TemplateView.as_view(template_name='contact/index.html')),
]
