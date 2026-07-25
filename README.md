Ecommerce site made from a number of microservices \
currently \

Frontend - react app \
product-api - python (FastAPI) app \
pricing-api - python (FastAPI) app \

## Kubernetes deployment

Manifests are managed with Kustomize under `k8s/`:

- `k8s/base` - base Deployments/Services for frontend, product-api and pricing-api, labeled `app.kubernetes.io/part-of: kube-shop`. Images default to the `local` tag.
- `k8s/overlays/dev` - local development overlay. Creates the `kube-shop` namespace, sets `imagePullPolicy: Never` on all Deployments (so locally-built images are used as-is), and switches the frontend Service to `NodePort`.

Deploy to the dev overlay:

```
kubectl apply -k k8s/overlays/dev
```

## Testing

Frontend end-to-end tests live under `tests/playwright` (Playwright), covering the
product listing and the "add to order" flow.

### Setup

```
cd tests/playwright
npm install
npx playwright install --with-deps chromium
```

### Running against minikube

1. Build the service images inside minikube's Docker daemon and deploy the `dev` overlay
   (see [Kubernetes deployment](#kubernetes-deployment) above):

   ```
   eval $(minikube docker-env)
   docker build -t frontend:local frontend
   docker build -t product-api:local product-api
   docker build -t pricing-api:local pricing-api
   kubectl apply -k k8s/overlays/dev
   ```

2. Get the URL of the NodePort-exposed frontend service:

   ```
   export BASE_URL=$(minikube service frontend -n kube-shop --url)
   ```

3. Run the tests:

   ```
   cd tests/playwright
   npm test
   ```

### Running locally (without minikube)

With the stack running via `docker compose up` (frontend on `http://localhost:3001`),
`BASE_URL` can be omitted - it defaults to `http://localhost:3001`:

```
cd tests/playwright
npm test
```

### Other commands

- `npm run test:headed` - run with a visible browser
- `npm run test:ui` - open the Playwright UI runner
- `npm run report` - open the HTML report from the last run
