from django.shortcuts import render


def index(request):
    return render(request, 'dj_widgets/index.html', {})
