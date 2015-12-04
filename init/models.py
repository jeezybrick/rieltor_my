from django.db import models
from core.models import TimeStampedModel

# Create your models here.


class Property(TimeStampedModel):
    price = models.PositiveIntegerField()
    street = models.CharField(max_length=100)
    space = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    currency = models.CharField(max_length=20)

    def __unicode__(self):
        return self.price
