from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
    def to_representation(self, data):
        data = super(UserSerializer, self).to_representation(data)
        data['available_teams'] = []
        # print(data.get('groups'))
        data.get('available_teams').append('pr2w')
        data.get('available_teams').append('snaake')
        return data
