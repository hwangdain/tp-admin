import json

from django.contrib import auth
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action

from .models import Project, EstimatedBudget, ActualBudget
from .serializers import UserSerializer

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def login(self, request, *ars, **kwargs):
        request_data = ((request.body).decode('utf-8'))
        params = json.loads(request_data)

        email_response = JsonResponse({
            'type': 'email', 'message': 'Login failed. (invalid email)'
        }, status=status.HTTP_400_BAD_REQUEST)
        password_response = JsonResponse({
            'type': 'password', 'message': 'Login failed. (invalid password)'
        }, status=status.HTTP_400_BAD_REQUEST)

        if 'email' not in params or not params['email']:
            return email_response
        if 'password' not in params or not params['password']:
            return password_response

        users = User.objects.filter(email=params['email'])
        if not users:
            users = User.objects.filter(username=params['email'])
        if not users:
            return email_response
        auth.login(request, users[0])

        return JsonResponse({'message': 'Login Success'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def logout(self, request, *ars, **kwargs):
        auth.logout(request)
        return JsonResponse({'message': 'Successfully logout'}, status=status.HTTP_200_OK)
