
//https://gist.github.com/qzm/f8921c0b7032ab7a6497ea92eb605438

//env config :
//https://www.placeme.io/blog/gitlab-ci-cd-lint-test-build-deploy
//https://stackoverflow.com/questions/11104028/process-env-node-env-is-undefined
//https://renatello.com/vue-js-base-url-global-variables/
node
{

    env.NODEJS_HOME = "${tool 'NodeJS 11.2.0'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    sh 'npm --version'

    //if (ENV == 'DEV') {
        //env.NODE_ENV = "dev"
    //}
    //if (ENV == 'TEST') {
        //env.NODE_ENV = "test"
    //}
    //if (ENV == 'PROD') {
        //env.NODE_ENV = "production"
    //}

    def ENV = params.ENV
    def executeTests = params.executeTests
    if(params.ENV != null) {
        echo "env =  ${ENV}"
        echo ENV
    }

    properties(
            [parameters([
                choice(choices: ['DEV', 'TEST', 'PROD'], description: '', name: 'ENV'),
                choice(choices: ['1.1.0', '1.2.0', '1.3.0'], description: '', name: 'VERSION'),
                booleanParam(defaultValue: false, description: '', name: 'executeTests')
                ])])





   stage('SCM checkout') {
        checkout([$class: 'GitSCM', branches: [[name: '*/master'], [name: '*/develop']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '', url: 'https://github.com/abes-esr/abes-hello-front.git']]])
   }

   stage('Information') {
       sh 'node -v'
       sh 'npm -v'
   }
