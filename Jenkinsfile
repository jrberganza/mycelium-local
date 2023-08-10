pipeline {
    agent any

    stages {
        stage('SCM') {
            checkout scm
        }

        stage('Unit testing') {
            withGradle {
                dir('api') {
                    sh './gradlew test'
                }
            }
        }

        stage('SonarQube Analysis') {
            withSonarQubeEnv() {
                dir('api') {
                    sh "./gradlew sonar"
                }
            }
        }
    }
}