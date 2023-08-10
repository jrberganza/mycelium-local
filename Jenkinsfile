pipeline {
    environment {
        scannerHome = tool('Main Scanner')
    }

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
                    mail (
                        to: "jberganza@unis.edu.gt",
                        subject: "Fallaron los tests unitarios",
                        body: "Los tests unitarios han fallado con el último commit",
                    )
                }
            }
        }

        stage('SonarQube API Analysis') {
            steps {
                withSonarQubeEnv('Main Sonarqube') {
                    dir('api') {
                        sh './gradlew sonar'
                    }
                }
            }

            post {
                failure {
                    mail (
                        to: "jberganza@unis.edu.gt",
                        subject: "Falló el scan de SonarQube para el API",
                        body: "El análisis de SonarQube para el API ha fallado con el último commit",
                    )
                }
            }
        }

        stage('SonarQube Client Analysis') {
            steps {
                withSonarQubeEnv('Main Sonarqube') {
                    dir('client') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }

            post {
                failure {
                    mail (
                        to: "jberganza@unis.edu.gt",
                        subject: "Falló el scan de SonarQube para el frontend",
                        body: "El análisis de SonarQube para el frontend ha fallado con el último commit",
                    )
                }
            }
        }
    }
}