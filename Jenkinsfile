
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
    pipelineTriggers([pollSCM('* * * * *')])

    properties([
        pipelineTriggers([pollSCM('* * * * *')])
    ])
   stage('SCM checkout') {
        checkout([$class: 'GitSCM', branches: [[name: 'Test/develop']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '', url: 'https://github.com/abes-esr/abes-hello-front.git']]])
   }

   stage('Information') {
       sh 'node -v'
       sh 'npm -v'
   }

    stage('Dependencies') {
        sh 'npm install'
    }

    stage('Build') {
        sh 'npm run build'
    }

    stage ('deploy to raiponce'){
       echo 'deployment test server started'

        
        //here we have the choice : we can create the credential in jenkins/configuration/ssh servers
        //or in the space project (so the credential can only be accessed by the project)
        //or in jenkins/identifiants/system/identifiants globaux (so the credential can be accessed by all the projects)

        sshagent(credentials: ['raiponce1-test-ssh-key']) { //one key per tomcat
            withCredentials([usernamePassword(credentialsId: 'develuser', passwordVariable: 'pass', usernameVariable: 'username')]) {
                sh 'ssh -tt devel@raiponce1-test.v3.abes.fr  "cd /var/www/html/abes-hello/ && rm -rf -d js && rm -rf -d css"'
            }
            sh 'scp -r dist/* devel@raiponce1-test.v3.abes.fr:/var/www/html/abes-hello/'
            //sh 'scp dist.tar.gz devel@raiponce1-dev.v3.abes.fr://var/www/html/thesesinterfacebatchs/'
            //sh 'ssh -tt devel@raiponce1-dev.v3.abes.fr  "cd /var/www/html/thesesinterfacebatchs/ && tar xvzf dist.tar.gz"'
            //sh 'ssh -tt devel@raiponce1-dev.v3.abes.fr  "mv /var/www/html/thesesinterfacebatchs/dist/* /var/www/html/thesesinterfacebatchs/"'
            //sh 'ssh -tt devel@raiponce1-dev.v3.abes.fr  "cd /var/www/html/thesesinterfacebatchs/ && rm dist.tar.gz && rm -d dist"'
            //sh 'tar -xf dist.tar.gz'
        }
        /*
        sshagent(credentials: ['raiponce2-dev-ssh-key']) { //one key per tomcat
            withCredentials([usernamePassword(credentialsId: 'develuser', passwordVariable: 'pass', usernameVariable: 'username')]) {
                sh 'ssh -tt devel@raiponce2-dev.v3.abes.fr  "cd /var/www/html/abes-hello/ && rm -rf -d js && rm -rf -d css"'
            }
            sh 'scp -r dist/* devel@raiponce2-dev.v3.abes.fr:/var/www/html/abes-hello/'
        }
        */
        
    }


    stage('Test git trigger commit') {
        echo 'Commit OK'
    }

    stage('Build main job') {
        echo 'Buiding main job trigger'
        build 'Hello abes Front-MultibranchPipeline/Test%2Fmain'
    }
}










