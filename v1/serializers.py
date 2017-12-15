from rest_framework import serializers
from v1.models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields ='id', 'name', 'phone', 'email', 'address'