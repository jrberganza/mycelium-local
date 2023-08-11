pipeline {
    environment {
        scannerHome = tool('Main Scanner')
        notifMail = "jflores@unis.edu.gt"
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
                        to: "${notifMail}",
                        subject: "Fallaron los tests unitarios de API",
                        body: "Los tests unitarios de API han fallado con el último commit",
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
                        to: "${notifMail}",
                        subject: "Falló el scan de SonarQube para el API",
                        body: "El análisis de SonarQube para el API ha fallado con el último commit",
                    )
                }
            }
        }

        stage("SonarQube API Quality Gate") {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }

            post {
                failure {
                    mail (
                        to: "${notifMail}",
                        subject: "Falló control de calidad para el API",
                        body: "El análisis de SonarQube para el API no superó el nivel de calidad esperado",
                    )
                }
            }
        }

        stage('SonarQube Client Analysis') {
            steps {
                nodejs('NodeJS') {
                    withSonarQubeEnv('Main Sonarqube') {
                        dir('client') {
                            sh "${scannerHome}/bin/sonar-scanner"
                        }
                    }
                }
            }

            post {
                failure {
                    mail (
                        to: "${notifMail}",
                        subject: "Falló el scan de SonarQube para el frontend",
                        body: "El análisis de SonarQube para el frontend ha fallado con el último commit",
                    )
                }
            }
        }

        stage("SonarQube Client Quality Gate") {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }

            post {
                failure {
                    mail (
                        to: "${notifMail}",
                        subject: "Falló control de calidad para el frontend",
                        body: "El análisis de SonarQube para el frontend no superó el nivel de calidad esperado",
                    )
                }
            }
        }
    }
}