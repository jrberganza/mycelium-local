pipeline {
    agent any

    stages {
        stage('SCM') {
            steps {
                checkout scm
            }
        }

        stage('Unit testing') {
            steps {
                withGradle {
                    dir('api') {
                        sh './gradlew test'
                    }
                }
            }

            post {
                failure {
                    mail {
                        to: "jberganza@unis.edu.gt",
                        subject: "Fallaron los tests unitarios",
                        body: "Los tests unitarios han fallado con el último commit",
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('Main Sonarqube') {
                    dir('api') {
                        sh './gradlew sonar'
                    }
                }
            }

            post {
                failure {
                    mail {
                        to: "jberganza@unis.edu.gt",
                        subject: "Falló el scan de SonarQube",
                        body: "El análisis de SonarQube ha fallado con el último commit",
                    }
                }
            }
        }
    }
}