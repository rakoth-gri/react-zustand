## ABOUT PROJECT

A project for educational purposes represents the actual frontend stack of technologies: <br> 

## Frontend: 

1. **Next.js** as a basic framework mostly used here in a react way (clientSide)
2. **Styles** - SASS (vars, mixins, cascades) used in combination with CSS MODULES to avoid classNames repetitions
3. UUID library - to create a unique ID of entities
4. .ENV.VARIABLES - to encapsulate personal Tokens and UIDs
5. ZUSTAND - state manager
6. TYPESCRIPT
7. WEBPACK   

## Backend:

1. **FIREBASE FIRESTORE API** to avoid of writing your own Server and docking it with DATABASE 

## GITHUB - for source code

## VERCEL DASHBORAD AS A HOSTING PROVIDER




## 1. DEPLOY TO FIREBASE:

## To perform an SSG variant: <br>

1. **npm run build**
2. **npm run export**

Check correctly written scripts in package.json: <br> 
1. "dev": "next dev",
2. "build": "next build",
3. "start": "next start",
4. "export": "next export",


Put the "out" dir with  all your static - inside 'public' folder of **Hosting Provider**

FILE .htaccess - in the public folder of hosting Provider: <br>
RewriteEngine on <br>
RewriteCond %{REQUEST_FILENAME} !-d <br>
RewriteCond %{REQUEST_FILENAME}.html -f <br>
RewriteRule ^(.\*)$ $1.html

## Sign in to Google: **firebase login**

## Initiate your project: **firebase init**

During initializing firebase project - choose the outdir named 'out' - we created earlier

## run from your app’s root directory: **firebase deploy** <br>

After deploying, view your app!

## 2. DEPLOY TO VERSEL: <br>

1. **Create a git repo with your project on GITHUB.COM** <br>
2. **Create an Vercel account using GITHUB PROFILE at [VERSEL OFFICIAL WEBSITE](https://vercel.com.)**  to <br>
3. **ADD A NEW PROJECT** <br>
4. **FOLLOW THE INSTRUCTIONS ON THE SCREEN TO HOST YOUR REPO INTO VERCEL DASHBOARD** <br>

## **P.S. to determine enviroment variables AT VERCEL HOSTING - add them without 'NEXT*PUBLIC*' prefix**

## See the hole project you can click the link [PROJECT](https://react-zustand-chi.vercel.app/)
