pipeline {
  agent any

  tools {
    nodejs "node16"
  }

  environment {
    SONAR_TOKEN = credentials('sonar-token-id') // Configure in Jenkins credentials
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'chmod +x ./node_modules/.bin/jest'
        sh './node_modules/.bin/jest --detectOpenHandles'
      }
    }

    stage('Code Quality') {
      steps {
        withSonarQubeEnv('SonarQubeServer') {
          sh 'npx sonar-scanner -Dsonar.projectKey=my-react-app -Dsonar.sources=src -Dsonar.host.url=$SONAR_HOST_URL -Dsonar.login=$SONAR_TOKEN'
        }
      }
    }

    stage('Security Scan') {
      steps {
        sh 'npx snyk test || true' // Continue even if vulnerabilities found
      }
    }

    stage('Docker Build & Deploy') {
      steps {
        sh 'docker build -t my-react-app:latest .'
        sh 'docker run -d -p 3000:3000 my-react-app:latest'
      }
    }

    stage('Release') {
      steps {
        echo 'Release stage placeholder – Implement with GitHub Releases or AWS CodeDeploy'
      }
    }

    stage('Monitoring') {
      steps {
        echo 'Monitoring placeholder – Use tools like Datadog or New Relic'
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
    }
  }
}
