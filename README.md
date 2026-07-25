# kube-shop

Ecommerce site made from a number of microservices:

- Frontend - react app
- product-api - python (FastAPI) app
- pricing-api - python (FastAPI) app

## Kubernetes deployment

Manifests are managed with Kustomize under `k8s/`:

- `k8s/base` - base Deployments/Services for frontend, product-api and pricing-api, labeled `app.kubernetes.io/part-of: kube-shop`. Images default to the `local` tag.
- `k8s/overlays/dev` - local development overlay. Creates the `kube-shop` namespace, sets `imagePullPolicy: Never` on all Deployments (so locally-built images are used as-is), and switches the frontend Service to `NodePort`.

Deploy to the dev overlay:

```
kubectl apply -k k8s/overlays/dev
```

## Log aggregation

Logs from all pods can be aggregated with [Loki](https://grafana.com/oss/loki/), shipped
by Promtail, and viewed in Grafana. The config for this lives in `k8s/logging/` and is
installed via the `grafana/loki-stack` Helm chart into a dedicated `logging` namespace
(kept separate from the Kustomize-managed app manifests since it's a third-party chart,
not part of kube-shop itself).

Install:

```
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install loki grafana/loki-stack \
  --version 2.10.3 \
  -n logging --create-namespace \
  -f k8s/logging/loki-stack-values.yaml
```

`k8s/logging/loki-stack-values.yaml` disables persistence and sets small resource
requests/limits (fine for ephemeral local/dev use - logs are lost if the pods restart),
exposes Grafana via NodePort, and enables Grafana's sidecar so the Loki datasource is
auto-provisioned.

Access Grafana:

```
minikube service loki-grafana -n logging --url
```

Log in with `admin` / `admin` (set in the values file, for local dev only) and use
Explore with a LogQL query, e.g. `{namespace="kube-shop"}` or
`{namespace="kube-shop", app="product-api"}`.

Uninstall:

```
helm uninstall loki -n logging
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
