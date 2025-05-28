pipeline {
  agent any

  tools {
    nodejs "node16"
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Fix Jest Permission') {
      steps {
        sh 'chmod +x ./node_modules/.bin/jest'
      }
    }

    stage('Test') {
      steps {
        sh './node_modules/.bin/jest --detectOpenHandles'
      }
    }
  }
}
