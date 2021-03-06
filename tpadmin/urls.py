from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from tpadmin.apps.board.views import UserViewset

from django.contrib.auth.decorators import login_required


@login_required
def main(request):
    from .data import data

    sample_data = data

    total = 0

    for wonjae in sample_data:
        print(sample_data)
        total += int(str(wonjae['기초금액']).replace(',', ''))

    return render(request, 'main.html', {
        'sample_data': data,
        'total': total,
    })


def gongo(request):
    return render(request, 'gongo.html')


def login_page(request):
    return render(request, 'login.html')


def project_list_page(request):
    from tpadmin.apps.board.models import Project

    project_list = Project.objects.all()

    budget_e = 0
    budget_a = 0
    budget_r = 0

    for project in project_list:
        budget_e += project.estimated_budget_sum()
        budget_a += project.actual_bugdet_sum()
        budget_r += project.remain_budget()

    return render(request, 'project-list.html', {
        'project_list': project_list,
        'budget_e': budget_e,
        'budget_a': budget_a,
        'budget_r': budget_r,
    })


router = DefaultRouter()
router.register(r'users', UserViewset)

urlpatterns = [
    path('api/', include(router.urls)),

    path('admin/', admin.site.urls),
    path('', main),
    path('gongo/', gongo),
    path('login/', login_page),

    path('project-list/', project_list_page),
]
