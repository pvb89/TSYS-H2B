## Docker

Enter Shell
docker attach CONTAINER_NAME

docker login
docker tag h2bmw:v4 pvb1/tsys-h2b-mw
docker push

docker tag h2bmw:v1 pvb1/tsys-h2b-mw:v2

docker run -t -i → can be detached with ^P^Q and reattached with docker attach
docker run -i    → cannot be detached with ^P^Q; will disrupt stdin
docker run       → cannot be detached with ^P^Q;
docker run -d    → Führt Container im Modus „detached“ (im Hintergrund) aus 

### To list running containers, -a shows even stopped container:
docker ps -a

### Run container and allow to execute commands: interactive mode interactive: -it , specify port mapping: -p: below: 5051 on my laptop, 5050 in the container:
docker run –name -it -p 5051:5050

### Run in detached mode, console doesn’t wait: -d detached:
docker run -d –name name image

### open bash inside of container:
docker exec -it containerName /bin/bash

### View logs
docker logs <container>

### To delete a container. If no name was given, view the container ID with ps
docker rm <container>

### Delete an image
docker rmi <image>

### Set env variables to run command:
docker run -e ‘VAR1=abc’ -e ‘VAR2=123’ …

## Kube

### Kube config
- Download from SAP Kyma Service
-- Go to start Page and on the upper right user icon

The token which is in the kubeconfig file expires after 8 hours
As such, whenever the command line throws an error due to login, the file has to be downloaded again

### Kube CLI

#### Print client version:
kubectl version –client

#### View kubeconfig content:
kubectl config get-contexts

#### Get pods info for current namespace:
kubectl get po

#### Get pods info for dev namespace:
kubectl -n dev get po

#### Get deployments in dev namespace:
kubectl -n dev get deployments

#### Get services:
kubectl -n dev get services

#### Delete deployment:
kubectl -n dev delete deployment <deployment>

#### Describe deployment:
kubectl -n dev describe deployments <deployment>

#### Create deployment:
kubectl -n dev create -f deployment.yaml

#### Update deployment:
kubectl -n dev apply -f deployment.yaml

#### Logs:
kubectl -n dev logs <podname> -c <containername>