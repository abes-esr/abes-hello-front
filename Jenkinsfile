
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

    properties([
        pipelineTriggers([pollSCM('* * * * *')])
    ])
   stage('SCM checkout') {
        checkout([$class: 'GitSCM', branches: [[name: 'Test/develop']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'Git_hub_id', url: 'https://github.com/abes-esr/abes-hello-front.git']]])
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

    stage ('deploy to dev raiponce'){
       echo 'deployment dev server started'

        
        //here we have the choice : we can create the credential in jenkins/configuration/ssh servers
        //or in the space project (so the credential can only be accessed by the project)
        //or in jenkins/identifiants/system/identifiants globaux (so the credential can be accessed by all the projects)

        sshagent(credentials: ['raiponce1-dev-ssh-key']) { //one key per tomcat
            /*withCredentials([usernamePassword(credentialsId: 'develuser', passwordVariable: 'pass', usernameVariable: 'username')]) {
                sh 'ssh -tt devel@raiponce1-test.v3.abes.fr  "cd /var/www/html/abes-hello/ && rm -rf -d js && rm -rf -d css"'
            }*/
            
            sh 'ssh -tt devel@raiponce1-dev.v3.abes.fr  "cd /var/www/html/hello/ && rm -rf -d js && rm -rf -d css"'
            sh 'scp -r dist/* devel@raiponce1-dev.v3.abes.fr:/var/www/html/hello/'
            //sh 'scp dist.tar.gz devel@raiponce1-dev.v3.abes.fr://var/www/html/thesesinterfacebatchs/'
            //sh 'ssh -tt devel@raiponce1-dev.v3.abes.fr  "cd /var/www/html/thesesinterfacebatchs/ && tar xvzf dist.tar.gz"'
            //sh 'ssh -tt devel@raiponce1-dev.v3.abes.fr  "mv /var/www/html/thesesinterfacebatchs/dist/* /var/www/html/thesesinterfacebatchs/"'
            //sh 'ssh -tt devel@raiponce1-dev.v3.abes.fr  "cd /var/www/html/thesesinterfacebatchs/ && rm dist.tar.gz && rm -d dist"'
            //sh 'tar -xf dist.tar.gz'
        }
        /*
        sshagent(credentials: ['raiponce2-dev-ssh-key']) { //one key per tomcat
            /*withCredentials([usernamePassword(credentialsId: 'develuser', passwordVariable: 'pass', usernameVariable: 'username')]) {
                sh 'ssh -tt devel@raiponce2-dev.v3.abes.fr  "cd /var/www/html/abes-hello/ && rm -rf -d js && rm -rf -d css"'
            }
        
            sh 'ssh -tt devel@raiponce2-dev.v3.abes.fr  "cd /var/www/html/abes-hello/ && rm -rf -d js && rm -rf -d css"'
            sh 'scp -r dist/* devel@raiponce2-dev.v3.abes.fr:/var/www/html/abes-hello/'
        }
        */
        
        
        
    }
/*
    stage('git main') {
        echo 'Push to git main started'
        sh "echo 'Jenkinsfile' >> .gitignore"
         withCredentials([[
            $class: 'UsernamePasswordMultiBinding',
            credentialsId: 'Github',
            usernameVariable: 'GIT_USERNAME',
            passwordVariable: 'GIT_PASSWORD'
        ]]) 
        { 
            git url: "https://github.com/abes-esr/abes-hello-front.git",
            branch: 'Test/main'
            sh 'git push -u origin Test/main'
        }
        
        
    }
*/

    stage('Build git main') {
       
        echo 'Push to git branch main started'
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'Git_hub_id', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
            
            sh("echo 'Jenkinsfile' >> .gitignore")   
            try {
                sh("git branch Test/main")
                sh("git checkout Test/main")
            } catch (Exception e){
                sh("git checkout Test/main")
            }
             
            sh('git push -u origin Test/main')
        }
         
    }

        
    stage('main job prod') {
        echo 'Main job prod with trigger started'
         //sshagent(credentials: ['raiponce1-prod-ssh-key']) { //one key per tomcat
            //sh 'ssh -tt devel@raiponce1.v3.abes.fr  "cd /var/www/html/hello/ && rm -rf -d js && rm -rf -d css"'
            //sh 'scp -r dist/* devel@raiponce1.v3.abes.fr:/var/www/html/hello/'
        //}
        build 'Hello abes Front-MultibranchPipeline/Test%2Fmain'
    }
}