/*
   stage('Config') {
       if (ENV == 'DEV') {
           sh 'export NODE_ENV=development'
           sh 'export VUE_APP_BASE_URL="https://thesesinterfacebatchs.v212.abes.fr"'
           sh 'export VUE_APP_CIRSE_URL="http://cirse1-dev.v3.abes.fr:8131"'
           sh 'export outputDir=dist-dev/'
           //sh 'npm run build:development'
       }
       if (ENV == 'TEST') {
           sh 'export NODE_ENV=staging'
           sh 'export VUE_APP_BASE_URL="https://thesesinterfacebatchs.v202.abes.fr"'
           sh 'export VUE_APP_CIRSE_URL="http://cirse1-test.v3.abes.fr:8131"'
           sh 'export outputDir=dist-test/'
           //sh 'npm run build:staging'
       }
       if (ENV == 'PROD') {
           sh 'export NODE_ENV=production'
           sh 'export VUE_APP_BASE_URL="https://thesesinterfacebatchs.v102.abes.fr"'
           sh 'export VUE_APP_CIRSE_URL="http://cirse1-prod.v3.abes.fr:8131"'
           sh 'export outputDir=dist-prod/'
           //sh 'npm run build:production'
       }
   }
*/
    stage('Dependencies') {
        sh 'npm install'
    }

    //stage('Unit Test') {
   //     sh 'npm run unit'
   // }

    //stage('E2E Test') {
    //    sh 'npm run e2e'
    //}


    stage('Build') {
        sh 'npm run build'
    }

    //stage('Artifacts') {
        //sh 'tar -czf dist.tar.gz ./dist'
        //stash 'dist.tar.gz'
        //stash 'Raiponcefile'
        //stash 'nginx.conf'
        //archiveArtifacts artifacts: 'dist.tar.gz', fingerprint: true
    //}

    stage ('deploy to raiponce'){
       echo 'deployment started'

        if (ENV == 'DEV') {
            //here we have the choice : we can create the credential in jenkins/configuration/ssh servers
            //or in the space project (so the credential can only be accessed by the project)
            //or in jenkins/identifiants/system/identifiants globaux (so the credential can be accessed by all the projects)

            sshagent(credentials: ['raiponce1-dev-ssh-key']) { //one key per tomcat
                withCredentials([usernamePassword(credentialsId: 'develuser', passwordVariable: 'pass', usernameVariable: 'username')]) {
                    sh 'ssh -tt devel@raiponce1-dev.v3.abes.fr  "cd /var/www/html/abes-hello/ && rm -rf -d js && rm -rf -d css"'
                }
                sh 'scp -r dist/* devel@raiponce1-dev.v3.abes.fr:/var/www/html/abes-hello/'
                //sh 'scp dist.tar.gz devel@raiponce1-dev.v3.abes.fr://var/www/html/thesesinterfacebatchs/'
                //sh 'ssh -tt devel@raiponce1-dev.v3.abes.fr  "cd /var/www/html/thesesinterfacebatchs/ && tar xvzf dist.tar.gz"'
                //sh 'ssh -tt devel@raiponce1-dev.v3.abes.fr  "mv /var/www/html/thesesinterfacebatchs/dist/* /var/www/html/thesesinterfacebatchs/"'
                //sh 'ssh -tt devel@raiponce1-dev.v3.abes.fr  "cd /var/www/html/thesesinterfacebatchs/ && rm dist.tar.gz && rm -d dist"'
                //sh 'tar -xf dist.tar.gz'
            }
            sshagent(credentials: ['raiponce2-dev-ssh-key']) { //one key per tomcat
                withCredentials([usernamePassword(credentialsId: 'develuser', passwordVariable: 'pass', usernameVariable: 'username')]) {
                    sh 'ssh -tt devel@raiponce2-dev.v3.abes.fr  "cd /var/www/html/abes-hello/ && rm -rf -d js && rm -rf -d css"'
                }
                sh 'scp -r dist/* devel@raiponce2-dev.v3.abes.fr:/var/www/html/abes-hello/'
            }
        }
        if (ENV == 'TEST') {

            sshagent(credentials: ['raiponce1-test-ssh-key']) { //one key per tomcat
                sh 'ssh -tt devel@raiponce1-test.v3.abes.fr  "cd /var/www/html/abes-hello/ && rm -rf -d js && rm -rf -d css"'
                sh 'scp -r dist/* devel@raiponce1-test.v3.abes.fr://var/www/html/abes-hello/'
            }
            sshagent(credentials: ['raiponce2-test-ssh-key']) { //one key per tomcat
                sh 'ssh -tt devel@raiponce2-test.v3.abes.fr  "cd /var/www/html/abes-hello/ && rm -rf -d js && rm -rf -d css"'
                sh 'scp -r dist/* devel@raiponce2-test.v3.abes.fr:/var/www/html/abes-hello/'
            }
        }
        if (ENV == 'PROD') {
            //here we have the choice : we can create the credential in jenkins/configuration/ssh servers
            //or in the space project (so the credential can only be accessed by the project)
            //or in jenkins/identifiants/system/identifiants globaux (so the credential can be accessed by all the projects)

            sshagent(credentials: ['raiponce1-prod-ssh-key']) { //one key per tomcat
                sh 'ssh -tt devel@raiponce1.v3.abes.fr  "cd /var/www/html/abes-hello/ && rm -rf -d js && rm -rf -d css"'
                sh 'scp -r dist-prod/* devel@raiponce1.v3.abes.fr:/var/www/html/abes-hello/'
            }
            sshagent(credentials: ['raiponce2-prod-ssh-key']) { //one key per tomcat
                sh 'ssh -tt devel@raiponce2.v3.abes.fr  "cd /var/www/html/abes-hello/ && rm -rf -d js && rm -rf -d css"'
                sh 'scp -r dist-prod/* devel@raiponce2.v3.abes.fr:/var/www/html/abes-hello/'
            }
        }
    }
}



   //stage('sonarqube analysis'){
    //   withSonarQubeEnv('SonarQube Server2'){ cf : jenkins/configuration/sonarQube servers ==> between the quotes put the name we gave to the server
     //      sh "${maventool}/bin/mvn sonar:sonar"
     //  }
 // }








