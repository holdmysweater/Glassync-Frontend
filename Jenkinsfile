pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Clone') {
            steps {
                git url: 'https://github.com/Glassync/Glassync-Frontend', branch: 'main'
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
                echo 'Деплой выполнен! '
            }
        }
    }
}
