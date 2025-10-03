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
        
        stage('Install & Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
    }
    
    post {
        success {
            script {
                githubNotify context: 'jenkins/build', 
                             status: 'SUCCESS', 
                             description: 'Build passed'
            }
        }
        failure {
            script {
                githubNotify context: 'jenkins/build', 
                             status: 'FAILURE', 
                             description: 'Build failed'
            }
        }
        aborted {
            script {
                githubNotify context: 'jenkins/build', 
                             status: 'ERROR', 
                             description: 'Build aborted'
            }
        }
    }
}
