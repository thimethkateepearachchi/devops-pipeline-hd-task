pipeline {
  agent any

  tools {
    nodejs "node16"
  }

  environment {
    SONAR_TOKEN = credentials('sonar-token-id')
  }

  stages {
    stage('Checkout Source') {
      steps {
        // Explicit git checkout to avoid workspace issues
        checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],  // Change to '*/master' if your repo default branch is master
          userRemoteConfigs: [[
            url: 'https://github.com/thimethkateepearachchi/devops-pipeline-hd-task.git'
          ]]
        ])
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
        withCredentials([string(credentialsId: 'SNYK_TOKEN', variable: 'SNYK_TOKEN')]) {
          sh 'npx snyk auth $SNYK_TOKEN'
          sh 'npx snyk test'
        }
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
