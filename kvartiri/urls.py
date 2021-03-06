
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),

    # Home view
    url(r"^$", TemplateView.as_view(
        template_name='home.html'
    ), name='home'),

    url(r'^', include('api.urls')),
]
