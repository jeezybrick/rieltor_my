
from django.conf.urls import url
from api import views


urlpatterns = [
    url(r'^api/property/$', views.PropertyList.as_view(), name='property_list_api'),

]
