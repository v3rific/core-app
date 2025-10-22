import { NextResponse, type NextRequest } from "next/server";

const PINATA_ENDPOINT = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

type PinataResponse = {
  IpfsHash?: string;
};

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const metadata = payload?.metadata;

    if (!metadata || typeof metadata !== "object") {
      return NextResponse.json({ error: "Missing metadata payload." }, { status: 400 });
    }

    const headers = buildPinataHeaders();
    const response = await fetch(PINATA_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({
        pinataMetadata: { name: metadata.name ?? "v3rific-product" },
        pinataContent: metadata,
      }),
    });

    if (!response.ok) {
      const body = await safeReadText(response);
      return NextResponse.json(
        { error: `Pinata upload failed (${response.status}): ${body}` },
        { status: 502 }
      );
    }

    const data = (await response.json()) as PinataResponse;

    if (!data.IpfsHash) {
      return NextResponse.json(
        { error: "Pinata response missing IpfsHash." },
        { status: 502 }
      );
    }

    return NextResponse.json({ cid: `ipfs://${data.IpfsHash}` });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}

function buildPinataHeaders(): Headers {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const jwt = process.env.PINATA_JWT;
  if (jwt) {
    headers.set("Authorization", `Bearer ${jwt}`);
    return headers;
  }

  const apiKey = process.env.PINATA_API_KEY;
  const apiSecret = process.env.PINATA_API_SECRET;

  if (apiKey && apiSecret) {
    headers.set("pinata_api_key", apiKey);
    headers.set("pinata_secret_api_key", apiSecret);
    return headers;
  }

  throw new Error("Pinata credentials not configured.");
}

async function safeReadText(response: Response) {
  try {
    return await response.text();
  } catch {
    return "unknown error";
  }
}
