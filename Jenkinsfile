pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git url: 'https://github.com/<твой-юзер>/<твой-репозиторий>.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo 'Сборка проекта...'
            }
        }

        stage('Test') {
            steps {
                echo 'Тестирование...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Деплой выполнен!'
            }
        }
    }
}
