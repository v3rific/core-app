const DEFAULT_GATEWAY = "https://ipfs.io/ipfs/";

function getGatewayBase() {
  const base =
    process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL ??
    process.env.NEXT_PUBLIC_IPFS_GATEWAY ??
    DEFAULT_GATEWAY;

  return base.endsWith("/") ? base : `${base}/`;
}

export function resolveIpfsUrl(cidOrUrl: string): string {
  if (!cidOrUrl) {
    return "";
  }

  if (cidOrUrl.startsWith("http://") || cidOrUrl.startsWith("https://")) {
    return cidOrUrl;
  }

  const cleanCid = cidOrUrl.startsWith("ipfs://")
    ? cidOrUrl.replace("ipfs://", "")
    : cidOrUrl;

  const base = getGatewayBase();
  let url = `${base}${cleanCid}`;

  const token = process.env.NEXT_PUBLIC_PINATA_GATEWAY_TOKEN;
  if (token) {
    const urlObj = new URL(url);
    urlObj.searchParams.set("pinataGatewayToken", token);
    url = urlObj.toString();
  }

  return url;
}
