from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from django.core import serializers

def get_random_questions(*args, **kwargs):
    res = {'status' : 'error', 'message' : 'unknown error'}
    try:
        questions = Question.objects.all()[:10]
        questions_list = []
        for question in questions:
            question_dict = {
                'question' : question.question,
                'responses': list(question.responses.all().values('id', 'response', 'correct'))
            }
            questions_list.append(question_dict)
        res['questions'] = questions_list
        res['status'] = 'success'
        del res['message'] 
    except Exception as e:
        print(e)
    return JsonResponse(res)

