pipeline {
    agent {
        docker { 
            image 'node:14.17.5'
            args '-u root:root -v /var/lib/jenkins/workspace/.npmcache/service-auth/node_modules:${WORKSPACE}/node_modules'
        }
    }
    stages {
        stage('NPM install') { 
            when {
                branch "PR-*"
            }   
            steps {
                sh '''npm i'''
            }
        }
        stage('Lint check') { 
            when {
                branch "PR-*"
            }   
            steps {
                sh '''npm run lint-no-fix'''
            }
        }
        stage('Run Test') { 
            when {
                branch "PR-*"
            }   
            steps {
                sh '''npm run test'''
            }
        }
    }
    post {
    success {
      slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
    failure {
      slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
    }
}