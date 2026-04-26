
```bash
kubectl port-forward svc/frontend-service 8081:80 -n coffee-app & \
kubectl port-forward svc/kube-prometheus-stack-grafana 8080:80 -n monitoring & \
kubectl port-forward svc/kube-prometheus-stack-prometheus 9090:9090 -n monitoring & \
kubectl port-forward svc/kube-prometheus-stack-alertmanager 9093:9093 -n monitoring &

```
