def getSSHServer(branch) {
  if (branch == 'master') {
    return 'Master PC'
  } else if (branch == 'uat') {
    return 'UAT PC'
  } else {
    return 'Dev PC'
  }
}

def getSonarqubeProjectKeyPrefix(branch) {
  if (branch == 'master') {
    return 'mycelium-local-master'
  } else if (branch == 'uat') {
    return 'mycelium-local-uat'
  } else {
    return 'mycelium-local-dev'
  }
}

def getSonarqubeProjectNamePrefix(branch) {
  if (branch == 'master') {
    return 'Mycelium Local Master'
  } else if (branch == 'uat') {
    return 'Mycelium Local UAT'
  } else {
    return 'Mycelium Local Dev'
  }
}

pipeline {
    environment {
        scannerHome = tool('Main Scanner')
        owner1Mail = "jflores@unis.edu.gt"
        owner2Mail = "jberganza@unis.edu.gt"
        sshServer = getSSHServer(env.BRANCH_NAME)
        sonarqubeProjectKeyPrefix = getSonarqubeProjectKeyPrefix(env.BRANCH_NAME)
        sonarqubeProjectNamePrefix = getSonarqubeProjectNamePrefix(env.BRANCH_NAME)
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
                        to: "${owner1Mail}",
                        subject: "Fallaron los tests unitarios de API",
                        body: "Los tests unitarios de API han fallado con el último commit",
                    )
                    mail (
                        to: "${owner2Mail}",
                        subject: "Fallaron los tests unitarios de API",
                        body: "Los tests unitarios de API han fallado con el último commit",
                    )
                }
            }
        }

        // stage('SonarQube API Analysis') {
        //     steps {
        //         withSonarQubeEnv('Main Sonarqube') {
        //             dir('api') {
        //                 sh './gradlew sonar -Dsonar.projectKey=' + env.sonarqubeProjectKeyPrefix + '-api -Dsonar.projectName="' + env.sonarqubeProjectNamePrefix + ' APIs"'
        //             }
        //         }
        //     }

        //     post {
        //         failure {
        //             mail (
        //                 to: "${owner1Mail}",
        //                 subject: "Falló el scan de SonarQube para el API",
        //                 body: "El análisis de SonarQube para el API ha fallado con el último commit",
        //             )
        //             mail (
        //                 to: "${owner2Mail}",
        //                 subject: "Falló el scan de SonarQube para el API",
        //                 body: "El análisis de SonarQube para el API ha fallado con el último commit",
        //             )
        //         }
        //     }
        // }

        // stage("SonarQube API Quality Gate") {
        //     steps {
        //         timeout(time: 1, unit: 'HOURS') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }

        //     post {
        //         failure {
        //             mail (
        //                 to: "${owner1Mail}",
        //                 subject: "Falló control de calidad para el API",
        //                 body: "El análisis de SonarQube para el API no superó el nivel de calidad esperado",
        //             )
        //             mail (
        //                 to: "${owner2Mail}",
        //                 subject: "Falló control de calidad para el API",
        //                 body: "El análisis de SonarQube para el API no superó el nivel de calidad esperado",
        //             )
        //         }
        //     }
        // }

        // stage('SonarQube Client Analysis') {
        //     steps {
        //         nodejs('NodeJS') {
        //             withSonarQubeEnv('Main Sonarqube') {
        //                 dir('client') {
        //                     sh '${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=' + env.sonarqubeProjectKeyPrefix + '-client -Dsonar.projectName="' + env.sonarqubeProjectNamePrefix + ' Client"'
        //                 }
        //             }
        //         }
        //     }

        //     post {
        //         failure {
        //             mail (
        //                 to: "${owner1Mail}",
        //                 subject: "Falló el scan de SonarQube para el frontend",
        //                 body: "El análisis de SonarQube para el frontend ha fallado con el último commit",
        //             )
        //             mail (
        //                 to: "${owner2Mail}",
        //                 subject: "Falló el scan de SonarQube para el frontend",
        //                 body: "El análisis de SonarQube para el frontend ha fallado con el último commit",
        //             )
        //         }
        //     }
        // }

        // stage("SonarQube Client Quality Gate") {
        //     steps {
        //         timeout(time: 1, unit: 'HOURS') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }

        //     post {
        //         failure {
        //             mail (
        //                 to: "${owner1Mail}",
        //                 subject: "Falló control de calidad para el frontend",
        //                 body: "El análisis de SonarQube para el frontend no superó el nivel de calidad esperado",
        //             )
        //             mail (
        //                 to: "${owner2Mail}",
        //                 subject: "Falló control de calidad para el frontend",
        //                 body: "El análisis de SonarQube para el frontend no superó el nivel de calidad esperado",
        //             )
        //         }
        //     }
        // }

        stage("Build APIs") {
            steps {
                script {
                    sh "podman build -t local-registry:5000/mycelium-local_api:${env.BRANCH_NAME}-prod -f Dockerfile.prod ./api"
                }
            }

            post {
                failure {
                    mail (
                        to: "${owner1Mail}",
                        subject: "Falló la build de Docker para el API",
                        body: "La build de Docker para el API ha fallado",
                    )
                    mail (
                        to: "${owner2Mail}",
                        subject: "Falló la build de Docker para el API",
                        body: "La build de Docker para el API ha fallado",
                    )
                }
            }
        }

        stage("Build Frontend") {
            steps {
                script {
                    sh "podman build -t local-registry:5000/mycelium-local_client:${env.BRANCH_NAME}-prod -f Dockerfile.prod ./client"
                }
            }

            post {
                failure {
                    mail (
                        to: "${owner1Mail}",
                        subject: "Falló la build de Docker para el frontend",
                        body: "La build de Docker para el frontend ha fallado",
                    )
                    mail (
                        to: "${owner2Mail}",
                        subject: "Falló la build de Docker para el frontend",
                        body: "La build de Docker para el frontend ha fallado",
                    )
                }
            }
        }

        stage("Publish images") {
            steps {
                script {
                    sh "podman push local-registry:5000/mycelium-local_api:${env.BRANCH_NAME}-prod"
                    sh "podman push local-registry:5000/mycelium-local_client:${env.BRANCH_NAME}-prod"
                }
            }

            post {
                failure {
                    mail (
                        to: "${owner1Mail}",
                        subject: "Imágenes de Docker no publicadas",
                        body: "No se pudo publicar las imágenes al registry local",
                    )
                    mail (
                        to: "${owner2Mail}",
                        subject: "Imágenes de Docker no publicadas",
                        body: "No se pudo publicar las imágenes al registry local",
                    )
                }
            }
        }

        stage("Deployment") {
            steps {
                sshPublisher(
                    failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: env.sshServer,
                            transfers: [
                                sshTransfer(
                                    execCommand: 'docker compose pull && docker compose up -d',
                                    execTimeout: 300000
                                )
                            ]
                        )
                    ]
                )
            }

            post {
                failure {
                    mail (
                        to: "${owner1Mail}",
                        subject: "Los contenedores no se pudieron ejecutar",
                        body: "No se pudo ejecutar los contenedores actualizados en las computadoras",
                    )
                    mail (
                        to: "${owner2Mail}",
                        subject: "Los contenedores no se pudieron ejecutar",
                        body: "No se pudo ejecutar los contenedores actualizados en las computadoras",
                    )
                }
            }
        }
    }
}