## DEPLOY FIREBASE:

## ssg variant: <br>

1. **npm run build**
2. **npm run export**

"scripts": {

1. "dev": "next dev",
2. "build": "next build",
3. "start": "next start",
4. "export": "next export",
   }

Put the "out" dir with your static - inside 'public' folder of **Hosting Provider**

FILE .htaccess - in the public folder of hosting Provider: <br>
RewriteEngine on <br>
RewriteCond %{REQUEST_FILENAME} !-d <br>
RewriteCond %{REQUEST_FILENAME}.html -f <br>
RewriteRule ^(.\*)$ $1.html

## Sign in to Google: **firebase login**

## Initiate your project: **firebase init**

During initializing - choose the default dir 'out' - we created earlier

## run from your app’s root directory: **firebase deploy** <br>

After deploying, view your app!

## DEPLOY VERSEL: <br>

1. **Create a git repo with your project** <br>
2. **Create an account using GITHUB PROFILE at [VERSEL OFFICIAL WEBSITE](https://vercel.com.)** <br>
3. **ADD A NEW PROJECT** <br>
4. **FOLLOW THE INSTRUCTIONS BELOW** <br>

## **P.S. to determine enviroment variables inside VERCEL HOSTING - add them without 'NEXT_PUBLIC_'  prefix**

## See the hole project you can click the link [PROJECT](https://react-zustand-beryl.vercel.app/)
