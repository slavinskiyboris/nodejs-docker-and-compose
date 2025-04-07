# Инструкция по настройке сервера

## Подключение к серверу

```
ssh -i private_key ubuntu@158.160.11.95
```

## Установка Docker и Docker Compose

```bash
# Обновление пакетов
sudo apt-get update

# Установка необходимых зависимостей
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# Добавление официального GPG-ключа Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Добавление репозитория Docker
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Обновление пакетов
sudo apt-get update

# Установка Docker CE
sudo apt-get install -y docker-ce

# Добавление текущего пользователя в группу docker
sudo usermod -aG docker ${USER}

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Клонирование репозитория

```bash
git clone https://github.com/slavinskiyboris/nodejs-docker-and-compose.git
cd nodejs-docker-and-compose
```

## Настройка переменных окружения

Убедитесь, что файлы .env содержат правильные значения, соответствующие вашему окружению.

## Установка и настройка Nginx

```bash
sudo apt-get update
sudo apt-get install -y nginx
```

## Настройка SSL-сертификатов

Выполните скрипт для автоматической настройки SSL:

```bash
sudo ./setup-ssl.sh
```

## Запуск контейнеров

```bash
docker-compose up -d
```

## Проверка статуса

```bash
docker-compose ps
```

## Просмотр логов

```bash
# Просмотр логов всех контейнеров
docker-compose logs

# Просмотр логов конкретного контейнера
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database
``` 