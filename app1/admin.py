from django.contrib import admin

# Register your models here.
from app1.models import Expense,CustomUser

admin.site.register(Expense)
admin.site.register(CustomUser)