pipeline {
  agent any

  tools {
    nodejs "node16"
  }

  environment {
    SONAR_TOKEN = credentials('sonar-token-id')
    SNYK_TOKEN = credentials('SNYK_TOKEN')
  }

  stages {
    stage('Checkout') {
      steps {
        // Clone the repo so git commands work and workspace is set up
        checkout scm
      }
    }

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
        sh """
          npx snyk auth $SNYK_TOKEN
          npx snyk test
        """
      }
    }

    stage('Docker Build & Deploy') {
      steps {
        // Use sudo if your Jenkins user does not have permission on docker socket
        // Or configure docker group permissions properly instead of sudo
        sh 'sudo docker build -t react-ci-pipeline:latest .'

        // Stop any existing container on port 3000 (optional cleanup)
        sh '''
          if sudo docker ps -q --filter "ancestor=react-ci-pipeline:latest" | grep -q .; then
            echo "Stopping existing react-ci-pipeline container..."
            sudo docker ps -q --filter "ancestor=react-ci-pipeline:latest" | xargs sudo docker stop
          fi
        '''

        // Run container detached, mapping port 3000, auto-remove on exit
        sh 'sudo docker run -d --rm -p 3000:3000 react-ci-pipeline:latest'
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
      cleanWs()
    }
  }
}
