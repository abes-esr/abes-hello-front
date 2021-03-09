//this is the scripted method with groovy engine
import hudson.model.Result

node {

    //Configuration
    def gitURL = "https://github.com/abes-esr/abes-hello-front.git"
    def gitCredentials = ''
    def slackChannel = "#notif-helloabes"

    def jsDirName = "dist"
    def jsDir = "${jsDirName}/"
    def htmlBaseDir = "/var/www/html/abes-hello/"

    def baseUrlDev = "https://hello-dev.abes.fr"
    def apiUrlDev = "https://hello-dev.abes.fr/api"

    def baseUrlTest = "https://hello-test.abes.fr"
    def apiUrlTest = "https://hello-test.abes.fr/api"

    def baseUrlProd = "https://hello.abes.fr"
    def apiUrlProd = "https://hello.abes.fr/api"

    // Variables globales
    def ENV
    def serverHostnames = []
    def serverCredentials = []
    def isBuildAction
    def executeTests
    def isDeployAction

    // Configuration du job Jenkins
    // On garde les 5 derniers builds par branche
    // On scanne les branches et les tags du Git
    properties([
            buildDiscarder(
                    logRotator(
                            artifactDaysToKeepStr: '',
                            artifactNumToKeepStr: '',
                            daysToKeepStr: '',
                            numToKeepStr: '5')
            ),
            parameters([
                    choice(choices: ['Compiler', 'Compiler & Deployer'], description: 'Que voulez-vous faire ?', name: 'ACTION'),
                    gitParameter(
                            branch: '',
                            branchFilter: 'origin/(.*)',
                            defaultValue: 'develop',
                            description: 'Sélectionner la branche ou le tag',
                            name: 'BRANCH_TAG',
                            quickFilterEnabled: false,
                            selectedValue: 'NONE',
                            sortMode: 'DESCENDING_SMART',
                            tagFilter: '*',
                            type: 'PT_BRANCH_TAG'),
                    booleanParam(defaultValue: false, description: 'Voulez-vous exécuter les tests ?', name: 'executeTests'),
                    choice(choices: ['DEV', 'TEST', 'PROD'], description: 'Sélectionner l\'environnement cible', name: 'ENV')
            ])
    ])

    stage('Set environnement variables') {
        try {

            env.NODEJS_HOME = "${tool 'NodeJS 11.2.0'}"
            env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
            sh 'npm --version'

            // Action a faire
            if (params.ACTION == null) {
                isBuildAction = false
                isDeployAction = false
            } else if (params.ACTION == 'Compiler') {
                isBuildAction = true
                isDeployAction = false
            } else if (params.ACTION == 'Compiler & Deployer') {
                isBuildAction = true
                isDeployAction = true
            } else {
                throw new Exception("Unable to decode variable ACTION")
            }
            echo "isBuildAction =  ${isBuildAction}"
            echo "isDeployAction =  ${isDeployAction}"

            // Branche a deployer
            if (params.BRANCH_TAG == null) {
                throw new Exception("Variable BRANCH_TAG is null")
            } else {
                echo "Branch to deploy =  ${params.BRANCH_TAG}"
            }

            // Booleen d'execution des tests
            if (params.executeTests == null) {
                executeTests = false
            } else {
                executeTests = params.executeTests
            }
            echo "executeTests =  ${executeTests}"

            // Environnement de deploiement
            if (params.ENV == null) {
                throw new Exception("Variable ENV is null")
            } else {
                ENV = params.ENV
                echo "Target environnement =  ${ENV}"
            }

            if (ENV == 'DEV') {
                serverHostnames.add('hostname.server-front-1-dev')
                serverCredentials.add('raiponce1-dev-ssh-key')

                serverHostnames.add('hostname.server-front-2-dev')
                serverCredentials.add('raiponce2-dev-ssh-key')

            } else if (ENV == 'TEST') {
                serverHostnames.add('hostname.server-front-1-test')
                serverCredentials.add('raiponce1-test-ssh-key')

                serverHostnames.add('hostname.server-front-2-test')
                serverCredentials.add('raiponce2-test-ssh-key')

            } else if (ENV == 'PROD') {
                serverHostnames.add('hostname.server-front-1-prod')
                serverCredentials.add('raiponce1-prod-ssh-key')

                serverHostnames.add('hostname.server-front-2-prod')
                serverCredentials.add('raiponce2-prod-ssh-key')
            }

        } catch (e) {
            currentBuild.result = hudson.model.Result.NOT_BUILT.toString()
            notifySlack(slackChannel,e.getLocalizedMessage())
            throw e
        }
    }

    stage('SCM checkout') {
        try {
            checkout([
                    $class                           : 'GitSCM',
                    branches                         : [[name: "${params.BRANCH_TAG}"]],
                    doGenerateSubmoduleConfigurations: false,
                    extensions                       : [],
                    submoduleCfg                     : [],
                    userRemoteConfigs                : [[credentialsId: "${gitCredentials}", url: "${gitURL}"]]
            ])

        } catch (e) {
            currentBuild.result = hudson.model.Result.FAILURE.toString()
            notifySlack(slackChannel,e.getLocalizedMessage())
            throw e
        }
    }

    if ("${isBuildAction}" == 'true') {
            // Compilation du code

         stage('Dependencies') {
                try {
                    sh 'npm install'
                } catch (e) {
                    currentBuild.result = hudson.model.Result.FAILURE.toString()
                    notifySlack(slackChannel,e.getLocalizedMessage())
                    throw e
                }
            }

        stage('Build') {
            try {
                  if (ENV == 'DEV') {
                       sh 'export NODE_ENV=development'
                       sh 'export VUE_APP_BASE_URL="${baseUrlDev}"'
                       sh 'export VUE_APP_CIRSE_URL="${apiUrlDev}"'
                       sh 'export outputDir=${jsDirName}-dev/'
                       sh 'npm run build:development'
                       jsDir = "${jsDirName}-dev/"
                   } else if (ENV == 'TEST') {
                       sh 'export NODE_ENV=staging'
                       sh 'export VUE_APP_BASE_URL="${baseUrlTest}"'
                       sh 'export VUE_APP_CIRSE_URL="${apiUrlTest}"'
                       sh 'export outputDir=${jsDirName}-test/'
                       sh 'npm run build:staging'
                       jsDir = "${jsDirName}-test/"
                   } else if (ENV == 'PROD') {
                       sh 'export NODE_ENV=production'
                       sh 'export VUE_APP_BASE_URL="${baseUrlProd}"'
                       sh 'export VUE_APP_CIRSE_URL="${apiUrlProd}"'
                       sh 'export outputDir=${jsDirName}-prod/'
                       sh 'npm run build:production'
                       jsDir = "${jsDirName}-prod/"
                   }
            } catch (e) {
                currentBuild.result = hudson.model.Result.FAILURE.toString()
                notifySlack(slackChannel,e.getLocalizedMessage())
                throw e
            }
        }
    }

    if ("${isDeployAction}" == 'true') {
        // Deploiement sur les serveurs

        stage('deploy to front server') {
            for (int i = 0; i < serverHostnames.size(); i++) { //Pour chaque serveur
                try {
                    sshagent(credentials: ["${serverCredentials[i]}"]) {
                        withCredentials([
                                usernamePassword(credentialsId: 'develuser', passwordVariable: 'pass', usernameVariable: 'username'),
                                string(credentialsId: "${serverHostnames[i]}", variable: 'hostname')
                        ]) {
                            echo "Deploy to ${serverHostnames[i]}"
                            echo "--------------------------"

                            sh "ssh -tt ${username}@${hostname} \"cd ${htmlBaseDir} && rm -rf -d js && rm -rf -d css\""
                            sh "scp -rf ${jsDir}* ${username}@${hostname}:${htmlBaseDir}"
                        }
                    }
                } catch (e) {
                    currentBuild.result = hudson.model.Result.FAILURE.toString()
                    notifySlack(slackChannel, e.getLocalizedMessage())
                    throw e
                }
            }
        }
    }

    currentBuild.result = hudson.model.Result.SUCCESS.toString()
    notifySlack(slackChannel,"Congratulation !")
}

def notifySlack(String slackChannel, String info = '') {
    def colorCode = '#848484' // Gray

    switch (currentBuild.result) {
        case 'NOT_BUILT':
            colorCode = '#FFA500' // Orange
            break
        case 'SUCCESS':
            colorCode = '#00FF00' // Green
            break
        case 'UNSTABLE':
            colorCode = '#FFFF00' // Yellow
            break
        case 'FAILURE':
            colorCode = '#FF0000' // Red
            break;
    }

    String message = """
        *Jenkins Build*
        Job name: `${env.JOB_NAME}`
        Build number: `#${env.BUILD_NUMBER}`
        Build status: `${currentBuild.result}`
        Branch or tag: `${params.BRANCH_TAG}`
        Target environment: `${params.ENV}`
        Message: `${info}`
        Build details: <${env.BUILD_URL}/console|See in web console>
    """.stripIndent()

    return slackSend(tokenCredentialId: "slack_token",
            channel: "${slackChannel}",
            color: colorCode,
            message: message)
}
