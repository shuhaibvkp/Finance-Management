from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)

        try:
            user.validate_unique()
        except ValidationError as e:
            raise ValidationError({'error': 'Username or email already exists.'}) from e

        user.save(using=self._db)
        return user


    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username



class Expense(models.Model):
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name=models.CharField(max_length=140)
    description=models.TextField(blank=True)
    amount_spent = models.DecimalField(max_digits=10, decimal_places=2)
    date_created=models.DateField()
    EXPENSE_CATEGORIES = [
        ('Health', 'Health'),
        ('Electronics', 'Electronics'),
        ('Travel', 'Travel'),
        ('Education', 'Education'),
        ('Books', 'Books'),
        ('Other', 'Other'),
    ]
    category = models.CharField(max_length=20, choices=EXPENSE_CATEGORIES, help_text="Category of expense")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name