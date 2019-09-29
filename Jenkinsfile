pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                checkout scm
                sh 'pip install -r requirements.txt --user'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            environment {
                PYTHONPATH = '/var/lib/jenkins/workspace/FinancialAnalysis_master/:/usr/lib/python2.7/site-packages/'
            }
            steps {
                echo 'Deploying....'
                sh 'python application.py &'
                sh 'curl --verbose http://127.0.0.1:1025/'
            }
        }
    }
}