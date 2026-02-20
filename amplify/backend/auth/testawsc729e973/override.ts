// import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';

// export function override(resources: AmplifyAuthCognitoStackTemplate) {
//     try {
//         // Добавляем Lambda функцию
//         (resources as any).addCfnResource('PostConfirmationLambda', {
//             Type: 'AWS::Lambda::Function',
//             Properties: {
//                 FunctionName: 'post-confirmation-trigger',
//                 Runtime: 'nodejs18.x',
//                 Handler: 'index.handler',
//                 Role: { 'Fn::GetAtt': ['PostConfirmationLambdaRole', 'Arn'] },
//                 Code: {
//                     ZipFile: `
//             exports.handler = async (event) => {
//               console.log('Post confirmation trigger:', JSON.stringify(event, null, 2));
              
//               if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
//                 console.log('User confirmed:', event.userName);
//               }
              
//               return event;
//             };
//           `
//                 }
//             }
//         });

//         // Добавляем IAM роль
//         (resources as any).addCfnResource('PostConfirmationLambdaRole', {
//             Type: 'AWS::IAM::Role',
//             Properties: {
//                 AssumeRolePolicyDocument: {
//                     Version: '2012-10-17',
//                     Statement: [{
//                         Effect: 'Allow',
//                         Principal: { Service: 'lambda.amazonaws.com' },
//                         Action: 'sts:AssumeRole'
//                     }]
//                 },
//                 ManagedPolicyArns: [
//                     'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
//                 ]
//             }
//         });

//         // Добавляем разрешение для Cognito
//         (resources as any).addCfnResource('PostConfirmationLambdaPermission', {
//             Type: 'AWS::Lambda::Permission',
//             Properties: {
//                 Action: 'lambda:InvokeFunction',
//                 FunctionName: { Ref: 'PostConfirmationLambda' },
//                 Principal: 'cognito-idp.amazonaws.com',
//                 SourceArn: { 'Fn::GetAtt': ['UserPool', 'Arn'] }
//             }
//         });

//         // Подключаем триггер к User Pool
//         resources.userPool.addPropertyOverride('LambdaConfig.PostConfirmation', {
//             Ref: 'PostConfirmationLambda'
//         });

//         // Добавляем теги
//         resources.userPool.addPropertyOverride('UserPoolTags', {
//             HasPostConfirmationTrigger: 'true',
//             Environment: 'development'
//         });

//     } catch (error) {
//         console.error('Override error:', error);
//         // Не прерываем выполнение, только логируем
//     }
// }
