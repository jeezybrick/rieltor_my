from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.http import Http404

from rest_framework import generics, status, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response

from init.models import Property
from api import serializers, utils


# Standard Pagination class
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 1


# List of orders
class PropertyList(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        queryset = utils.sort_property(request.GET)
        serializer = serializers.PropertySerializer(queryset, many=True)
        return Response(serializer.data)
