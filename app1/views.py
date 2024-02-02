from django.shortcuts import render
from app1.models import CustomUser,Expense
from app1.serializers import Userserializers,ExpenseSerializer,MyTokenObtainPairSerializer,AllExpenseSerializer
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework import generics, mixins, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
# Create your views here.

class UserregistrationView(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=Userserializers

    def get(self,request):
        return self.list(request)

    def post(self,request,*args,**kwargs):
        return self.create(request)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class Addexpense(mixins.ListModelMixin,mixins.CreateModelMixin,generics.GenericAPIView):

    serializer_class=ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(created_by=user)

    def get(self, request):
        return self.list(request)

    def post(self, request, *args, **kwargs):
        response = self.create(request)
        if response.status_code == status.HTTP_201_CREATED:
            return Response({'message': 'Expense added successfully'}, status=status.HTTP_201_CREATED)
        else:
            return response


class Editexpense(mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin,generics.GenericAPIView):
    queryset=Expense.objects.all()
    serializer_class=ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        return self.retrieve(request)
    def put(self,request,pk):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Return a success response with a confirmation message
        return Response({'message': 'Expense updated successfully'}, status=status.HTTP_200_OK)
        #return self.update(request)
    def delete(self,request,pk):
        return self.destroy(request)


class Allexpense(mixins.ListModelMixin,generics.GenericAPIView):
    queryset = Expense.objects.all()
    serializer_class=AllExpenseSerializer
    permission_classes = [IsAuthenticated,IsAdminUser]


    def get(self, request):
        return self.list(request)