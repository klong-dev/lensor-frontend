pipeline {
    agent any
    
    environment {
        GITHUB_TOKEN = credentials('github-pat')
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
                    powershell 'npm install'
                    powershell 'npm run build'
            }
        }
    }
    
    post {
        success {
            script {
                publishChecks name: 'jenkins/build',
                              title: 'Build Status',
                              summary: 'Build passed ✅',
                              conclusion: 'SUCCESS'
            }
        }
        failure {
            script {
                publishChecks name: 'jenkins/build',
                              title: 'Build Status',
                              summary: 'Build failed ❌',
                              conclusion: 'FAILURE'
            }
        }
        aborted {
            script {
                publishChecks name: 'jenkins/build',
                              title: 'Build Status',
                              summary: 'Build aborted ⚠️',
                              conclusion: 'CANCELLED'
            }
        }
}

}
