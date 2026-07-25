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
