from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_list_or_404
## auth imports
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def login(request):
    serializer = UserSerializer(data=request.data['data'])
    print(request.data['data']['password'])
    user = get_list_or_404(User, username=request.data['data']['username'])
    if not user.check_password(request.data['data']['password']):
        return Response({'error': 'Something is not right, check that login info agian please.'}, status=status.HTTP_404_NOT_FOUND)
    token = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({'token': token.key, 'user': serializer.data})

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        # sets users' password as a hash password
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response({})


@api_view(['GET'])
#check token and session id
@authentication_classes([SessionAuthentication, TokenAuthentication])
# checks if the user is auth
@permission_classes([IsAuthenticated])
def testEx(request):
    # if checks are passed the user data will show in under request as an object ie request.user
    return Response(f"passed!${request.user}")

