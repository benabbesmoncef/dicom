from django.contrib.auth import authenticate
# from django.contrib.auth.models import User
from .models import Subscriber
from django.contrib.auth.hashers import make_password
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers
from rest_framework.authtoken.models import Token


class BasicSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ("id", "email", "first_name", "last_name")


class PatientRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    # role_subscriber= serializers.CharField(write_only=True, default="ROLE_PATIENT")
    class Meta:
        model = Subscriber
        fields = ("id", "username", "email", "first_name", "last_name", "password", "confirm_password", "phone_number",
                  "birth_date", "role_subscriber")

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError("Those passwords don't match.")
        del attrs['confirm_password']
        attrs['password'] = make_password(attrs['password'])
        return attrs


class MedecinRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    # role_subscriber = serializers.CharField(write_only=True, default="ROLE_MEDECIN")
    class Meta:
        model = Subscriber
        fields = ("id", "username", "email", "first_name", "last_name", "password", "confirm_password", "phone_number",
                  "birth_date", "adresse_medecin", "spec_medecin", "role_subscriber")

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError("Those passwords don't match.")
        del attrs['confirm_password']
        attrs['password'] = make_password(attrs['password'])
        return attrs


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    default_error_messages = {
        'inactive_account': _('User account is disabled.'),
        'invalid_credentials': _('Unable to login with provided credentials.')
    }

    def __init__(self, *args, **kwargs):
        super(UserLoginSerializer, self).__init__(*args, **kwargs)
        self.user = None

    def validate(self, attrs):
        self.user = authenticate(username=attrs.get("username"), password=attrs.get('password'))
        if self.user:
            if not self.user.is_active:
                raise serializers.ValidationError(self.error_messages['inactive_account'])
            return attrs
        else:
            raise serializers.ValidationError(self.error_messages['invalid_credentials'])


class TokenSerializer(serializers.ModelSerializer):
    auth_token = serializers.CharField(source='key')
    user = serializers.CharField(source='user_id')

    # user_type = serializers.CharField(default='patient')

    class Meta:
        model = Token
        fields = ("auth_token",
                  "user",
                  "created")
