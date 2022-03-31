from django.contrib import admin

from .models import Project, ActualBudget, EstimatedBudget

# Register your models here.

admin.site.register(Project)
admin.site.register(EstimatedBudget)
admin.site.register(ActualBudget)
