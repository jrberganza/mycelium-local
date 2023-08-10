pipeline {
    agent any

    stages {
        stage('SCM') {
            steps {
                checkout scm
            }
        }

        // stage('Unit testing') {
        //     steps {
        //         withGradle {
        //             dir('api') {
        //                 sh './gradlew test'
        //             }
        //         }
        //     }
        // }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('Main Sonarqube') {
                    dir('api') {
                        sh './gradlew sonar'
                    }
                }
            }
        }
    }
}