from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils.text import slugify


class Usser(AbstractUser):
    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    slug = models.SlugField(unique=True)
    avatar = models.ImageField(_("avatar"), blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.username, allow_unicode=True)
        super().save(*args, **kwargs)

    class Meta:
        app_label = "accounts"

    def __str__(self):
        return self.username
