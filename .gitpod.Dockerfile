FROM gitpod/workspace-postgres

# Устанавливаем Node.js
USER gitpod
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - \
    && sudo apt-get install -y nodejs

# Устанавливаем NestJS CLI и Vue CLI
RUN npm install -g @nestjs/cli @vue/cli

# Устанавливаем Docker Compose
USER root
RUN curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose