pipeline {
  agent any

  tools {
    nodejs "node16"
  }

  environment {
    SONAR_TOKEN = credentials('sonar-token-id')
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build App') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'chmod +x ./node_modules/.bin/jest'
        sh './node_modules/.bin/jest --detectOpenHandles'
      }
    }

    stage('Code Quality Analysis') {
      steps {
        withSonarQubeEnv('SonarQubeServer') {
          sh '''
            echo "📂 Listing workspace contents:"
            ls -al
            npx sonar-scanner \
              -Dsonar.projectKey=react-ci-pipeline \
              -Dsonar.sources=. \
              -Dsonar.host.url=http://host.docker.internal:9000 \
              -Dsonar.login=$SONAR_TOKEN
          '''
        }
      }
    }

    stage('Security Scan (Snyk)') {
      steps {
        withCredentials([string(credentialsId: 'SNYK_TOKEN', variable: 'SNYK_TOKEN')]) {
          sh 'npx snyk auth $SNYK_TOKEN'
          sh 'npx snyk test'
        }
      }
    }

  post {
    always {
      echo 'Jenkins Pipeline completed.'
    }
  }
}
