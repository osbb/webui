FROM osbb/angular-cli

WORKDIR /app

COPY . /app/
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN npm install
RUN ng build
RUN cp -a ./dist/. /usr/share/nginx/html/
