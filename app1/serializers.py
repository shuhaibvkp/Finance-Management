from rest_framework import serializers
from app1.models import Expense,CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # adding custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['is_superuser'] = user.is_superuser
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data["email"] = user.email
        data["username"] = user.username
        data['is_superuser'] = user.is_superuser
        return data

class Userserializers(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)

    class Meta:
        model=CustomUser
        fields=['email','username','password',]

    def create(self, validated_data):
        user=CustomUser.objects.create(username=validated_data['username'],email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Expense
        fields=['id','name','description','category','amount_spent','date_created',]

    def get(self,request):
        list = Expense.objects.filter(created_by=self.request.user)
        return list
    def create(self, validated_data):
        user = self.context['request'].user
        expense = Expense(created_by=user, **validated_data)
        expense.save()
        return expense

class AllExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Expense
        fields='__all__'