pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                checkout scm
                sh 'pip install -r requirements.txt'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            environment {
                sh 'export PYTHONPATH = $PYTHONPATH:ConfigFiles:PageCallbacks:PageLayouts:PageStyles:PyhonRequestFiles'
                echo "Database engine is ${PYTHONPATH}"
            }
            steps {
                echo 'Deploying....'
                sh 'python application.py'
                sh 'curl http://127.0.0.1:8080/'
            }
        }
    }
}