from django.db import models


class Question(models.Model):
    question = models.CharField(max_length = 250)
    responses = models.ManyToManyField('Response', blank = True)
    
    def __str__(self) -> str:
        return self.question

class Response(models.Model):
    response = models.CharField(max_length = 250)
    correct = models.BooleanField(default = False)
    
    def __str__(self) -> str:
        return self.response

    