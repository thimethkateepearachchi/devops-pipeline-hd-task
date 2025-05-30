pipeline {
  agent any

  tools {
    nodejs "node16" // Make sure this tool is installed in Jenkins
  }

  environment {
    SONAR_TOKEN = credentials('sonar-token-id') // Store token in Jenkins credentials
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
            npx sonar-scanner \
              -Dsonar.projectKey=react-ci-pipeline \
              -Dsonar.sources=src \
              -Dsonar.host.url=http://host.docker.internal:9000 \
              -Dsonar.login=$SONAR_TOKEN
          '''
        }
      }
    }

    stage('Security Scan (Snyk)') {
      steps {
        sh 'npx snyk test || true' // Continue even if vulnerabilities found
      }
    }

    stage('Docker Build & Deploy') {
      steps {
        sh 'docker build -t react-ci-pipeline:latest .'
        sh 'docker run -d -p 3000:3000 react-ci-pipeline:latest'
      }
    }

    stage('Release Placeholder') {
      steps {
        echo 'Release step – connect with GitHub Releases or AWS CodeDeploy if needed.'
      }
    }

    stage('Monitoring Placeholder') {
      steps {
        echo 'Monitoring step – integrate with Datadog, Prometheus, or New Relic.'
      }
    }
  }

  post {
    always {
      echo 'Jenkins Pipeline completed.'
    }
  }
}
