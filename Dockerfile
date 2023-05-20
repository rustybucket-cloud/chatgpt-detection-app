FROM python:3.11

WORKDIR /captstone-app

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]