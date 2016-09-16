FROM nginx

WORKDIR /app

COPY . /app/

RUN ./scripts/install_base.sh
RUN ./scripts/install_node.sh
RUN ./scripts/install_ng.sh
RUN npm install
RUN ng build
RUN cp -a ./dist/. /usr/share/nginx/html/
