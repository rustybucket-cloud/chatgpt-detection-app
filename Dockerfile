FROM python:3.11

WORKDIR /captstone-app

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY ./app ./app

COPY ./model ./app/model

CMD ["python3", "-m", "flask", "--app", "./app/app", "run", "--host=0.0.0.0"]