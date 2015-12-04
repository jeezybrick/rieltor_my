# -*- coding: utf-8 -*-
from django.db.models import Q
from init.models import Property


def sort_property(request):
    q_list = []
    if request:
        for k, v in request.lists():
            q_list.append(Q(k=v))
            print(k, v)

        return Property.objects.all()
    return Property.objects.all()
