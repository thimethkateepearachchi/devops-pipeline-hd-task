pipeline {
  agent any

  tools {
    nodejs "node16"
  }

  environment {
    SONAR_TOKEN = credentials('sonar-token-id')
    SNYK_TOKEN = credentials('SNYK_TOKEN')
  }

  options {
    // Keep build logs for 10 days and discard old builds to save space
    buildDiscarder(logRotator(daysToKeepStr: '10', numToKeepStr: '5'))
    // Timeout if build takes more than 30 minutes
    timeout(time: 30, unit: 'MINUTES')
  }

  stages {
    stage('Checkout Source') {
      steps {
        // Checkout the repo based on Jenkins job config or Multibranch pipeline
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
        // Make sure jest is executable (sometimes needed)
        sh 'chmod +x ./node_modules/.bin/jest || true'
        sh './node_modules/.bin/jest --detectOpenHandles --ci'
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
        sh '''
          npx snyk auth $SNYK_TOKEN
          npx snyk test
        '''
      }
    }

    stage('Docker Build & Deploy') {
      steps {
        script {
          // Run Docker build and run, ensure Jenkins user has docker permissions
          // You might need to prefix docker commands with 'sudo' if permission denied
          sh 'docker build -t react-ci-pipeline:latest .'
          sh 'docker stop react-ci-pipeline || true' // Stop existing container if any
          sh 'docker rm react-ci-pipeline || true'   // Remove existing container if any
          sh 'docker run -d --name react-ci-pipeline -p 3000:3000 react-ci-pipeline:latest'
        }
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
      // Optionally clean workspace after build
      // cleanWs()
    }
    success {
      echo 'Build succeeded!'
    }
    failure {
      echo 'Build failed. Check logs for errors.'
    }
  }
}
