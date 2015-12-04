from rest_framework import serializers
from init.models import Property


class PropertySerializer(serializers.ModelSerializer):

    class Meta:
        model = Property
        fields = ('id', 'price', 'street', 'space', 'description', 'currency', 'created_at', 'updated', )
