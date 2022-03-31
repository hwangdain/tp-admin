from django.contrib.auth.models import User
from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=100)

    start_date = models.DateField()
    end_date = models.DateField()

    client = models.CharField(max_length=100)

    uploaded_file = models.FileField(null=True, blank=True)

    def estimated_budget_sum(self):
        sum = 0
        for budget in self.estimated_bugdet.all():
            sum += budget.sum()
        return sum

    def actual_bugdet_sum(self):
        sum = 0
        for budget in self.actual_bugdet.all():
            sum += budget.sum()
        return sum

    def remain_budget(self):
        return self.estimated_budget_sum() - self.actual_bugdet_sum()


class EstimatedBudget(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='estimated_bugdet')

    type = models.CharField(max_length=40)

    company = models.CharField(max_length=100)

    description = models.CharField(max_length=200)

    period = models.CharField(max_length=10)
    quantity = models.IntegerField()
    price = models.IntegerField()

    def sum(self):
        return self.quantity * self.price


class ActualBudget(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='actual_bugdet')

    type = models.CharField(max_length=40)

    company = models.CharField(max_length=100)

    description = models.CharField(max_length=200)

    period = models.CharField(max_length=10)
    quantity = models.IntegerField()
    price = models.IntegerField()

    payment = models.BooleanField(default=False)
    tax = models.BooleanField(default=False)

    author = models.ForeignKey(User, on_delete=models.CASCADE)

    created_date = models.DateField()


    def sum(self):
        return self.quantity * self.price
