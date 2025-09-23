pipeline {
    agent any

    environment {
        GITHUB_TOKEN = credentials('github_token')
    }

    options {
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
    }

    stage('Install & Build') {
        steps {
            dir('frontend') {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            githubNotify context: 'jenkin/build', status: 'SUCCESS', description: 'Build passed'
        }
        failure {
            githubNotify context: 'jenkin/build', status: 'FAILURE', description: 'Build failed'
        }
        aborted {
            githubNotify context: 'jenkin/build', status: 'ERROR', description: 'Build aborted'
        }
    }
}