Подготовка next-app к Деплою:

генерация статических страниц next js.
Это подойдет, если страницы сайта можно представить без генерации на сервере.(в принципе, node для этого не нужен) для этого необходимо выполнить:
 npm run build, npm run export. 

"scripts": 
{ "dev": "next dev",
"build": "next build",
"start": "next start",
"export": "next export",
"lint": "next lint"
}

появится папка out в корне со статический сайтом - нужно перенести в паблик хоста
провести настройки создав файл .htaccess с содержанием:
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.\*)$ $1.html

DEPLOY FIREBASE:

Sign in to Google
firebase login

Initiate your project:
firebase init

During initializing - choose the default dir 'out' - we created earlier

Then, run this command from your app’s root directory: firebase deploy

After deploying, view your app at next-blog-121f0.web.app
