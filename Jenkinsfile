
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


   stage('Information') {
       sh 'node -v'
       sh 'npm -v'
   }

    stage('Dependencies') {
        sh 'npm install'
    }

}
