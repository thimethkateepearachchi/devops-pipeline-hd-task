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

    stage('Test') {
      steps {
        sh 'npx jest'
      }
    }
  }
}